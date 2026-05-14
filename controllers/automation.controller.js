// Regras de automação
let rules = [];
let mode = 'manual'; // 'manual' ou 'automatico'

// Criar regra de automação
exports.createRule = (req, res) => {
    const newRule = { id: Date.now().toString(), ...req.body };
    rules.push(newRule);
    res.status(201).json({ message: "Regra criada com sucesso", data: newRule });
};

// Listar regras
exports.getRules = (req, res) => {
    res.status(200).json(rules);
};

// Remover regra
exports.deleteRule = (req, res) => {
    const index = rules.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Regra não encontrada" });
    rules.splice(index, 1);
    res.status(200).json({ message: "Regra removida com sucesso" });
};

// Comutar modo de automação
exports.toggleMode = (req, res) => {
    const { mode: newMode } = req.body;
    
    if (!['manual', 'automatico'].includes(newMode)) {
        return res.status(400).json({ 
            message: "Modo inválido. Use 'manual' ou 'automatico'" 
        });
    }
    
    mode = newMode;
    res.status(200).json({ 
        message: `Modo alterado para '${mode}'`,
        currentMode: mode 
    });
};