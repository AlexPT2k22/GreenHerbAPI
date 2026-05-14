/**
 * Batches Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), VL (Valores Limite), MC/DC
 */

const batchesService = require('../../services/batchesService');

describe('batchesService - Sprint 3', () => {
  
  // ============================================================
  // TU-85 a TU-90: validateBatchData (PE - Particionamento)
  // ============================================================
  
  describe('validateBatchData - PE', () => {
    test('TU-85: Deve aceitar lote válido completo', () => {
      const batch = {
        planId: 'plan123',
        quantidadeInicial: 100,
        quantidadeAtual: 90,
        dataInicio: '2026-05-01',
        estado: 'ativo'
      };
      const result = batchesService.validateBatchData(batch);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-86: Deve rejeitar lote nulo', () => {
      const result = batchesService.validateBatchData(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Lote não pode ser nulo');
    });

    test('TU-87: Deve rejeitar lote sem planId', () => {
      const batch = {
        quantidadeInicial: 100,
        dataInicio: '2026-05-01'
      };
      const result = batchesService.validateBatchData(batch);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('planId é obrigatório');
    });

    test('TU-88: Deve rejeitar quantidadeInicial zero', () => {
      const batch = {
        planId: 'plan123',
        quantidadeInicial: 0,
        dataInicio: '2026-05-01'
      };
      const result = batchesService.validateBatchData(batch);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('quantidadeInicial deve ser maior que 0');
    });

    test('TU-89: Deve rejeitar estado inválido', () => {
      const batch = {
        planId: 'plan123',
        quantidadeInicial: 100,
        dataInicio: '2026-05-01',
        estado: 'INVALIDO'
      };
      const result = batchesService.validateBatchData(batch);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Estado inválido');
    });

    test('TU-90: Deve rejeitar quantidadeAtual > quantidadeInicial', () => {
      const batch = {
        planId: 'plan123',
        quantidadeInicial: 100,
        quantidadeAtual: 150,
        dataInicio: '2026-05-01'
      };
      const result = batchesService.validateBatchData(batch);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('quantidadeAtual não pode exceder quantidadeInicial');
    });
  });

  // ============================================================
  // TU-91 a TU-97: canDivideBatch - RN-37 (PE + VL + MC/DC)
  // ============================================================
  
  describe('canDivideBatch - RN-37 (PE + VL + MC/DC)', () => {
    const batchAtivo = {
      planId: 'plan123',
      quantidadeInicial: 100,
      quantidadeAtual: 100,
      dataInicio: '2026-05-01',
      estado: 'ativo'
    };

    test('TU-91: Deve permitir divisão válida (PE)', () => {
      const result = batchesService.canDivideBatch(batchAtivo, 40);
      expect(result.canDivide).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-92: Deve rejeitar divisão com quantidade zero (VL)', () => {
      const result = batchesService.canDivideBatch(batchAtivo, 0);
      expect(result.canDivide).toBe(false);
      expect(result.reason).toContain('Quantidade deve ser maior que 0');
    });

    test('TU-93: Deve rejeitar divisão com quantidade negativa (VL)', () => {
      const result = batchesService.canDivideBatch(batchAtivo, -10);
      expect(result.canDivide).toBe(false);
      expect(result.reason).toContain('Quantidade deve ser maior que 0');
    });

    test('TU-94: Deve rejeitar divisão >= quantidade atual (VL)', () => {
      const result = batchesService.canDivideBatch(batchAtivo, 100);
      expect(result.canDivide).toBe(false);
      expect(result.reason).toContain('deve ser menor que quantidade atual');
    });

    test('TU-95: Deve aceitar divisão no limite inferior válido (VL)', () => {
      const result = batchesService.canDivideBatch(batchAtivo, 1);
      expect(result.canDivide).toBe(true);
    });

    test('TU-96: Deve aceitar divisão no limite superior válido (VL)', () => {
      const result = batchesService.canDivideBatch(batchAtivo, 99);
      expect(result.canDivide).toBe(true);
    });

    test('TU-97: Deve rejeitar divisão de lote não ativo (MC/DC)', () => {
      const batchConcluido = { ...batchAtivo, estado: 'concluido' };
      const result = batchesService.canDivideBatch(batchConcluido, 40);
      expect(result.canDivide).toBe(false);
      expect(result.reason).toContain('Apenas lotes ativos podem ser divididos');
    });
  });

  // ============================================================
  // TU-98 a TU-100: calculateRealDuration (PE)
  // ============================================================
  
  describe('calculateRealDuration', () => {
    test('TU-98: Deve calcular duração de lote concluído', () => {
      const batch = {
        dataInicio: '2026-05-01',
        dataFim: '2026-05-15'
      };
      const duration = batchesService.calculateRealDuration(batch);
      expect(duration).toBe(14);
    });

    test('TU-99: Deve retornar null para lote sem dataInicio', () => {
      const batch = { dataFim: '2026-05-15' };
      const duration = batchesService.calculateRealDuration(batch);
      expect(duration).toBeNull();
    });

    test('TU-100: Deve calcular duração até hoje se sem dataFim', () => {
      const batch = {
        dataInicio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias atrás
      };
      const duration = batchesService.calculateRealDuration(batch);
      expect(duration).toBeGreaterThanOrEqual(6);
      expect(duration).toBeLessThanOrEqual(8);
    });
  });

  // ============================================================
  // TU-101 a TU-105: canCloseAsConcluido - RN-39 (MC/DC)
  // ============================================================
  
  describe('canCloseAsConcluido - RN-39 (MC/DC)', () => {
    const batchAtivo = {
      planId: 'plan123',
      quantidadeInicial: 100,
      dataInicio: '2026-05-01',
      dataFim: '2026-05-14',
      estado: 'ativo'
    };

    test('TU-101: Deve permitir conclusão sem alertas críticos (MC/DC - todos TRUE)', () => {
      const alerts = [
        { tipo: 'Informativo', estado: 'ativo' },
        { tipo: 'Aviso', estado: 'resolvido' }
      ];
      const result = batchesService.canCloseAsConcluido(batchAtivo, alerts);
      expect(result.canClose).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-102: Deve rejeitar conclusão com alertas críticos ativos (MC/DC)', () => {
      const alerts = [
        { tipo: 'Crítico', estado: 'ativo' }
      ];
      const result = batchesService.canCloseAsConcluido(batchAtivo, alerts);
      expect(result.canClose).toBe(false);
      expect(result.reason).toContain('alertas críticos não resolvidos');
    });

    test('TU-103: Deve permitir conclusão com alertas críticos resolvidos (MC/DC)', () => {
      const alerts = [
        { tipo: 'Crítico', estado: 'resolvido' }
      ];
      const result = batchesService.canCloseAsConcluido(batchAtivo, alerts);
      expect(result.canClose).toBe(true);
    });

    test('TU-104: Deve rejeitar conclusão sem dataFim (MC/DC)', () => {
      const batchSemFim = { ...batchAtivo };
      delete batchSemFim.dataFim;
      const result = batchesService.canCloseAsConcluido(batchSemFim, []);
      expect(result.canClose).toBe(false);
      expect(result.reason).toContain('dataFim é obrigatória');
    });

    test('TU-105: Deve rejeitar conclusão de lote não ativo (MC/DC)', () => {
      const batchConcluido = { ...batchAtivo, estado: 'concluido' };
      const result = batchesService.canCloseAsConcluido(batchConcluido, []);
      expect(result.canClose).toBe(false);
      expect(result.reason).toContain('Apenas lotes ativos');
    });
  });

  // ============================================================
  // TU-106 a TU-110: canCloseAsComprometido - RN-40 (VL + MC/DC)
  // ============================================================
  
  describe('canCloseAsComprometido - RN-40 (VL)', () => {
    const batchAtivo = {
      planId: 'plan123',
      quantidadeInicial: 100,
      dataInicio: '2026-05-01',
      estado: 'ativo'
    };

    test('TU-106: Deve permitir comprometimento com justificação válida (PE)', () => {
      const justificacao = 'Praga de insetos comprometeu 80% da produção após 3 semanas.';
      const result = batchesService.canCloseAsComprometido(batchAtivo, justificacao);
      expect(result.canClose).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-107: Deve rejeitar justificação < 10 caracteres (VL)', () => {
      const result = batchesService.canCloseAsComprometido(batchAtivo, 'Curta');
      expect(result.canClose).toBe(false);
      expect(result.reason).toContain('pelo menos 10 caracteres');
    });

    test('TU-108: Deve aceitar justificação = 10 caracteres (VL)', () => {
      const justificacao = '0123456789'; // exatamente 10
      const result = batchesService.canCloseAsComprometido(batchAtivo, justificacao);
      expect(result.canClose).toBe(true);
    });

    test('TU-109: Deve aceitar justificação = 500 caracteres (VL)', () => {
      const justificacao = 'A'.repeat(500);
      const result = batchesService.canCloseAsComprometido(batchAtivo, justificacao);
      expect(result.canClose).toBe(true);
    });

    test('TU-110: Deve rejeitar justificação > 500 caracteres (VL)', () => {
      const justificacao = 'A'.repeat(501);
      const result = batchesService.canCloseAsComprometido(batchAtivo, justificacao);
      expect(result.canClose).toBe(false);
      expect(result.reason).toContain('não pode exceder 500 caracteres');
    });
  });

  // ============================================================
  // TU-111 a TU-113: calculateProductivity (PE)
  // ============================================================
  
  describe('calculateProductivity', () => {
    test('TU-111: Deve calcular produtividade de lote concluído', () => {
      const batch = {
        quantidadeInicial: 100,
        quantidadeAtual: 90,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-11', // 10 dias
        estado: 'concluido'
      };
      const productivity = batchesService.calculateProductivity(batch);
      expect(productivity).toBe(9.0); // 90/10
    });

    test('TU-112: Deve retornar null para lote não concluído', () => {
      const batch = {
        quantidadeInicial: 100,
        dataInicio: '2026-05-01',
        estado: 'ativo'
      };
      const productivity = batchesService.calculateProductivity(batch);
      expect(productivity).toBeNull();
    });

    test('TU-113: Deve retornar null para duração zero', () => {
      const hoje = new Date().toISOString().split('T')[0];
      const batch = {
        quantidadeInicial: 100,
        dataInicio: hoje,
        dataFim: hoje,
        estado: 'concluido'
      };
      const productivity = batchesService.calculateProductivity(batch);
      expect(productivity).toBeNull();
    });
  });

});
