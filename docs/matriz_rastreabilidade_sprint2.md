# Matriz de Rastreabilidade - Sprint 2
**GREENHERB - Gestão Inteligente de Estufa**  
**Engenharia de Software II - Ano Letivo 2025/2026**

---

## 📊 Legenda de Estados

| Ícone | Estado | Descrição |
|:-----:|:-------|:----------|
| ✅ | **Passou** | Teste executado com sucesso, resultado obtido = resultado esperado |
| ❌ | **Falhou** | Teste executado, mas resultado obtido ≠ resultado esperado |
| ⏸️ | **Pendente** | Teste não executado ou aguardando correção |

**Status Atual:** ✅ 86/86 testes passaram (100%)

---

## Sumário Executivo

Este documento apresenta a matriz de rastreabilidade completa do Sprint 2, cobrindo:
- **Importação do catálogo de ervas aromáticas** (herbsService)
- **Criação de planos de cultivo** (plansService)

A matriz inclui:
- Casos de teste com ID único (TU-15 a TU-100)
- Mapeamento de requisitos/regras de negócio
- Técnicas de teste aplicadas (PE, VL, MC/DC)
- Resultados esperados vs obtidos
- Estado de cada teste (✅ Passou / ❌ Falhou / ⏸️ Pendente)
- Pré-condições necessárias para execução

### Métricas de Cobertura de Testes

| Métrica | Valor |
|---------|-------|
| **Cobertura de Instruções** | 92.39% |
| **Cobertura de Ramos** | 94.24% |
| **Cobertura de Funções** | 100% |
| **Cobertura de Linhas** | 92.3% |
| **Total de Testes** | 86 testes (TU-15 a TU-100) |
| **Taxa de Sucesso** | 100% |

---

## Distribuição de Testes por Técnica

| Técnica | Quantidade | Percentual |
|---------|------------|------------|
| **Particionamento de Equivalência (PE)** | 32 | 37.2% |
| **Valores Limite (VL)** | 44 | 51.2% |
| **Cobertura de Condições Múltiplas (MC/DC)** | 10 | 11.6% |

---

## Colunas da Matriz de Rastreabilidade

| Coluna | Descrição |
|:-------|:----------|
| **ID** | Identificador único do teste (TU-15 a TU-100) |
| **Requisito / Regra** | Requisito funcional (RF) ou Regra de Negócio (RN) testada |
| **Endpoint** | Endpoint REST ou componente interno testado |
| **Nível** | Nível do teste (Unidade, Integração ou Sistema) |
| **Técnica** | Técnica de teste aplicada (PE, VL, MC/DC) |
| **Resultado Esperado** | Comportamento esperado segundo a especificação |
| **Resultado Obtido** | Comportamento real observado na execução |
| **Estado** | ✅ Passou / ❌ Falhou / ⏸️ Pendente |
| **Pré-condições** | Estado inicial necessário para executar o teste |

**Notas:**
- **Resultado Esperado:** Define o comportamento correto segundo a especificação (requisitos e regras de negócio)
- **Resultado Obtido:** Regista o comportamento real observado durante a execução do teste
- **Estado ✅ Passou:** Indica que Resultado Obtido = Resultado Esperado
- Todos os 86 testes do Sprint 2 passaram com sucesso (100% success rate)

---

## 1. Testes de Unidade - herbsService (36 testes)

### 1.1 validateHerb - Particionamento de Equivalência

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-15 | RF-03: Validação de ervas | (validador interno) | Unidade | PE erro | Lança "Herb data is required" | Lançou "Herb data is required" | ✅ Passou | herbData null |
| TU-16 | RF-03: Validação de ervas | (validador interno) | Unidade | PE erro | Lança "Herb data is required" | Lançou "Herb data is required" | ✅ Passou | herbData undefined |
| TU-17 | RF-03: Nome obrigatório | (validador interno) | Unidade | PE inválida | isValid false, erro "Nome é obrigatório" | isValid=false, erro correto | ✅ Passou | Erva sem nome |
| TU-18 | RF-03: Nome científico obrigatório | (validador interno) | Unidade | PE inválida | isValid false, erro "Nome científico é obrigatório" | isValid=false, erro correto | ✅ Passou | Erva sem nome científico |
| TU-19 | RF-03: Temperatura obrigatória | (validador interno) | Unidade | PE inválida | isValid false, erro "Temperatura ideal é obrigatória" | isValid=false, erro correto | ✅ Passou | Erva sem temperatura |
| TU-20 | RF-03: Validação completa | (validador interno) | Unidade | PE válida | isValid true, sem erros | isValid=true, errors=[] | ✅ Passou | Todos os campos válidos |

### 1.2 validateHerb - Valores Limite

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-21 | RF-03: Nome 2-100 chars | (validador interno) | Unidade | VL (1 char) | isValid false | isValid=false | ✅ Passou | isValid=false | ✅ Passou | Nome com 1 caractere |
| TU-22 | RF-03: Nome 2-100 chars | (validador interno) | Unidade | VL (2 chars - limite inf.) | isValid true | isValid=true | ✅ Passou | Nome com 2 caracteres |
| TU-23 | RF-03: Nome 2-100 chars | (validador interno) | Unidade | VL (100 chars - limite sup.) | isValid true | isValid=true | ✅ Passou | Nome com 100 caracteres |
| TU-24 | RF-03: Nome 2-100 chars | (validador interno) | Unidade | VL (101 chars) | isValid false | isValid=false | ✅ Passou | Nome com 101 caracteres |
| TU-25 | RF-03: Temperatura 0-50°C | (validador interno) | Unidade | VL (-1°C) | isValid false | isValid=false | ✅ Passou | Temperatura -1°C |
| TU-26 | RF-03: Temperatura 0-50°C | (validador interno) | Unidade | VL (0°C - limite inf.) | isValid true | isValid=true | ✅ Passou | Temperatura 0°C |
| TU-27 | RF-03: Temperatura 0-50°C | (validador interno) | Unidade | VL (50°C - limite sup.) | isValid true | isValid=true | ✅ Passou | Temperatura 50°C |
| TU-28 | RF-03: Temperatura 0-50°C | (validador interno) | Unidade | VL (51°C) | isValid false | isValid=false | ✅ Passou | Temperatura 51°C |
| TU-29 | RF-03: Dias colheita 1-365 | (validador interno) | Unidade | VL (0 dias) | isValid false | isValid=false | ✅ Passou | 0 dias até colheita |
| TU-30 | RF-03: Dias colheita 1-365 | (validador interno) | Unidade | VL (1 dia - limite inf.) | isValid true | isValid=true | ✅ Passou | 1 dia até colheita |
| TU-31 | RF-03: Dias colheita 1-365 | (validador interno) | Unidade | VL (365 dias - limite sup.) | isValid true | isValid=true | ✅ Passou | 365 dias até colheita |
| TU-32 | RF-03: Dias colheita 1-365 | (validador interno) | Unidade | VL (366 dias) | isValid false | isValid=false | ✅ Passou | 366 dias até colheita |
| TU-43 | RF-03: Humidade 0-100% | (validador interno) | Unidade | VL (-1%) | isValid false | isValid=false | ✅ Passou | Humidade -1% |
| TU-44 | RF-03: Humidade 0-100% | (validador interno) | Unidade | VL (0% - limite inf.) | isValid true | isValid=true | ✅ Passou | Humidade 0% |
| TU-45 | RF-03: Humidade 0-100% | (validador interno) | Unidade | VL (100% - limite sup.) | isValid true | isValid=true | ✅ Passou | Humidade 100% |
| TU-46 | RF-03: Humidade 0-100% | (validador interno) | Unidade | VL (101%) | isValid false | isValid=false | ✅ Passou | Humidade 101% |
| TU-47 | RF-03: Luminosidade 0-100000 lux | (validador interno) | Unidade | VL (-1 lux) | isValid false | isValid=false | ✅ Passou | Luminosidade -1 lux |
| TU-48 | RF-03: Luminosidade 0-100000 lux | (validador interno) | Unidade | VL (0 lux - limite inf.) | isValid true | isValid=true | ✅ Passou | Luminosidade 0 lux |
| TU-49 | RF-03: Luminosidade 0-100000 lux | (validador interno) | Unidade | VL (100000 lux - limite sup.) | isValid true | isValid=true | ✅ Passou | Luminosidade 100000 lux |
| TU-50 | RF-03: Luminosidade 0-100000 lux | (validador interno) | Unidade | VL (100001 lux) | isValid false | isValid=false | ✅ Passou | Luminosidade 100001 lux |

### 1.3 parseCsvLine - Particionamento de Equivalência

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-33 | RF-03: Parse CSV | (parser interno) | Unidade | PE inválida | status 'invalid', erro "Linha vazia" | status='invalid', erro correto | ✅ Passou | Linha vazia |
| TU-34 | RF-03: Parse CSV | (parser interno) | Unidade | PE inválida | status 'invalid', erro formato inválido | status='invalid', erro correto | ✅ Passou | Menos de 6 campos |
| TU-35 | RF-03: Parse CSV | (parser interno) | Unidade | PE válida | status 'valid', data preenchida | status='valid', data completa | ✅ Passou | 6 campos válidos |
| TU-36 | RF-03: Parse CSV | (parser interno) | Unidade | PE inválida | status 'invalid', múltiplos erros | status='invalid', múltiplos erros | ✅ Passou | Valores numéricos inválidos |

### 1.4 importHerbsFromCsv - Casos Combinados

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-37 | RF-03: Importação CSV | POST /herbs/import | Unidade | PE erro | Lança "CSV content is required" | Lançou "CSV content is required" | ✅ Passou | Conteúdo null |
| TU-38 | RF-03: Importação CSV | POST /herbs/import | Unidade | PE erro | Lança "CSV file is empty" | Lançou "CSV file is empty" | ✅ Passou | Conteúdo vazio |
| TU-39 | RF-03: Importação CSV | POST /herbs/import | Unidade | PE erro | Lança "CSV file has no data rows" | Lançou "CSV file has no data rows" | ✅ Passou | Apenas cabeçalho |
| TU-40 | RF-03: Importação CSV | POST /herbs/import | Unidade | PE válida | total=2, valid=2, invalid=0 | total=2, valid=2, invalid=0 | ✅ Passou | Ficheiro com 2 linhas válidas |
| TU-41 | RF-03: Importação CSV | POST /herbs/import | Unidade | PE inválida | total=2, valid=0, invalid=2 | total=2, valid=0, invalid=2 | ✅ Passou | Ficheiro com 2 linhas inválidas |
| TU-42 | RF-03: Importação CSV | POST /herbs/import | Unidade | PE mista | total=3, valid=2, invalid=1 | total=3, valid=2, invalid=1 | ✅ Passou | Ficheiro misto (2 válidas, 1 inválida) |

---

## 2. Testes de Unidade - plansService (50 testes)

### 2.1 isValidPlanType - Particionamento de Equivalência

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-51 | RF-04: Tipo de plano válido | (validador interno) | Unidade | PE válida | true | true | ✅ Passou | Tipo "regular" |
| TU-52 | RF-04: Tipo de plano válido | (validador interno) | Unidade | PE válida | true | true | ✅ Passou | Tipo "emergencia" |
| TU-53 | RF-04: Tipo de plano válido | (validador interno) | Unidade | PE válida | true | true | ✅ Passou | Tipo "pontual" |
| TU-54 | RF-04: Tipo de plano inválido | (validador interno) | Unidade | PE inválida | false | false | ✅ Passou | Tipo "invalido" |
| TU-55 | RF-04: Tipo de plano inválido | (validador interno) | Unidade | PE inválida | false | false | ✅ Passou | Tipo null |
| TU-56 | RF-04: Tipo de plano inválido | (validador interno) | Unidade | PE inválida | false | false | ✅ Passou | Tipo undefined |
| TU-57 | RF-04: Tipo case-insensitive | (validador interno) | Unidade | PE válida | true | true | ✅ Passou | Tipo "REGULAR" (maiúsculas) |

### 2.2 validateTemperatureRange - Valores Limite

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-58 | RN-01: Temperatura plano [18-28°C] | (validador interno) | Unidade | VL (17°C) | isValid false | isValid=false | ✅ Passou | isValid=false | ✅ Passou | min=17, max=25 |
| TU-59 | RN-01: Temperatura plano [18-28°C] | (validador interno) | Unidade | VL (18°C - limite inf.) | isValid true | isValid=true | ✅ Passou | min=18, max=25 |
| TU-60 | RN-01: Temperatura plano [18-28°C] | (validador interno) | Unidade | VL (23°C - nominal) | isValid true | isValid=true | ✅ Passou | min=23, max=25 |
| TU-61 | RN-01: Temperatura plano [18-28°C] | (validador interno) | Unidade | VL (28°C - limite sup.) | isValid true | isValid=true | ✅ Passou | min=18, max=28 |
| TU-62 | RN-01: Temperatura plano [18-28°C] | (validador interno) | Unidade | VL (29°C) | isValid false | isValid=false | ✅ Passou | min=18, max=29 |
| TU-63 | RN-01: Temperatura min <= max | (validador interno) | Unidade | PE inválida | isValid false | isValid=false | ✅ Passou | min > max |
| TU-64 | RN-01: Temperatura obrigatória | (validador interno) | Unidade | PE inválida | isValid false | isValid=false | ✅ Passou | min null |

### 2.3 validateHumidityRange - Valores Limite

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-65 | RN-01: Humidade plano [40-80%] | (validador interno) | Unidade | VL (39%) | isValid false | isValid=false | ✅ Passou | min=39, max=70 |
| TU-66 | RN-01: Humidade plano [40-80%] | (validador interno) | Unidade | VL (40% - limite inf.) | isValid true | isValid=true | ✅ Passou | min=40, max=70 |
| TU-67 | RN-01: Humidade plano [40-80%] | (validador interno) | Unidade | VL (60% - nominal) | isValid true | isValid=true | ✅ Passou | min=60, max=70 |
| TU-68 | RN-01: Humidade plano [40-80%] | (validador interno) | Unidade | VL (80% - limite sup.) | isValid true | isValid=true | ✅ Passou | min=40, max=80 |
| TU-69 | RN-01: Humidade plano [40-80%] | (validador interno) | Unidade | VL (81%) | isValid false | isValid=false | ✅ Passou | min=40, max=81 |
| TU-70 | RN-01: Humidade min <= max | (validador interno) | Unidade | PE inválida | isValid false | isValid=false | ✅ Passou | min > max |

### 2.4 validateLuminosityRange - Valores Limite

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-71 | RN-01: Luminosidade plano [5000-25000 lux] | (validador interno) | Unidade | VL (4999 lux) | isValid false | isValid=false | ✅ Passou | min=4999, max=15000 |
| TU-72 | RN-01: Luminosidade plano [5000-25000 lux] | (validador interno) | Unidade | VL (5000 lux - limite inf.) | isValid true | isValid=true | ✅ Passou | min=5000, max=15000 |
| TU-73 | RN-01: Luminosidade plano [5000-25000 lux] | (validador interno) | Unidade | VL (15000 lux - nominal) | isValid true | isValid=true | ✅ Passou | min=15000, max=20000 |
| TU-74 | RN-01: Luminosidade plano [5000-25000 lux] | (validador interno) | Unidade | VL (25000 lux - limite sup.) | isValid true | isValid=true | ✅ Passou | min=5000, max=25000 |
| TU-75 | RN-01: Luminosidade plano [5000-25000 lux] | (validador interno) | Unidade | VL (25001 lux) | isValid false | isValid=false | ✅ Passou | min=5000, max=25001 |
| TU-76 | RN-01: Luminosidade min <= max | (validador interno) | Unidade | PE inválida | isValid false | isValid=false | ✅ Passou | min > max |

### 2.5 validateDuration - Valores Limite

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-77 | RN-01: Duração plano [1-365 dias] | (validador interno) | Unidade | VL (0 dias) | isValid false | isValid=false | ✅ Passou | duration=0 |
| TU-78 | RN-01: Duração plano [1-365 dias] | (validador interno) | Unidade | VL (1 dia - limite inf.) | isValid true | isValid=true | ✅ Passou | duration=1 |
| TU-79 | RN-01: Duração plano [1-365 dias] | (validador interno) | Unidade | VL (90 dias - nominal) | isValid true | isValid=true | ✅ Passou | duration=90 |
| TU-80 | RN-01: Duração plano [1-365 dias] | (validador interno) | Unidade | VL (365 dias - limite sup.) | isValid true | isValid=true | ✅ Passou | duration=365 |
| TU-81 | RN-01: Duração plano [1-365 dias] | (validador interno) | Unidade | VL (366 dias) | isValid false | isValid=false | ✅ Passou | duration=366 |
| TU-82 | RN-01: Duração deve ser inteiro | (validador interno) | Unidade | PE inválida | isValid false | isValid=false | ✅ Passou | duration=90.5 |

### 2.6 validatePlanCreation - Validação Completa

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-83 | RF-04: Validação de plano | POST /plans | Unidade | PE erro | Lança "Plan data is required" | Lançou "Plan data is required" | ✅ Passou | planData null |
| TU-84 | RF-04: Tipo de plano válido | POST /plans | Unidade | PE inválida | isValid false | isValid=false | ✅ Passou | Tipo inválido |
| TU-85 | RF-04: Criação plano regular | POST /plans | Unidade | PE válida | isValid true, sem erros | isValid=true, errors=[] | ✅ Passou | Plano regular válido |
| TU-86 | RN-04: Plano pontual sem autorização | POST /plans | Unidade | PE inválida | isValid false, erro "requer autorização" | isValid=false, erro correto | ✅ Passou | Plano pontual, hasAuthorization=false |
| TU-87 | RN-04: Plano pontual com autorização | POST /plans | Unidade | PE válida | isValid true | isValid=true | ✅ Passou | Plano pontual, hasAuthorization=true |
| TU-88 | RF-04: Múltiplos erros de validação | POST /plans | Unidade | PE inválida | isValid false, múltiplos erros | isValid=false, 7+ erros | ✅ Passou | Todos os parâmetros inválidos |
| TU-99 | RF-04: Criação plano emergência | POST /plans | Unidade | PE válida | isValid true | isValid=true | ✅ Passou | Plano emergência válido |
| TU-100 | RF-04: Plano emergência não requer autorização | POST /plans | Unidade | PE válida | isValid true | isValid=true | ✅ Passou | Plano emergência, hasAuthorization=false |

### 2.7 validatePontualPlanAuthorization - MC/DC

**Tabela de Verdade para MC/DC:**

Decisão: `(C1: isPontual) && (C2: hasAuthorization) && (C3: parametersValid)`

| ID | C1 (isPontual) | C2 (hasAuth) | C3 (paramsValid) | Resultado | Descrição |
|:---|:---:|:---:|:---:|:---:|:---|
| TU-89 | F | F | F | false | Plano regular, params inválidos |
| TU-90 | F | F | T | **true** | Plano regular, params válidos |
| TU-91 | F | T | F | false | Plano emergência, params inválidos |
| TU-92 | F | T | T | **true** | Plano emergência, params válidos |
| TU-93 | T | F | F | false | Pontual sem autorização |
| TU-94 | T | F | T | false | Pontual sem autorização (params ok) |
| TU-95 | T | T | F | false | Pontual autorizado, params inválidos |
| TU-96 | T | T | T | **true** | Pontual autorizado e válido ✓ |

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Resultado Esperado | Resultado Obtido | Estado | Pré-condições |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| TU-89 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (F-F-F) | canCreate false | canCreate=false | ✅ Passou | Plano regular, params inválidos |
| TU-90 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (F-F-T) | canCreate true | canCreate=true | ✅ Passou | Plano regular, params válidos |
| TU-91 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (F-T-F) | canCreate false | canCreate=false | ✅ Passou | Plano emergência, params inválidos |
| TU-92 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (F-T-T) | canCreate true | canCreate=true | ✅ Passou | Plano emergência, params válidos |
| TU-93 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (T-F-F) | canCreate false | canCreate=false | ✅ Passou | Pontual sem autorização |
| TU-94 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (T-F-T) | canCreate false | canCreate=false | ✅ Passou | Pontual sem autorização (C2 crítico) |
| TU-95 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (T-T-F) | canCreate false | canCreate=false | ✅ Passou | Pontual autorizado, params inválidos (C3 crítico) |
| TU-96 | RN-04: Validação pontual | (validador interno) | Unidade | MC/DC (T-T-T) | canCreate true | canCreate=true | ✅ Passou | Pontual autorizado e válido |
| TU-97 | RN-04: Tipo null | (validador interno) | Unidade | PE erro | canCreate false | canCreate=false | ✅ Passou | planType null |
| TU-98 | RN-04: Tipo undefined | (validador interno) | Unidade | PE erro | canCreate false | canCreate=false | ✅ Passou | planType undefined |

**Análise MC/DC:**
- **C1 (isPontual)**: Comparando TU-90 (F) vs TU-96 (T) - C1 afeta o resultado quando C2=T e C3=T
- **C2 (hasAuthorization)**: Comparando TU-94 (F) vs TU-96 (T) - C2 afeta o resultado quando C1=T e C3=T
- **C3 (parametersValid)**: Comparando TU-95 (F) vs TU-96 (T) - C3 afeta o resultado quando C1=T e C2=T

Cada condição demonstra independência: mudando apenas uma condição, o resultado da decisão muda.

---

## 3. Cobertura Bidirecional

### 3.1 Requisitos → Casos de Teste

| Requisito | Descrição | Casos de Teste | Total |
|:---|:---|:---|:---:|
| RF-03 | Importação e validação de ervas aromáticas | TU-15 a TU-50 | 36 |
| RF-04 | Criação e validação de planos de cultivo | TU-51 a TU-100 | 50 |
| RN-01 | Intervalos válidos para temp, hum, lux, duração | TU-58 a TU-82 | 25 |
| RN-04 | Plano pontual requer autorização do Resp. Técnico | TU-86, TU-87, TU-89 a TU-98 | 12 |

### 3.2 Endpoints → Casos de Teste

| Endpoint | Método | Casos de Teste | Total |
|:---|:---:|:---|:---:|
| /herbs/import | POST | TU-37 a TU-42 | 6 |
| /plans | POST | TU-83 a TU-88, TU-99, TU-100 | 8 |

---

## 4. Defeitos Encontrados e Estado dos Testes

### 4.1 Estado Geral
**Estado:** ✅ **TODOS OS TESTES PASSARAM**

| Estado | Quantidade | Percentual |
|:-------|:----------:|:----------:|
| ✅ Passou | 86 | 100% |
| ❌ Falhou | 0 | 0% |
| ⏸️ Pendente | 0 | 0% |

### 4.2 Resultados Obtidos vs Esperados
Todos os 86 testes do Sprint 2 obtiveram os resultados esperados conforme especificado na matriz:
- **herbsService:** 36/36 testes passaram
- **plansService:** 50/50 testes passaram

### 4.3 Defeitos
Nenhum defeito foi encontrado durante a execução dos testes do Sprint 2. Todos os testes passaram com sucesso na primeira execução após correção de um pequeno ajuste na validação de strings vazias no herbsService.

---

## 5. Conclusões e Recomendações

### 5.1 Pontos Fortes
✓ Cobertura de código excelente (>92% em todas as métricas)  
✓ 100% de cobertura de funções  
✓ Aplicação rigorosa de técnicas de teste formais (PE, VL, MC/DC)  
✓ Validação completa de regras de negócio críticas  
✓ Documentação detalhada com tabela de verdade MC/DC  

### 5.2 Áreas de Melhoria
- Aumentar cobertura de linhas para >95% nos próximos sprints
- Adicionar testes de integração para validar fluxos end-to-end
- Considerar testes de mutação para validar qualidade dos testes

### 5.3 Próximos Passos (Sprint 3)
- Implementar testes de integração para herbsController e plansController
- Criar testes de sistema (E2E) para fluxos completos
- Adicionar testes de validação de ficheiros CSV reais
- Implementar testes de performance para importações massivas

---

## 6. Referências

- Enunciado do Trabalho Prático - GREENHERB
- Matriz de Rastreabilidade Sprint 1
- Relatório de Cobertura Jest (coverage/lcov-report/index.html)

---

**Documento gerado em:** 14 de maio de 2026  
**Versão:** 1.0  
**Autores:** [Nome do Grupo]
