/**
 * Automation Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), MC/DC
 */

const automationService = require('../../services/automationService');

describe('automationService - Sprint 3', () => {
  
  // ============================================================
  // TU-193 a TU-197: validateRuleData (PE)
  // ============================================================
  
  describe('validateRuleData - PE', () => {
    test('TU-193: Deve aceitar regra válida completa', () => {
      const rule = {
        nome: 'Alerta Temperatura Alta',
        condicao: 'temperatura > 30',
        acao: 'Gerar alerta crítico',
        estado: 'ativa'
      };
      const result = automationService.validateRuleData(rule);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-194: Deve rejeitar regra nula', () => {
      const result = automationService.validateRuleData(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Regra não pode ser nula');
    });

    test('TU-195: Deve rejeitar regra sem nome', () => {
      const rule = {
        condicao: 'temperatura > 30',
        acao: 'Gerar alerta'
      };
      const result = automationService.validateRuleData(rule);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('nome é obrigatório');
    });

    test('TU-196: Deve rejeitar regra sem condição', () => {
      const rule = {
        nome: 'Regra Teste',
        acao: 'Gerar alerta'
      };
      const result = automationService.validateRuleData(rule);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('condicao é obrigatória');
    });

    test('TU-197: Deve rejeitar estado inválido (PE)', () => {
      const rule = {
        nome: 'Regra Teste',
        condicao: 'temperatura > 30',
        acao: 'Gerar alerta',
        estado: 'ESTADO_INVALIDO'
      };
      const result = automationService.validateRuleData(rule);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('estado deve ser ativa ou inativa');
    });
  });

  // ============================================================
  // TU-198 a TU-203: evaluateRule (PE)
  // ============================================================
  
  describe('evaluateRule - PE', () => {
    test('TU-198: Deve avaliar temperatura > 30 como true', () => {
      const rule = { condicao: 'temperatura > 30' };
      const context = { temperatura: 35 };
      const result = automationService.evaluateRule(rule, context);
      expect(result).toBe(true);
    });

    test('TU-199: Deve avaliar temperatura > 30 como false', () => {
      const rule = { condicao: 'temperatura > 30' };
      const context = { temperatura: 25 };
      const result = automationService.evaluateRule(rule, context);
      expect(result).toBe(false);
    });

    test('TU-200: Deve avaliar humidade < 50 como true', () => {
      const rule = { condicao: 'humidade < 50' };
      const context = { humidade: 40 };
      const result = automationService.evaluateRule(rule, context);
      expect(result).toBe(true);
    });

    test('TU-201: Deve avaliar humidade < 50 como false', () => {
      const rule = { condicao: 'humidade < 50' };
      const context = { humidade: 60 };
      const result = automationService.evaluateRule(rule, context);
      expect(result).toBe(false);
    });

    test('TU-202: Deve retornar false para condição sem contexto', () => {
      const rule = { condicao: 'temperatura > 30' };
      const context = {};
      const result = automationService.evaluateRule(rule, context);
      expect(result).toBe(false);
    });

    test('TU-203: Deve retornar false para regra sem condição', () => {
      const rule = {};
      const context = { temperatura: 35 };
      const result = automationService.evaluateRule(rule, context);
      expect(result).toBe(false);
    });
  });

  // ============================================================
  // TU-204 a TU-208: shouldExecuteAutomatically - RN-45 (MC/DC)
  // ============================================================
  
  describe('shouldExecuteAutomatically - RN-45 (MC/DC)', () => {
    const ruleAtiva = {
      nome: 'Regra Teste',
      condicao: 'temperatura > 30',
      acao: 'Gerar alerta',
      estado: 'ativa'
    };

    test('TU-204: Deve executar automaticamente em modo Automático (MC/DC)', () => {
      const result = automationService.shouldExecuteAutomatically(ruleAtiva, 'Automatico');
      expect(result.shouldExecute).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-205: NÃO deve executar em modo Manual (MC/DC)', () => {
      const result = automationService.shouldExecuteAutomatically(ruleAtiva, 'Manual');
      expect(result.shouldExecute).toBe(false);
      expect(result.reason).toContain('modo Manual');
    });

    test('TU-206: NÃO deve executar se regra inativa (MC/DC)', () => {
      const ruleInativa = { ...ruleAtiva, estado: 'inativa' };
      const result = automationService.shouldExecuteAutomatically(ruleInativa, 'Automatico');
      expect(result.shouldExecute).toBe(false);
      expect(result.reason).toContain('Regra não está ativa');
    });

    test('TU-207: Deve rejeitar modo inválido (MC/DC)', () => {
      const result = automationService.shouldExecuteAutomatically(ruleAtiva, 'MODO_INVALIDO');
      expect(result.shouldExecute).toBe(false);
      expect(result.reason).toContain('Modo inválido');
    });

    test('TU-208: Deve rejeitar se regra não especificada (MC/DC)', () => {
      const result = automationService.shouldExecuteAutomatically(null, 'Automatico');
      expect(result.shouldExecute).toBe(false);
      expect(result.reason).toContain('Regra ou modo não especificado');
    });
  });

  // ============================================================
  // TU-209 a TU-212: canToggleMode (PE)
  // ============================================================
  
  describe('canToggleMode - PE', () => {
    const responsavel = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
    const tecnico = { id: 1, username: 'tecnico1', perfil: 'Técnico' };

    test('TU-209: Responsável pode alterar modo', () => {
      const result = automationService.canToggleMode(responsavel, 'Automatico');
      expect(result.canToggle).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-210: Técnico NÃO pode alterar modo', () => {
      const result = automationService.canToggleMode(tecnico, 'Automatico');
      expect(result.canToggle).toBe(false);
      expect(result.reason).toContain('Apenas Responsável Técnico ou Administrador');
    });

    test('TU-211: Deve rejeitar modo inválido', () => {
      const result = automationService.canToggleMode(responsavel, 'MODO_INVALIDO');
      expect(result.canToggle).toBe(false);
      expect(result.reason).toContain('Modo deve ser Manual ou Automatico');
    });

    test('TU-212: Deve rejeitar se utilizador não especificado', () => {
      const result = automationService.canToggleMode(null, 'Automatico');
      expect(result.canToggle).toBe(false);
      expect(result.reason).toContain('Utilizador não especificado');
    });
  });

  // ============================================================
  // TU-213 a TU-214: getActionType (PE)
  // ============================================================
  
  describe('getActionType - PE', () => {
    test('TU-213: Modo Automático retorna "executar"', () => {
      const actionType = automationService.getActionType('Automatico');
      expect(actionType).toBe('executar');
    });

    test('TU-214: Modo Manual retorna "sugerir"', () => {
      const actionType = automationService.getActionType('Manual');
      expect(actionType).toBe('sugerir');
    });
  });

});
