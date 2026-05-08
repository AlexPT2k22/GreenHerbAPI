# Matriz de Rastreabilidade - Sprint 1
## Autenticação (Particionamento de Equivalência)

### Partições Definidas

#### Username
- **P-U1 (inválida)** — ausente: null ou string vazia
- **P-U2 (inválida)** — string não vazia mas utilizador inexistente
- **P-U3 (válida)** — utilizador existente na base de dados

#### Password
- **P-P1 (inválida)** — ausente: null ou string vazia
- **P-P2 (inválida)** — string fornecida mas incorrecta
- **P-P3 (válida)** — password correcta para o utilizador

---

### Matriz de Testes de Unidade - Autenticação

| ID Caso | Requisito / Regra | Endpoint(s) | Nível | Técnica | Partições Testadas | Resultado Esperado | Pré-condições |
|---------|-------------------|-------------|-------|---------|-------------------|-------------------|---------------|
| TU-01 | RF-02: Autenticação com validação de campos obrigatórios | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U1 (null) × P-P3 (válida) | Lança erro: "Username and password are required" | Nenhuma. Teste isolado sobre a função login. |
| TU-02 | RF-02: Autenticação com validação de campos obrigatórios | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U1 (vazio) × P-P3 (válida) | Lança erro: "Username and password are required" | Nenhuma. Teste isolado sobre a função login. |
| TU-03 | RF-02: Validação de credenciais | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U2 (inexistente) × P-P3 (válida) | Lança erro: "Invalid credentials" | Mock de findUser retorna null. |
| TU-04 | RF-02: Autenticação com validação de campos obrigatórios | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U3 (válido) × P-P1 (null) | Lança erro: "Username and password are required" | Nenhuma. Teste isolado sobre a função login. |
| TU-05 | RF-02: Autenticação com validação de campos obrigatórios | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U3 (válido) × P-P1 (vazia) | Lança erro: "Username and password are required" | Nenhuma. Teste isolado sobre a função login. |
| TU-06 | RF-02: Validação de credenciais | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U3 (válido) × P-P2 (incorrecta) | Lança erro: "Invalid credentials" | Mock de findUser retorna utilizador com password hash. Comparação bcrypt retorna false. |
| TU-07 | RF-02: Autenticação bem-sucedida com geração de tokens JWT | `login(username, password)` | Unidade | Particionamento de Equivalência | P-U3 (válido) × P-P3 (válida) | Retorna objeto com: accessToken, refreshToken, perfil='Técnico' | Mock de findUser retorna utilizador válido. Password hash corresponde. |

---

### Resumo da Cobertura

#### Cobertura por Partição

| Partição | Descrição | Casos de Teste | Status |
|----------|-----------|----------------|--------|
| P-U1 | Username ausente (null ou vazio) | TU-01, TU-02 | ✅ Testado |
| P-U2 | Username inexistente na BD | TU-03 | ✅ Testado |
| P-U3 | Username válido e existente | TU-04, TU-05, TU-06, TU-07 | ✅ Testado |
| P-P1 | Password ausente (null ou vazia) | TU-04, TU-05 | ✅ Testado |
| P-P2 | Password incorrecta | TU-06 | ✅ Testado |
| P-P3 | Password correcta | TU-01, TU-02, TU-03, TU-07 | ✅ Testado |

#### Cobertura por Combinação

| Username | Password | Casos de Teste | Resultado |
|----------|----------|----------------|-----------|
| P-U1 (inválido) | P-P3 (válida) | TU-01, TU-02 | ❌ Erro: campo obrigatório |
| P-U2 (inexistente) | P-P3 (válida) | TU-03 | ❌ Erro: credenciais inválidas |
| P-U3 (válido) | P-P1 (inválida) | TU-04, TU-05 | ❌ Erro: campo obrigatório |
| P-U3 (válido) | P-P2 (incorrecta) | TU-06 | ❌ Erro: credenciais inválidas |
| P-U3 (válido) | P-P3 (válida) | TU-07 | ✅ Sucesso: tokens gerados |

---

### Métricas de Cobertura

#### Resultados dos Testes
- **Total de testes**: 7
- **Testes passados**: 7 (100%)
- **Testes falhados**: 0
- **Tempo de execução**: ~1.4s

#### Cobertura de Código (authService.js)
- **Cobertura de instruções (Statements)**: 63.33%
- **Cobertura de ramos (Branch)**: 57.14%
- **Cobertura de funções (Functions)**: 50%
- **Cobertura de linhas (Lines)**: 63.33%

**Linhas não cobertas**: 6, 17, 27-36, 58-61
- Linha 6, 17: Validações de erro em `generateAccessToken` e `generateRefreshToken` (não testadas directamente)
- Linhas 27-36: Função `verifyToken` (não testada no Sprint 1)
- Linhas 58-61: Função `hasProfile` (não testada no Sprint 1)

#### Análise de Cobertura Funcional
- **Requisito RF-02 (Autenticação)**: 100% coberto
  - Validação de campos obrigatórios: ✅
  - Validação de credenciais: ✅
  - Geração de tokens JWT: ✅
  - Retorno de perfil de utilizador: ✅

---

### Observações

1. **Técnica Aplicada**: Foi aplicado o Particionamento de Equivalência conforme requisito do Sprint 1, identificando classes válidas e inválidas para username e password.

2. **Foco em Testes de Unidade**: Os testes focam-se na função `login` do `authService`, isolando-a de dependências externas através de mocks (conforme indicado no enunciado: "não é necessário testar o endpoint completo").

3. **Cobertura de Combinações**: Foram testadas 5 das 9 combinações possíveis (3×3), priorizando as mais relevantes:
   - Todas as partições inválidas foram testadas
   - O caso de sucesso (P-U3 × P-P3) foi testado
   - Combinações redundantes (P-U1 × P-P1, P-U1 × P-P2, etc.) foram omitidas por não acrescentarem valor

4. **Funções Não Testadas**: As funções auxiliares (`generateAccessToken`, `generateRefreshToken`, `verifyToken`, `renewAccessToken`, `hasProfile`) não foram testadas directamente no Sprint 1, mas são invocadas indirectamente pelo teste TU-07.

---

### Próximos Passos (Sprint 2)

- Adicionar testes de integração para os endpoints `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`
- Testar cenários de tokens expirados e renovação
- Aumentar cobertura para as funções auxiliares não testadas
- Adicionar testes para importação de catálogo e criação de planos
