/**
 * plansService.js
 * Serviço para gestão de planos de cultivo
 * Sprint 2 - ESII 2025/2026
 */

// Constantes de validação (baseadas no enunciado)
const PLAN_TYPES = {
  REGULAR: 'regular',
  EMERGENCIA: 'emergencia',
  PONTUAL: 'pontual'
};

const VALIDATION_RANGES = {
  temperature: { min: 18, max: 28 },      // °C
  humidity: { min: 40, max: 80 },         // %
  luminosity: { min: 5000, max: 25000 },  // lux
  duration: { min: 1, max: 365 }          // dias
};

/**
 * Valida se o tipo de plano é válido
 * @param {string} planType - Tipo do plano
 * @returns {boolean}
 */
function isValidPlanType(planType) {
  if (!planType || typeof planType !== 'string') {
    return false;
  }
  return Object.values(PLAN_TYPES).includes(planType.toLowerCase());
}

/**
 * Valida intervalos de temperatura
 * @param {number} minTemp - Temperatura mínima
 * @param {number} maxTemp - Temperatura máxima
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateTemperatureRange(minTemp, maxTemp) {
  const errors = [];

  if (minTemp === null || minTemp === undefined) {
    errors.push('Temperatura mínima é obrigatória');
  } else if (typeof minTemp !== 'number' || 
             minTemp < VALIDATION_RANGES.temperature.min || 
             minTemp > VALIDATION_RANGES.temperature.max) {
    errors.push(`Temperatura mínima deve estar entre ${VALIDATION_RANGES.temperature.min} e ${VALIDATION_RANGES.temperature.max}°C`);
  }

  if (maxTemp === null || maxTemp === undefined) {
    errors.push('Temperatura máxima é obrigatória');
  } else if (typeof maxTemp !== 'number' || 
             maxTemp < VALIDATION_RANGES.temperature.min || 
             maxTemp > VALIDATION_RANGES.temperature.max) {
    errors.push(`Temperatura máxima deve estar entre ${VALIDATION_RANGES.temperature.min} e ${VALIDATION_RANGES.temperature.max}°C`);
  }

  if (errors.length === 0 && minTemp > maxTemp) {
    errors.push('Temperatura mínima não pode ser maior que temperatura máxima');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Valida intervalos de humidade
 * @param {number} minHum - Humidade mínima
 * @param {number} maxHum - Humidade máxima
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateHumidityRange(minHum, maxHum) {
  const errors = [];

  if (minHum === null || minHum === undefined) {
    errors.push('Humidade mínima é obrigatória');
  } else if (typeof minHum !== 'number' || 
             minHum < VALIDATION_RANGES.humidity.min || 
             minHum > VALIDATION_RANGES.humidity.max) {
    errors.push(`Humidade mínima deve estar entre ${VALIDATION_RANGES.humidity.min} e ${VALIDATION_RANGES.humidity.max}%`);
  }

  if (maxHum === null || maxHum === undefined) {
    errors.push('Humidade máxima é obrigatória');
  } else if (typeof maxHum !== 'number' || 
             maxHum < VALIDATION_RANGES.humidity.min || 
             maxHum > VALIDATION_RANGES.humidity.max) {
    errors.push(`Humidade máxima deve estar entre ${VALIDATION_RANGES.humidity.min} e ${VALIDATION_RANGES.humidity.max}%`);
  }

  if (errors.length === 0 && minHum > maxHum) {
    errors.push('Humidade mínima não pode ser maior que humidade máxima');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Valida intervalos de luminosidade
 * @param {number} minLux - Luminosidade mínima
 * @param {number} maxLux - Luminosidade máxima
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateLuminosityRange(minLux, maxLux) {
  const errors = [];

  if (minLux === null || minLux === undefined) {
    errors.push('Luminosidade mínima é obrigatória');
  } else if (typeof minLux !== 'number' || 
             minLux < VALIDATION_RANGES.luminosity.min || 
             minLux > VALIDATION_RANGES.luminosity.max) {
    errors.push(`Luminosidade mínima deve estar entre ${VALIDATION_RANGES.luminosity.min} e ${VALIDATION_RANGES.luminosity.max} lux`);
  }

  if (maxLux === null || maxLux === undefined) {
    errors.push('Luminosidade máxima é obrigatória');
  } else if (typeof maxLux !== 'number' || 
             maxLux < VALIDATION_RANGES.luminosity.min || 
             maxLux > VALIDATION_RANGES.luminosity.max) {
    errors.push(`Luminosidade máxima deve estar entre ${VALIDATION_RANGES.luminosity.min} e ${VALIDATION_RANGES.luminosity.max} lux`);
  }

  if (errors.length === 0 && minLux > maxLux) {
    errors.push('Luminosidade mínima não pode ser maior que luminosidade máxima');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Valida duração do ciclo de cultivo
 * @param {number} duration - Duração em dias
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateDuration(duration) {
  const errors = [];

  if (duration === null || duration === undefined) {
    errors.push('Duração do ciclo é obrigatória');
  } else if (!Number.isInteger(duration) || 
             duration < VALIDATION_RANGES.duration.min || 
             duration > VALIDATION_RANGES.duration.max) {
    errors.push(`Duração deve ser um número inteiro entre ${VALIDATION_RANGES.duration.min} e ${VALIDATION_RANGES.duration.max} dias`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Valida a criação de um plano de cultivo
 * @param {Object} planData - Dados do plano
 * @param {string} planData.type - Tipo do plano (regular, emergencia, pontual)
 * @param {number} planData.minTemperature - Temperatura mínima
 * @param {number} planData.maxTemperature - Temperatura máxima
 * @param {number} planData.minHumidity - Humidade mínima
 * @param {number} planData.maxHumidity - Humidade máxima
 * @param {number} planData.minLuminosity - Luminosidade mínima
 * @param {number} planData.maxLuminosity - Luminosidade máxima
 * @param {number} planData.duration - Duração em dias
 * @param {boolean} planData.hasAuthorization - Autorização do Responsável Técnico (obrigatório para pontual)
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validatePlanCreation(planData) {
  if (!planData) {
    throw new Error('Plan data is required');
  }

  const allErrors = [];

  // Validar tipo de plano
  if (!isValidPlanType(planData.type)) {
    allErrors.push('Tipo de plano inválido. Valores aceites: regular, emergencia, pontual');
  }

  // Validar temperatura
  const tempValidation = validateTemperatureRange(planData.minTemperature, planData.maxTemperature);
  if (!tempValidation.isValid) {
    allErrors.push(...tempValidation.errors);
  }

  // Validar humidade
  const humValidation = validateHumidityRange(planData.minHumidity, planData.maxHumidity);
  if (!humValidation.isValid) {
    allErrors.push(...humValidation.errors);
  }

  // Validar luminosidade
  const luxValidation = validateLuminosityRange(planData.minLuminosity, planData.maxLuminosity);
  if (!luxValidation.isValid) {
    allErrors.push(...luxValidation.errors);
  }

  // Validar duração
  const durationValidation = validateDuration(planData.duration);
  if (!durationValidation.isValid) {
    allErrors.push(...durationValidation.errors);
  }

  // Validar autorização para plano pontual (RN-04)
  if (planData.type && planData.type.toLowerCase() === PLAN_TYPES.PONTUAL) {
    if (!planData.hasAuthorization) {
      allErrors.push('Plano pontual requer autorização do Responsável Técnico');
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}

/**
 * Valida criação de plano pontual (lógica combinada)
 * RN-04: Plano pontual exige autorização do Responsável Técnico
 * @param {string} planType - Tipo do plano
 * @param {boolean} hasAuthorization - Se tem autorização
 * @param {boolean} parametersValid - Se os parâmetros são válidos
 * @returns {Object} { canCreate: boolean, reason: string }
 */
function validatePontualPlanAuthorization(planType, hasAuthorization, parametersValid) {
  // Condições múltiplas (MC/DC):
  // C1: planType === 'pontual'
  // C2: hasAuthorization === true
  // C3: parametersValid === true
  // Decisão: (C1 && C2 && C3) => pode criar

  if (!planType || typeof planType !== 'string') {
    return {
      canCreate: false,
      reason: 'Tipo de plano inválido'
    };
  }

  const isPontual = planType.toLowerCase() === PLAN_TYPES.PONTUAL;

  // Se não é pontual, não precisa de autorização especial
  if (!isPontual) {
    return {
      canCreate: parametersValid,
      reason: parametersValid ? 'Plano válido' : 'Parâmetros inválidos'
    };
  }

  // É pontual - verificar autorização E parâmetros
  if (!hasAuthorization) {
    return {
      canCreate: false,
      reason: 'Plano pontual requer autorização do Responsável Técnico'
    };
  }

  if (!parametersValid) {
    return {
      canCreate: false,
      reason: 'Parâmetros do plano são inválidos'
    };
  }

  return {
    canCreate: true,
    reason: 'Plano pontual autorizado e válido'
  };
}

module.exports = {
  PLAN_TYPES,
  VALIDATION_RANGES,
  isValidPlanType,
  validateTemperatureRange,
  validateHumidityRange,
  validateLuminosityRange,
  validateDuration,
  validatePlanCreation,
  validatePontualPlanAuthorization
};
