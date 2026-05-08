// Estrutura em memória para measurements
let db = [];

exports.getAll = (req, res) => {
    res.status(200).json(db);
};

exports.create = (req, res) => {
    const newItem = { id: Date.now().toString(), ...req.body };
    db.push(newItem);
    res.status(201).json({ message: "Criado com sucesso", data: newItem });
};

exports.getById = (req, res) => {
    const item = db.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ message: "Não encontrado" });
    res.status(200).json(item);
};

exports.update = (req, res) => {
    const index = db.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Não encontrado" });
    db[index] = { ...db[index], ...req.body, id: req.params.id };
    res.status(200).json({ message: "Atualizado com sucesso", data: db[index] });
};

exports.delete = (req, res) => {
    const index = db.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Não encontrado" });
    db.splice(index, 1);
    res.status(200).json({ message: "Removido com sucesso" });
};