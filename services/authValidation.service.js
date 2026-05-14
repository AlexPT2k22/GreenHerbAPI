/**
 * Validadores de entrada para autenticação
 * Implementa validações de regex e comprimento conforme feedback do professor
 */

/**
 * Valida username
 * @param {string} username 
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateUsername(username) {
    const errors = [];

    // Verificar se existe
    if (!username || typeof username !== 'string') {
        errors.push('Username é obrigatório');
        return { valid: false, errors };
    }

    // Comprimento: mínimo 3, máximo 50 caracteres
    if (username.length < 3) {
        errors.push('Username deve ter no mínimo 3 caracteres');
    }
    if (username.length > 50) {
        errors.push('Username deve ter no máximo 50 caracteres');
    }

    // Regex: apenas letras, números, underscore e hífen
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
        errors.push('Username deve conter apenas letras, números, underscore (_) e hífen (-)');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Valida password
 * @param {string} password 
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validatePassword(password) {
    const errors = [];

    // Verificar se existe
    if (!password || typeof password !== 'string') {
        errors.push('Password é obrigatória');
        return { valid: false, errors };
    }

    // Comprimento: mínimo 8, máximo 128 caracteres
    if (password.length < 8) {
        errors.push('Password deve ter no mínimo 8 caracteres');
    }
    if (password.length > 128) {
        errors.push('Password deve ter no máximo 128 caracteres');
    }

    // Regex: pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
        errors.push('Password deve conter pelo menos uma letra maiúscula');
    }

    // Regex: pelo menos uma letra minúscula
    if (!/[a-z]/.test(password)) {
        errors.push('Password deve conter pelo menos uma letra minúscula');
    }

    // Regex: pelo menos um número
    if (!/[0-9]/.test(password)) {
        errors.push('Password deve conter pelo menos um número');
    }

    // Regex: pelo menos um carácter especial
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password deve conter pelo menos um carácter especial (!@#$%^&*...)');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Valida perfil de utilizador
 * @param {string} perfil 
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validatePerfil(perfil) {
    const errors = [];
    const validPerfis = ['Técnico', 'Responsável', 'Administrador'];

    if (!perfil) {
        errors.push('Perfil é obrigatório');
        return { valid: false, errors };
    }

    if (!validPerfis.includes(perfil)) {
        errors.push(`Perfil inválido. Deve ser um de: ${validPerfis.join(', ')}`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Valida credenciais de login (username + password)
 * @param {string} username 
 * @param {string} password 
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateLoginCredentials(username, password) {
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    const allErrors = [
        ...usernameValidation.errors,
        ...passwordValidation.errors
    ];

    return {
        valid: allErrors.length === 0,
        errors: allErrors
    };
}

/**
 * Valida dados de registo (username + password + perfil)
 * @param {string} username 
 * @param {string} password 
 * @param {string} perfil 
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateRegisterData(username, password, perfil) {
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    const perfilValidation = validatePerfil(perfil);

    const allErrors = [
        ...usernameValidation.errors,
        ...passwordValidation.errors,
        ...perfilValidation.errors
    ];

    return {
        valid: allErrors.length === 0,
        errors: allErrors
    };
}

module.exports = {
    validateUsername,
    validatePassword,
    validatePerfil,
    validateLoginCredentials,
    validateRegisterData
};
