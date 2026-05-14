/**
 * Reports Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), VL (Valores Limite)
 */

const reportsService = require('../../services/reportsService');

describe('reportsService - Sprint 3', () => {
  
  // ============================================================
  // TU-215 a TU-220: validateReportParams (PE + VL)
  // ============================================================
  
  describe('validateReportParams - PE + VL', () => {
    test('TU-215: Deve aceitar parâmetros válidos', () => {
      const params = {
        formato: 'CSV',
        periodo: 'mensal'
      };
      const result = reportsService.validateReportParams(params);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-216: Deve rejeitar params sem formato', () => {
      const params = { periodo: 'diario' };
      const result = reportsService.validateReportParams(params);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('formato é obrigatório');
    });

    test('TU-217: Deve rejeitar formato inválido (PE)', () => {
      const params = {
        formato: 'PDF',
        periodo: 'mensal'
      };
      const result = reportsService.validateReportParams(params);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('formato deve ser CSV, Excel ou JSON');
    });

    test('TU-218: Deve exigir dataInicio para período personalizado', () => {
      const params = {
        formato: 'CSV',
        periodo: 'personalizado',
        dataFim: '2026-05-31'
      };
      const result = reportsService.validateReportParams(params);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('dataInicio é obrigatória para período personalizado');
    });

    test('TU-219: Deve rejeitar dataInicio > dataFim (VL)', () => {
      const params = {
        formato: 'CSV',
        periodo: 'personalizado',
        dataInicio: '2026-05-31',
        dataFim: '2026-05-01'
      };
      const result = reportsService.validateReportParams(params);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('dataInicio não pode ser posterior a dataFim');
    });

    test('TU-220: Deve aceitar período personalizado válido (VL)', () => {
      const params = {
        formato: 'Excel',
        periodo: 'personalizado',
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31'
      };
      const result = reportsService.validateReportParams(params);
      expect(result.valid).toBe(true);
    });
  });

  // ============================================================
  // TU-221 a TU-224: calculateAggregates (PE)
  // ============================================================
  
  describe('calculateAggregates - PE', () => {
    test('TU-221: Deve calcular agregados corretamente', () => {
      const data = [
        { temperatura: 20 },
        { temperatura: 25 },
        { temperatura: 30 }
      ];
      const result = reportsService.calculateAggregates(data, 'temperatura');
      expect(result.media).toBe(25.0);
      expect(result.maximo).toBe(30);
      expect(result.minimo).toBe(20);
      expect(result.total).toBe(75);
      expect(result.count).toBe(3);
    });

    test('TU-222: Deve ignorar valores null/undefined', () => {
      const data = [
        { temperatura: 20 },
        { temperatura: null },
        { temperatura: 30 }
      ];
      const result = reportsService.calculateAggregates(data, 'temperatura');
      expect(result.media).toBe(25.0);
      expect(result.count).toBe(2);
    });

    test('TU-223: Deve retornar null para array vazio', () => {
      const result = reportsService.calculateAggregates([], 'temperatura');
      expect(result.media).toBeNull();
      expect(result.count).toBe(0);
    });

    test('TU-224: Deve retornar null se nenhum valor válido', () => {
      const data = [
        { temperatura: null },
        { temperatura: undefined }
      ];
      const result = reportsService.calculateAggregates(data, 'temperatura');
      expect(result.media).toBeNull();
      expect(result.count).toBe(0);
    });
  });

  // ============================================================
  // TU-225 a TU-227: formatToCSV (PE)
  // ============================================================
  
  describe('formatToCSV - PE', () => {
    test('TU-225: Deve formatar dados simples para CSV', () => {
      const data = [
        { id: 1, nome: 'Manjericão' },
        { id: 2, nome: 'Alecrim' }
      ];
      const csv = reportsService.formatToCSV(data);
      expect(csv).toContain('id,nome');
      expect(csv).toContain('1,Manjericão');
      expect(csv).toContain('2,Alecrim');
    });

    test('TU-226: Deve escapar vírgulas nos valores', () => {
      const data = [
        { id: 1, descricao: 'Manjericão, fresco' }
      ];
      const csv = reportsService.formatToCSV(data);
      expect(csv).toContain('"Manjericão, fresco"');
    });

    test('TU-227: Deve retornar string vazia para array vazio', () => {
      const csv = reportsService.formatToCSV([]);
      expect(csv).toBe('');
    });
  });

  // ============================================================
  // TU-228 a TU-229: formatToExcel (PE)
  // ============================================================
  
  describe('formatToExcel - PE', () => {
    test('TU-228: Deve formatar dados para Excel', () => {
      const data = [
        { id: 1, nome: 'Manjericão' },
        { id: 2, nome: 'Alecrim' }
      ];
      const excel = reportsService.formatToExcel(data);
      expect(excel.headers).toEqual(['id', 'nome']);
      expect(excel.rows).toHaveLength(2);
      expect(excel.rows[0]).toEqual([1, 'Manjericão']);
    });

    test('TU-229: Deve retornar estrutura vazia para array vazio', () => {
      const excel = reportsService.formatToExcel([]);
      expect(excel.headers).toEqual([]);
      expect(excel.rows).toEqual([]);
    });
  });

  // ============================================================
  // TU-230 a TU-232: filterByDateRange (VL)
  // ============================================================
  
  describe('filterByDateRange - VL', () => {
    const data = [
      { id: 1, timestamp: '2026-05-01T10:00:00Z' },
      { id: 2, timestamp: '2026-05-15T10:00:00Z' },
      { id: 3, timestamp: '2026-05-31T10:00:00Z' }
    ];

    test('TU-230: Deve filtrar dados dentro do range', () => {
      const filtered = reportsService.filterByDateRange(
        data,
        '2026-05-10T00:00:00Z',
        '2026-05-20T23:59:59Z'
      );
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(2);
    });

    test('TU-231: Deve incluir limites do range (VL)', () => {
      const filtered = reportsService.filterByDateRange(
        data,
        '2026-05-01T10:00:00Z',
        '2026-05-15T10:00:00Z'
      );
      expect(filtered).toHaveLength(2);
    });

    test('TU-232: Deve retornar todos se datas não especificadas', () => {
      const filtered = reportsService.filterByDateRange(data, null, null);
      expect(filtered).toHaveLength(3);
    });
  });

});
