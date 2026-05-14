/**
 * Reports Service
 * Lógica de negócio para geração de relatórios
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os parâmetros de um relatório
 * @param {Object} params - Parâmetros do relatório
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateReportParams(params) {
  const errors = [];

  if (!params) {
    return { valid: false, errors: ['Parâmetros não podem ser nulos'] };
  }

  // Formato
  if (!params.formato) {
    errors.push('formato é obrigatório');
  } else {
    const formatosValidos = ['CSV', 'Excel', 'JSON'];
    if (!formatosValidos.includes(params.formato)) {
      errors.push('formato deve ser CSV, Excel ou JSON');
    }
  }

  // Período
  if (params.periodo) {
    const periodosValidos = ['diario', 'semanal', 'mensal', 'personalizado'];
    if (!periodosValidos.includes(params.periodo)) {
      errors.push('periodo deve ser diario, semanal, mensal ou personalizado');
    }
  }

  // Datas (se período personalizado)
  if (params.periodo === 'personalizado') {
    if (!params.dataInicio) {
      errors.push('dataInicio é obrigatória para período personalizado');
    }
    if (!params.dataFim) {
      errors.push('dataFim é obrigatória para período personalizado');
    }
    if (params.dataInicio && params.dataFim) {
      const inicio = new Date(params.dataInicio);
      const fim = new Date(params.dataFim);
      if (inicio > fim) {
        errors.push('dataInicio não pode ser posterior a dataFim');
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Calcula agregados (média, máximo, mínimo, total) de um dataset
 * @param {Array} data - Array de objetos com valores numéricos
 * @param {string} field - Campo a agregar
 * @returns {Object} { media, maximo, minimo, total, count }
 */
function calculateAggregates(data, field) {
  if (!data || data.length === 0 || !field) {
    return { media: null, maximo: null, minimo: null, total: null, count: 0 };
  }

  const values = data
    .map(item => item[field])
    .filter(v => v !== undefined && v !== null && !isNaN(v));

  if (values.length === 0) {
    return { media: null, maximo: null, minimo: null, total: null, count: 0 };
  }

  const total = values.reduce((sum, val) => sum + val, 0);
  const media = parseFloat((total / values.length).toFixed(2));
  const maximo = Math.max(...values);
  const minimo = Math.min(...values);

  return { media, maximo, minimo, total, count: values.length };
}

/**
 * Formata dados para CSV
 * @param {Array} data - Array de objetos
 * @returns {string} String CSV
 */
function formatToCSV(data) {
  if (!data || data.length === 0) {
    return '';
  }

  // Headers
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');

  // Rows
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Escapar vírgulas e aspas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });

  return [csvHeaders, ...csvRows].join('\n');
}

/**
 * Formata dados para Excel (simulação simplificada - retorna estrutura)
 * @param {Array} data - Array de objetos
 * @returns {Object} Estrutura Excel simplificada
 */
function formatToExcel(data) {
  if (!data || data.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => row[h]));

  return { headers, rows };
}

/**
 * Filtra dados por range de datas
 * @param {Array} data - Array de objetos com campo timestamp/data
 * @param {string} dataInicio - Data início (ISO)
 * @param {string} dataFim - Data fim (ISO)
 * @param {string} dateField - Nome do campo de data (default: 'timestamp')
 * @returns {Array} Dados filtrados
 */
function filterByDateRange(data, dataInicio, dataFim, dateField = 'timestamp') {
  if (!data || data.length === 0) {
    return [];
  }

  if (!dataInicio || !dataFim) {
    return data;
  }

  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);

  return data.filter(item => {
    if (!item[dateField]) return false;
    const itemDate = new Date(item[dateField]);
    return itemDate >= inicio && itemDate <= fim;
  });
}

module.exports = {
  validateReportParams,
  calculateAggregates,
  formatToCSV,
  formatToExcel,
  filterByDateRange
};
