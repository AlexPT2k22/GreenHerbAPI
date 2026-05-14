const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password, perfil } = req.body;

        const newUser = new User({ username, password, perfil });

        await newUser.save();
        res.status(201).json({ message: "Utilizador registado com sucesso!", id: newUser._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const payload = {
            id: user._id,
            perfil: user.perfil
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.status(200).json({
            message: "Autenticação bem-sucedida",
            token: token,
            perfil: user.perfil
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token não fornecido." });
        }

        // Verificar o refresh token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado." });
        }

        const payload = {
            id: user._id,
            perfil: user.perfil
        };

        const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.status(200).json({
            message: "Token renovado com sucesso",
            token: newToken
        });

    } catch (error) {
        res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

exports.logout = async (req, res) => {
    try {
        // No logout com JWT, o cliente deve descartar o token
        // Aqui podemos adicionar lógica de blacklist se necessário
        res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};