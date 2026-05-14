/**
 * Batches Service
 * Lógica de negócio para gestão de lotes de cultivo
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os dados de um lote
 * @param {Object} batch - Dados do lote
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateBatchData(batch) {
  const errors = [];

  if (!batch) {
    return { valid: false, errors: ['Lote não pode ser nulo'] };
  }

  // Validar campos obrigatórios
  if (!batch.planId) {
    errors.push('planId é obrigatório');
  }

  if (!batch.quantidadeInicial || batch.quantidadeInicial <= 0) {
    errors.push('quantidadeInicial deve ser maior que 0');
  }

  if (!batch.dataInicio) {
    errors.push('dataInicio é obrigatório');
  }

  // Validar estado
  const estadosValidos = ['ativo', 'concluido', 'comprometido', 'cancelado'];
  if (batch.estado && !estadosValidos.includes(batch.estado)) {
    errors.push('Estado inválido');
  }

  // Validar quantidade atual vs inicial
  if (batch.quantidadeAtual !== undefined) {
    if (batch.quantidadeAtual < 0) {
      errors.push('quantidadeAtual não pode ser negativa');
    }
    if (batch.quantidadeAtual > batch.quantidadeInicial) {
      errors.push('quantidadeAtual não pode exceder quantidadeInicial');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifica se um lote pode ser dividido
 * RN-37: Divisão de lotes
 * @param {Object} batch - Lote original
 * @param {number} quantidade - Quantidade a dividir
 * @returns {Object} { canDivide: boolean, reason: string }
 */
function canDivideBatch(batch, quantidade) {
  if (!batch) {
    return { canDivide: false, reason: 'Lote não especificado' };
  }

  if (batch.estado !== 'ativo') {
    return { canDivide: false, reason: 'Apenas lotes ativos podem ser divididos' };
  }

  if (!quantidade || quantidade <= 0) {
    return { canDivide: false, reason: 'Quantidade deve ser maior que 0' };
  }

  const quantidadeAtual = batch.quantidadeAtual ?? batch.quantidadeInicial;

  if (quantidade >= quantidadeAtual) {
    return { canDivide: false, reason: 'Quantidade a dividir deve ser menor que quantidade atual' };
  }

  return { canDivide: true, reason: null };
}

/**
 * Calcula a duração real de um lote (em dias)
 * @param {Object} batch - Lote com datas
 * @returns {number|null} Duração em dias ou null se não concluído
 */
function calculateRealDuration(batch) {
  if (!batch || !batch.dataInicio) {
    return null;
  }

  const dataFim = batch.dataFim || new Date();
  const inicio = new Date(batch.dataInicio);
  const fim = new Date(dataFim);

  const diffMs = fim - inicio;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDias >= 0 ? diffDias : null;
}

/**
 * Verifica se um lote pode ser fechado como "concluído"
 * RN-39: Conclusão de lote
 * @param {Object} batch - Lote
 * @param {Array} alerts - Alertas críticos do lote
 * @returns {Object} { canClose: boolean, reason: string }
 */
function canCloseAsConcluido(batch, alerts = []) {
  if (!batch) {
    return { canClose: false, reason: 'Lote não especificado' };
  }

  if (batch.estado !== 'ativo') {
    return { canClose: false, reason: 'Apenas lotes ativos podem ser concluídos' };
  }

  if (!batch.dataFim) {
    return { canClose: false, reason: 'dataFim é obrigatória para conclusão' };
  }

  // Verificar alertas críticos não resolvidos
  const alertasCriticosAtivos = alerts.filter(
    a => a.tipo === 'Crítico' && a.estado === 'ativo'
  );

  if (alertasCriticosAtivos.length > 0) {
    return { canClose: false, reason: 'Existem alertas críticos não resolvidos' };
  }

  return { canClose: true, reason: null };
}

/**
 * Verifica se um lote pode ser fechado como "comprometido"
 * RN-40: Lote comprometido
 * @param {Object} batch - Lote
 * @param {string} justificacao - Justificação obrigatória
 * @returns {Object} { canClose: boolean, reason: string }
 */
function canCloseAsComprometido(batch, justificacao) {
  if (!batch) {
    return { canClose: false, reason: 'Lote não especificado' };
  }

  if (batch.estado !== 'ativo') {
    return { canClose: false, reason: 'Apenas lotes ativos podem ser comprometidos' };
  }

  if (!justificacao || justificacao.trim().length < 10) {
    return { canClose: false, reason: 'Justificação deve ter pelo menos 10 caracteres' };
  }

  if (justificacao.length > 500) {
    return { canClose: false, reason: 'Justificação não pode exceder 500 caracteres' };
  }

  return { canClose: true, reason: null };
}

/**
 * Calcula a produtividade real de um lote (quantidade/dia)
 * @param {Object} batch - Lote concluído
 * @returns {number|null} Produtividade ou null se inválido
 */
function calculateProductivity(batch) {
  if (!batch || batch.estado !== 'concluido') {
    return null;
  }

  const duration = calculateRealDuration(batch);
  if (!duration || duration === 0) {
    return null;
  }

  const quantidadeFinal = batch.quantidadeAtual ?? batch.quantidadeInicial;
  return parseFloat((quantidadeFinal / duration).toFixed(2));
}

module.exports = {
  validateBatchData,
  canDivideBatch,
  calculateRealDuration,
  canCloseAsConcluido,
  canCloseAsComprometido,
  calculateProductivity
};
