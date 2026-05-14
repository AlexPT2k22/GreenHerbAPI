/**
 * herbsService.js
 * Serviço para gestão do catálogo de ervas aromáticas
 * Sprint 2 - ESII 2025/2026
 */

/**
 * Valida os dados de uma erva aromática
 * @param {Object} herbData - Dados da erva a validar
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateHerb(herbData) {
  const errors = [];

  if (!herbData) {
    throw new Error('Herb data is required');
  }

  // Validar nome (obrigatório, 2-100 caracteres)
  if (!herbData.name || typeof herbData.name !== 'string') {
    errors.push('Nome é obrigatório');
  } else if (herbData.name.trim().length < 2 || herbData.name.trim().length > 100) {
    errors.push('Nome deve ter entre 2 e 100 caracteres');
  }

  // Validar nome científico (obrigatório, 2-100 caracteres)
  if (!herbData.scientificName || typeof herbData.scientificName !== 'string') {
    errors.push('Nome científico é obrigatório');
  } else if (herbData.scientificName.trim().length < 2 || herbData.scientificName.trim().length > 100) {
    errors.push('Nome científico deve ter entre 2 e 100 caracteres');
  }

  // Validar temperatura ideal (obrigatório, número entre 0 e 50°C)
  if (herbData.idealTemperature === null || herbData.idealTemperature === undefined) {
    errors.push('Temperatura ideal é obrigatória');
  } else if (typeof herbData.idealTemperature !== 'number' || 
             herbData.idealTemperature < 0 || herbData.idealTemperature > 50) {
    errors.push('Temperatura ideal deve estar entre 0 e 50°C');
  }

  // Validar humidade ideal (obrigatório, número entre 0 e 100%)
  if (herbData.idealHumidity === null || herbData.idealHumidity === undefined) {
    errors.push('Humidade ideal é obrigatória');
  } else if (typeof herbData.idealHumidity !== 'number' || 
             herbData.idealHumidity < 0 || herbData.idealHumidity > 100) {
    errors.push('Humidade ideal deve estar entre 0 e 100%');
  }

  // Validar luminosidade ideal (obrigatório, número entre 0 e 100000 lux)
  if (herbData.idealLuminosity === null || herbData.idealLuminosity === undefined) {
    errors.push('Luminosidade ideal é obrigatória');
  } else if (typeof herbData.idealLuminosity !== 'number' || 
             herbData.idealLuminosity < 0 || herbData.idealLuminosity > 100000) {
    errors.push('Luminosidade ideal deve estar entre 0 e 100000 lux');
  }

  // Validar dias até colheita (obrigatório, número inteiro entre 1 e 365)
  if (herbData.daysToHarvest === null || herbData.daysToHarvest === undefined) {
    errors.push('Dias até colheita é obrigatório');
  } else if (!Number.isInteger(herbData.daysToHarvest) || 
             herbData.daysToHarvest < 1 || herbData.daysToHarvest > 365) {
    errors.push('Dias até colheita deve ser um número inteiro entre 1 e 365');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Processa uma linha do CSV de importação de ervas
 * @param {string} line - Linha do CSV (formato: nome,científico,temp,hum,lux,dias)
 * @param {number} lineNumber - Número da linha para referência
 * @returns {Object} { status: 'valid'|'invalid'|'partial', data: Object, errors: string[] }
 */
function parseCsvLine(line, lineNumber) {
  if (!line || line.trim() === '') {
    return {
      status: 'invalid',
      lineNumber: lineNumber,
      errors: ['Linha vazia']
    };
  }

  const parts = line.split(',').map(p => p.trim());
  
  if (parts.length < 6) {
    return {
      status: 'invalid',
      lineNumber: lineNumber,
      errors: ['Formato inválido: esperado 6 campos (nome,científico,temp,hum,lux,dias)']
    };
  }

  const herbData = {
    name: parts[0],
    scientificName: parts[1],
    idealTemperature: parseFloat(parts[2]),
    idealHumidity: parseFloat(parts[3]),
    idealLuminosity: parseFloat(parts[4]),
    daysToHarvest: parseInt(parts[5], 10)
  };

  const validation = validateHerb(herbData);

  return {
    status: validation.isValid ? 'valid' : 'invalid',
    lineNumber: lineNumber,
    data: validation.isValid ? herbData : null,
    errors: validation.errors
  };
}

/**
 * Importa ervas aromáticas a partir de dados CSV
 * @param {string} csvContent - Conteúdo do ficheiro CSV
 * @returns {Object} { total: number, valid: number, invalid: number, partial: number, herbs: Array, errors: Array }
 */
function importHerbsFromCsv(csvContent) {
  if (csvContent === null || csvContent === undefined) {
    throw new Error('CSV content is required');
  }

  if (typeof csvContent !== 'string' || csvContent.trim() === '') {
    throw new Error('CSV file is empty');
  }

  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    throw new Error('CSV file is empty');
  }

  // Assumir que primeira linha é cabeçalho
  const dataLines = lines.slice(1);
  
  if (dataLines.length === 0) {
    throw new Error('CSV file has no data rows');
  }

  const results = {
    total: dataLines.length,
    valid: 0,
    invalid: 0,
    partial: 0,
    herbs: [],
    errors: []
  };

  dataLines.forEach((line, index) => {
    const parsed = parseCsvLine(line, index + 2); // +2 porque linha 1 é cabeçalho
    
    if (parsed.status === 'valid') {
      results.valid++;
      results.herbs.push(parsed.data);
    } else if (parsed.status === 'invalid') {
      results.invalid++;
      results.errors.push({
        line: parsed.lineNumber,
        errors: parsed.errors
      });
    } else if (parsed.status === 'partial') {
      results.partial++;
      results.errors.push({
        line: parsed.lineNumber,
        errors: parsed.errors
      });
    }
  });

  return results;
}

module.exports = {
  validateHerb,
  parseCsvLine,
  importHerbsFromCsv
};
