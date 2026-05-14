# 📋 ENDPOINTS COMPLETOS - GREENHERB API
**Baseado no enunciado.md**

## Estado Atual vs. Necessário

### ✅ **TUDO IMPLEMENTADO!**
- CRUD completo em todas as entidades
- Todos os endpoints específicos implementados
- POST /herbs/import (importação CSV)
- Autenticação completa (register, login, refresh, logout)
- Gestão de lotes com transições de estado (RN-39, RN-40)
- Alertas com resolução/ignorar e justificação obrigatória (RN-05)
- Cálculo de produtividade (RN-35)
- Automação com comutação de modo
- Relatórios (export, produtividade, alertas)
- Logs de auditoria

---

## 1️⃣ `/auth` - Autenticação
```javascript
// routes/auth.route.js
✅ POST   /auth/register         - Registo de utilizador
✅ POST   /auth/login            - Login (username + password → JWT)
✅ POST   /auth/refresh          - Renovar access token com refresh token
✅ POST   /auth/logout           - Logout (invalidar token)
```

---

## 2️⃣ `/users` - Gestão de Utilizadores
```javascript
// routes/users.route.js
✅ POST   /users                 - Criar utilizador (apenas Admin)
✅ GET    /users                 - Listar todos os utilizadores
✅ GET    /users/:id             - Obter utilizador por ID
✅ PUT    /users/:id             - Atualizar utilizador
✅ DELETE /users/:id             - Remover utilizador
```

---

## 3️⃣ `/herbs` - Catálogo de Ervas Aromáticas
```javascript
// routes/herbs.route.js
✅ POST   /herbs                 - Criar erva aromática
✅ GET    /herbs                 - Listar todas as ervas
✅ GET    /herbs/:id             - Obter erva por ID
✅ PUT    /herbs/:id             - Atualizar erva
✅ DELETE /herbs/:id             - Remover erva
✅ POST   /herbs/import          - Importar CSV/Excel de ervas ⭐
```

---

## 4️⃣ `/plans` - Planos de Cultivo
```javascript
// routes/plans.route.js
✅ POST   /plans                 - Criar plano (regular, emergência, pontual)
✅ GET    /plans                 - Listar todos os planos
✅ GET    /plans/:id             - Obter plano por ID
✅ PUT    /plans/:id             - Atualizar plano
✅ DELETE /plans/:id             - Remover plano
```

---

## 5️⃣ `/batches` - Lotes de Cultivo ✅ **COMPLETO**
```javascript
// routes/batches.route.js
✅ POST   /batches                      - Criar lote
✅ GET    /batches                      - Listar todos os lotes
✅ GET    /batches/:id                  - Obter lote por ID
✅ PUT    /batches/:id                  - Atualizar lote
✅ DELETE /batches/:id                  - Remover lote

✅ PATCH  /batches/:id/state            - Alterar estado (ativo → concluído/comprometido) ⭐
✅ POST   /batches/:id/apply-plan       - Aplicar plano a lote ⭐
✅ POST   /batches/:id/divide           - Dividir lote
✅ POST   /batches/:id/losses           - Registar perdas
✅ GET    /batches/:id/productivity     - Calcular produtividade ⭐
```

---

## 6️⃣ `/tasks` - Tarefas Operacionais
```javascript
// routes/tasks.route.js
✅ POST   /tasks                 - Criar tarefa (rega, fertilização, colheita, monitorização)
✅ GET    /tasks                 - Listar tarefas
✅ GET    /tasks/:id             - Obter tarefa por ID
✅ PUT    /tasks/:id             - Atualizar tarefa
✅ DELETE /tasks/:id             - Remover tarefa

✅ PATCH  /tasks/:id/complete    - Marcar tarefa como concluída ⭐
```

---

## 7️⃣ `/measurements` - Medições Ambientais
```javascript
// routes/measurements.route.js
✅ POST   /measurements                      - Registar medição (gera alertas automaticamente) ⭐
✅ GET    /measurements                      - Listar medições
✅ GET    /measurements/:id                  - Obter medição por ID
✅ PUT    /measurements/:id                  - Atualizar medição
✅ DELETE /measurements/:id                  - Remover medição

✅ GET    /measurements/batch/:batchId      - Medições de um lote específico
```

---

## 8️⃣ `/alerts` - Alertas ✅ **COMPLETO**
```javascript
// routes/alerts.route.js
✅ GET    /alerts                - Listar alertas
✅ POST   /alerts                - Criar alerta
✅ GET    /alerts/:id            - Obter alerta por ID
✅ PUT    /alerts/:id            - Atualizar alerta
✅ DELETE /alerts/:id            - Remover alerta

✅ PATCH  /alerts/:id            - Resolver ou Ignorar alerta (com justificação obrigatória) ⭐⭐
✅ GET    /alerts/batch/:batchId - Alertas de um lote específico
```

---

## 9️⃣ `/automation` - Regras de Automação
```javascript
// routes/automation.route.js
✅ POST   /automation/rules      - Criar regra de automação
✅ GET    /automation/rules      - Listar regras
✅ PATCH  /automation/mode       - Comutar entre Manual e Automático ⭐
✅ DELETE /automation/rules/:id  - Remover regra
```

---

## 🔟 `/reports` - Relatórios
```javascript
// routes/reports.route.js
✅ GET    /reports/export        - Exportar relatório em CSV/Excel ⭐
✅ GET    /reports/productivity  - Relatório de produtividade
✅ GET    /reports/alerts        - Relatório de alertas
```

---

## 1️⃣1️⃣ `/audit` - Logs de Auditoria ⭐
```javascript
// routes/audit.route.js
✅ GET    /audit                 - Listar logs de auditoria ⭐
✅ GET    /audit/:id             - Obter log por ID
✅ GET    /audit/user/:userId    - Logs de um utilizador específico
```

---

## 🎯 IMPLEMENTAÇÃO CONCLUÍDA

### **TODOS OS ENDPOINTS IMPLEMENTADOS! ✅**
1. ✅ `POST /herbs/import` - Importação CSV
2. ✅ `POST /batches/:id/apply-plan` - Aplicar plano a lote
3. ✅ `POST /measurements` - Registar medição (gera alertas automaticamente)
4. ✅ `PATCH /alerts/:id` - Resolver/Ignorar alerta (justificação obrigatória)
5. ✅ `PATCH /batches/:id/state` - Transição de estado (RN-39, RN-40)
6. ✅ `GET /batches/:id/productivity` - Cálculo de produtividade (RN-35)
7. ✅ `PATCH /automation/mode` - Comutar Manual/Automático
8. ✅ `GET /audit` - Listar logs de auditoria
9. ✅ `GET /reports/export` - Exportar relatórios
10. ✅ `POST /auth/refresh` - Renovar token
11. ✅ `POST /auth/logout` - Logout
12. ✅ Todos os endpoints específicos por lote (/batch/:batchId)
13. ✅ CRUD completo de users, automation, reports, audit
14. ✅ Dividir lotes e registar perdas
15. ✅ Marcar tarefas como concluídas

---

## 📊 RESUMO

| Categoria | Total Endpoints | ✅ Implementado | ❌ Falta |
|-----------|----------------|----------------|---------|
| /auth | 4 | 4 | 0 |
| /users | 5 | 5 | 0 |
| /herbs | 6 | 6 | 0 |
| /plans | 5 | 5 | 0 |
| /batches | 10 | 10 | 0 |
| /tasks | 6 | 6 | 0 |
| /measurements | 6 | 6 | 0 |
| /alerts | 7 | 7 | 0 |
| /automation | 4 | 4 | 0 |
| /reports | 3 | 3 | 0 |
| /audit | 3 | 3 | 0 |
| **TOTAL** | **59** | **59** | **0** |

**Cobertura atual: 100% dos endpoints implementados! ✅**
