/**
 * Users Service - Testes de Unidade
 * Sprint 3 - Requisitos Restantes
 * Técnicas: PE (Particionamento de Equivalência), VL (Valores Limite), MC/DC
 */

const usersService = require('../../services/usersService');

describe('usersService - Sprint 3', () => {
  
  // ============================================================
  // TU-246 a TU-251: validateUserData (PE + VL)
  // ============================================================
  
  describe('validateUserData - PE + VL', () => {
    test('TU-246: Deve aceitar utilizador válido', () => {
      const user = {
        username: 'tecnico1',
        password: 'SecurePass123',
        perfil: 'Técnico',
        estado: 'ativo'
      };
      const result = usersService.validateUserData(user);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('TU-247: Deve rejeitar username < 3 chars (VL)', () => {
      const user = {
        username: 'ab',
        password: 'SecurePass123',
        perfil: 'Técnico'
      };
      const result = usersService.validateUserData(user);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('username deve ter pelo menos 3 caracteres');
    });

    test('TU-248: Deve aceitar username = 3 chars (VL)', () => {
      const user = {
        username: 'abc',
        password: 'SecurePass123',
        perfil: 'Técnico'
      };
      const result = usersService.validateUserData(user);
      expect(result.valid).toBe(true);
    });

    test('TU-249: Deve rejeitar password < 8 chars (VL)', () => {
      const user = {
        username: 'tecnico1',
        password: 'Pass12',
        perfil: 'Técnico'
      };
      const result = usersService.validateUserData(user);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('password deve ter pelo menos 8 caracteres');
    });

    test('TU-250: Deve rejeitar perfil inválido (PE)', () => {
      const user = {
        username: 'tecnico1',
        password: 'SecurePass123',
        perfil: 'PERFIL_INVALIDO'
      };
      const result = usersService.validateUserData(user);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('perfil deve ser Técnico, Responsável Técnico ou Administrador');
    });

    test('TU-251: Deve rejeitar estado inválido (PE)', () => {
      const user = {
        username: 'tecnico1',
        password: 'SecurePass123',
        perfil: 'Técnico',
        estado: 'SUSPENSO'
      };
      const result = usersService.validateUserData(user);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('estado deve ser ativo ou inativo');
    });
  });

  // ============================================================
  // TU-252 a TU-255: canCreateUser - RN-01 (MC/DC)
  // ============================================================
  
  describe('canCreateUser - RN-01 (MC/DC)', () => {
    const admin = { id: 1, username: 'admin1', perfil: 'Administrador' };
    const responsavel = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };

    test('TU-252: Administrador pode criar Técnico (MC/DC)', () => {
      const result = usersService.canCreateUser(admin, 'Técnico');
      expect(result.canCreate).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-253: Administrador pode criar Responsável (MC/DC)', () => {
      const result = usersService.canCreateUser(admin, 'Responsável Técnico');
      expect(result.canCreate).toBe(true);
    });

    test('TU-254: Responsável NÃO pode criar utilizadores (MC/DC)', () => {
      const result = usersService.canCreateUser(responsavel, 'Técnico');
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Apenas Administrador pode criar utilizadores');
    });

    test('TU-255: Deve rejeitar perfil inválido (MC/DC)', () => {
      const result = usersService.canCreateUser(admin, 'PERFIL_INVALIDO');
      expect(result.canCreate).toBe(false);
      expect(result.reason).toContain('Perfil inválido');
    });
  });

  // ============================================================
  // TU-256 a TU-260: canUpdateUser (MC/DC)
  // ============================================================
  
  describe('canUpdateUser - MC/DC', () => {
    const admin = { id: 1, username: 'admin1', perfil: 'Administrador' };
    const responsavel = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
    const tecnico = { id: 3, username: 'tecnico1', perfil: 'Técnico' };

    test('TU-256: Utilizador pode atualizar-se a si próprio (MC/DC)', () => {
      const result = usersService.canUpdateUser(tecnico, tecnico);
      expect(result.canUpdate).toBe(true);
    });

    test('TU-257: Administrador pode atualizar qualquer um (MC/DC)', () => {
      const result = usersService.canUpdateUser(admin, responsavel);
      expect(result.canUpdate).toBe(true);
    });

    test('TU-258: Responsável pode atualizar Técnico (MC/DC)', () => {
      const result = usersService.canUpdateUser(responsavel, tecnico);
      expect(result.canUpdate).toBe(true);
    });

    test('TU-259: Técnico NÃO pode atualizar outros (MC/DC)', () => {
      const outroTecnico = { id: 4, username: 'tecnico2', perfil: 'Técnico' };
      const result = usersService.canUpdateUser(tecnico, outroTecnico);
      expect(result.canUpdate).toBe(false);
      expect(result.reason).toContain('Sem permissões');
    });

    test('TU-260: Responsável NÃO pode atualizar outro Responsável (MC/DC)', () => {
      const outroResp = { id: 5, username: 'resp2', perfil: 'Responsável Técnico' };
      const result = usersService.canUpdateUser(responsavel, outroResp);
      expect(result.canUpdate).toBe(false);
    });
  });

  // ============================================================
  // TU-261 a TU-264: canDeleteUser (MC/DC)
  // ============================================================
  
  describe('canDeleteUser - MC/DC', () => {
    const admin = { id: 1, username: 'admin1', perfil: 'Administrador' };
    const responsavel = { id: 2, username: 'resp1', perfil: 'Responsável Técnico' };
    const tecnico = { id: 3, username: 'tecnico1', perfil: 'Técnico' };

    test('TU-261: Administrador pode eliminar outros utilizadores (MC/DC)', () => {
      const result = usersService.canDeleteUser(admin, tecnico);
      expect(result.canDelete).toBe(true);
      expect(result.reason).toBeNull();
    });

    test('TU-262: NÃO pode eliminar-se a si próprio (MC/DC)', () => {
      const result = usersService.canDeleteUser(admin, admin);
      expect(result.canDelete).toBe(false);
      expect(result.reason).toContain('Não pode eliminar a própria conta');
    });

    test('TU-263: Responsável NÃO pode eliminar utilizadores (MC/DC)', () => {
      const result = usersService.canDeleteUser(responsavel, tecnico);
      expect(result.canDelete).toBe(false);
      expect(result.reason).toContain('Apenas Administrador pode eliminar utilizadores');
    });

    test('TU-264: Técnico NÃO pode eliminar utilizadores (MC/DC)', () => {
      const outroTecnico = { id: 4, username: 'tecnico2', perfil: 'Técnico' };
      const result = usersService.canDeleteUser(tecnico, outroTecnico);
      expect(result.canDelete).toBe(false);
      expect(result.reason).toContain('Apenas Administrador');
    });
  });

  // ============================================================
  // TU-265 a TU-267: comparePerfilHierarchy (PE)
  // ============================================================
  
  describe('comparePerfilHierarchy - PE', () => {
    test('TU-265: Administrador > Técnico', () => {
      const result = usersService.comparePerfilHierarchy('Administrador', 'Técnico');
      expect(result).toBe(1);
    });

    test('TU-266: Técnico < Responsável Técnico', () => {
      const result = usersService.comparePerfilHierarchy('Técnico', 'Responsável Técnico');
      expect(result).toBe(-1);
    });

    test('TU-267: Mesmo perfil retorna 0', () => {
      const result = usersService.comparePerfilHierarchy('Técnico', 'Técnico');
      expect(result).toBe(0);
    });
  });

});
