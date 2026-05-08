# CHECKLIST DE APRESENTAÇÃO - SPRINT 1

## Antes da Apresentação

### Preparação do Ambiente
- [ ] Abrir o VS Code na pasta do projeto
- [ ] Abrir terminal na pasta do projeto
- [ ] Verificar que Node.js está instalado: `node --version`
- [ ] Executar `npm install` (se necessário)

---

## Durante a Apresentação

### 1. Demonstrar Testes (2-3 min)

```bash
npm test
```

**O que mostrar:**
- 7 testes passam
- Todos os nomes dos testes são descritivos
- Tempo de execução: ~1.4s

---

### 2. Mostrar Cobertura (1-2 min)

```bash
npm run test:coverage
```

**O que destacar:**
- Statement coverage: 63.33%
- Branch coverage: 57.14%
- Foco na função `login` (authService)

---

### 3. Explicar Particionamento de Equivalência (3-4 min)

**Abrir:** `tests/unit/authService.test.js`

**Explicar as partições:**

**Username:**
- P-U1 (inválida): null ou vazio → TU-01, TU-02
- P-U2 (inválida): inexistente → TU-03
- P-U3 (válida): existente → TU-04, TU-05, TU-06, TU-07

**Password:**
- P-P1 (inválida): null ou vazia → TU-04, TU-05
- P-P2 (inválida): incorrecta → TU-06
- P-P3 (válida): correcta → TU-01, TU-02, TU-03, TU-07

**Mostrar código dos testes TU-01 e TU-07 como exemplos**

---

### 4. Apresentar Matriz de Rastreabilidade (2-3 min)

**Abrir:** `docs/matriz_rastreabilidade_sprint1.md`

**Destacar:**
- Tabela completa com 7 casos de teste
- Mapeamento de teste → requisito → partição
- Tabela de cobertura por partição
- Tabela de combinações testadas

---

### 5. Mostrar Estrutura do Código (1-2 min)

**Mostrar ficheiros principais:**
- `src/services/authService.js` - Função login (testada)
- `controllers/auth.controller.js` - Endpoints
- `routes/auth.route.js` - Rotas da API

**Explicar:**
- Endpoint POST `/api/auth/login`
- Endpoint POST `/api/auth/register`
- Uso de JWT para autenticação

---

## Perguntas Comuns e Respostas

### P: Porque só 63% de cobertura?
**R:** Os testes focam-se na função `login` conforme requisito do Sprint 1. Outras funções auxiliares (`verifyToken`, `hasProfile`, etc.) serão testadas no Sprint 2.

### P: Porque não testaram o endpoint completo?
**R:** O enunciado especifica: "Como são testes de unidade, basta testar a função de autenticação (controller) - não é necessário testar o endpoint completo."

### P: Quantas combinações de partições existem? Testaram todas?
**R:** Existem 9 combinações possíveis (3×3). Testámos 5 combinações relevantes, priorizando:
- Todas as partições inválidas
- O caso de sucesso
- Evitando combinações redundantes (ex: null × null)

### P: Onde está a base de dados?
**R:** O enunciado permite "BD ou estruturas em memória". Para o Sprint 1, usamos estruturas em memória para simplificar. A estrutura de BD está preparada para o Sprint 2.

### P: Como garantem que as partições estão corretas?
**R:** Seguimos a técnica formal de Particionamento de Equivalência:
1. Identificámos todas as classes válidas e inválidas
2. Selecionámos pelo menos 1 representante de cada classe
3. Documentámos na matriz de rastreabilidade

---

## Pontos-Chave a Mencionar

### Critérios Cumpridos
1. Código dos endpoints (login, register)
2. Testes de unidade (7 testes, 100% sucesso)
3. Matriz de rastreabilidade completa

### Técnica Aplicada
- Particionamento de Equivalência
- 3 partições para username (1 válida, 2 inválidas)
- 3 partições para password (1 válida, 2 inválidas)
- Cobertura de todas as partições

### Qualidade
- Testes isolados (mocks)
- Nomes descritivos
- Documentação profissional
- 100% de testes a passar

---

## Estrutura da Apresentação Sugerida

1. **Introdução** (30s)
   - Sprint 1: Autenticação com testes de unidade

2. **Demonstração dos Testes** (2 min)
   - `npm test` → 7 passed
   - `npm run test:coverage` → 63% coverage

3. **Particionamento de Equivalência** (3 min)
   - Explicar partições identificadas
   - Mostrar exemplos de código

4. **Matriz de Rastreabilidade** (2 min)
   - Mostrar documento
   - Explicar mapeamento teste → requisito

5. **Conclusão** (30s)
   - 3 critérios cumpridos ✅
   - Pronto para Sprint 2

**Tempo total:** ~8-10 minutos

---

## Ficheiros para Ter Abertos

1. `tests/unit/authService.test.js` - Código dos testes
2. `docs/matriz_rastreabilidade_sprint1.md` - Matriz
3. Terminal - Para executar comandos
4. `src/services/authService.js` - Código testado

---

## Comandos Rápidos

```bash
# Executar testes
npm test

# Ver cobertura
npm run test:coverage

# Ver relatório HTML de cobertura
start coverage/lcov-report/index.html

# (Opcional) Iniciar servidor
npm start
```

---

## Verificação Final Antes de Apresentar

- [ ] `npm test` passa todos os testes
- [ ] Ficheiros documentação existem e estão completos
- [ ] Consegue explicar as 6 partições (3+3)
- [ ] Consegue explicar pelo menos 2 testes (TU-01, TU-07)
- [ ] Sabe responder às perguntas comuns acima

---

**Boa apresentação!**
