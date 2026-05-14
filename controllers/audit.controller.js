// Logs de auditoria
let logs = [];

// Listar todos os logs
exports.getAll = (req, res) => {
    res.status(200).json(logs);
};

// Obter log por ID
exports.getById = (req, res) => {
    const log = logs.find(l => l.id === req.params.id);
    if (!log) return res.status(404).json({ message: "Log não encontrado" });
    res.status(200).json(log);
};

// Obter logs de um utilizador específico
exports.getByUser = (req, res) => {
    const userLogs = logs.filter(l => l.userId === req.params.userId);
    res.status(200).json(userLogs);
};