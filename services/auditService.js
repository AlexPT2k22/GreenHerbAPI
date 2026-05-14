/**
 * Audit Service
 * Lógica de negócio para log de auditoria
 * Sprint 3 - Testes de Unidade
 */

/**
 * Regista uma operação no log de auditoria
 * @param {Object} user - Utilizador que executou a operação
 * @param {string} action - Ação executada (CREATE, UPDATE, DELETE, READ)
 * @param {string} resource - Recurso afetado
 * @param {Object} details - Detalhes adicionais (opcional)
 * @returns {Object} Entrada de auditoria
 */
function logOperation(user, action, resource, details = {}) {
  if (!user || !action || !resource) {
    return null;
  }

  return {
    userId: user.id,
    username: user.username,
    action,
    resource,
    timestamp: new Date().toISOString(),
    details
  };
}

/**
 * Verifica se um endpoint deve ser auditado
 * RN-55: Auditoria de operações críticas
 * @param {string} endpoint - Endpoint da API (ex: POST /api/plans)
 * @returns {boolean} True se deve auditar
 */
function shouldAudit(endpoint) {
  if (!endpoint) {
    return false;
  }

  const auditableEndpoints = [
    'POST /api/plans',
    'PATCH /api/batches',
    'DELETE /api/batches',
    'POST /api/automation/rules',
    'PATCH /api/automation/mode',
    'DELETE /api/users',
    'POST /api/users'
  ];

  // Verificar se endpoint está na lista ou contém operações críticas
  const isCritical = auditableEndpoints.some(pattern => endpoint.includes(pattern));
  
  // Sempre auditar DELETE e operações de admin
  const isDelete = endpoint.includes('DELETE');
  const isAdmin = endpoint.includes('/users') && !endpoint.includes('GET');

  return isCritical || isDelete || isAdmin;
}

/**
 * Filtra logs de auditoria por range de datas
 * @param {Array} logs - Array de logs
 * @param {string} start - Data início (ISO)
 * @param {string} end - Data fim (ISO)
 * @returns {Array} Logs filtrados
 */
function filterByDateRange(logs, start, end) {
  if (!logs || logs.length === 0) {
    return [];
  }

  if (!start || !end) {
    return logs;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  return logs.filter(log => {
    if (!log.timestamp) return false;
    const logDate = new Date(log.timestamp);
    return logDate >= startDate && logDate <= endDate;
  });
}

/**
 * Filtra logs por tipo de ação
 * @param {Array} logs - Array de logs
 * @param {string} action - Ação (CREATE, UPDATE, DELETE, READ)
 * @returns {Array} Logs filtrados
 */
function filterByAction(logs, action) {
  if (!logs || logs.length === 0 || !action) {
    return [];
  }

  return logs.filter(log => log.action === action);
}

/**
 * Filtra logs por utilizador
 * @param {Array} logs - Array de logs
 * @param {number} userId - ID do utilizador
 * @returns {Array} Logs filtrados
 */
function filterByUser(logs, userId) {
  if (!logs || logs.length === 0 || !userId) {
    return [];
  }

  return logs.filter(log => log.userId === userId);
}

module.exports = {
  logOperation,
  shouldAudit,
  filterByDateRange,
  filterByAction,
  filterByUser
};
