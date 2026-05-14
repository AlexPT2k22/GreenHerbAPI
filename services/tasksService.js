/**
 * Tasks Service
 * Lógica de negócio para gestão de tarefas operacionais
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os dados de uma tarefa
 * @param {Object} task - Dados da tarefa
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateTaskData(task) {
  const errors = [];

  if (!task) {
    return { valid: false, errors: ['Tarefa não pode ser nula'] };
  }

  // Campos obrigatórios
  if (!task.batchId) {
    errors.push('batchId é obrigatório');
  }

  if (!task.tipo) {
    errors.push('tipo é obrigatório');
  } else {
    const tiposValidos = ['rega', 'fertilizacao', 'colheita', 'monitorizacao', 'manutencao'];
    if (!tiposValidos.includes(task.tipo)) {
      errors.push('tipo deve ser rega, fertilizacao, colheita, monitorizacao ou manutencao');
    }
  }

  if (!task.dataExecucao) {
    errors.push('dataExecucao é obrigatória');
  }

  // Validar estado
  if (task.estado) {
    const estadosValidos = ['pendente', 'em_execucao', 'concluida', 'cancelada'];
    if (!estadosValidos.includes(task.estado)) {
      errors.push('estado deve ser pendente, em_execucao, concluida ou cancelada');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifica se um utilizador pode executar uma tarefa
 * @param {Object} task - Tarefa
 * @param {Object} user - Utilizador
 * @returns {Object} { canExecute: boolean, reason: string }
 */
function canExecuteTask(task, user) {
  if (!task || !user) {
    return { canExecute: false, reason: 'Tarefa ou utilizador não especificado' };
  }

  if (task.estado !== 'pendente') {
    return { canExecute: false, reason: 'Apenas tarefas pendentes podem ser executadas' };
  }

  // Técnico, Responsável e Administrador podem executar tarefas
  const perfisAutorizados = ['Técnico', 'Responsável Técnico', 'Administrador'];
  if (!perfisAutorizados.includes(user.perfil)) {
    return { canExecute: false, reason: 'Perfil não autorizado' };
  }

  return { canExecute: true, reason: null };
}

/**
 * Verifica se uma tarefa está atrasada
 * @param {Object} task - Tarefa com dataExecucao
 * @returns {boolean} True se atrasada
 */
function isOverdue(task) {
  if (!task || !task.dataExecucao) {
    return false;
  }

  if (task.estado === 'concluida' || task.estado === 'cancelada') {
    return false;
  }

  const now = new Date();
  const execDate = new Date(task.dataExecucao);

  return execDate < now;
}

/**
 * Calcula a prioridade de uma tarefa (0-10)
 * Baseado em: tipo, atraso, estado
 * @param {Object} task - Tarefa
 * @returns {number} Prioridade (0-10, maior = mais urgente)
 */
function calculateTaskPriority(task) {
  if (!task) {
    return 0;
  }

  let priority = 0;

  // Base: tipo de tarefa
  const priorityByType = {
    'colheita': 8,
    'rega': 7,
    'fertilizacao': 5,
    'monitorizacao': 3,
    'manutencao': 4
  };

  priority = priorityByType[task.tipo] || 2;

  // Aumentar se atrasada
  if (isOverdue(task)) {
    priority = Math.min(10, priority + 2);
  }

  return priority;
}

/**
 * Verifica se uma tarefa pode ser cancelada
 * @param {Object} task - Tarefa
 * @param {Object} user - Utilizador
 * @returns {Object} { canCancel: boolean, reason: string }
 */
function canCancelTask(task, user) {
  if (!task || !user) {
    return { canCancel: false, reason: 'Tarefa ou utilizador não especificado' };
  }

  if (task.estado === 'concluida') {
    return { canCancel: false, reason: 'Tarefas concluídas não podem ser canceladas' };
  }

  if (task.estado === 'cancelada') {
    return { canCancel: false, reason: 'Tarefa já está cancelada' };
  }

  // Apenas Responsável e Administrador podem cancelar
  const perfisAutorizados = ['Responsável Técnico', 'Administrador'];
  if (!perfisAutorizados.includes(user.perfil)) {
    return { canCancel: false, reason: 'Apenas Responsável Técnico ou Administrador podem cancelar tarefas' };
  }

  return { canCancel: true, reason: null };
}

module.exports = {
  validateTaskData,
  canExecuteTask,
  isOverdue,
  calculateTaskPriority,
  canCancelTask
};
