/**
 * plansService.test.js
 * Testes de Unidade - Sprint 2
 * Criação de planos de cultivo
 */

const plansService = require('../../src/services/plansService');

describe('Testes de Unidade plansService - Sprint 2', () => {

  // ------------------------------------------------------------------
  // 2.5.9 isValidPlanType - Particionamento de Equivalência
  // ------------------------------------------------------------------
  describe('isValidPlanType - Particionamento de Equivalência', () => {
    
    it('TU-51: PE válida - tipo "regular" -> true', () => {
      expect(plansService.isValidPlanType('regular')).toBe(true);
    });

    it('TU-52: PE válida - tipo "emergencia" -> true', () => {
      expect(plansService.isValidPlanType('emergencia')).toBe(true);
    });

    it('TU-53: PE válida - tipo "pontual" -> true', () => {
      expect(plansService.isValidPlanType('pontual')).toBe(true);
    });

    it('TU-54: PE inválida - tipo "invalido" -> false', () => {
      expect(plansService.isValidPlanType('invalido')).toBe(false);
    });

    it('TU-55: PE inválida - tipo null -> false', () => {
      expect(plansService.isValidPlanType(null)).toBe(false);
    });

    it('TU-56: PE inválida - tipo undefined -> false', () => {
      expect(plansService.isValidPlanType(undefined)).toBe(false);
    });

    it('TU-57: PE válida - tipo "REGULAR" (maiúsculas) -> true', () => {
      expect(plansService.isValidPlanType('REGULAR')).toBe(true);
    });
  });

  // ------------------------------------------------------------------
  // 2.5.10 validateTemperatureRange - Valores Limite
  // ------------------------------------------------------------------
  describe('validateTemperatureRange - Valores Limite', () => {
    
    it('TU-58: VL temperatura - min=17 (inválido), max=25 -> isValid false', () => {
      const result = plansService.validateTemperatureRange(17, 25);
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('entre 18 e 28');
    });

    it('TU-59: VL temperatura - min=18 (limite inferior válido), max=25 -> isValid true', () => {
      const result = plansService.validateTemperatureRange(18, 25);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('TU-60: VL temperatura - min=23 (valor nominal), max=25 -> isValid true', () => {
      const result = plansService.validateTemperatureRange(23, 25);
      expect(result.isValid).toBe(true);
    });

    it('TU-61: VL temperatura - min=18, max=28 (limite superior válido) -> isValid true', () => {
      const result = plansService.validateTemperatureRange(18, 28);
      expect(result.isValid).toBe(true);
    });

    it('TU-62: VL temperatura - min=18, max=29 (inválido) -> isValid false', () => {
      const result = plansService.validateTemperatureRange(18, 29);
      expect(result.isValid).toBe(false);
    });

    it('TU-63: VL temperatura - min > max -> isValid false', () => {
      const result = plansService.validateTemperatureRange(25, 20);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Temperatura mínima não pode ser maior que temperatura máxima');
    });

    it('TU-64: VL temperatura - min null -> isValid false', () => {
      const result = plansService.validateTemperatureRange(null, 25);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Temperatura mínima é obrigatória');
    });
  });

  // ------------------------------------------------------------------
  // 2.5.11 validateHumidityRange - Valores Limite
  // ------------------------------------------------------------------
  describe('validateHumidityRange - Valores Limite', () => {
    
    it('TU-65: VL humidade - min=39 (inválido), max=70 -> isValid false', () => {
      const result = plansService.validateHumidityRange(39, 70);
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('entre 40 e 80');
    });

    it('TU-66: VL humidade - min=40 (limite inferior válido), max=70 -> isValid true', () => {
      const result = plansService.validateHumidityRange(40, 70);
      expect(result.isValid).toBe(true);
    });

    it('TU-67: VL humidade - min=60 (valor nominal), max=70 -> isValid true', () => {
      const result = plansService.validateHumidityRange(60, 70);
      expect(result.isValid).toBe(true);
    });

    it('TU-68: VL humidade - min=40, max=80 (limite superior válido) -> isValid true', () => {
      const result = plansService.validateHumidityRange(40, 80);
      expect(result.isValid).toBe(true);
    });

    it('TU-69: VL humidade - min=40, max=81 (inválido) -> isValid false', () => {
      const result = plansService.validateHumidityRange(40, 81);
      expect(result.isValid).toBe(false);
    });

    it('TU-70: VL humidade - min > max -> isValid false', () => {
      const result = plansService.validateHumidityRange(70, 60);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Humidade mínima não pode ser maior que humidade máxima');
    });
  });

  // ------------------------------------------------------------------
  // 2.5.12 validateLuminosityRange - Valores Limite
  // ------------------------------------------------------------------
  describe('validateLuminosityRange - Valores Limite', () => {
    
    it('TU-71: VL luminosidade - min=4999 (inválido), max=15000 -> isValid false', () => {
      const result = plansService.validateLuminosityRange(4999, 15000);
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('entre 5000 e 25000');
    });

    it('TU-72: VL luminosidade - min=5000 (limite inferior válido), max=15000 -> isValid true', () => {
      const result = plansService.validateLuminosityRange(5000, 15000);
      expect(result.isValid).toBe(true);
    });

    it('TU-73: VL luminosidade - min=15000 (valor nominal), max=20000 -> isValid true', () => {
      const result = plansService.validateLuminosityRange(15000, 20000);
      expect(result.isValid).toBe(true);
    });

    it('TU-74: VL luminosidade - min=5000, max=25000 (limite superior válido) -> isValid true', () => {
      const result = plansService.validateLuminosityRange(5000, 25000);
      expect(result.isValid).toBe(true);
    });

    it('TU-75: VL luminosidade - min=5000, max=25001 (inválido) -> isValid false', () => {
      const result = plansService.validateLuminosityRange(5000, 25001);
      expect(result.isValid).toBe(false);
    });

    it('TU-76: VL luminosidade - min > max -> isValid false', () => {
      const result = plansService.validateLuminosityRange(20000, 15000);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Luminosidade mínima não pode ser maior que luminosidade máxima');
    });
  });

  // ------------------------------------------------------------------
  // 2.5.13 validateDuration - Valores Limite
  // ------------------------------------------------------------------
  describe('validateDuration - Valores Limite', () => {
    
    it('TU-77: VL duração - 0 dias (inválido) -> isValid false', () => {
      const result = plansService.validateDuration(0);
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('entre 1 e 365');
    });

    it('TU-78: VL duração - 1 dia (limite inferior válido) -> isValid true', () => {
      const result = plansService.validateDuration(1);
      expect(result.isValid).toBe(true);
    });

    it('TU-79: VL duração - 90 dias (valor nominal) -> isValid true', () => {
      const result = plansService.validateDuration(90);
      expect(result.isValid).toBe(true);
    });

    it('TU-80: VL duração - 365 dias (limite superior válido) -> isValid true', () => {
      const result = plansService.validateDuration(365);
      expect(result.isValid).toBe(true);
    });

    it('TU-81: VL duração - 366 dias (inválido) -> isValid false', () => {
      const result = plansService.validateDuration(366);
      expect(result.isValid).toBe(false);
    });

    it('TU-82: VL duração - 90.5 dias (não inteiro) -> isValid false', () => {
      const result = plansService.validateDuration(90.5);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Duração deve ser um número inteiro entre 1 e 365 dias');
    });
  });

  // ------------------------------------------------------------------
  // 2.5.14 validatePlanCreation - Integração de Validações
  // ------------------------------------------------------------------
  describe('validatePlanCreation - Validação Completa', () => {
    
    it('TU-83: PE erro - planData null -> Lança "Plan data is required"', () => {
      expect(() => plansService.validatePlanCreation(null)).toThrow('Plan data is required');
    });

    it('TU-84: PE inválida - tipo inválido -> isValid false', () => {
      const plan = {
        type: 'invalido',
        minTemperature: 20,
        maxTemperature: 25,
        minHumidity: 50,
        maxHumidity: 70,
        minLuminosity: 10000,
        maxLuminosity: 20000,
        duration: 90
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tipo de plano inválido. Valores aceites: regular, emergencia, pontual');
    });

    it('TU-85: PE válida - plano regular válido -> isValid true', () => {
      const plan = {
        type: 'regular',
        minTemperature: 20,
        maxTemperature: 25,
        minHumidity: 50,
        maxHumidity: 70,
        minLuminosity: 10000,
        maxLuminosity: 20000,
        duration: 90
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('TU-86: PE inválida - plano pontual sem autorização -> isValid false', () => {
      const plan = {
        type: 'pontual',
        minTemperature: 20,
        maxTemperature: 25,
        minHumidity: 50,
        maxHumidity: 70,
        minLuminosity: 10000,
        maxLuminosity: 20000,
        duration: 90,
        hasAuthorization: false
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Plano pontual requer autorização do Responsável Técnico');
    });

    it('TU-87: PE válida - plano pontual com autorização -> isValid true', () => {
      const plan = {
        type: 'pontual',
        minTemperature: 20,
        maxTemperature: 25,
        minHumidity: 50,
        maxHumidity: 70,
        minLuminosity: 10000,
        maxLuminosity: 20000,
        duration: 90,
        hasAuthorization: true
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(true);
    });

    it('TU-88: PE inválida - múltiplos erros de validação -> isValid false com múltiplos erros', () => {
      const plan = {
        type: 'regular',
        minTemperature: 15,  // inválido
        maxTemperature: 30,  // inválido
        minHumidity: 30,     // inválido
        maxHumidity: 90,     // inválido
        minLuminosity: 1000, // inválido
        maxLuminosity: 30000, // inválido
        duration: 400        // inválido
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(5);
    });
  });

  // ------------------------------------------------------------------
  // 2.5.15 validatePontualPlanAuthorization - Cobertura de Condições Múltiplas (MC/DC)
  // Decisão: (C1: isPontual) && (C2: hasAuthorization) && (C3: parametersValid)
  // ------------------------------------------------------------------
  describe('validatePontualPlanAuthorization - MC/DC', () => {
    
    // Tabela de Verdade MC/DC:
    // C1 | C2 | C3 | Resultado
    // F  | F  | F  | false (não é pontual, mas parâmetros inválidos)
    // F  | F  | T  | true  (não é pontual, parâmetros válidos)
    // F  | T  | F  | false (não é pontual, mas parâmetros inválidos)
    // F  | T  | T  | true  (não é pontual, parâmetros válidos)
    // T  | F  | F  | false (é pontual, sem autorização)
    // T  | F  | T  | false (é pontual, sem autorização, parâmetros ok)
    // T  | T  | F  | false (é pontual, com autorização, mas parâmetros inválidos)
    // T  | T  | T  | true  (é pontual, com autorização, parâmetros ok)

    it('TU-89: MC/DC C1=F C2=F C3=F -> canCreate false (plano regular, params inválidos)', () => {
      const result = plansService.validatePontualPlanAuthorization('regular', false, false);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Parâmetros inválidos');
    });

    it('TU-90: MC/DC C1=F C2=F C3=T -> canCreate true (plano regular, params válidos)', () => {
      const result = plansService.validatePontualPlanAuthorization('regular', false, true);
      expect(result.canCreate).toBe(true);
      expect(result.reason).toBe('Plano válido');
    });

    it('TU-91: MC/DC C1=F C2=T C3=F -> canCreate false (plano emergência, params inválidos)', () => {
      const result = plansService.validatePontualPlanAuthorization('emergencia', true, false);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Parâmetros inválidos');
    });

    it('TU-92: MC/DC C1=F C2=T C3=T -> canCreate true (plano emergência, params válidos)', () => {
      const result = plansService.validatePontualPlanAuthorization('emergencia', true, true);
      expect(result.canCreate).toBe(true);
      expect(result.reason).toBe('Plano válido');
    });

    it('TU-93: MC/DC C1=T C2=F C3=F -> canCreate false (pontual sem autorização)', () => {
      const result = plansService.validatePontualPlanAuthorization('pontual', false, false);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('autorização do Responsável Técnico');
    });

    it('TU-94: MC/DC C1=T C2=F C3=T -> canCreate false (pontual sem autorização, params ok)', () => {
      const result = plansService.validatePontualPlanAuthorization('pontual', false, true);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('autorização do Responsável Técnico');
    });

    it('TU-95: MC/DC C1=T C2=T C3=F -> canCreate false (pontual com autorização, params inválidos)', () => {
      const result = plansService.validatePontualPlanAuthorization('pontual', true, false);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Parâmetros do plano são inválidos');
    });

    it('TU-96: MC/DC C1=T C2=T C3=T -> canCreate true (pontual autorizado e válido)', () => {
      const result = plansService.validatePontualPlanAuthorization('pontual', true, true);
      expect(result.canCreate).toBe(true);
      expect(result.reason).toBe('Plano pontual autorizado e válido');
    });

    it('TU-97: MC/DC - tipo null -> canCreate false', () => {
      const result = plansService.validatePontualPlanAuthorization(null, true, true);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Tipo de plano inválido');
    });

    it('TU-98: MC/DC - tipo undefined -> canCreate false', () => {
      const result = plansService.validatePontualPlanAuthorization(undefined, true, true);
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Tipo de plano inválido');
    });
  });

  // ------------------------------------------------------------------
  // 2.5.16 Testes de Planos de Emergência
  // ------------------------------------------------------------------
  describe('validatePlanCreation - Planos de Emergência', () => {
    
    it('TU-99: PE válida - plano emergência válido -> isValid true', () => {
      const plan = {
        type: 'emergencia',
        minTemperature: 19,
        maxTemperature: 26,
        minHumidity: 45,
        maxHumidity: 75,
        minLuminosity: 8000,
        maxLuminosity: 22000,
        duration: 30
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(true);
    });

    it('TU-100: PE válida - plano emergência não requer autorização -> isValid true', () => {
      const plan = {
        type: 'emergencia',
        minTemperature: 20,
        maxTemperature: 25,
        minHumidity: 50,
        maxHumidity: 70,
        minLuminosity: 10000,
        maxLuminosity: 20000,
        duration: 60,
        hasAuthorization: false
      };
      const result = plansService.validatePlanCreation(plan);
      expect(result.isValid).toBe(true);
    });
  });

});
