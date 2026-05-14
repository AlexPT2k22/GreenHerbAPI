# Sprint 3 - Plano de Implementação
## Testes de Unidade para Requisitos Restantes

**Data Início:** 14 de Maio de 2026  
**Status:** 🔄 Em Planeamento  

---

## 1. Requisitos do Enunciado

**Sprint 3:**
> "Criação de testes de unidade para os requisitos restantes. Atualização do relatório com a matriz de rastreabilidade."

---

## 2. Módulos Cobertos (Sprint 1 e 2)

### ✅ Sprint 1 (29 testes)
- **authService.js** - Autenticação completa (generateAccessToken, generateRefreshToken, verifyToken, renewAccessToken, login, hasProfile)

### ✅ Sprint 2 (82 testes)
- **herbsService.js** (25 testes) - Validação de ervas, importação CSV, parse CSV
- **plansService.js** (37 testes) - Validação de planos, classificação de alertas, produtividade, transições de estado
- **Integration Tests** (20 testes) - Fluxos end-to-end

**Total Atual:** 112 testes (29 + 82)

---

## 3. Módulos Restantes (Sprint 3)

### 🎯 Prioridade Alta - Lógica de Negócio Crítica

#### 3.1 **Batches Service** (Gestão de Lotes)
**Funções a testar:**
- `validateBatchData(batch)` - Validação de dados de lote
- `canDivideBatch(batch, quantidade)` - Validação de divisão (RN-37)
- `calculateRealDuration(batch)` - Cálculo de duração real
- `canCloseAsConcluido(batch)` - Validação de conclusão (RN-39)
- `canCloseAsComprometido(batch)` - Validação de compromisso (RN-40)

**Técnicas:**
- PE: Estado válido/inválido (ativo, concluído, comprometido)
- VL: Quantidade para divisão [1, quantidadeInicial]
- MC/DC: Condições para conclusão (dataFim presente, sem alertas críticos)

**Estimativa:** 15-20 testes

---

#### 3.2 **Measurements Service** (Medições Ambientais)
**Funções a testar:**
- `validateMeasurementData(measurement)` - Validação de medição
- `isOutOfRange(value, min, max)` - Verificação de limites
- `shouldGenerateAlert(measurement, plan)` - Decisão de geração de alerta (RN-30)
- `calculateDeviation(value, optimal)` - Cálculo de desvio

**Técnicas:**
- PE: Medição válida/inválida (campos obrigatórios)
- VL: Temperatura, humidade, luminosidade nos limites
- MC/DC: Condições compostas para alertas (temp fora OR hum fora AND sensor OK)

**Estimativa:** 15-20 testes

---

#### 3.3 **Alerts Service** (Gestão de Alertas)
**Funções a testar:**
- `validateAlertData(alert)` - Validação de alerta
- `canResolve(alert, user)` - Permissão para resolver
- `canIgnore(alert, user, justificacao)` - Permissão para ignorar (RN-05)
- `validateJustificationLength(text)` - VL para justificação [10, 500]
- `escalateSeverity(alert)` - Escalação de severidade

**Técnicas:**
- PE: Tipo de alerta (Informativo, Aviso, Crítico)
- VL: Comprimento de justificação (9, 10, 250, 500, 501 chars)
- MC/DC: Condições para ignorar (tipo=Crítico AND justificação presente)

**Estimativa:** 12-15 testes

---

### 🎯 Prioridade Média - Operações e Automação

#### 3.4 **Tasks Service** (Gestão de Tarefas)
**Funções a testar:**
- `validateTaskData(task)` - Validação de tarefa
- `canExecuteTask(task, user)` - Permissão de execução
- `isOverdue(task)` - Verificação de atraso
- `calculateTaskPriority(task)` - Cálculo de prioridade

**Técnicas:**
- PE: Tipo de tarefa (rega, fertilização, colheita, monitorização)
- VL: Data de execução (passado, presente, futuro)
- PE: Estado (pendente, em_execução, concluída, cancelada)

**Estimativa:** 10-12 testes

---

#### 3.5 **Automation Service** (Regras de Automação)
**Funções a testar:**
- `validateRuleData(rule)` - Validação de regra
- `evaluateRule(rule, context)` - Avaliação de regra
- `shouldExecuteAutomatically(rule, mode)` - Decisão de execução (RN-45)
- `canToggleMode(user, newMode)` - Permissão para mudar modo

**Técnicas:**
- PE: Modo (Manual, Automático)
- MC/DC: Condições de execução (modo=Auto AND regra ativa AND condição satisfeita)
- PE: Tipo de ação (sugerir, executar)

**Estimativa:** 10-12 testes

---

### 🎯 Prioridade Baixa - Relatórios e Auditoria

#### 3.6 **Reports Service** (Geração de Relatórios)
**Funções a testar:**
- `validateReportParams(params)` - Validação de parâmetros
- `calculateAggregates(data)` - Cálculo de agregados
- `formatToCSV(data)` - Formatação CSV
- `formatToExcel(data)` - Formatação Excel

**Técnicas:**
- PE: Formato (CSV, Excel)
- PE: Período (diário, semanal, mensal)
- VL: Data início/fim

**Estimativa:** 8-10 testes

---

#### 3.7 **Audit Service** (Log de Auditoria)
**Funções a testar:**
- `logOperation(user, action, resource)` - Registo de operação
- `shouldAudit(endpoint)` - Decisão de auditoria (RN-55)
- `filterByDateRange(logs, start, end)` - Filtragem por data

**Técnicas:**
- PE: Tipo de operação (CREATE, UPDATE, DELETE, READ)
- PE: Operações auditáveis vs não-auditáveis
- VL: Range de datas

**Estimativa:** 6-8 testes

---

#### 3.8 **Users Service** (Gestão de Utilizadores)
**Funções a testar:**
- `validateUserData(user)` - Validação de utilizador
- `canCreateUser(requester, newUserPerfil)` - Permissão de criação (RN-01)
- `canUpdateUser(requester, targetUser)` - Permissão de atualização
- `canDeleteUser(requester, targetUser)` - Permissão de eliminação

**Técnicas:**
- PE: Perfil (Técnico, Responsável, Administrador)
- MC/DC: Permissões baseadas em perfil
- PE: Estado (ativo, inativo)

**Estimativa:** 8-10 testes

---

## 4. Resumo Quantitativo

| Módulo | Prioridade | Estimativa Testes | Técnicas Principais |
|--------|-----------|-------------------|---------------------|
| Batches Service | Alta | 15-20 | PE, VL, MC/DC |
| Measurements Service | Alta | 15-20 | PE, VL, MC/DC |
| Alerts Service | Alta | 12-15 | PE, VL, MC/DC |
| Tasks Service | Média | 10-12 | PE, VL |
| Automation Service | Média | 10-12 | PE, MC/DC |
| Reports Service | Baixa | 8-10 | PE, VL |
| Audit Service | Baixa | 6-8 | PE, VL |
| Users Service | Baixa | 8-10 | PE, MC/DC |
| **TOTAL Sprint 3** | - | **85-107 testes** | - |

---

## 5. Meta de Cobertura Sprint 3

### Cobertura Atual (Sprint 1 + 2):
- **Statements:** 85.91%
- **Branches:** 85.49%
- **Functions:** 100%
- **Lines:** 85.78%

### Meta Sprint 3:
- **Statements:** ≥ 90%
- **Branches:** ≥ 90%
- **Functions:** 100%
- **Lines:** ≥ 90%

---

## 6. Plano de Implementação

### Fase 1: Módulos Críticos (Semana 1)
1. ✅ Criar `batchesService.js` com funções de validação
2. ✅ Criar `tests/unit/batches.service.test.js` (15-20 testes)
3. ✅ Criar `measurementsService.js` com lógica de alertas
4. ✅ Criar `tests/unit/measurements.service.test.js` (15-20 testes)
5. ✅ Criar `alertsService.js` com validações
6. ✅ Criar `tests/unit/alerts.service.test.js` (12-15 testes)

### Fase 2: Módulos Operacionais (Semana 2)
7. ✅ Criar `tasksService.js`
8. ✅ Criar `tests/unit/tasks.service.test.js` (10-12 testes)
9. ✅ Criar `automationService.js`
10. ✅ Criar `tests/unit/automation.service.test.js` (10-12 testes)

### Fase 3: Módulos de Suporte (Semana 3)
11. ✅ Criar `reportsService.js`
12. ✅ Criar `tests/unit/reports.service.test.js` (8-10 testes)
13. ✅ Criar `auditService.js`
14. ✅ Criar `tests/unit/audit.service.test.js` (6-8 testes)
15. ✅ Criar `usersService.js`
16. ✅ Criar `tests/unit/users.service.test.js` (8-10 testes)

### Fase 4: Documentação (Final da Semana 3)
17. ✅ Atualizar `relatorio_latex.md` com matriz de rastreabilidade Sprint 3
18. ✅ Gerar relatórios de cobertura atualizados
19. ✅ Documentar decisões de implementação

---

## 7. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Módulos muito complexos | Média | Alto | Priorizar módulos críticos primeiro |
| Falta de especificação detalhada | Alta | Médio | Assumir comportamento padrão e documentar |
| Cobertura < 90% | Baixa | Médio | Focar em testes de ramos críticos |
| Tempo insuficiente | Média | Alto | Implementar apenas prioridade Alta + Média |

---

## 8. Critérios de Aceitação

- ✅ Todos os módulos de prioridade Alta implementados e testados
- ✅ Mínimo 85 testes novos (total acumulado ≥ 197 testes)
- ✅ Cobertura ≥ 90% em statements e branches
- ✅ 100% dos testes passando (0 failures)
- ✅ Matriz de rastreabilidade completa no relatório
- ✅ Documentação de técnicas aplicadas (PE, VL, MC/DC)

---

## 9. Próximos Passos

1. **Agora:** Criar estrutura base dos services (batches, measurements, alerts)
2. **Depois:** Implementar testes de unidade seguindo o plano
3. **Finalmente:** Atualizar relatório LaTeX com resultados Sprint 3

**Pronto para começar?** 🚀
