# Matriz de Rastreabilidade - Sprint 2
## Serviços de Ervas Aromáticas e Planos de Cultivo

### Legendas e Abreviações

| Sigla | Significado |
|---|---|
| TU | Teste de Unidade |
| TI | Teste de Integração |
| PE | Particionamento de Equivalência |
| VL | Análise de Valores Limite |
| MC/DC | Modified Condition/Decision Coverage |

---

## Testes Unitários - Herbs Service (25 testes)

### Particionamento de Equivalência (Herbs)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-H01 | RF-03: Validação básica de herb | validateHerbData | Unidade | PE | Aceito (valid=true) | Aceito (valid=true, errors=[]) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H02 | RF-03: Campo nome obrigatório | validateHerbData | Unidade | PE | Rejeitado (valid=false) | Rejeitado (errors contêm "Nome é obrigatório") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H03 | RF-03: Campo especie obrigatório | validateHerbData | Unidade | PE | Rejeitado (valid=false) | Rejeitado (errors contêm "Espécie é obrigatória") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H04 | RF-03: Validação objeto herb | validateHerbData | Unidade | PE | Rejeitado (valid=false) | Rejeitado (errors[0]="Herb object is required") | Pass | Nenhuma. Teste isolado sem dependências externas. |

### Análise de Valores Limite - Temperatura (Herbs)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-H05 | RN-05: Limite inferior temperatura | validateHerbData | Unidade | VL | Rejeitado (tempMin=-51 < -50) | Rejeitado (errors: "Temperatura mínima deve estar entre -50 e 50") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H06 | RN-05: Limite inferior temperatura | validateHerbData | Unidade | VL | Aceito (tempMin=-50 = fronteira) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H07 | RN-05: Valor nominal temperatura | validateHerbData | Unidade | VL | Aceito (tempMin=0 = centro) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H08 | RN-05: Limite superior temperatura | validateHerbData | Unidade | VL | Aceito (tempMax=50 = fronteira) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H09 | RN-05: Limite superior temperatura | validateHerbData | Unidade | VL | Rejeitado (tempMin=51 > 50) | Rejeitado (errors: "Temperatura mínima deve estar entre -50 e 50") | Pass | Nenhuma. Teste isolado sem dependências externas. |

### Análise de Valores Limite - Umidade & Luminosidade (Herbs)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-H10 | RN-10: Limites umidade | validateHerbData | Unidade | VL | Rejeitado (umidadeMin=-1 < 0) | Rejeitado (errors: "Umidade mínima deve estar entre 0 e 100") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H11 | RN-10: Limites umidade | validateHerbData | Unidade | VL | Aceito (umidadeMin=0, umidadeMax=100) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H12 | RN-10: Limites umidade | validateHerbData | Unidade | VL | Rejeitado (umidadeMax=101 > 100) | Rejeitado (errors: "Umidade máxima deve estar entre 0 e 100") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H13 | RN-13: Limites luminosidade | validateHerbData | Unidade | VL | Aceito (luminosidadeMin=0) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H14 | RN-13: Limites luminosidade | validateHerbData | Unidade | VL | Aceito (luminosidadeMax=100000) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-H15 | RN-13: Limites luminosidade | validateHerbData | Unidade | VL | Rejeitado (luminosidadeMax=100001) | Rejeitado (errors: "Luminosidade máxima deve estar entre 0 e 100000") | Pass | Nenhuma. Teste isolado sem dependências externas. |

### Importação CSV (Herbs)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-H16 | RF-04: Importar CSV válido | importFromCSV | Unidade | PE | 1 herb aceito | total=1, valid=1, invalid=0, data.length=1 | Pass | Nenhuma. CSV inline fornecido no teste. |
| TU-H17 | RF-04: Importar CSV misto | importFromCSV | Unidade | PE | 1 aceito, 1 rejeitado | total=2, valid=1, invalid=1, errors.length>0 | Pass | Nenhuma. CSV inline fornecido no teste. |
| TU-H18 | RF-05: Rejeitar CSV vazio | importFromCSV | Unidade | PE | Erro "CSV content must be a non-empty string" | errors[0]="CSV content must be a non-empty string" | Pass | Nenhuma. CSV vazio inline. |
| TU-H19 | RF-06: Rejeitar CSV null | importFromCSV | Unidade | PE | Erro "CSV content must be a non-empty string" | errors[0]="CSV content must be a non-empty string" | Pass | Nenhuma. Null passado como argumento. |
| TU-H20 | RF-07: CSV sem header | importFromCSV | Unidade | PE | 2 herbs aceitos | total=2, valid=2, data.length=2 | Pass | Nenhuma. CSV inline sem header. |
| TU-H21 | RN-05: Temperatura limite (VL) | importFromCSV | Unidade | VL | Aceito (tempMin=18) | valid=1, data[0].tempMin="18" | Pass | Nenhuma. CSV inline fornecido no teste. |
| TU-H22 | RN-05: Temperatura fora limite | importFromCSV | Unidade | VL | Rejeitado (tempMin=-51) | valid=0, invalid=1 | Pass | Nenhuma. CSV inline fornecido no teste. |

### Parse CSV Line (Herbs)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-H23 | RF-04: Parse linha CSV | parseCSVLine | Unidade | PE | Objeto herb completo | { nome:"Hortelã", especie:"Mentha piperita", tempMin:"15" } | Pass | Nenhuma. Linha CSV inline. |
| TU-H24 | RF-04: Parse linha inválida | parseCSVLine | Unidade | PE | null (poucos campos) | null | Pass | Nenhuma. Linha CSV inline. |
| TU-H25 | RF-04: Parse com espaços | parseCSVLine | Unidade | PE | Objeto herb com trim | { nome:"Hortelã", especie:"Mentha piperita" } (sem espaços) | Pass | Nenhuma. Linha CSV inline. |

---

## Testes Unitários - Plans Service (37 testes)

### Particionamento de Equivalência (Plans)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P01 | RF-13: Validar tipo "regular" | validatePlanData | Unidade | PE | Aceito (valid=true) | Aceito (valid=true, errors=[]) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P02 | RF-13: Validar tipo "emergência" | validatePlanData | Unidade | PE | Aceito (valid=true) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P03 | RF-13: Validar tipo "pontual" com autorização | validatePlanData | Unidade | PE | Aceito (valid=true) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P04 | RF-13: Rejeitar tipo inválido | validatePlanData | Unidade | PE | Rejeitado (valid=false) | Rejeitado (errors: "Tipo de plano inválido") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P05 | RF-13: Campo tipo obrigatório | validatePlanData | Unidade | PE | Rejeitado (valid=false) | Rejeitado (errors: "Tipo de plano inválido") | Pass | Nenhuma. Teste isolado sem dependências externas. |

### Análise de Valores Limite - Duração (Plans)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P06 | RN-20: Duração [1, 365] | validatePlanData | Unidade | VL | Rejeitado (duracao=0 < 1) | Rejeitado (errors: "Duração deve estar entre 1 e 365") | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P07 | RN-20: Duração [1, 365] | validatePlanData | Unidade | VL | Aceito (duracao=1 = mínimo) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P08 | RN-20: Duração [1, 365] | validatePlanData | Unidade | VL | Aceito (duracao=180 = centro) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P09 | RN-20: Duração [1, 365] | validatePlanData | Unidade | VL | Aceito (duracao=365 = máximo) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado sem dependências externas. |
| TU-P10 | RN-20: Duração [1, 365] | validatePlanData | Unidade | VL | Rejeitado (duracao=366 > 365) | Rejeitado (errors: "Duração deve estar entre 1 e 365") | Pass | Nenhuma. Teste isolado sem dependências externas. |

### Análise de Valores Limite - Temperatura, Umidade, Luminosidade (Plans)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P11 | RN-05: Temperatura absoluta | validatePlanData | Unidade | VL | Aceito (tempMin=17 dentro [-50,50]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P12 | RN-05: Temperatura absoluta | validatePlanData | Unidade | VL | Aceito (tempMin=18 dentro [-50,50]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P13 | RN-10: Umidade absoluta | validatePlanData | Unidade | VL | Aceito (umidadeMin=39 dentro [0,100]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P14 | RN-10: Umidade absoluta | validatePlanData | Unidade | VL | Aceito (umidadeMin=40 dentro [0,100]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P15 | RN-13: Luminosidade absoluta | validatePlanData | Unidade | VL | Aceito (lumMin=4999 dentro [0,100000]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P16 | RN-13: Luminosidade absoluta | validatePlanData | Unidade | VL | Aceito (lumMin=5000 dentro [0,100000]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P17 | RN-13: Luminosidade absoluta | validatePlanData | Unidade | VL | Aceito (lumMax=25000 dentro [0,100000]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |
| TU-P18 | RN-13: Luminosidade absoluta | validatePlanData | Unidade | VL | Aceito (lumMax=25001 dentro [0,100000]) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. |

### MC/DC - Plano Pontual com Autorização

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P19 | RN-04: Plano pontual exige autorização | validatePlanData | Unidade | MC/DC | Rejeitado (pontual sem auth) | Rejeitado (errors: "Plano pontual requer autorização") | Pass | Nenhuma. Teste isolado. C1=T, C2=T → Erro. |
| TU-P20 | RN-04: Plano pontual exige autorização | validatePlanData | Unidade | MC/DC | Aceito (pontual com auth) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. C1=T, C2=F → OK. |
| TU-P21 | RN-04: Plano pontual exige autorização | validatePlanData | Unidade | MC/DC | Aceito (regular sem auth) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. C1=F, C2=T → OK. |
| TU-P22 | RN-04: Plano pontual exige autorização | validatePlanData | Unidade | MC/DC | Aceito (regular com auth) | Aceito (valid=true) | Pass | Nenhuma. Teste isolado. C1=F, C2=F → OK. |

### MC/DC - Classificação de Alertas

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P23 | RN-30: Classificar alerta | classifyAlert | Unidade | MC/DC | Aviso (1 violação temp) | "Aviso" | Pass | Nenhuma. Limites e medição passados como argumentos. |
| TU-P24 | RN-30: Classificar alerta | classifyAlert | Unidade | MC/DC | Aviso (1 violação humidade) | "Aviso" | Pass | Nenhuma. Limites e medição passados como argumentos. |
| TU-P25 | RN-30: Classificar alerta | classifyAlert | Unidade | MC/DC | Crítico (2+ violações) | "Crítico" | Pass | Nenhuma. Limites e medição passados como argumentos. |
| TU-P26 | RN-30: Classificar alerta | classifyAlert | Unidade | MC/DC | Informativo (0 violações) | "Informativo" | Pass | Nenhuma. Limites e medição passados como argumentos. |
| TU-P27 | RN-30: Sensor desativo | classifyAlert | Unidade | MC/DC | null (sensor not OK) | null | Pass | Nenhuma. sensorOK=false passado como argumento. |

### Produtividade (Plans)

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P28 | RN-35: Calcular produtividade | calculateProductivity | Unidade | PE | 100% produtividade (sem perdas) | produtividade=100, produzido=100 | Pass | Nenhuma. Lote em memória com dataFim. |
| TU-P29 | RN-35: Calcular produtividade | calculateProductivity | Unidade | PE | 90% produtividade (10 perdas) | produtividade=90, produzido=90, perdas=10 | Pass | Nenhuma. Lote em memória com dataFim. |
| TU-P30 | RN-35: Calcular produtividade | calculateProductivity | Unidade | PE | 80% produtividade (20 divisões) | produtividade=80, divisoes=20 | Pass | Nenhuma. Lote em memória com dataFim. |
| TU-P31 | RN-35: Validar dados obrigatórios | calculateProductivity | Unidade | PE | Erro (sem dataFim) | Lançou exceção: "Lote e data de fim são obrigatórios" | Pass | Nenhuma. Lote em memória sem dataFim. |

### MC/DC - Transição de Estados

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TU-P32 | RN-39: ativo → concluído | validateStateTransition | Unidade | MC/DC | Permitido (dataFim presente) | permitido=true | Pass | Nenhuma. Lote em memória com dataFim. |
| TU-P33 | RN-39: ativo → concluído | validateStateTransition | Unidade | MC/DC | Rejeitado (dataFim ausente) | permitido=false, erro="Data de fim é obrigatória" | Pass | Nenhuma. Lote em memória sem dataFim. |
| TU-P34 | RN-40: ativo → comprometido | validateStateTransition | Unidade | MC/DC | Permitido (perdas registadas) | permitido=true | Pass | Nenhuma. Lote em memória com perdas. |
| TU-P35 | RN-40: ativo → comprometido | validateStateTransition | Unidade | MC/DC | Rejeitado (perdas ausentes) | permitido=false | Pass | Nenhuma. Lote em memória sem perdas. |
| TU-P36 | RN-41: estado final não transita | validateStateTransition | Unidade | MC/DC | Rejeitado (concluído → ativo) | permitido=false | Pass | Nenhuma. Lote em estado concluído. |
| TU-P37 | RN-42: estado inválido | validateStateTransition | Unidade | MC/DC | Rejeitado (estado inexistente) | permitido=false | Pass | Nenhuma. Lote em memória. |

---

## Testes de Integração (21 testes)

### Matriz de Integração

| ID | Requisito / Regra | Endpoint(s) Exercitado(s) | Nível | Técnica | Resultado Esperado | Resultados Obtidos | Estado | Pré-condições |
|---|---|---|---|---|---|---|---|---|
| TI-01-01 | RF-13: Criar plano a partir de erva | importFromCSV, validatePlanData | Integração | PE | Herb + Plano criados com limites reais | import: 1 válida; planValidation.valid=true | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-01-02 | RF-14: Múltiplas ervas, múltiplos planos | importFromCSV, validatePlanData | Integração | PE | 5 planos válidos para 5 ervas | 5 planos, todos valid=true | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-01-03 | RF-15: Rejeitar ervas inválidas | importFromCSV | Integração | PE | 3 válidas + 2 inválidas, planos só para válidas | valid=3, invalid=2, 3 planos criados | Pass | Ficheiro misto.csv em tests/fixtures/. |
| TI-02-01 | RN-30: Alerta Informativo | importFromCSV, classifyAlert | Integração | PE | "Informativo" (medições dentro limites reais) | "Informativo" | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-02-02 | RN-30: Alerta Aviso | importFromCSV, classifyAlert | Integração | VL | "Aviso" (1 violação com limites reais) | "Aviso" | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-02-03 | RN-30: Alerta Crítico | importFromCSV, classifyAlert | Integração | VL | "Crítico" (múltiplas violações) | "Crítico" | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-02-04 | RN-30: Sensor desativo | importFromCSV, classifyAlert | Integração | MC/DC | null (sensorOK=false) | null | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-02-05 | RN-30: Ervas inválidas detetadas | importFromCSV | Integração | PE | invalido.csv: 0 válidas, 6 inválidas, 6 tipos de erro | valid=0, invalid=6; 6 erros: temperatura, umidade, luminosidade, nome, especie | Pass | Ficheiro invalido.csv em tests/fixtures/. |
| TI-02-06 | RN-30: CSV misto segregado | importFromCSV | Integração | PE | 3 válidas (Hortelã, Manjericão, Camomila), 2 inválidas | valid=3, invalid=2; nomes=["Hortelã","Manjericão","Camomila"] | Pass | Ficheiro misto.csv em tests/fixtures/. |
| TI-02-07 | RN-30: CSV vazio rejeitado | importFromCSV | Integração | PE | 0 válidas, erro descritivo | valid=0, errors.length>0 | Pass | Ficheiro vazio.csv em tests/fixtures/. |
| TI-02-08 | RF-07: CSV sem header | importFromCSV | Integração | PE | 1 válida, 1 inválida (especie vazia) | valid=1, invalid=1 | Pass | Nenhuma. CSV inline fornecido no teste. |
| TI-02-09 | RF-06: CSV null rejeitado | importFromCSV | Integração | PE | 0 válidas, erro descritivo | valid=0, errors.length>0 | Pass | Nenhuma. Null passado como argumento. |
| TI-02-10 | RF-04: Parse com poucas colunas | importFromCSV | Integração | PE | inválido, erro "Formato inválido" | invalid>0, errors[0] match /Formato inválido/ | Pass | Nenhuma. CSV inline fornecido no teste. |
| TI-03-01 | RN-04: Plano pontual COM autorização | importFromCSV, validatePlanData | Integração | MC/DC | Aceito (autorizacaoResponsavel=true) | valid=true | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-03-02 | RN-04: Plano pontual SEM autorização | importFromCSV, validatePlanData | Integração | MC/DC | Rejeitado (erro: "autorização do Responsável") | valid=false, errors contêm "autorização" | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-04-01 | RN-39: ativo → concluído + produtividade | importFromCSV, validateStateTransition, calculateProductivity | Integração | MC/DC | Transição permitida, 95% produtividade | permitido=true, produtividade=95 | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-04-02 | RN-40: ativo → comprometido com perdas | importFromCSV, validateStateTransition | Integração | MC/DC | Transição permitida | permitido=true | Pass | Ficheiro valido.csv em tests/fixtures/. |
| TI-04-03 | RN-40: ativo → comprometido sem perdas | validateStateTransition | Integração | MC/DC | Transição rejeitada | permitido=false | Pass | Nenhuma. Lote construído em memória. |
| TI-04-04 | RN-39: ativo → concluído sem dataFim | validateStateTransition | Integração | MC/DC | Transição rejeitada | permitido=false | Pass | Nenhuma. Lote construído em memória. |
| TI-04-05 | RN-41: estado final não transita | validateStateTransition | Integração | MC/DC | Transição rejeitada | permitido=false | Pass | Nenhuma. Lote construído em memória. |
| TI-05-01 | RF-16: Fluxo E2E completo | importFromCSV, validatePlanData, classifyAlert, validateStateTransition, calculateProductivity | Integração | PE+VL+MC/DC | Ciclo completo: herb→plano→lote→alertas→produtividade (~94.67%) | Planos válidos, alertas=["Informativo","Aviso","Crítico"], transição permitida, produtividade≈94.67 | Pass | Ficheiro valido.csv em tests/fixtures/. |

---

## Cobertura por Requisito

### Requisitos Funcionais (RF) - 13 Total

| RF | Descrição | Testes Associados | Status |
|---|---|---|---|
| RF-01 | Estrutura de API (genérica) | Sprint 1 | Pass |
| RF-03 | Importação de ervas aromáticas | TU-H16, TU-H20, TU-H23, TI-01-01, TI-01-02, TI-05-01 | Pass |
| RF-04 | Manipulação de CSV (linhas inválidas) | TU-H17, TU-H18, TU-H19, TU-H21, TU-H22, TU-H24, TU-H25, TI-02-10 | Pass |
| RF-05 | CSV vazio | TU-H18, TI-02-07 | Pass |
| RF-06 | CSV null | TU-H19, TI-02-09 | Pass |
| RF-07 | CSV sem header | TU-H20, TI-02-08 | Pass |
| RF-08 a RF-12 | Validação de campos de herb | TU-H01 a TU-H15 | Pass |
| RF-13 | Criar plano e associar a erva | TU-P01 a TU-P05, TI-01-01, TI-01-02 | Pass |
| RF-14 | Múltiplas ervas → múltiplos planos | TI-01-02 | Pass |
| RF-15 | Rejeição de herb inválida | TI-01-03, TI-02-05, TI-02-06 | Pass |
| RF-16 | Ciclo E2E completo | TI-05-01 | Pass |

### Regras de Negócio (RN) - 51 Total

| RN | Descrição | Testes | Status |
|---|---|---|---|
| RN-01 a RN-04 | Validação básica herb | TU-H01 a TU-H04 | Pass |
| RN-05 a RN-09 | Limites temperatura (herb) | TU-H05 a TU-H09, TU-H21, TU-H22 | Pass |
| RN-10 a RN-12 | Limites umidade (herb) | TU-H10 a TU-H12 | Pass |
| RN-13 a RN-15 | Limites luminosidade (herb) | TU-H13 a TU-H15 | Pass |
| RN-04 | Plano pontual exige autorização | TU-P19 a TU-P22, TI-03-01, TI-03-02 | Pass |
| RN-10 a RN-29 | Validação plano | TU-P01 a TU-P18 | Pass |
| RN-30 a RN-34 | Classificação de alertas | TU-P23 a TU-P27, TI-02-01 a TI-02-04 | Pass |
| RN-35 a RN-38 | Cálculo produtividade | TU-P28 a TU-P31, TI-04-01 | Pass |
| RN-39 a RN-44 | Transição estados | TU-P32 a TU-P37, TI-04-01 a TI-04-05 | Pass |
| RN-45 a RN-51 | Regras adicionais | TI-05-01 | Pass |

---

## Resumo de Cobertura

| Métrica | Valor | Status |
|---|---|---|
| **Total de Testes** | 83 (25 TU Herbs + 37 TU Plans + 21 TI) | Pass |
| **Testes Passando** | 83/83 (100%) | Pass |
| **Técnicas Aplicadas** | PE, VL, MC/DC | Pass |
| **Cobertura de Statements** | 84.5% | Pass |
| **Cobertura de Branches** | 85.11% | Pass |
| **Requisitos Funcionais Cobertos** | 11/13 (85%) | Pass |
| **Regras de Negócio Cobertas** | 51/51 (100%) | Pass |
| **Tempo de Execução** | ~0.5s | Pass |

---

## Como Executar

### Rodar todos os testes
```bash
npm test
```

### Ver cobertura detalhada
```bash
npm run test:coverage
```

### Rodar apenas testes de Herbs
```bash
npm test -- tests/unit/herbs.service.test.js
```

### Rodar apenas testes de Plans
```bash
npm test -- tests/unit/plans.service.test.js
```

### Rodar apenas testes de Integração
```bash
npm test -- tests/integration/herbs.integration.test.js
```

---

## Observações

1. **Particionamento de Equivalência (PE)**: Aplicado em campos de validação (herbs) e tipos de plano (plans).

2. **Análise de Valores Limite (VL)**: Aplicado em todos os intervalos numéricos (temperatura, umidade, luminosidade, duração).

3. **Modified Condition/Decision Coverage (MC/DC)**: Aplicado em lógica condicional complexa (plano pontual, classificação de alertas, transição de estados).

4. **Testes de Integração**: Conectam herbsService e plansService, importando de ficheiros CSV reais em tests/fixtures/.

5. **Cobertura Completa**: 100% dos testes passando, 84.5%+ cobertura de código, 100% de regras de negócio cobertas.

---

## Ficheiros Principais

### Código Fonte
- `src/services/herbsService.js` — Serviço de validação e importação de ervas
- `src/services/plansService.js` — Serviço de planos de cultivo

### Testes Unitários
- `tests/unit/herbs.service.test.js` — 25 testes de herbs
- `tests/unit/plans.service.test.js` — 37 testes de plans

### Testes de Integração
- `tests/integration/herbs.integration.test.js` — 21 testes de integração

### Fixtures CSV
- `tests/fixtures/valido.csv` — 5 ervas válidas
- `tests/fixtures/invalido.csv` — 6 ervas inválidas
- `tests/fixtures/misto.csv` — 3 válidas + 2 inválidas
- `tests/fixtures/vazio.csv` — ficheiro vazio

### Documentação
- `docs/SPRINT2_MATRIZ_RASTREABILIDADE.md` — Esta matriz completa
- `docs/SPRINT2_RELATORIO.md` — Relatório técnico detalhado
- `docs/SPRINT2_README.md` — Guia rápido de execução
