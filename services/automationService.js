/**
 * Automation Service
 * Lógica de negócio para regras de automação
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os dados de uma regra de automação
 * @param {Object} rule - Dados da regra
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateRuleData(rule) {
  const errors = [];

  if (!rule) {
    return { valid: false, errors: ['Regra não pode ser nula'] };
  }

  // Campos obrigatórios
  if (!rule.nome || rule.nome.trim().length === 0) {
    errors.push('nome é obrigatório');
  }

  if (!rule.condicao || rule.condicao.trim().length === 0) {
    errors.push('condicao é obrigatória');
  }

  if (!rule.acao || rule.acao.trim().length === 0) {
    errors.push('acao é obrigatória');
  }

  // Validar estado
  if (rule.estado) {
    const estadosValidos = ['ativa', 'inativa'];
    if (!estadosValidos.includes(rule.estado)) {
      errors.push('estado deve ser ativa ou inativa');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Avalia uma regra baseado no contexto atual
 * @param {Object} rule - Regra com condição
 * @param {Object} context - Contexto com valores atuais
 * @returns {boolean} True se condição satisfeita
 */
function evaluateRule(rule, context) {
  if (!rule || !rule.condicao || !context) {
    return false;
  }

  // Simulação simplificada de avaliação de condições
  // Ex: "temperatura > 30" => context.temperatura > 30
  
  const condicao = rule.condicao.toLowerCase();

  // Temperatura
  if (condicao.includes('temperatura') && context.temperatura !== undefined) {
    if (condicao.includes('>')) {
      const valor = parseFloat(condicao.match(/(\d+)/)?.[0] || 0);
      return context.temperatura > valor;
    }
    if (condicao.includes('<')) {
      const valor = parseFloat(condicao.match(/(\d+)/)?.[0] || 0);
      return context.temperatura < valor;
    }
  }

  // Humidade
  if (condicao.includes('humidade') && context.humidade !== undefined) {
    if (condicao.includes('>')) {
      const valor = parseFloat(condicao.match(/(\d+)/)?.[0] || 0);
      return context.humidade > valor;
    }
    if (condicao.includes('<')) {
      const valor = parseFloat(condicao.match(/(\d+)/)?.[0] || 0);
      return context.humidade < valor;
    }
  }

  return false;
}

/**
 * Verifica se a regra deve executar automaticamente
 * RN-45: Modo Manual vs Automático
 * @param {Object} rule - Regra
 * @param {string} mode - Modo do sistema ('Manual' ou 'Automatico')
 * @returns {Object} { shouldExecute: boolean, reason: string }
 */
function shouldExecuteAutomatically(rule, mode) {
  if (!rule || !mode) {
    return { shouldExecute: false, reason: 'Regra ou modo não especificado' };
  }

  if (rule.estado !== 'ativa') {
    return { shouldExecute: false, reason: 'Regra não está ativa' };
  }

  if (mode === 'Manual') {
    return { shouldExecute: false, reason: 'Sistema em modo Manual - apenas sugestões' };
  }

  if (mode === 'Automatico') {
    return { shouldExecute: true, reason: null };
  }

  return { shouldExecute: false, reason: 'Modo inválido' };
}

/**
 * Verifica se utilizador pode alterar o modo (Manual/Automático)
 * @param {Object} user - Utilizador
 * @param {string} newMode - Novo modo
 * @returns {Object} { canToggle: boolean, reason: string }
 */
function canToggleMode(user, newMode) {
  if (!user) {
    return { canToggle: false, reason: 'Utilizador não especificado' };
  }

  const modesValidos = ['Manual', 'Automatico'];
  if (!modesValidos.includes(newMode)) {
    return { canToggle: false, reason: 'Modo deve ser Manual ou Automatico' };
  }

  // Apenas Responsável e Administrador podem alterar modo
  const perfisAutorizados = ['Responsável Técnico', 'Administrador'];
  if (!perfisAutorizados.includes(user.perfil)) {
    return { canToggle: false, reason: 'Apenas Responsável Técnico ou Administrador podem alterar modo' };
  }

  return { canToggle: true, reason: null };
}

/**
 * Determina o tipo de ação baseado no modo
 * @param {string} mode - Modo do sistema
 * @returns {string} 'executar' ou 'sugerir'
 */
function getActionType(mode) {
  return mode === 'Automatico' ? 'executar' : 'sugerir';
}

module.exports = {
  validateRuleData,
  evaluateRule,
  shouldExecuteAutomatically,
  canToggleMode,
  getActionType
};
