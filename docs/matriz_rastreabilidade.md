# Matriz de Rastreabilidade de Testes — Sprint 1
**Projecto:** GreenHerb API  
**UC:** Engenharia de Software II — Testes de Software  
**Sprint:** 1 — Módulo de Autenticação  
**Data:** 2026-05-07  

---

## Legenda de Prefixos

| Prefixo | Nível |
|---------|-------|
| TU      | Teste de Unidade |
| TI      | Teste de Integração |
| TS      | Teste de Sistema |

---

## Requisitos Funcionais de Referência

| ID    | Descrição |
|-------|-----------|
| RF-01 | O sistema deve autenticar utilizadores com `username` e `password`, devolvendo tokens JWT |
| RF-02 | O sistema deve gerar um *access token* JWT com payload `{ id, perfil }` e expiração de 2 h |
| RF-03 | O sistema deve gerar um *refresh token* JWT com payload `{ id, perfil }` e expiração de 7 d |
| RF-04 | O sistema deve renovar o *access token* a partir de um *refresh token* válido |
| RF-05 | O sistema deve verificar a validade e integridade de um token JWT |
| RF-06 | O sistema deve controlar o acesso por perfil (`Técnico`, `Responsável`, `Administrador`) |

---

## Matriz de Rastreabilidade

### TU-01 a TU-04 — `generateAccessToken`

| ID     | Requisito | Endpoint(s) Exercitado(s) | Nível    | Técnica | Resultado Esperado | Pré-condições |
|--------|-----------|--------------------------|----------|---------|--------------------|---------------|
| TU-01  | RF-02     | `POST /auth/login` (indirecto) | Unidade | CM — `!userId \|\| !perfil` (T\|T) | Lança `Error("userId and perfil are required")` | `JWT_SECRET` definido em `process.env`; sem dependência de BD |
| TU-02  | RF-02     | `POST /auth/login` (indirecto) | Unidade | CM — `!userId \|\| !perfil` (T\|F) | Lança `Error("userId and perfil are required")` | Idem |
| TU-03  | RF-02     | `POST /auth/login` (indirecto) | Unidade | CM — `!userId \|\| !perfil` (F\|T) | Lança `Error("userId and perfil are required")` | Idem |
| TU-04  | RF-02     | `POST /auth/login` (indirecto) | Unidade | CM (F\|F) + PE classe válida | Retorna string JWT; payload verificável contém `id="u1"` e `perfil="Técnico"` | `JWT_SECRET` definido; `userId` e `perfil` não nulos |

---

### TU-05 a TU-09 — `generateRefreshToken`

| ID     | Requisito | Endpoint(s) Exercitado(s) | Nível    | Técnica | Resultado Esperado | Pré-condições |
|--------|-----------|--------------------------|----------|---------|--------------------|---------------|
| TU-05  | RF-03     | `POST /auth/login` (indirecto) | Unidade | CM — `!userId \|\| !perfil` (T\|T) | Lança `Error("userId and perfil are required")` | `JWT_REFRESH_SECRET` definido em `process.env` |
| TU-06  | RF-03     | `POST /auth/login` (indirecto) | Unidade | CM — `!userId \|\| !perfil` (T\|F) | Lança `Error("userId and perfil are required")` | Idem |
| TU-07  | RF-03     | `POST /auth/login` (indirecto) | Unidade | CM — `!userId \|\| !perfil` (F\|T) | Lança `Error("userId and perfil are required")` | Idem |
| TU-08  | RF-03     | `POST /auth/login` (indirecto) | Unidade | CM (F\|F) + PE classe válida | Retorna string JWT assinada com `JWT_REFRESH_SECRET`; payload contém `id` e `perfil` | `JWT_REFRESH_SECRET` e `userId`/`perfil` não nulos |
| TU-09  | RF-03     | `POST /auth/login` (indirecto) | Unidade | PE — fallback de secret | Retorna JWT assinado com `JWT_SECRET` quando `JWT_REFRESH_SECRET` não está definido | `JWT_REFRESH_SECRET` removido temporariamente do ambiente |

---

### TU-10 a TU-14 — `verifyToken`

| ID     | Requisito | Endpoint(s) Exercitado(s)        | Nível    | Técnica | Resultado Esperado | Pré-condições |
|--------|-----------|----------------------------------|----------|---------|--------------------|---------------|
| TU-10  | RF-05     | `POST /auth/refresh`; rotas protegidas | Unidade | PE — classe inválida (token nulo) | Lança `Error("Token is required")` | Nenhuma |
| TU-11  | RF-05     | `POST /auth/refresh`; rotas protegidas | Unidade | PE — classe inválida (token adulterado) | Lança `JsonWebTokenError` | `JWT_SECRET` definido |
| TU-12  | RF-05     | `POST /auth/refresh`; rotas protegidas | Unidade | PE — classe inválida (token expirado) | Lança `TokenExpiredError` | Token gerado com `expiresIn: -1` |
| TU-13  | RF-05     | `POST /auth/refresh`; rotas protegidas | Unidade | PE — classe válida | Retorna payload com `id="u3"` e `perfil="Administrador"` | Token válido assinado com `JWT_SECRET` |
| TU-14  | RF-05     | `POST /auth/refresh`; rotas protegidas | Unidade | PE — fallback de secret | Usa `JWT_SECRET` do ambiente quando argumento `secret` é omitido | Token assinado com `JWT_SECRET`; sem argumento `secret` na chamada |

---

### TU-15 a TU-17 — `renewAccessToken`

| ID     | Requisito | Endpoint(s) Exercitado(s) | Nível    | Técnica | Resultado Esperado | Pré-condições |
|--------|-----------|--------------------------|----------|---------|--------------------|---------------|
| TU-15  | RF-04     | `POST /auth/refresh`     | Unidade  | PE — classe válida | Retorna novo *access token*; payload verificável contém `id` e `perfil` do refresh token original | Refresh token válido assinado com `JWT_REFRESH_SECRET` |
| TU-16  | RF-04     | `POST /auth/refresh`     | Unidade  | PE — classe inválida | Propaga erro de `verifyToken` (token malformado) | Token inválido passado como argumento |
| TU-17  | RF-04     | `POST /auth/refresh`     | Unidade  | PE — fallback de secret | Usa `JWT_SECRET` quando `JWT_REFRESH_SECRET` ausente; novo *access token* verificável | `JWT_REFRESH_SECRET` removido temporariamente; refresh token assinado com `JWT_SECRET` |

---

### TU-18 a TU-24 — `login`

| ID     | Requisito        | Endpoint(s) Exercitado(s) | Nível    | Técnica | Resultado Esperado | Pré-condições |
|--------|-----------------|--------------------------|----------|---------|--------------------|---------------|
| TU-18  | RF-01           | `POST /auth/login`        | Unidade  | CM — `!username \|\| !password` (T\|T) | Lança `Error("Username and password are required")` | `JWT_SECRET` definido; `findUser` não invocado |
| TU-19  | RF-01           | `POST /auth/login`        | Unidade  | CM — `!username \|\| !password` (T\|F) | Lança `Error("Username and password are required")` | Idem |
| TU-20  | RF-01           | `POST /auth/login`        | Unidade  | CM — `!username \|\| !password` (F\|T) | Lança `Error("Username and password are required")` | Idem |
| TU-21  | RF-01           | `POST /auth/login`        | Unidade  | PE — utilizador inexistente | Lança `Error("Invalid credentials")` | `findUser` mockado para devolver `null` |
| TU-22  | RF-01           | `POST /auth/login`        | Unidade  | PE — password incorrecta | Lança `Error("Invalid credentials")` | `findUser` mockado com utilizador válido; password hash gerado em `beforeAll` com `bcryptjs` (salt=10) |
| TU-23  | RF-01, RF-02, RF-03 | `POST /auth/login`   | Unidade  | CM (F\|F) + PE classe válida | Retorna `{ accessToken, refreshToken, perfil: "Técnico" }`; access token verificável com `JWT_SECRET` | `findUser` mockado com `{ _id: "1", perfil: "Técnico", password: <hash> }`; credenciais correctas |
| TU-24  | RF-01, RF-02, RF-03 | `POST /auth/login`   | Unidade  | PE — `user.id` sem `_id` | Retorna tokens válidos; payload contém `id="99"` e `perfil="Administrador"` | `findUser` mockado com `{ id: "99", perfil: "Administrador", password: <hash> }` |

---

### TU-25 a TU-29 — `hasProfile`

| ID     | Requisito | Endpoint(s) Exercitado(s)                        | Nível    | Técnica | Resultado Esperado | Pré-condições |
|--------|-----------|--------------------------------------------------|----------|---------|--------------------|---------------|
| TU-25  | RF-06     | Rotas protegidas com `checkRole` (middleware)    | Unidade  | CM — `!userPerfil \|\| …` (T) | Devolve `false` | Nenhuma |
| TU-26  | RF-06     | Rotas protegidas com `checkRole` (middleware)    | Unidade  | CM — `… \|\| !allowedProfiles \|\| …` (F\|T) | Devolve `false` | `userPerfil` não nulo |
| TU-27  | RF-06     | Rotas protegidas com `checkRole` (middleware)    | Unidade  | CM — `… \|\| !Array.isArray(…)` (F\|F\|T) | Devolve `false` | `allowedProfiles` é string, não array |
| TU-28  | RF-06     | Rotas protegidas com `checkRole` (middleware)    | Unidade  | CM (F\|F\|F) + PE classe válida-A | Devolve `true` | `userPerfil="Técnico"` e `allowedProfiles=["Técnico","Responsável"]` |
| TU-29  | RF-06     | Rotas protegidas com `checkRole` (middleware)    | Unidade  | CM (F\|F\|F) + PE classe válida-B | Devolve `false` | `userPerfil="Técnico"` e `allowedProfiles=["Responsável","Administrador"]` |

---

## Resumo de Cobertura (Sprint 1 — Testes de Unidade)

| Função                 | TU IDs         | Casos | % Stmts | % Branch | % Funcs | % Lines |
|------------------------|---------------|-------|---------|----------|---------|---------|
| `generateAccessToken`  | TU-01 a TU-04  | 4     | 100 %   | 100 %    | 100 %   | 100 %   |
| `generateRefreshToken` | TU-05 a TU-09  | 5     | 100 %   | 100 %    | 100 %   | 100 %   |
| `verifyToken`          | TU-10 a TU-14  | 5     | 100 %   | 100 %    | 100 %   | 100 %   |
| `renewAccessToken`     | TU-15 a TU-17  | 3     | 100 %   | 100 %    | 100 %   | 100 %   |
| `login`                | TU-18 a TU-24  | 7     | 100 %   | 100 %    | 100 %   | 100 %   |
| `hasProfile`           | TU-25 a TU-29  | 5     | 100 %   | 100 %    | 100 %   | 100 %   |
| **Total**              |                | **29**| **100 %**| **100 %**| **100 %**| **100 %**|

Relatório gerado com `npx jest --coverage` — todos os 29 casos **PASS**.
