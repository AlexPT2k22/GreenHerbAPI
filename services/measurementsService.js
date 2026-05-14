/**
 * Measurements Service
 * Lógica de negócio para medições ambientais e geração de alertas
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os dados de uma medição
 * @param {Object} measurement - Dados da medição
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateMeasurementData(measurement) {
  const errors = [];

  if (!measurement) {
    return { valid: false, errors: ['Medição não pode ser nula'] };
  }

  // Campos obrigatórios
  if (!measurement.sensorId) {
    errors.push('sensorId é obrigatório');
  }

  if (measurement.temperatura === undefined || measurement.temperatura === null) {
    errors.push('temperatura é obrigatória');
  } else if (measurement.temperatura < -50 || measurement.temperatura > 100) {
    errors.push('temperatura deve estar entre -50°C e 100°C');
  }

  if (measurement.humidade === undefined || measurement.humidade === null) {
    errors.push('humidade é obrigatória');
  } else if (measurement.humidade < 0 || measurement.humidade > 100) {
    errors.push('humidade deve estar entre 0% e 100%');
  }

  if (measurement.luminosidade !== undefined) {
    if (measurement.luminosidade < 0 || measurement.luminosidade > 100000) {
      errors.push('luminosidade deve estar entre 0 e 100000 lux');
    }
  }

  if (!measurement.timestamp) {
    errors.push('timestamp é obrigatório');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifica se um valor está fora do range especificado
 * @param {number} value - Valor a verificar
 * @param {number} min - Mínimo aceitável
 * @param {number} max - Máximo aceitável
 * @returns {boolean} True se fora do range
 */
function isOutOfRange(value, min, max) {
  if (value === undefined || value === null) {
    return false;
  }
  if (min === undefined || max === undefined) {
    return false;
  }
  return value < min || value > max;
}

/**
 * Verifica se deve gerar alerta baseado na medição e plano
 * RN-30: Geração automática de alertas
 * @param {Object} measurement - Medição atual
 * @param {Object} plan - Plano de cultivo com limites
 * @returns {Object} { shouldAlert: boolean, tipo: string, mensagem: string }
 */
function shouldGenerateAlert(measurement, plan) {
  if (!measurement || !plan) {
    return { shouldAlert: false, tipo: null, mensagem: null };
  }

  const alerts = [];

  // Verificar temperatura
  if (plan.temperaturaMin !== undefined && plan.temperaturaMax !== undefined) {
    if (isOutOfRange(measurement.temperatura, plan.temperaturaMin, plan.temperaturaMax)) {
      // Calcular distância absoluta dos limites
      const distanciaMin = Math.abs(measurement.temperatura - plan.temperaturaMin);
      const distanciaMax = Math.abs(measurement.temperatura - plan.temperaturaMax);
      const distancia = Math.min(distanciaMin, distanciaMax);
      const tipo = distancia >= 9 ? 'Crítico' : 'Aviso';
      alerts.push({
        tipo,
        mensagem: `Temperatura ${measurement.temperatura}°C fora do range [${plan.temperaturaMin}, ${plan.temperaturaMax}]`
      });
    }
  }

  // Verificar humidade
  if (plan.humidadeMin !== undefined && plan.humidadeMax !== undefined) {
    if (isOutOfRange(measurement.humidade, plan.humidadeMin, plan.humidadeMax)) {
      // Calcular distância absoluta dos limites
      const distanciaMin = Math.abs(measurement.humidade - plan.humidadeMin);
      const distanciaMax = Math.abs(measurement.humidade - plan.humidadeMax);
      const distancia = Math.min(distanciaMin, distanciaMax);
      const tipo = distancia >= 20 ? 'Crítico' : 'Aviso';
      alerts.push({
        tipo,
        mensagem: `Humidade ${measurement.humidade}% fora do range [${plan.humidadeMin}, ${plan.humidadeMax}]`
      });
    }
  }

  // Verificar luminosidade (se configurada)
  if (plan.luminosidadeMin !== undefined && plan.luminosidadeMax !== undefined) {
    if (measurement.luminosidade !== undefined && 
        isOutOfRange(measurement.luminosidade, plan.luminosidadeMin, plan.luminosidadeMax)) {
      alerts.push({
        tipo: 'Informativo',
        mensagem: `Luminosidade ${measurement.luminosidade} lux fora do range [${plan.luminosidadeMin}, ${plan.luminosidadeMax}]`
      });
    }
  }

  if (alerts.length === 0) {
    return { shouldAlert: false, tipo: null, mensagem: null };
  }

  // Retornar o alerta mais severo
  const critico = alerts.find(a => a.tipo === 'Crítico');
  if (critico) {
    return { shouldAlert: true, ...critico };
  }

  const aviso = alerts.find(a => a.tipo === 'Aviso');
  if (aviso) {
    return { shouldAlert: true, ...aviso };
  }

  return { shouldAlert: true, ...alerts[0] };
}

/**
 * Calcula o desvio percentual em relação ao valor ótimo
 * @param {number} value - Valor medido
 * @param {number} optimal - Valor ótimo
 * @returns {number} Desvio percentual
 */
function calculateDeviation(value, optimal) {
  if (!optimal || optimal === 0) {
    return 0;
  }
  return parseFloat((((value - optimal) / optimal) * 100).toFixed(2));
}

/**
 * Calcula a média de um array de medições para um parâmetro
 * @param {Array} measurements - Array de medições
 * @param {string} parameter - Parâmetro (temperatura, humidade, luminosidade)
 * @returns {number|null} Média ou null se inválido
 */
function calculateAverage(measurements, parameter) {
  if (!measurements || measurements.length === 0) {
    return null;
  }

  const values = measurements
    .map(m => m[parameter])
    .filter(v => v !== undefined && v !== null);

  if (values.length === 0) {
    return null;
  }

  const sum = values.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / values.length).toFixed(2));
}

module.exports = {
  validateMeasurementData,
  isOutOfRange,
  shouldGenerateAlert,
  calculateDeviation,
  calculateAverage
};
