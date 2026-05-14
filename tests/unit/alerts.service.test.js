/**
 * Alerts Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), VL (Valores Limite), MC/DC
 */

const alertsService = require('../../services/alertsService');

describe('alertsService - Sprint 3', () => {
  
  // ============================================================
  // TU-143 a TU-148: validateAlertData (PE)
  // ============================================================
  
  describe('validateAlertData - PE', () => {
    test('TU-143: Deve aceitar alerta válido completo', () => {
      const alert = {
        batchId: 'batch123',
        tipo: 'Crítico',
        mensagem: 'Temperatura excedeu limite crítico',
        estado: 'ativo',
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = alertsService.validateAlertData(alert);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-144: Deve rejeitar alerta nulo', () => {
      const result = alertsService.validateAlertData(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Alerta não pode ser nulo');
    });

    test('TU-145: Deve rejeitar alerta sem batchId', () => {
      const alert = {
        tipo: 'Aviso',
        mensagem: 'Temperatura alta'
      };
      const result = alertsService.validateAlertData(alert);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('batchId é obrigatório');
    });

    test('TU-146: Deve rejeitar tipo inválido (PE)', () => {
      const alert = {
        batchId: 'batch123',
        tipo: 'SUPER_CRITICO',
        mensagem: 'Problema'
      };
      const result = alertsService.validateAlertData(alert);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('tipo deve ser Informativo, Aviso ou Crítico');
    });

    test('TU-147: Deve rejeitar mensagem vazia', () => {
      const alert = {
        batchId: 'batch123',
        tipo: 'Aviso',
        mensagem: '   '
      };
      const result = alertsService.validateAlertData(alert);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('mensagem é obrigatória');
    });

    test('TU-148: Deve rejeitar estado inválido (PE)', () => {
      const alert = {
        batchId: 'batch123',
        tipo: 'Aviso',
        mensagem: 'Teste',
        estado: 'PENDENTE'
      };
      const result = alertsService.validateAlertData(alert);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('estado deve ser ativo, resolvido ou ignorado');
    });
  });

  // ============================================================
  // TU-149 a TU-152: canResolve (PE)
  // ============================================================
  
  describe('canResolve - PE', () => {
    const alertAtivo = {
      batchId: 'batch123',
      tipo: 'Aviso',
      mensagem: 'Teste',
      estado: 'ativo'
    };

    test('TU-149: Técnico pode resolver alerta ativo', () => {
      const user = { id: 1, username: 'tecnico1', perfil: 'Técnico' };
      const result = alertsService.canResolve(alertAtivo, user);
      expect(result.canResolve).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-150: Responsável Técnico pode resolver alerta ativo', () => {
      const user = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
      const result = alertsService.canResolve(alertAtivo, user);
      expect(result.canResolve).toBe(true);
    });

    test('TU-151: Não pode resolver alerta já resolvido', () => {
      const alertResolvido = { ...alertAtivo, estado: 'resolvido' };
      const user = { id: 1, username: 'tecnico1', perfil: 'Técnico' };
      const result = alertsService.canResolve(alertResolvido, user);
      expect(result.canResolve).toBe(false);
      expect(result.reason).toContain('Apenas alertas ativos');
    });

    test('TU-152: Perfil inválido não pode resolver', () => {
      const user = { id: 3, username: 'guest', perfil: 'Convidado' };
      const result = alertsService.canResolve(alertAtivo, user);
      expect(result.canResolve).toBe(false);
      expect(result.reason).toContain('Perfil não autorizado');
    });
  });

  // ============================================================
  // TU-153 a TU-160: canIgnore - RN-05 (VL + MC/DC)
  // ============================================================
  
  describe('canIgnore - RN-05 (VL + MC/DC)', () => {
    const alertCritico = {
      batchId: 'batch123',
      tipo: 'Crítico',
      mensagem: 'Temperatura crítica',
      estado: 'ativo'
    };

    const alertAviso = {
      batchId: 'batch123',
      tipo: 'Aviso',
      mensagem: 'Temperatura alta',
      estado: 'ativo'
    };

    const responsavel = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
    const tecnico = { id: 1, username: 'tecnico1', perfil: 'Técnico' };

    test('TU-153: Responsável pode ignorar Aviso sem justificação (PE)', () => {
      const result = alertsService.canIgnore(alertAviso, responsavel, '');
      expect(result.canIgnore).toBe(true);
    });

    test('TU-154: Técnico NÃO pode ignorar alertas (MC/DC)', () => {
      const result = alertsService.canIgnore(alertAviso, tecnico, 'Justificação válida');
      expect(result.canIgnore).toBe(false);
      expect(result.reason).toContain('Apenas Responsável Técnico ou Administrador');
    });

    test('TU-155: Crítico com justificação < 10 chars rejeitado (VL + MC/DC)', () => {
      const result = alertsService.canIgnore(alertCritico, responsavel, 'Curta');
      expect(result.canIgnore).toBe(false);
      expect(result.reason).toContain('pelo menos 10 caracteres');
    });

    test('TU-156: Crítico com justificação = 10 chars aceito (VL)', () => {
      const justificacao = '0123456789'; // exatamente 10
      const result = alertsService.canIgnore(alertCritico, responsavel, justificacao);
      expect(result.canIgnore).toBe(true);
    });

    test('TU-157: Crítico com justificação = 500 chars aceito (VL)', () => {
      const justificacao = 'A'.repeat(500);
      const result = alertsService.canIgnore(alertCritico, responsavel, justificacao);
      expect(result.canIgnore).toBe(true);
    });

    test('TU-158: Crítico com justificação > 500 chars rejeitado (VL)', () => {
      const justificacao = 'A'.repeat(501);
      const result = alertsService.canIgnore(alertCritico, responsavel, justificacao);
      expect(result.canIgnore).toBe(false);
      expect(result.reason).toContain('não pode exceder 500 caracteres');
    });

    test('TU-159: Crítico com justificação válida aceito (MC/DC)', () => {
      const justificacao = 'Temperatura corrigida manualmente pelo sistema de refrigeração.';
      const result = alertsService.canIgnore(alertCritico, responsavel, justificacao);
      expect(result.canIgnore).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-160: Não pode ignorar alerta não ativo (MC/DC)', () => {
      const alertResolvido = { ...alertCritico, estado: 'resolvido' };
      const result = alertsService.canIgnore(alertResolvido, responsavel, 'Justificação válida');
      expect(result.canIgnore).toBe(false);
      expect(result.reason).toContain('Apenas alertas ativos');
    });
  });

  // ============================================================
  // TU-161 a TU-164: validateJustificationLength (VL)
  // ============================================================
  
  describe('validateJustificationLength - VL', () => {
    test('TU-161: Deve aceitar justificação válida [10, 500]', () => {
      const text = 'Justificação válida com mais de 10 caracteres.';
      const result = alertsService.validateJustificationLength(text);
      expect(result.valid).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-162: Deve rejeitar justificação < 10 chars (VL)', () => {
      const result = alertsService.validateJustificationLength('Curta');
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('pelo menos 10 caracteres');
    });

    test('TU-163: Deve aceitar justificação = 10 chars (VL)', () => {
      const result = alertsService.validateJustificationLength('0123456789');
      expect(result.valid).toBe(true);
    });

    test('TU-164: Deve rejeitar justificação > 500 chars (VL)', () => {
      const text = 'A'.repeat(501);
      const result = alertsService.validateJustificationLength(text);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('não pode exceder 500 caracteres');
    });
  });

  // ============================================================
  // TU-165 a TU-167: escalateSeverity (PE)
  // ============================================================
  
  describe('escalateSeverity - PE', () => {
    test('TU-165: Deve escalar Informativo para Aviso', () => {
      const alert = { tipo: 'Informativo' };
      const newSeverity = alertsService.escalateSeverity(alert);
      expect(newSeverity).toBe('Aviso');
    });

    test('TU-166: Deve escalar Aviso para Crítico', () => {
      const alert = { tipo: 'Aviso' };
      const newSeverity = alertsService.escalateSeverity(alert);
      expect(newSeverity).toBe('Crítico');
    });

    test('TU-167: Crítico mantém-se Crítico', () => {
      const alert = { tipo: 'Crítico' };
      const newSeverity = alertsService.escalateSeverity(alert);
      expect(newSeverity).toBe('Crítico');
    });
  });

  // ============================================================
  // TU-168 a TU-171: calculateAlertPriority (PE)
  // ============================================================
  
  describe('calculateAlertPriority - PE', () => {
    test('TU-168: Crítico recente tem prioridade 10', () => {
      const alert = {
        tipo: 'Crítico',
        timestamp: new Date().toISOString()
      };
      const priority = alertsService.calculateAlertPriority(alert);
      expect(priority).toBe(10);
    });

    test('TU-169: Aviso recente tem prioridade 5', () => {
      const alert = {
        tipo: 'Aviso',
        timestamp: new Date().toISOString()
      };
      const priority = alertsService.calculateAlertPriority(alert);
      expect(priority).toBe(5);
    });

    test('TU-170: Informativo recente tem prioridade 2', () => {
      const alert = {
        tipo: 'Informativo',
        timestamp: new Date().toISOString()
      };
      const priority = alertsService.calculateAlertPriority(alert);
      expect(priority).toBe(2);
    });

    test('TU-171: Aviso antigo (>24h) aumenta prioridade', () => {
      const ontem = new Date(Date.now() - 30 * 60 * 60 * 1000); // 30 horas atrás
      const alert = {
        tipo: 'Aviso',
        timestamp: ontem.toISOString()
      };
      const priority = alertsService.calculateAlertPriority(alert);
      expect(priority).toBe(7); // 5 + 2
    });
  });

});
