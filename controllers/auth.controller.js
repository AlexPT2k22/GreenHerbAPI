const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        // Agora aceitamos o perfil no registo
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

        // 1. Procurar o utilizador
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // 2. Verificar a password (usando o método do modelo)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // 3. Gerar o JWT com o ID e o Perfil no payload
        const payload = {
            id: user._id,
            perfil: user.perfil
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h' // A autenticação assenta em JWT com expiração [cite: 38]
        });

        // Retornar o token
        res.status(200).json({
            message: "Autenticação bem-sucedida",
            token: token,
            perfil: user.perfil
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};