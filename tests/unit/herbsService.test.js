/**
 * herbsService.test.js
 * Testes de Unidade - Sprint 2
 * Importação do catálogo de ervas aromáticas
 */

const herbsService = require('../../src/services/herbsService');

describe('Testes de Unidade herbsService - Sprint 2', () => {

  // ------------------------------------------------------------------
  // 2.5.4 validateHerb - Particionamento de Equivalência
  // ------------------------------------------------------------------
  describe('validateHerb - Particionamento de Equivalência', () => {
    
    it('TU-15: PE erro - herbData null -> Lança "Herb data is required"', () => {
      expect(() => herbsService.validateHerb(null)).toThrow('Herb data is required');
    });

    it('TU-16: PE erro - herbData undefined -> Lança "Herb data is required"', () => {
      expect(() => herbsService.validateHerb(undefined)).toThrow('Herb data is required');
    });

    it('TU-17: PE inválida - nome ausente -> isValid false', () => {
      const herb = {
        scientificName: 'Mentha spicata',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome é obrigatório');
    });

    it('TU-18: PE inválida - nome científico ausente -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome científico é obrigatório');
    });

    it('TU-19: PE inválida - temperatura ausente -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha spicata',
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Temperatura ideal é obrigatória');
    });

    it('TU-20: PE válida - todos os campos válidos -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha spicata',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ------------------------------------------------------------------
  // 2.5.5 validateHerb - Valores Limite
  // ------------------------------------------------------------------
  describe('validateHerb - Valores Limite', () => {
    
    it('TU-21: VL nome - 1 caractere (inválido) -> isValid false', () => {
      const herb = {
        name: 'A',
        scientificName: 'Test',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome deve ter entre 2 e 100 caracteres');
    });

    it('TU-22: VL nome - 2 caracteres (limite inferior válido) -> isValid true', () => {
      const herb = {
        name: 'Ab',
        scientificName: 'Test',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-23: VL nome - 100 caracteres (limite superior válido) -> isValid true', () => {
      const herb = {
        name: 'A'.repeat(100),
        scientificName: 'Test',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-24: VL nome - 101 caracteres (inválido) -> isValid false', () => {
      const herb = {
        name: 'A'.repeat(101),
        scientificName: 'Test',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });

    it('TU-25: VL temperatura - -1°C (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: -1,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });

    it('TU-26: VL temperatura - 0°C (limite inferior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 0,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-27: VL temperatura - 50°C (limite superior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 50,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-28: VL temperatura - 51°C (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 51,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });

    it('TU-29: VL daysToHarvest - 0 dias (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 0
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });

    it('TU-30: VL daysToHarvest - 1 dia (limite inferior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 1
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-31: VL daysToHarvest - 365 dias (limite superior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 365
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-32: VL daysToHarvest - 366 dias (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 366
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });
  });

  // ------------------------------------------------------------------
  // 2.5.6 parseCsvLine - Particionamento de Equivalência
  // ------------------------------------------------------------------
  describe('parseCsvLine - Particionamento de Equivalência', () => {
    
    it('TU-33: PE inválida - linha vazia -> status invalid', () => {
      const result = herbsService.parseCsvLine('', 1);
      expect(result.status).toBe('invalid');
      expect(result.errors).toContain('Linha vazia');
    });

    it('TU-34: PE inválida - menos de 6 campos -> status invalid', () => {
      const result = herbsService.parseCsvLine('Hortelã,Mentha,20', 2);
      expect(result.status).toBe('invalid');
      expect(result.errors[0]).toContain('Formato inválido');
    });

    it('TU-35: PE válida - 6 campos válidos -> status valid', () => {
      const line = 'Hortelã,Mentha spicata,20,60,15000,90';
      const result = herbsService.parseCsvLine(line, 2);
      expect(result.status).toBe('valid');
      expect(result.data).toEqual({
        name: 'Hortelã',
        scientificName: 'Mentha spicata',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 15000,
        daysToHarvest: 90
      });
    });

    it('TU-36: PE inválida - valores numéricos inválidos -> status invalid', () => {
      const line = 'Hortelã,Mentha,abc,def,ghi,jkl';
      const result = herbsService.parseCsvLine(line, 2);
      expect(result.status).toBe('invalid');
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // ------------------------------------------------------------------
  // 2.5.7 importHerbsFromCsv - Particionamento de Equivalência e Valores Limite
  // ------------------------------------------------------------------
  describe('importHerbsFromCsv - Casos Combinados', () => {
    
    it('TU-37: PE erro - conteúdo null -> Lança "CSV content is required"', () => {
      expect(() => herbsService.importHerbsFromCsv(null)).toThrow('CSV content is required');
    });

    it('TU-38: PE erro - conteúdo vazio -> Lança "CSV file is empty"', () => {
      expect(() => herbsService.importHerbsFromCsv('')).toThrow('CSV file is empty');
    });

    it('TU-39: PE erro - apenas cabeçalho -> Lança "CSV file has no data rows"', () => {
      const csv = 'nome,científico,temp,hum,lux,dias\n';
      expect(() => herbsService.importHerbsFromCsv(csv)).toThrow('CSV file has no data rows');
    });

    it('TU-40: PE válida - ficheiro com linhas válidas -> total = valid', () => {
      const csv = 'nome,científico,temp,hum,lux,dias\n' +
                  'Hortelã,Mentha spicata,20,60,15000,90\n' +
                  'Manjericão,Ocimum basilicum,22,65,18000,60\n';
      const result = herbsService.importHerbsFromCsv(csv);
      expect(result.total).toBe(2);
      expect(result.valid).toBe(2);
      expect(result.invalid).toBe(0);
      expect(result.herbs).toHaveLength(2);
    });

    it('TU-41: PE inválida - ficheiro com linhas inválidas -> total = invalid', () => {
      const csv = 'nome,científico,temp,hum,lux,dias\n' +
                  'A,B,999,200,999999,0\n' +
                  ',,,,,\n';
      const result = herbsService.importHerbsFromCsv(csv);
      expect(result.total).toBe(2);
      expect(result.valid).toBe(0);
      expect(result.invalid).toBe(2);
      expect(result.errors).toHaveLength(2);
    });

    it('TU-42: PE mista - ficheiro com linhas válidas e inválidas -> totais corretos', () => {
      const csv = 'nome,científico,temp,hum,lux,dias\n' +
                  'Hortelã,Mentha spicata,20,60,15000,90\n' +
                  'A,B,999,200,999999,0\n' +
                  'Manjericão,Ocimum basilicum,22,65,18000,60\n';
      const result = herbsService.importHerbsFromCsv(csv);
      expect(result.total).toBe(3);
      expect(result.valid).toBe(2);
      expect(result.invalid).toBe(1);
      expect(result.herbs).toHaveLength(2);
      expect(result.errors).toHaveLength(1);
    });
  });

  // ------------------------------------------------------------------
  // 2.5.8 Testes Adicionais de Validação de Humidade e Luminosidade
  // ------------------------------------------------------------------
  describe('validateHerb - Validação de Humidade (Valores Limite)', () => {
    
    it('TU-43: VL humidade - -1% (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: -1,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });

    it('TU-44: VL humidade - 0% (limite inferior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 0,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-45: VL humidade - 100% (limite superior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 100,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-46: VL humidade - 101% (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 101,
        idealLuminosity: 15000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateHerb - Validação de Luminosidade (Valores Limite)', () => {
    
    it('TU-47: VL luminosidade - -1 lux (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: -1,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });

    it('TU-48: VL luminosidade - 0 lux (limite inferior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 0,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-49: VL luminosidade - 100000 lux (limite superior válido) -> isValid true', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 100000,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(true);
    });

    it('TU-50: VL luminosidade - 100001 lux (inválido) -> isValid false', () => {
      const herb = {
        name: 'Hortelã',
        scientificName: 'Mentha',
        idealTemperature: 20,
        idealHumidity: 60,
        idealLuminosity: 100001,
        daysToHarvest: 90
      };
      const result = herbsService.validateHerb(herb);
      expect(result.isValid).toBe(false);
    });
  });

});
