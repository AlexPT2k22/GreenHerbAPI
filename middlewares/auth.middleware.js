const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Nenhum token fornecido!" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.id;
        req.userPerfil = decoded.perfil;
        
        next();
    } catch (err) {
        return res.status(401).json({ message: "Não autorizado. Token inválido ou expirado!" });
    }
};

const checkRole = (rolesPermitidas) => {
    return (req, res, next) => {
        if (!req.userPerfil || !rolesPermitidas.includes(req.userPerfil)) {
            return res.status(403).json({ message: "Acesso negado. O teu perfil não tem permissões." });
        }
        next();
    };
};

module.exports = { verifyToken, checkRole };