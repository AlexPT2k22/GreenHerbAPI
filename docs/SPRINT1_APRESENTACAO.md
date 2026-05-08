# Sprint 1 - COMPLETO E PRONTO PARA APRESENTAÇÃO

## Critérios de Aceitação - Status

### 1. Código gerado para endpoints do enunciado
**Implementado:**
- POST `/api/auth/register` - Registo de utilizadores com perfil
- POST `/api/auth/login` - Autenticação com geração de JWT
- Estrutura em memória (conforme permitido)

**Tecnologias:**
- Express.js para API REST
- JWT para autenticação (expiração de 2h)
- bcrypt para hash de passwords
- Perfis: Técnico, Responsável, Administrador

---

### 2. Testes de Unidade para Autenticação
**Implementado:**
- 7 testes de unidade na função `login` (authService)
- Todos os testes passam (100% de sucesso)
- Framework: Jest

**Cobertura:**
- Statements: 63.33%
- Branch: 57.14%
- Functions: 50%

**Ficheiro:** `tests/unit/authService.test.js`

---

### 3. Matriz de Rastreabilidade com Particionamento de Equivalência
**Implementado:**
- Documento completo em `docs/matriz_rastreabilidade_sprint1.md`
- Partições identificadas para username (3 classes)
- Partições identificadas para password (3 classes)
- Mapeamento de cada teste a requisito e partição
- Tabelas de cobertura por partição e combinação

---

## Resumo dos Testes

### Particionamento de Equivalência

#### Username
| Partição | Descrição | Teste(s) |
|----------|-----------|----------|
| P-U1 (inválida) | null ou vazio | TU-01, TU-02 |
| P-U2 (inválida) | utilizador inexistente | TU-03 |
| P-U3 (válida) | utilizador existente | TU-04, TU-05, TU-06, TU-07 |

#### Password
| Partição | Descrição | Teste(s) |
|----------|-----------|----------|
| P-P1 (inválida) | null ou vazia | TU-04, TU-05 |
| P-P2 (inválida) | password incorrecta | TU-06 |
| P-P3 (válida) | password correcta | TU-01, TU-02, TU-03, TU-07 |

### Casos de Teste Detalhados

| ID | Username | Password | Resultado Esperado | Status |
|----|----------|----------|-------------------|--------|
| TU-01 | null | válida | Erro: campo obrigatório | OK |
| TU-02 | vazio | válida | Erro: campo obrigatório | OK |
| TU-03 | inexistente | válida | Erro: credenciais inválidas | OK |
| TU-04 | válido | null | Erro: campo obrigatório | OK |
| TU-05 | válido | vazia | Erro: campo obrigatório | OK |
| TU-06 | válido | incorrecta | Erro: credenciais inválidas | OK |
| TU-07 | válido | correcta | OK accessToken + refreshToken + perfil | OK |

---

## Como Demonstrar

### 1. Executar os Testes
```bash
npm test
```
**Resultado esperado:** 7 passed, 0 failed

### 2. Ver Cobertura
```bash
npm run test:coverage
```
**Resultado esperado:** Relatório com ~63% de cobertura

### 3. Ver Matriz de Rastreabilidade
Abrir ficheiro: `docs/matriz_rastreabilidade_sprint1.md`

### 4. (Opcional) Testar Endpoints
```bash
npm start
```
Depois usar Postman/curl para testar os endpoints de autenticação.

---

## Ficheiros Principais

### Código Fonte
- `src/services/authService.js` - Lógica de negócio (função login testada)
- `controllers/auth.controller.js` - Controller dos endpoints
- `routes/auth.route.js` - Definição das rotas
- `models/user.model.js` - Modelo de utilizador

### Testes
- `tests/unit/authService.test.js` - 7 testes de unidade

### Documentação
- `docs/matriz_rastreabilidade_sprint1.md` - Matriz completa
- `docs/enunciado.md` - Enunciado do projeto
- `README.md` - Documentação do projeto

### Relatórios
- `coverage/` - Relatórios de cobertura (após executar `npm run test:coverage`)

---

## Técnicas Aplicadas

### Particionamento de Equivalência
Aplicado conforme requisito do Sprint 1
- Identificadas 3 classes para username (1 válida, 2 inválidas)
- Identificadas 3 classes para password (1 válida, 2 inválidas)
- Selecionado pelo menos 1 teste representativo de cada classe
- Testadas 5 combinações relevantes (de 9 possíveis)

### Isolamento de Testes (Mocks)
Testes de unidade completamente isolados
- Uso de `jest.fn()` para simular findUser
- Uso de `bcrypt.hash` para preparar passwords
- Sem dependências de BD ou serviços externos

---

## Notas Importantes para Apresentação

1. **Foco em Unidade**: Conforme pedido, testamos apenas a **função login** do authService, não o endpoint completo

2. **Particionamento Completo**: Todas as partições válidas e inválidas foram identificadas e testadas

3. **Matriz Detalhada**: A matriz mapeia cada teste a:
   - Requisito funcional
   - Partições testadas
   - Resultado esperado
   - Pré-condições

4. **100% de Sucesso**: Todos os 7 testes passam consistentemente

5. **Estrutura em Memória**: Conforme permitido no enunciado ("podem ter BD ou estruturas em memória")

---

## Pontos de Destaque

### Qualidade dos Testes
- Nomes descritivos (TU-01 a TU-07)
- Comentários explicando cada partição
- Casos de erro e sucesso cobertos
- Tempo de execução rápido (~1.4s)

### Documentação
- Matriz de rastreabilidade completa e profissional
- README com instruções claras
- Código comentado onde necessário

### Conformidade
- Segue exatamente os critérios de aceitação do Sprint 1
- Aplica Particionamento de Equivalência corretamente
- Testa a função (não o endpoint completo)

---

## Checklist Final

- [x] Endpoints de autenticação implementados
- [x] 7 testes de unidade implementados e a passar
- [x] Particionamento de equivalência aplicado
- [x] Matriz de rastreabilidade criada
- [x] Documentação completa (README + matriz)
- [x] Cobertura de código gerada
- [x] Projeto executa sem erros (`npm test`)
- [x] Todos os ficheiros organizados

---

## Conclusão

O Sprint 1 está **100% completo e pronto para apresentação**, cumprindo todos os critérios de aceitação:

- Código dos endpoints de autenticação  
- Testes de unidade com particionamento de equivalência  
- Matriz de rastreabilidade completa  

**O projeto está preparado para demonstração!**
