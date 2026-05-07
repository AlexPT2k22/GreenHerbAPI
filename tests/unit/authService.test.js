/**
 * Testes de Unidade — authService
 * Técnicas: Partições de Equivalência (PE) + Condições Múltiplas (CM)
 * Objetivo: 100% de cobertura de instruções e ramos
 */

process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authService = require('../../src/services/authService');

// ---------------------------------------------------------------------------
// generateAccessToken
// ---------------------------------------------------------------------------
describe('generateAccessToken', () => {
  /**
   * Condição: !userId || !perfil
   * CM-1  T||T  → lança erro
   * CM-2  T||F  → lança erro
   * CM-3  F||T  → lança erro
   * CM-4  F||F  → retorna token  (PE: classe válida)
   */
  it('CM-1 lança erro quando userId e perfil são nulos', () => {
    expect(() => authService.generateAccessToken(null, null))
      .toThrow('userId and perfil are required');
  });

  it('CM-2 lança erro quando userId é nulo', () => {
    expect(() => authService.generateAccessToken(null, 'Técnico'))
      .toThrow('userId and perfil are required');
  });

  it('CM-3 lança erro quando perfil é nulo', () => {
    expect(() => authService.generateAccessToken('u1', null))
      .toThrow('userId and perfil are required');
  });

  it('CM-4 / PE válida — retorna JWT com id e perfil correctos', () => {
    const token = authService.generateAccessToken('u1', 'Técnico');
    const payload = jwt.verify(token, 'test-secret');
    expect(payload.id).toBe('u1');
    expect(payload.perfil).toBe('Técnico');
  });
});

// ---------------------------------------------------------------------------
// generateRefreshToken
// ---------------------------------------------------------------------------
describe('generateRefreshToken', () => {
  /**
   * Condição: !userId || !perfil
   * CM-1  T||T  → lança erro
   * CM-2  T||F  → lança erro
   * CM-3  F||T  → lança erro
   * CM-4  F||F  → retorna token  (PE: classe válida)
   */
  it('CM-1 lança erro quando userId e perfil são nulos', () => {
    expect(() => authService.generateRefreshToken(null, null))
      .toThrow('userId and perfil are required');
  });

  it('CM-2 lança erro quando userId é nulo', () => {
    expect(() => authService.generateRefreshToken(null, 'Responsável'))
      .toThrow('userId and perfil are required');
  });

  it('CM-3 lança erro quando perfil é nulo', () => {
    expect(() => authService.generateRefreshToken('u2', null))
      .toThrow('userId and perfil are required');
  });

  it('CM-4 / PE válida — retorna JWT assinado com refresh secret', () => {
    const token = authService.generateRefreshToken('u2', 'Responsável');
    const payload = jwt.verify(token, 'test-refresh-secret');
    expect(payload.id).toBe('u2');
    expect(payload.perfil).toBe('Responsável');
  });

  it('PE fallback — usa JWT_SECRET quando JWT_REFRESH_SECRET não está definido', () => {
    const saved = process.env.JWT_REFRESH_SECRET;
    delete process.env.JWT_REFRESH_SECRET;
    const token = authService.generateRefreshToken('u2', 'Responsável');
    const payload = jwt.verify(token, 'test-secret');
    expect(payload.id).toBe('u2');
    process.env.JWT_REFRESH_SECRET = saved;
  });
});

// ---------------------------------------------------------------------------
// verifyToken
// ---------------------------------------------------------------------------
describe('verifyToken', () => {
  /**
   * Condição: !token
   * PE inválida-1 — token nulo              → lança 'Token is required'
   * PE inválida-2 — token string inválida   → jwt.verify lança erro
   * PE inválida-3 — token expirado          → jwt.verify lança erro
   * PE válida     — token bem formado       → retorna payload
   */
  it('PE inválida-1 — lança erro quando token é nulo', () => {
    expect(() => authService.verifyToken(null)).toThrow('Token is required');
  });

  it('PE inválida-2 — lança erro com token adulterado', () => {
    expect(() => authService.verifyToken('token.invalido.aqui'))
      .toThrow();
  });

  it('PE inválida-3 — lança erro com token expirado', () => {
    const expired = jwt.sign({ id: 'u1', perfil: 'Técnico' }, 'test-secret', { expiresIn: -1 });
    expect(() => authService.verifyToken(expired, 'test-secret')).toThrow();
  });

  it('PE válida — retorna payload para token válido', () => {
    const token = jwt.sign({ id: 'u3', perfil: 'Administrador' }, 'test-secret');
    const payload = authService.verifyToken(token, 'test-secret');
    expect(payload.id).toBe('u3');
    expect(payload.perfil).toBe('Administrador');
  });

  it('PE fallback — usa JWT_SECRET quando secret não é passado como argumento', () => {
    const token = jwt.sign({ id: 'u3', perfil: 'Técnico' }, 'test-secret');
    const payload = authService.verifyToken(token);
    expect(payload.id).toBe('u3');
  });
});

// ---------------------------------------------------------------------------
// renewAccessToken
// ---------------------------------------------------------------------------
describe('renewAccessToken', () => {
  /**
   * PE válida   — refresh token válido → novo access token
   * PE inválida — refresh token inválido → propaga erro do jwt.verify
   */
  it('PE válida — gera novo access token a partir de refresh token válido', () => {
    const refresh = jwt.sign({ id: 'u4', perfil: 'Técnico' }, 'test-refresh-secret');
    const newAccess = authService.renewAccessToken(refresh);
    const payload = jwt.verify(newAccess, 'test-secret');
    expect(payload.id).toBe('u4');
    expect(payload.perfil).toBe('Técnico');
  });

  it('PE inválida — lança erro com refresh token inválido', () => {
    expect(() => authService.renewAccessToken('invalido')).toThrow();
  });

  it('PE fallback — usa JWT_SECRET quando JWT_REFRESH_SECRET não está definido', () => {
    const saved = process.env.JWT_REFRESH_SECRET;
    delete process.env.JWT_REFRESH_SECRET;
    const refresh = jwt.sign({ id: 'u5', perfil: 'Técnico' }, 'test-secret');
    const newAccess = authService.renewAccessToken(refresh);
    const payload = jwt.verify(newAccess, 'test-secret');
    expect(payload.id).toBe('u5');
    process.env.JWT_REFRESH_SECRET = saved;
  });
});

// ---------------------------------------------------------------------------
// login
// ---------------------------------------------------------------------------
describe('login', () => {
  let hashedPassword;

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash('senha123', 10);
  });

  /**
   * Condição 1: !username || !password
   * CM-1  T||T  → lança 'Username and password are required'
   * CM-2  T||F  → lança 'Username and password are required'
   * CM-3  F||T  → lança 'Username and password are required'
   * CM-4  F||F  → continua execução
   *
   * Condição 2: !user
   * PE inválida — utilizador não encontrado → lança 'Invalid credentials'
   *
   * Condição 3: !valid (bcrypt)
   * PE inválida — password errada → lança 'Invalid credentials'
   *
   * PE válida — credenciais correctas → retorna accessToken, refreshToken, perfil
   */
  it('CM-1 lança erro quando username e password são nulos', async () => {
    await expect(authService.login(null, null, jest.fn()))
      .rejects.toThrow('Username and password are required');
  });

  it('CM-2 lança erro quando username é nulo', async () => {
    await expect(authService.login(null, 'senha123', jest.fn()))
      .rejects.toThrow('Username and password are required');
  });

  it('CM-3 lança erro quando password é nula', async () => {
    await expect(authService.login('alice', null, jest.fn()))
      .rejects.toThrow('Username and password are required');
  });

  it('PE inválida-1 — utilizador não encontrado retorna "Invalid credentials"', async () => {
    const findUser = jest.fn().mockResolvedValue(null);
    await expect(authService.login('alice', 'senha123', findUser))
      .rejects.toThrow('Invalid credentials');
    expect(findUser).toHaveBeenCalledWith('alice');
  });

  it('PE inválida-2 — password incorrecta retorna "Invalid credentials"', async () => {
    const findUser = jest.fn().mockResolvedValue({
      _id: '1', perfil: 'Técnico', password: hashedPassword,
    });
    await expect(authService.login('alice', 'errada', findUser))
      .rejects.toThrow('Invalid credentials');
  });

  it('CM-4 / PE válida — credenciais correctas retornam tokens e perfil', async () => {
    const findUser = jest.fn().mockResolvedValue({
      _id: '1', perfil: 'Técnico', password: hashedPassword,
    });
    const result = await authService.login('alice', 'senha123', findUser);
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result.perfil).toBe('Técnico');
    const payload = jwt.verify(result.accessToken, 'test-secret');
    expect(payload.id).toBe('1');
  });

  it('PE válida — funciona com user.id (sem _id)', async () => {
    const findUser = jest.fn().mockResolvedValue({
      id: '99', perfil: 'Administrador', password: hashedPassword,
    });
    const result = await authService.login('admin', 'senha123', findUser);
    expect(result.perfil).toBe('Administrador');
    const payload = jwt.verify(result.accessToken, 'test-secret');
    expect(payload.id).toBe('99');
  });
});

// ---------------------------------------------------------------------------
// hasProfile
// ---------------------------------------------------------------------------
describe('hasProfile', () => {
  /**
   * Condição: !userPerfil || !allowedProfiles || !Array.isArray(allowedProfiles)
   * CM-1  T        → false  (userPerfil nulo)
   * CM-2  F||T     → false  (allowedProfiles nulo)
   * CM-3  F||F||T  → false  (allowedProfiles não é array)
   * CM-4  F||F||F  → avalia includes
   *   PE válida-A  includes=true  → true
   *   PE válida-B  includes=false → false
   */
  it('CM-1 — retorna false quando userPerfil é nulo', () => {
    expect(authService.hasProfile(null, ['Técnico'])).toBe(false);
  });

  it('CM-2 — retorna false quando allowedProfiles é nulo', () => {
    expect(authService.hasProfile('Técnico', null)).toBe(false);
  });

  it('CM-3 — retorna false quando allowedProfiles não é array', () => {
    expect(authService.hasProfile('Técnico', 'Técnico')).toBe(false);
  });

  it('CM-4 / PE válida-A — retorna true quando perfil está na lista', () => {
    expect(authService.hasProfile('Técnico', ['Técnico', 'Responsável'])).toBe(true);
  });

  it('CM-4 / PE válida-B — retorna false quando perfil não está na lista', () => {
    expect(authService.hasProfile('Técnico', ['Responsável', 'Administrador'])).toBe(false);
  });
});
