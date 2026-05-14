/**
 * Measurements Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), VL (Valores Limite), MC/DC
 */

const measurementsService = require('../../services/measurementsService');

describe('measurementsService - Sprint 3', () => {
  
  // ============================================================
  // TU-114 a TU-122: validateMeasurementData (PE + VL)
  // ============================================================
  
  describe('validateMeasurementData - PE + VL', () => {
    test('TU-114: Deve aceitar medição válida completa', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: 22.5,
        humidade: 65,
        luminosidade: 5000,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-115: Deve rejeitar medição nula', () => {
      const result = measurementsService.validateMeasurementData(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Medição não pode ser nula');
    });

    test('TU-116: Deve rejeitar medição sem sensorId', () => {
      const measurement = {
        temperatura: 22.5,
        humidade: 65,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('sensorId é obrigatório');
    });

    test('TU-117: Deve rejeitar temperatura < -50°C (VL)', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: -51,
        humidade: 65,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('temperatura deve estar entre -50°C e 100°C');
    });

    test('TU-118: Deve aceitar temperatura = -50°C (VL)', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: -50,
        humidade: 65,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(true);
    });

    test('TU-119: Deve aceitar temperatura = 100°C (VL)', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: 100,
        humidade: 65,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(true);
    });

    test('TU-120: Deve rejeitar humidade < 0% (VL)', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: 22,
        humidade: -1,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('humidade deve estar entre 0% e 100%');
    });

    test('TU-121: Deve aceitar humidade = 0% (VL)', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: 22,
        humidade: 0,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(true);
    });

    test('TU-122: Deve rejeitar luminosidade > 100000 lux (VL)', () => {
      const measurement = {
        sensorId: 'sensor001',
        temperatura: 22,
        humidade: 65,
        luminosidade: 100001,
        timestamp: '2026-05-14T10:00:00Z'
      };
      const result = measurementsService.validateMeasurementData(measurement);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('luminosidade deve estar entre 0 e 100000 lux');
    });
  });

  // ============================================================
  // TU-123 a TU-127: isOutOfRange (PE + VL)
  // ============================================================
  
  describe('isOutOfRange - PE + VL', () => {
    test('TU-123: Deve retornar true para valor abaixo do mínimo', () => {
      expect(measurementsService.isOutOfRange(15, 20, 30)).toBe(true);
    });

    test('TU-124: Deve retornar true para valor acima do máximo', () => {
      expect(measurementsService.isOutOfRange(35, 20, 30)).toBe(true);
    });

    test('TU-125: Deve retornar false para valor dentro do range', () => {
      expect(measurementsService.isOutOfRange(25, 20, 30)).toBe(false);
    });

    test('TU-126: Deve retornar false para valor no limite inferior (VL)', () => {
      expect(measurementsService.isOutOfRange(20, 20, 30)).toBe(false);
    });

    test('TU-127: Deve retornar false para valor no limite superior (VL)', () => {
      expect(measurementsService.isOutOfRange(30, 20, 30)).toBe(false);
    });
  });

  // ============================================================
  // TU-128 a TU-135: shouldGenerateAlert - RN-30 (MC/DC)
  // ============================================================
  
  describe('shouldGenerateAlert - RN-30 (MC/DC)', () => {
    const plan = {
      temperaturaMin: 18,
      temperaturaMax: 26,
      humidadeMin: 50,
      humidadeMax: 80,
      luminosidadeMin: 4000,
      luminosidadeMax: 8000
    };

    test('TU-128: Não deve gerar alerta para medição dentro dos limites (MC/DC)', () => {
      const measurement = {
        temperatura: 22,
        humidade: 65,
        luminosidade: 6000
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(false);
      expect(result.tipo).toBeNull();
    });

    test('TU-129: Deve gerar alerta Crítico para temperatura muito fora (MC/DC)', () => {
      const measurement = {
        temperatura: 35, // desvio > 10°C
        humidade: 65,
        luminosidade: 6000
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(true);
      expect(result.tipo).toBe('Crítico');
      expect(result.mensagem).toContain('Temperatura');
    });

    test('TU-130: Deve gerar alerta Aviso para temperatura levemente fora (MC/DC)', () => {
      const measurement = {
        temperatura: 28, // desvio <= 10°C
        humidade: 65,
        luminosidade: 6000
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(true);
      expect(result.tipo).toBe('Aviso');
      expect(result.mensagem).toContain('Temperatura');
    });

    test('TU-131: Deve gerar alerta Crítico para humidade muito fora (MC/DC)', () => {
      const measurement = {
        temperatura: 22,
        humidade: 30, // desvio > 20%
        luminosidade: 6000
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(true);
      expect(result.tipo).toBe('Crítico');
      expect(result.mensagem).toContain('Humidade');
    });

    test('TU-132: Deve gerar alerta Aviso para humidade levemente fora (MC/DC)', () => {
      const measurement = {
        temperatura: 22,
        humidade: 45, // desvio <= 20%
        luminosidade: 6000
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(true);
      expect(result.tipo).toBe('Aviso');
      expect(result.mensagem).toContain('Humidade');
    });

    test('TU-133: Deve gerar alerta Informativo para luminosidade fora (MC/DC)', () => {
      const measurement = {
        temperatura: 22,
        humidade: 65,
        luminosidade: 2000 // fora do range
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(true);
      expect(result.tipo).toBe('Informativo');
      expect(result.mensagem).toContain('Luminosidade');
    });

    test('TU-134: Deve priorizar alerta Crítico sobre Aviso (MC/DC)', () => {
      const measurement = {
        temperatura: 35, // Crítico
        humidade: 45, // Aviso
        luminosidade: 6000
      };
      const result = measurementsService.shouldGenerateAlert(measurement, plan);
      expect(result.shouldAlert).toBe(true);
      expect(result.tipo).toBe('Crítico');
      expect(result.mensagem).toContain('Temperatura');
    });

    test('TU-135: Não deve gerar alerta se plano não especificado (MC/DC)', () => {
      const measurement = {
        temperatura: 100,
        humidade: 0,
        luminosidade: 0
      };
      const result = measurementsService.shouldGenerateAlert(measurement, null);
      expect(result.shouldAlert).toBe(false);
    });
  });

  // ============================================================
  // TU-136 a TU-138: calculateDeviation (PE)
  // ============================================================
  
  describe('calculateDeviation', () => {
    test('TU-136: Deve calcular desvio positivo', () => {
      const deviation = measurementsService.calculateDeviation(110, 100);
      expect(deviation).toBe(10.0);
    });

    test('TU-137: Deve calcular desvio negativo', () => {
      const deviation = measurementsService.calculateDeviation(90, 100);
      expect(deviation).toBe(-10.0);
    });

    test('TU-138: Deve retornar 0 para optimal = 0', () => {
      const deviation = measurementsService.calculateDeviation(50, 0);
      expect(deviation).toBe(0);
    });
  });

  // ============================================================
  // TU-139 a TU-142: calculateAverage (PE)
  // ============================================================
  
  describe('calculateAverage', () => {
    test('TU-139: Deve calcular média de temperaturas', () => {
      const measurements = [
        { temperatura: 20, humidade: 60 },
        { temperatura: 22, humidade: 65 },
        { temperatura: 24, humidade: 70 }
      ];
      const avg = measurementsService.calculateAverage(measurements, 'temperatura');
      expect(avg).toBe(22.0);
    });

    test('TU-140: Deve ignorar valores undefined/null', () => {
      const measurements = [
        { temperatura: 20, humidade: 60 },
        { temperatura: null, humidade: 65 },
        { temperatura: 24, humidade: 70 }
      ];
      const avg = measurementsService.calculateAverage(measurements, 'temperatura');
      expect(avg).toBe(22.0);
    });

    test('TU-141: Deve retornar null para array vazio', () => {
      const avg = measurementsService.calculateAverage([], 'temperatura');
      expect(avg).toBeNull();
    });

    test('TU-142: Deve retornar null se nenhum valor válido', () => {
      const measurements = [
        { temperatura: null },
        { temperatura: undefined }
      ];
      const avg = measurementsService.calculateAverage(measurements, 'temperatura');
      expect(avg).toBeNull();
    });
  });

});
