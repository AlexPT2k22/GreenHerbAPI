/**
 * Alerts Service
 * Lógica de negócio para gestão de alertas
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os dados de um alerta
 * @param {Object} alert - Dados do alerta
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateAlertData(alert) {
  const errors = [];

  if (!alert) {
    return { valid: false, errors: ['Alerta não pode ser nulo'] };
  }

  // Campos obrigatórios
  if (!alert.batchId) {
    errors.push('batchId é obrigatório');
  }

  if (!alert.tipo) {
    errors.push('tipo é obrigatório');
  } else {
    const tiposValidos = ['Informativo', 'Aviso', 'Crítico'];
    if (!tiposValidos.includes(alert.tipo)) {
      errors.push('tipo deve ser Informativo, Aviso ou Crítico');
    }
  }

  if (!alert.mensagem || alert.mensagem.trim().length === 0) {
    errors.push('mensagem é obrigatória');
  }

  // Validar estado
  if (alert.estado) {
    const estadosValidos = ['ativo', 'resolvido', 'ignorado'];
    if (!estadosValidos.includes(alert.estado)) {
      errors.push('estado deve ser ativo, resolvido ou ignorado');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifica se um utilizador pode resolver um alerta
 * @param {Object} alert - Alerta
 * @param {Object} user - Utilizador
 * @returns {Object} { canResolve: boolean, reason: string }
 */
function canResolve(alert, user) {
  if (!alert || !user) {
    return { canResolve: false, reason: 'Alerta ou utilizador não especificado' };
  }

  if (alert.estado !== 'ativo') {
    return { canResolve: false, reason: 'Apenas alertas ativos podem ser resolvidos' };
  }

  // Técnico, Responsável e Administrador podem resolver
  const perfisAutorizados = ['Técnico', 'Responsável Técnico', 'Administrador'];
  if (!perfisAutorizados.includes(user.perfil)) {
    return { canResolve: false, reason: 'Perfil não autorizado' };
  }

  return { canResolve: true, reason: null };
}

/**
 * Verifica se um utilizador pode ignorar um alerta
 * RN-05: Ignorar alerta crítico requer justificação
 * @param {Object} alert - Alerta
 * @param {Object} user - Utilizador
 * @param {string} justificacao - Justificação (obrigatória para Crítico)
 * @returns {Object} { canIgnore: boolean, reason: string }
 */
function canIgnore(alert, user, justificacao) {
  if (!alert || !user) {
    return { canIgnore: false, reason: 'Alerta ou utilizador não especificado' };
  }

  if (alert.estado !== 'ativo') {
    return { canIgnore: false, reason: 'Apenas alertas ativos podem ser ignorados' };
  }

  // Apenas Responsável Técnico e Administrador podem ignorar
  const perfisAutorizados = ['Responsável Técnico', 'Administrador'];
  if (!perfisAutorizados.includes(user.perfil)) {
    return { canIgnore: false, reason: 'Apenas Responsável Técnico ou Administrador podem ignorar alertas' };
  }

  // RN-05: Alertas críticos requerem justificação [10, 500] caracteres
  if (alert.tipo === 'Crítico') {
    if (!justificacao || justificacao.trim().length < 10) {
      return { canIgnore: false, reason: 'Alertas críticos requerem justificação com pelo menos 10 caracteres' };
    }
    if (justificacao.length > 500) {
      return { canIgnore: false, reason: 'Justificação não pode exceder 500 caracteres' };
    }
  }

  return { canIgnore: true, reason: null };
}

/**
 * Valida o comprimento de uma justificação
 * VL: [10, 500] caracteres
 * @param {string} text - Texto da justificação
 * @returns {Object} { valid: boolean, reason: string }
 */
function validateJustificationLength(text) {
  if (!text || text.trim().length === 0) {
    return { valid: false, reason: 'Justificação não pode ser vazia' };
  }

  const length = text.trim().length;

  if (length < 10) {
    return { valid: false, reason: 'Justificação deve ter pelo menos 10 caracteres' };
  }

  if (length > 500) {
    return { valid: false, reason: 'Justificação não pode exceder 500 caracteres' };
  }

  return { valid: true, reason: null };
}

/**
 * Escala a severidade de um alerta (Informativo -> Aviso -> Crítico)
 * @param {Object} alert - Alerta
 * @returns {string} Nova severidade
 */
function escalateSeverity(alert) {
  if (!alert || !alert.tipo) {
    return null;
  }

  const escalation = {
    'Informativo': 'Aviso',
    'Aviso': 'Crítico',
    'Crítico': 'Crítico' // Já é o máximo
  };

  return escalation[alert.tipo] || alert.tipo;
}

/**
 * Classifica a prioridade de um alerta baseado no tipo e idade
 * @param {Object} alert - Alerta com tipo e timestamp
 * @returns {number} Prioridade (0-10, maior = mais urgente)
 */
function calculateAlertPriority(alert) {
  if (!alert) {
    return 0;
  }

  let priority = 0;

  // Base: tipo de alerta
  if (alert.tipo === 'Crítico') {
    priority = 10;
  } else if (alert.tipo === 'Aviso') {
    priority = 5;
  } else if (alert.tipo === 'Informativo') {
    priority = 2;
  }

  // Aumentar prioridade se alerta antigo (> 24h)
  if (alert.timestamp) {
    const now = new Date();
    const alertDate = new Date(alert.timestamp);
    const hoursOld = (now - alertDate) / (1000 * 60 * 60);
    
    if (hoursOld > 24) {
      priority = Math.min(10, priority + 2);
    }
  }

  return priority;
}

module.exports = {
  validateAlertData,
  canResolve,
  canIgnore,
  validateJustificationLength,
  escalateSeverity,
  calculateAlertPriority
};
