const path = require('path');
const fs = require('fs');
const herbsService = require('../../services/herbsService');
const plansService = require('../../services/plansService');

const fixturesPath = path.join(__dirname, '../fixtures');

function importCSV(filename) {
  const csvPath = path.join(fixturesPath, filename);
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  return herbsService.importFromCSV(csvContent);
}

describe('Testes de Integração - Herbs e Plans', () => {

  let ervasValidas;

  beforeAll(() => {
    ervasValidas = importCSV('valido.csv');
  });

  // =====================================================
  // TI-01: Planos usam os limites reais importados do CSV
  // =====================================================

  describe('TI-01: Criar planos com ervas importadas do CSV', () => {

    it('TI-01-01: Plano com limites reais da erva — válido', () => {
      const erva = ervasValidas.data[0];
      const planData = {
        tipo: 'regular',
        nome: `Plano ${erva.nome}`,
        duracao: 90,
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax),
        herbId: erva.id
      };

      expect(plansService.validatePlanData(planData).valid).toBe(true);
    });

    it('TI-01-02: Plano para cada erva do valido.csv — todas válidas', () => {
      ervasValidas.data.forEach((erva) => {
        const planData = {
          tipo: 'regular',
          nome: `Plano ${erva.nome}`,
          duracao: 90,
          tempMin: parseFloat(erva.tempMin),
          tempMax: parseFloat(erva.tempMax),
          umidadeMin: parseFloat(erva.umidadeMin),
          umidadeMax: parseFloat(erva.umidadeMax),
          luminosidadeMin: parseFloat(erva.luminosidadeMin),
          luminosidadeMax: parseFloat(erva.luminosidadeMax)
        };

        expect(plansService.validatePlanData(planData).valid).toBe(true);
      });
    });

    it('TI-01-03: Criar planos só para válidas do misto.csv — inválidas ignoradas', () => {
      const result = importCSV('misto.csv');
      expect(result.valid).toBe(3);
      expect(result.invalid).toBe(2);

      result.data.forEach((erva) => {
        const planData = {
          tipo: 'regular',
          nome: `Plano ${erva.nome}`,
          duracao: 90,
          tempMin: parseFloat(erva.tempMin),
          tempMax: parseFloat(erva.tempMax),
          umidadeMin: parseFloat(erva.umidadeMin),
          umidadeMax: parseFloat(erva.umidadeMax),
          luminosidadeMin: parseFloat(erva.luminosidadeMin),
          luminosidadeMax: parseFloat(erva.luminosidadeMax)
        };

        expect(plansService.validatePlanData(planData).valid).toBe(true);
      });
    });
  });

  // =====================================================
  // TI-02: Dados inválidos no CSV são detetados na importação
  // =====================================================

  describe('TI-02: Ervas inválidas no CSV são detetadas na importação', () => {

    it('TI-02-01: invalido.csv — todos os 6 tipos de erro detetados', () => {
      const result = importCSV('invalido.csv');
      expect(result.valid).toBe(0);
      expect(result.invalid).toBe(6);
      expect(result.data).toHaveLength(0);

      const erros = result.errors.join(' ');

      expect(erros).toMatch(/Temperatura mínima/);
      expect(erros).toMatch(/Temperatura mínima deve ser menor/);
      expect(erros).toMatch(/Umidade mínima/);
      expect(erros).toMatch(/Luminosidade mínima/);
      expect(erros).toMatch(/Nome é obrigatório/);
      expect(erros).toMatch(/Espécie é obrigatória/);
    });

    it('TI-02-02: misto.csv — válidas e inválidas segregadas', () => {
      const result = importCSV('misto.csv');
      expect(result.valid).toBe(3);
      expect(result.invalid).toBe(2);

      expect(result.data.map(h => h.nome)).toEqual(['Hortelã', 'Manjericão', 'Camomila']);
      expect(result.errors.some(e => e.includes('Temperatura mínima'))).toBe(true);
      expect(result.errors.some(e => e.includes('Nome'))).toBe(true);
    });

    it('TI-02-03: vazio.csv — rejeitado', () => {
      const result = importCSV('vazio.csv');
      expect(result.valid).toBe(0);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('TI-02-04: CSV sem header é tratado como dados', () => {
      const csv = 'Hortelã,Mentha piperita,15,28,40,70,3000,8000\nManjericão,,18,30,45,75,4000,9000';
      const result = herbsService.importFromCSV(csv);
      expect(result.total).toBe(2);
      expect(result.valid).toBe(1);
      expect(result.invalid).toBe(1);
    });

    it('TI-02-05: CSV null é rejeitado', () => {
      const result = herbsService.importFromCSV(null);
      expect(result.valid).toBe(0);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('TI-02-06: CSV com poucas colunas é rejeitado', () => {
      const csv = 'nome,especie\ner va1,sp1';
      const result = herbsService.importFromCSV(csv);
      expect(result.invalid).toBeGreaterThan(0);
      expect(result.errors[0]).toMatch(/Formato inválido|colunas/i);
    });
  });

  // =====================================================
  // TI-03: Classificar alertas com os limites reais do CSV
  // =====================================================

  describe('TI-03: Alertas com limites reais da erva importada', () => {

    it('TI-03-01: Medição dentro dos limites reais → Informativo', () => {
      const erva = ervasValidas.data[0];
      const limites = {
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax)
      };

      const medicao = {
        temperatura: 20,
        humidade: 65,
        luminosidade: 12000
      };

      const alerta = plansService.classifyAlert(medicao, limites, true);
      expect(alerta).toBe('Informativo');
    });

    it('TI-03-02: Medição fora dos limites reais → Aviso', () => {
      const erva = ervasValidas.data[0];
      const limites = {
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax)
      };

      const medicao = {
        temperatura: 30,
        humidade: 55,
        luminosidade: 10000
      };

      const alerta = plansService.classifyAlert(medicao, limites, true);
      expect(alerta).toBe('Aviso');
    });

    it('TI-03-03: Todas fora dos limites reais → Crítico', () => {
      const erva = ervasValidas.data[0];
      const limites = {
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax)
      };

      const medicao = {
        temperatura: 35,
        humidade: 20,
        luminosidade: 50000
      };

      const alerta = plansService.classifyAlert(medicao, limites, true);
      expect(alerta).toBe('Crítico');
    });

    it('TI-03-04: Sensor não OK → null', () => {
      const erva = ervasValidas.data[0];
      const limites = {
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax)
      };

      const alerta = plansService.classifyAlert({ temperatura: 30, humidade: 20, luminosidade: 1000 }, limites, false);
      expect(alerta).toBeNull();
    });
  });

  // =====================================================
  // TI-04: Plano pontual com autorização
  // =====================================================

  describe('TI-04: Plano pontual com autorização', () => {

    it('TI-04-01: Plano pontual COM autorização é aceite', () => {
      const erva = ervasValidas.data[0];
      const planData = {
        tipo: 'pontual',
        nome: `Intervenção ${erva.nome}`,
        duracao: 7,
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax),
        autorizacaoResponsavel: true
      };

      expect(plansService.validatePlanData(planData).valid).toBe(true);
    });

    it('TI-04-02: Plano pontual SEM autorização é rejeitado', () => {
      const erva = ervasValidas.data[1];
      const planData = {
        tipo: 'pontual',
        nome: `Intervenção ${erva.nome}`,
        duracao: 7,
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax),
        autorizacaoResponsavel: false
      };

      const validation = plansService.validatePlanData(planData);
      expect(validation.valid).toBe(false);
      expect(validation.errors.some(e => e.includes('autorização'))).toBe(true);
    });
  });

  // =====================================================
  // TI-05: Transições de estado com dados do CSV
  // =====================================================

  describe('TI-05: Transições de estado e produtividade', () => {

    it('TI-05-01: ativo → concluído com perdas reais', () => {
      const erva = ervasValidas.data[0];
      const lote = {
        id: 'lote_001',
        estado: 'ativo',
        herbId: erva.id,
        quantidade: 100,
        perdas: 5,
        divisoes: 0,
        dataFim: new Date().toISOString()
      };

      const transicao = plansService.validateStateTransition(lote, 'concluído');
      expect(transicao.permitido).toBe(true);

      lote.estado = 'concluído';
      const prod = plansService.calculateProductivity(lote);
      expect(prod.produtividade).toBe(95);
    });

    it('TI-05-02: ativo → comprometido com perdas registadas', () => {
      const lote = {
        id: 'lote_002',
        estado: 'ativo',
        perdas: 20
      };

      const transicao = plansService.validateStateTransition(lote, 'comprometido');
      expect(transicao.permitido).toBe(true);
    });

    it('TI-05-03: ativo → comprometido sem perdas é rejeitado', () => {
      const lote = {
        id: 'lote_003',
        estado: 'ativo'
      };

      const transicao = plansService.validateStateTransition(lote, 'comprometido');
      expect(transicao.permitido).toBe(false);
    });

    it('TI-05-04: ativo → concluído sem dataFim é rejeitado', () => {
      const lote = {
        id: 'lote_004',
        estado: 'ativo',
        perdas: 0
      };

      const transicao = plansService.validateStateTransition(lote, 'concluído');
      expect(transicao.permitido).toBe(false);
    });

    it('TI-05-05: estado final não transita', () => {
      const lote = { estado: 'concluído' };
      const transicao = plansService.validateStateTransition(lote, 'ativo');
      expect(transicao.permitido).toBe(false);
    });
  });

  // =====================================================
  // TI-06: Fluxo E2E com dados reais importados
  // =====================================================

  describe('TI-06: Fluxo E2E com erva importada', () => {

    it('TI-06-01: CSV → Erva → Plano → Lote → Alerta → Produtividade', () => {
      const erva = ervasValidas.data[0];

      const planData = {
        tipo: 'regular',
        nome: `Plano ${erva.nome}`,
        duracao: 90,
        tempMin: parseFloat(erva.tempMin),
        tempMax: parseFloat(erva.tempMax),
        umidadeMin: parseFloat(erva.umidadeMin),
        umidadeMax: parseFloat(erva.umidadeMax),
        luminosidadeMin: parseFloat(erva.luminosidadeMin),
        luminosidadeMax: parseFloat(erva.luminosidadeMax),
        herbId: erva.id
      };

      expect(plansService.validatePlanData(planData).valid).toBe(true);

      const limites = {
        tempMin: planData.tempMin,
        tempMax: planData.tempMax,
        umidadeMin: planData.umidadeMin,
        umidadeMax: planData.umidadeMax,
        luminosidadeMin: planData.luminosidadeMin,
        luminosidadeMax: planData.luminosidadeMax
      };

      const medicoes = [
        { temperatura: 15, humidade: 55, luminosidade: 12000 },
        { temperatura: 30, humidade: 65, luminosidade: 15000 },
        { temperatura: 30, humidade: 20, luminosidade: 25000 }
      ];

      const alertas = medicoes.map(m => plansService.classifyAlert(m, limites, true));
      expect(alertas).toEqual(['Informativo', 'Aviso', 'Crítico']);

      const lote = {
        id: 'lote_e2e',
        estado: 'ativo',
        herbId: erva.id,
        quantidade: 150,
        perdas: 8,
        divisoes: 0,
        dataFim: new Date().toISOString()
      };

      expect(plansService.validateStateTransition(lote, 'concluído').permitido).toBe(true);

      lote.estado = 'concluído';
      const prod = plansService.calculateProductivity(lote);
      expect(prod.produtividade).toBeCloseTo(94.67, 1);
      expect(prod.produzido).toBe(142);
    });
  });

});
