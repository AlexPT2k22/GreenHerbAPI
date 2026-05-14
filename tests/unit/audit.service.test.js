/**
 * Audit Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência)
 */

const auditService = require('../../services/auditService');

describe('auditService - Sprint 3', () => {
  
  // ============================================================
  // TU-233 a TU-235: logOperation (PE)
  // ============================================================
  
  describe('logOperation - PE', () => {
    test('TU-233: Deve criar log de operação válido', () => {
      const user = { id: 1, username: 'admin1', perfil: 'Administrador' };
      const log = auditService.logOperation(user, 'CREATE', 'plans', { planId: 'plan123' });
      
      expect(log).not.toBeNull();
      expect(log.userId).toBe(1);
      expect(log.username).toBe('admin1');
      expect(log.action).toBe('CREATE');
      expect(log.resource).toBe('plans');
      expect(log.details.planId).toBe('plan123');
      expect(log.timestamp).toBeDefined();
    });

    test('TU-234: Deve retornar null se user não especificado', () => {
      const log = auditService.logOperation(null, 'CREATE', 'plans');
      expect(log).toBeNull();
    });

    test('TU-235: Deve retornar null se action não especificada', () => {
      const user = { id: 1, username: 'admin1' };
      const log = auditService.logOperation(user, null, 'plans');
      expect(log).toBeNull();
    });
  });

  // ============================================================
  // TU-236 a TU-240: shouldAudit - RN-55 (PE)
  // ============================================================
  
  describe('shouldAudit - RN-55 (PE)', () => {
    test('TU-236: Deve auditar POST /api/plans', () => {
      const should = auditService.shouldAudit('POST /api/plans');
      expect(should).toBe(true);
    });

    test('TU-237: Deve auditar DELETE /api/batches', () => {
      const should = auditService.shouldAudit('DELETE /api/batches/123');
      expect(should).toBe(true);
    });

    test('TU-238: Deve auditar operações de users', () => {
      const should = auditService.shouldAudit('POST /api/users');
      expect(should).toBe(true);
    });

    test('TU-239: NÃO deve auditar GET simples', () => {
      const should = auditService.shouldAudit('GET /api/herbs');
      expect(should).toBe(false);
    });

    test('TU-240: Deve retornar false para endpoint vazio', () => {
      const should = auditService.shouldAudit('');
      expect(should).toBe(false);
    });
  });

  // ============================================================
  // TU-241 a TU-242: filterByDateRange (PE)
  // ============================================================
  
  describe('filterByDateRange - PE', () => {
    const logs = [
      { id: 1, timestamp: '2026-05-01T10:00:00Z', action: 'CREATE' },
      { id: 2, timestamp: '2026-05-15T10:00:00Z', action: 'UPDATE' },
      { id: 3, timestamp: '2026-05-31T10:00:00Z', action: 'DELETE' }
    ];

    test('TU-241: Deve filtrar logs por range de datas', () => {
      const filtered = auditService.filterByDateRange(
        logs,
        '2026-05-10T00:00:00Z',
        '2026-05-20T23:59:59Z'
      );
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(2);
    });

    test('TU-242: Deve retornar todos logs se datas não especificadas', () => {
      const filtered = auditService.filterByDateRange(logs, null, null);
      expect(filtered).toHaveLength(3);
    });
  });

  // ============================================================
  // TU-243 a TU-244: filterByAction (PE)
  // ============================================================
  
  describe('filterByAction - PE', () => {
    const logs = [
      { id: 1, action: 'CREATE' },
      { id: 2, action: 'UPDATE' },
      { id: 3, action: 'DELETE' },
      { id: 4, action: 'CREATE' }
    ];

    test('TU-243: Deve filtrar logs por ação', () => {
      const filtered = auditService.filterByAction(logs, 'CREATE');
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toBe(1);
      expect(filtered[1].id).toBe(4);
    });

    test('TU-244: Deve retornar array vazio se ação não especificada', () => {
      const filtered = auditService.filterByAction(logs, null);
      expect(filtered).toHaveLength(0);
    });
  });

  // ============================================================
  // TU-245: filterByUser (PE)
  // ============================================================
  
  describe('filterByUser - PE', () => {
    test('TU-245: Deve filtrar logs por userId', () => {
      const logs = [
        { id: 1, userId: 1, action: 'CREATE' },
        { id: 2, userId: 2, action: 'UPDATE' },
        { id: 3, userId: 1, action: 'DELETE' }
      ];
      const filtered = auditService.filterByUser(logs, 1);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].userId).toBe(1);
      expect(filtered[1].userId).toBe(1);
    });
  });

});
