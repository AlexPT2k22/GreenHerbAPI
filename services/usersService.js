/**
 * Users Service
 * Lógica de negócio para gestão de utilizadores
 * Sprint 3 - Testes de Unidade
 */

/**
 * Valida os dados de um utilizador
 * @param {Object} user - Dados do utilizador
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateUserData(user) {
  const errors = [];

  if (!user) {
    return { valid: false, errors: ['Utilizador não pode ser nulo'] };
  }

  // Username
  if (!user.username || user.username.trim().length < 3) {
    errors.push('username deve ter pelo menos 3 caracteres');
  }

  if (user.username && user.username.length > 50) {
    errors.push('username não pode exceder 50 caracteres');
  }

  // Password (se fornecida)
  if (user.password !== undefined) {
    if (user.password.length < 8) {
      errors.push('password deve ter pelo menos 8 caracteres');
    }
    if (user.password.length > 128) {
      errors.push('password não pode exceder 128 caracteres');
    }
  }

  // Perfil
  if (!user.perfil) {
    errors.push('perfil é obrigatório');
  } else {
    const perfisValidos = ['Técnico', 'Responsável Técnico', 'Administrador'];
    if (!perfisValidos.includes(user.perfil)) {
      errors.push('perfil deve ser Técnico, Responsável Técnico ou Administrador');
    }
  }

  // Estado
  if (user.estado) {
    const estadosValidos = ['ativo', 'inativo'];
    if (!estadosValidos.includes(user.estado)) {
      errors.push('estado deve ser ativo ou inativo');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifica se um utilizador pode criar outro utilizador
 * RN-01: Apenas Administrador pode criar utilizadores
 * @param {Object} requester - Utilizador que faz o pedido
 * @param {string} newUserPerfil - Perfil do novo utilizador
 * @returns {Object} { canCreate: boolean, reason: string }
 */
function canCreateUser(requester, newUserPerfil) {
  if (!requester) {
    return { canCreate: false, reason: 'Utilizador requisitante não especificado' };
  }

  if (requester.perfil !== 'Administrador') {
    return { canCreate: false, reason: 'Apenas Administrador pode criar utilizadores' };
  }

  const perfisValidos = ['Técnico', 'Responsável Técnico', 'Administrador'];
  if (!perfisValidos.includes(newUserPerfil)) {
    return { canCreate: false, reason: 'Perfil inválido' };
  }

  return { canCreate: true, reason: null };
}

/**
 * Verifica se um utilizador pode atualizar outro utilizador
 * @param {Object} requester - Utilizador que faz o pedido
 * @param {Object} targetUser - Utilizador a atualizar
 * @returns {Object} { canUpdate: boolean, reason: string }
 */
function canUpdateUser(requester, targetUser) {
  if (!requester || !targetUser) {
    return { canUpdate: false, reason: 'Utilizadores não especificados' };
  }

  // Utilizador pode atualizar-se a si próprio (exceto perfil)
  if (requester.id === targetUser.id) {
    return { canUpdate: true, reason: null };
  }

  // Administrador pode atualizar qualquer um
  if (requester.perfil === 'Administrador') {
    return { canUpdate: true, reason: null };
  }

  // Responsável pode atualizar Técnicos
  if (requester.perfil === 'Responsável Técnico' && targetUser.perfil === 'Técnico') {
    return { canUpdate: true, reason: null };
  }

  return { canUpdate: false, reason: 'Sem permissões para atualizar este utilizador' };
}

/**
 * Verifica se um utilizador pode eliminar outro utilizador
 * @param {Object} requester - Utilizador que faz o pedido
 * @param {Object} targetUser - Utilizador a eliminar
 * @returns {Object} { canDelete: boolean, reason: string }
 */
function canDeleteUser(requester, targetUser) {
  if (!requester || !targetUser) {
    return { canDelete: false, reason: 'Utilizadores não especificados' };
  }

  // Não pode eliminar-se a si próprio
  if (requester.id === targetUser.id) {
    return { canDelete: false, reason: 'Não pode eliminar a própria conta' };
  }

  // Apenas Administrador pode eliminar
  if (requester.perfil !== 'Administrador') {
    return { canDelete: false, reason: 'Apenas Administrador pode eliminar utilizadores' };
  }

  return { canDelete: true, reason: null };
}

/**
 * Verifica hierarquia de perfis
 * @param {string} perfil1 - Primeiro perfil
 * @param {string} perfil2 - Segundo perfil
 * @returns {number} -1 se perfil1 < perfil2, 0 se igual, 1 se perfil1 > perfil2
 */
function comparePerfilHierarchy(perfil1, perfil2) {
  const hierarchy = {
    'Administrador': 3,
    'Responsável Técnico': 2,
    'Técnico': 1
  };

  const level1 = hierarchy[perfil1] || 0;
  const level2 = hierarchy[perfil2] || 0;

  if (level1 < level2) return -1;
  if (level1 > level2) return 1;
  return 0;
}

module.exports = {
  validateUserData,
  canCreateUser,
  canUpdateUser,
  canDeleteUser,
  comparePerfilHierarchy
};
