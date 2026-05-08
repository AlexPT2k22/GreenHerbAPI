# GreenHerb API - Sprint 1
## Plataforma de Gestão Inteligente de Estufa

### Estado do Sprint 1

**Status**: Completo e pronto para apresentação

#### Critérios de Aceitação Cumpridos

- **Código gerado para endpoints de autenticação**
  - POST `/api/auth/register` - Registo de utilizadores
  - POST `/api/auth/login` - Autenticação com JWT
  
- **Testes de unidade para autenticação**
  - 7 testes implementados com Particionamento de Equivalência
  - 100% dos testes passam
  - Cobertura: 63.33% statements, 57.14% branch
  
- **Matriz de rastreabilidade**
  - Documento completo em `docs/matriz_rastreabilidade_sprint1.md`
  - Particionamento de equivalência para username e password
  - Mapeamento de testes para requisitos

---

### Como Executar

#### Pré-requisitos
- Node.js (v14 ou superior)
- npm

#### Instalação
```bash
npm install
```

#### Executar Testes
```bash
# Executar todos os testes
npm test

# Executar testes com relatório de cobertura
npm run test:coverage
```

#### Executar o Servidor (opcional)
```bash
npm start
```
O servidor estará disponível em `http://localhost:3000`

---

### Estrutura do Projeto

```
GreenHerbAPI/
├── controllers/
│   └── auth.controller.js       # Controller de autenticação
├── models/
│   └── user.model.js            # Modelo de utilizador
├── routes/
│   ├── index.js                 # Roteador principal
│   └── auth.route.js            # Rotas de autenticação
├── middlewares/
│   └── auth.middleware.js       # Middleware de autenticação JWT
├── src/
│   └── services/
│       └── authService.js       # Lógica de negócio de autenticação
├── tests/
│   └── unit/
│       └── authService.test.js  # Testes de unidade
├── docs/
│   ├── enunciado.md             # Enunciado do projeto
│   └── matriz_rastreabilidade_sprint1.md  # Matriz de rastreabilidade
├── coverage/                    # Relatórios de cobertura (gerado)
├── .env                         # Variáveis de ambiente
├── package.json
└── index.js                     # Entry point da aplicação
```

---

### Testes Implementados

#### Particionamento de Equivalência

**Username:**
- P-U1 (inválida): ausente (null ou vazio)
- P-U2 (inválida): utilizador inexistente
- P-U3 (válida): utilizador existente

**Password:**
- P-P1 (inválida): ausente (null ou vazia)
- P-P2 (inválida): password incorrecta
- P-P3 (válida): password correcta

#### Casos de Teste

| ID | Descrição | Partições | Status |
|----|-----------|-----------|--------|
| TU-01 | Username null | P-U1 × P-P3 | OK |
| TU-02 | Username vazio | P-U1 × P-P3 | OK |
| TU-03 | Username inexistente | P-U2 × P-P3 | OK |
| TU-04 | Password null | P-U3 × P-P1 | OK |
| TU-05 | Password vazia | P-U3 × P-P1 | OK |
| TU-06 | Password incorrecta | P-U3 × P-P2 | OK |
| TU-07 | Credenciais válidas | P-U3 × P-P3 | OK |

---

### Métricas de Qualidade

#### Resultados dos Testes
- **Total**: 7 testes
- **Passados**: 7 (100%)
- **Falhados**: 0
- **Tempo de execução**: ~1.4s

#### Cobertura de Código
- **Statements**: 63.33%
- **Branch**: 57.14%
- **Functions**: 50%
- **Lines**: 63.33%

> Nota: A cobertura foca-se na função `login` conforme requisito do Sprint 1. Funções auxiliares serão testadas no Sprint 2.

---

### Endpoints Disponíveis

#### POST `/api/auth/register`
Registo de novo utilizador.

**Request Body:**
```json
{
  "username": "alice",
  "password": "senha123",
  "perfil": "Técnico"
}
```

**Response:** `201 Created`
```json
{
  "message": "Utilizador registado com sucesso!",
  "id": 1
}
```

#### POST `/api/auth/login`
Autenticação de utilizador.

**Request Body:**
```json
{
  "username": "alice",
  "password": "senha123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Autenticação bem-sucedida",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "perfil": "Técnico"
}
```

---

### Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **JWT (jsonwebtoken)** - Autenticação por tokens
- **bcrypt** - Hash de passwords
- **Jest** - Framework de testes
- **Sequelize** - ORM (preparado para Sprint 2)

---

### Documentação Adicional

- **Enunciado completo**: `docs/enunciado.md`
- **Matriz de rastreabilidade**: `docs/matriz_rastreabilidade_sprint1.md`
- **Relatório de cobertura**: `coverage/lcov-report/index.html` (após executar `npm run test:coverage`)

---

### Perfis de Utilizador

- **Técnico** - Operações básicas
- **Responsável** - Gestão de planos e aprovações
- **Administrador** - Gestão completa do sistema

---

### Próximos Passos (Sprint 2)

- Testes de integração para endpoints completos
- Importação de catálogo de ervas (CSV/Excel)
- Criação e gestão de planos de cultivo
- Matriz de rastreabilidade estendida

---

### Notas Importantes

1. O projeto usa **estruturas em memória** para o Sprint 1 (conforme permitido no enunciado)
2. Os testes focam-se na **função de autenticação (authService)**, não no endpoint completo
3. A **matriz de rastreabilidade** cobre exclusivamente a autenticação com Particionamento de Equivalência
4. Configuração de base de dados está preparada mas não é obrigatória para Sprint 1

---

**Engenharia de Software II - Ano Letivo 2025/2026**
