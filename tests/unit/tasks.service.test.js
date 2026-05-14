/**
 * Tasks Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), VL (Valores Limite)
 */

const tasksService = require('../../services/tasksService');

describe('tasksService - Sprint 3', () => {
  
  // ============================================================
  // TU-172 a TU-176: validateTaskData (PE)
  // ============================================================
  
  describe('validateTaskData - PE', () => {
    test('TU-172: Deve aceitar tarefa válida completa', () => {
      const task = {
        batchId: 'batch123',
        tipo: 'rega',
        descricao: 'Rega programada',
        dataExecucao: '2026-05-15T08:00:00Z',
        estado: 'pendente'
      };
      const result = tasksService.validateTaskData(task);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-173: Deve rejeitar tarefa nula', () => {
      const result = tasksService.validateTaskData(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Tarefa não pode ser nula');
    });

    test('TU-174: Deve rejeitar tarefa sem batchId', () => {
      const task = {
        tipo: 'rega',
        dataExecucao: '2026-05-15T08:00:00Z'
      };
      const result = tasksService.validateTaskData(task);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('batchId é obrigatório');
    });

    test('TU-175: Deve rejeitar tipo inválido (PE)', () => {
      const task = {
        batchId: 'batch123',
        tipo: 'TIPO_INVALIDO',
        dataExecucao: '2026-05-15T08:00:00Z'
      };
      const result = tasksService.validateTaskData(task);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('tipo deve ser rega, fertilizacao, colheita, monitorizacao ou manutencao');
    });

    test('TU-176: Deve rejeitar estado inválido (PE)', () => {
      const task = {
        batchId: 'batch123',
        tipo: 'rega',
        dataExecucao: '2026-05-15T08:00:00Z',
        estado: 'ESTADO_INVALIDO'
      };
      const result = tasksService.validateTaskData(task);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('estado deve ser pendente, em_execucao, concluida ou cancelada');
    });
  });

  // ============================================================
  // TU-177 a TU-180: canExecuteTask (PE)
  // ============================================================
  
  describe('canExecuteTask - PE', () => {
    const taskPendente = {
      batchId: 'batch123',
      tipo: 'rega',
      dataExecucao: '2026-05-15T08:00:00Z',
      estado: 'pendente'
    };

    test('TU-177: Técnico pode executar tarefa pendente', () => {
      const user = { id: 1, username: 'tecnico1', perfil: 'Técnico' };
      const result = tasksService.canExecuteTask(taskPendente, user);
      expect(result.canExecute).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-178: Responsável pode executar tarefa pendente', () => {
      const user = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
      const result = tasksService.canExecuteTask(taskPendente, user);
      expect(result.canExecute).toBe(true);
    });

    test('TU-179: Não pode executar tarefa concluída', () => {
      const taskConcluida = { ...taskPendente, estado: 'concluida' };
      const user = { id: 1, username: 'tecnico1', perfil: 'Técnico' };
      const result = tasksService.canExecuteTask(taskConcluida, user);
      expect(result.canExecute).toBe(false);
      expect(result.reason).toContain('Apenas tarefas pendentes');
    });

    test('TU-180: Perfil não autorizado não pode executar', () => {
      const user = { id: 3, username: 'guest', perfil: 'Convidado' };
      const result = tasksService.canExecuteTask(taskPendente, user);
      expect(result.canExecute).toBe(false);
      expect(result.reason).toContain('Perfil não autorizado');
    });
  });

  // ============================================================
  // TU-181 a TU-184: isOverdue (VL)
  // ============================================================
  
  describe('isOverdue - VL', () => {
    test('TU-181: Tarefa com data passada está atrasada', () => {
      const task = {
        batchId: 'batch123',
        tipo: 'rega',
        dataExecucao: '2020-01-01T08:00:00Z',
        estado: 'pendente'
      };
      const overdue = tasksService.isOverdue(task);
      expect(overdue).toBe(true);
    });

    test('TU-182: Tarefa com data futura não está atrasada', () => {
      const futuro = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const task = {
        batchId: 'batch123',
        tipo: 'rega',
        dataExecucao: futuro.toISOString(),
        estado: 'pendente'
      };
      const overdue = tasksService.isOverdue(task);
      expect(overdue).toBe(false);
    });

    test('TU-183: Tarefa concluída não é considerada atrasada', () => {
      const task = {
        batchId: 'batch123',
        tipo: 'rega',
        dataExecucao: '2020-01-01T08:00:00Z',
        estado: 'concluida'
      };
      const overdue = tasksService.isOverdue(task);
      expect(overdue).toBe(false);
    });

    test('TU-184: Tarefa sem dataExecucao não é atrasada', () => {
      const task = {
        batchId: 'batch123',
        tipo: 'rega',
        estado: 'pendente'
      };
      const overdue = tasksService.isOverdue(task);
      expect(overdue).toBe(false);
    });
  });

  // ============================================================
  // TU-185 a TU-188: calculateTaskPriority (PE)
  // ============================================================
  
  describe('calculateTaskPriority - PE', () => {
    test('TU-185: Colheita tem alta prioridade (8)', () => {
      const task = {
        tipo: 'colheita',
        dataExecucao: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        estado: 'pendente'
      };
      const priority = tasksService.calculateTaskPriority(task);
      expect(priority).toBe(8);
    });

    test('TU-186: Rega tem prioridade 7', () => {
      const task = {
        tipo: 'rega',
        dataExecucao: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        estado: 'pendente'
      };
      const priority = tasksService.calculateTaskPriority(task);
      expect(priority).toBe(7);
    });

    test('TU-187: Monitorização tem baixa prioridade (3)', () => {
      const task = {
        tipo: 'monitorizacao',
        dataExecucao: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        estado: 'pendente'
      };
      const priority = tasksService.calculateTaskPriority(task);
      expect(priority).toBe(3);
    });

    test('TU-188: Tarefa atrasada aumenta prioridade (+2)', () => {
      const task = {
        tipo: 'rega', // base = 7
        dataExecucao: '2020-01-01T08:00:00Z', // atrasada
        estado: 'pendente'
      };
      const priority = tasksService.calculateTaskPriority(task);
      expect(priority).toBe(9); // 7 + 2
    });
  });

  // ============================================================
  // TU-189 a TU-192: canCancelTask (PE)
  // ============================================================
  
  describe('canCancelTask - PE', () => {
    const taskPendente = {
      batchId: 'batch123',
      tipo: 'rega',
      dataExecucao: '2026-05-15T08:00:00Z',
      estado: 'pendente'
    };

    const responsavel = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
    const tecnico = { id: 1, username: 'tecnico1', perfil: 'Técnico' };

    test('TU-189: Responsável pode cancelar tarefa pendente', () => {
      const result = tasksService.canCancelTask(taskPendente, responsavel);
      expect(result.canCancel).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-190: Técnico NÃO pode cancelar tarefas', () => {
      const result = tasksService.canCancelTask(taskPendente, tecnico);
      expect(result.canCancel).toBe(false);
      expect(result.reason).toContain('Apenas Responsável Técnico ou Administrador');
    });

    test('TU-191: Não pode cancelar tarefa concluída', () => {
      const taskConcluida = { ...taskPendente, estado: 'concluida' };
      const result = tasksService.canCancelTask(taskConcluida, responsavel);
      expect(result.canCancel).toBe(false);
      expect(result.reason).toContain('Tarefas concluídas não podem ser canceladas');
    });

    test('TU-192: Não pode cancelar tarefa já cancelada', () => {
      const taskCancelada = { ...taskPendente, estado: 'cancelada' };
      const result = tasksService.canCancelTask(taskCancelada, responsavel);
      expect(result.canCancel).toBe(false);
      expect(result.reason).toContain('Tarefa já está cancelada');
    });
  });

});
