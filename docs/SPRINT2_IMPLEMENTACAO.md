# Sprint 2 - Importação CSV de Ervas Aromáticas

## Resumo das Implementações

### 1. **Dependências Instaladas**
- `multer` - para upload de ficheiros CSV

### 2. **Ficheiros Criados/Modificados**

#### Estrutura de Fixtures
```
tests/fixtures/
├── valido.csv          # 5 ervas válidas
├── invalido.csv        # 6 linhas com erros de validação
├── misto.csv          # 3 válidas + 2 inválidas
└── vazio.csv          # Ficheiro vazio
```

#### Código Implementado

**controllers/herbs.controller.js**
- Adicionado método `importCSV(req, res)` que:
  - Valida presença de ficheiro
  - Lê conteúdo do CSV
  - Processa via `herbsService.importFromCSV()`
  - Persiste ervas válidas na BD
  - Retorna resposta com estatísticas (total, válidas, inválidas, erros)

**routes/herbs.route.js**
- Adicionada rota `POST /herbs/import` com:
  - Middleware `multer` para upload
  - Validação de tipo de ficheiro (apenas CSV)
  - Limite de tamanho (10MB)

**src/services/herbsService.js**
- Método `importFromCSV()` já implementado que:
  - Remove header automaticamente
  - Valida cada linha com `validateHerbData()`
  - Segrega linhas válidas de inválidas
  - Retorna relatório detalhado com números de linha dos erros

### 3. **Testes de Integração Adicionados**

**tests/integration/herbs.integration.test.js** - Suite TI-05

| ID | Caso de Teste | Status |
|---|---|---|
| TI-05-01 | Importar ficheiro CSV válido com 5 ervas | ✅ PASS |
| TI-05-02 | Importar ficheiro CSV inválido com 6 linhas | ✅ PASS |
| TI-05-03 | Importar ficheiro CSV misto (3 válidas + 2 inválidas) | ✅ PASS |
| TI-05-04 | Rejeitar ficheiro CSV vazio | ✅ PASS |
| TI-05-05 | Validar estrutura de campos das ervas importadas | ✅ PASS |
| TI-05-06 | Mensagens de erro descrevem linha exata da falha | ✅ PASS |
| TI-05-07 | Ervas importadas passam na validação individual | ✅ PASS |
| TI-05-08 | Ficheiro misto segrega corretamente válidas/inválidas | ✅ PASS |

**Resultados dos Testes**
```
Test Suites: 1 passed, 1 total
Tests:       21 passed, 21 total
Time:        ~1.2s
```

### 4. **Técnicas Aplicadas**

#### Particionamento de Equivalência
- Linhas **válidas**: todos os campos corretos
- Linhas **inválidas**: campos faltando ou valores fora dos intervalos
- Linhas **parcialmente válidas**: alguns campos errados

#### Análise de Valores Limite
- Ficheiro vazio (0 linhas)
- Ficheiro com 1 linha
- Ficheiro com múltiplas linhas
- Temperatura mínima/máxima aceita apenas [18, 28]°C
- Humidade relativa [40, 80]%
- Luminosidade [5000, 25000] lux

### 5. **Exemplos de Uso**

#### Upload de ficheiro CSV
```bash
curl -X POST http://localhost:3000/herbs/import \
  -F "file=@tests/fixtures/valido.csv"
```

#### Resposta de Sucesso (201)
```json
{
  "message": "Importação concluída: 5 válidas, 0 inválidas",
  "total": 5,
  "valid": 5,
  "invalid": 0,
  "errors": [],
  "data": [
    {
      "id": "herb_1234567890_0",
      "nome": "Hortelã",
      "especie": "Mentha spicata",
      "tempMin": "15",
      "tempMax": "25",
      "umidadeMin": "50",
      "umidadeMax": "80",
      "luminosidadeMin": "5000",
      "luminosidadeMax": "20000",
      "criacao": "2026-05-14T10:30:00.000Z"
    },
    ...
  ]
}
```

#### Resposta de Erro (400)
```json
{
  "message": "Ficheiro CSV vazio ou inválido",
  "total": 6,
  "valid": 0,
  "invalid": 6,
  "errors": [
    "Linha 2 (Erva1): Temperatura mínima deve estar entre -50 e 50°C",
    "Linha 3 (Erva2): Temperatura mínima deve ser menor que a máxima",
    ...
  ],
  "data": []
}
```

### 6. **Ficheiros CSV Fixture**

**valido.csv** - 5 ervas válidas
```
nome,especie,tempMin,tempMax,umidadeMin,umidadeMax,luminosidadeMin,luminosidadeMax
Hortelã,Mentha spicata,15,25,50,80,5000,20000
Manjericão,Ocimum basilicum,18,28,40,70,8000,25000
...
```

**invalido.csv** - Erros variados
- Temperaturas fora de intervalo [-50, 50]
- Temperatura mínima >= máxima
- Humidade fora de [0, 100]
- Campos obrigatórios vazios

**misto.csv** - Combinação
- Linhas 1, 3, 5: Válidas
- Linhas 2, 4: Inválidas

**vazio.csv** - Ficheiro sem linhas

### 7. **Checklist Sprint 2**

- ✅ Implementar endpoint POST /herbs/import
- ✅ Usar multer para upload de ficheiros CSV
- ✅ Processar linhas válidas e inválidas
- ✅ Criar fixtures CSV (válido, inválido, misto, vazio)
- ✅ Testes com ficheiros reais (não ficticíos)
- ✅ Validação de estrutura e campos
- ✅ Mensagens de erro com número de linha
- ✅ Persistência de dados na BD
- ✅ Segmentação de estatísticas (total, válidas, inválidas)
- ✅ Aplicar particionamento de equivalência
- ✅ Aplicar análise de valores limite

## Próximos Passos

1. Adicionar testes de sistema (E2E) com Supertest/Postman
2. Implementar tratamento de erros para ficheiros Excel
3. Adicionar matriz de rastreabilidade completa
4. Cobertura de código com relatório detalhado
