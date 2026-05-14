// Estrutura em memória para batches
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

// Alterar estado do lote
exports.updateState = (req, res) => {
    const { novoEstado } = req.body;
    const index = db.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Lote não encontrado" });
    
    const lote = db[index];
    const estadoAtual = lote.estado || 'ativo';
    
    // Validar transição de estado (RN-39, RN-40)
    const validTransitions = {
        'ativo': ['concluído', 'comprometido'],
        'concluído': [],
        'comprometido': []
    };
    
    if (!validTransitions[estadoAtual] || !validTransitions[estadoAtual].includes(novoEstado)) {
        return res.status(400).json({ 
            message: `Transição inválida de '${estadoAtual}' para '${novoEstado}'` 
        });
    }
    
    db[index].estado = novoEstado;
    res.status(200).json({ message: "Estado atualizado com sucesso", data: db[index] });
};

// Aplicar plano a lote
exports.applyPlan = (req, res) => {
    const { planId } = req.body;
    const index = db.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Lote não encontrado" });
    
    db[index].planId = planId;
    db[index].planAppliedAt = new Date();
    res.status(200).json({ message: "Plano aplicado com sucesso", data: db[index] });
};

// Dividir lote
exports.divide = (req, res) => {
    const { numDivisoes } = req.body;
    const index = db.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Lote não encontrado" });
    
    const loteOriginal = db[index];
    const novoLote = {
        ...loteOriginal,
        id: Date.now().toString(),
        parentId: loteOriginal.id,
        divisoes: numDivisoes || 2
    };
    
    db.push(novoLote);
    res.status(201).json({ message: "Lote dividido com sucesso", data: novoLote });
};

// Registar perdas
exports.registerLosses = (req, res) => {
    const { perdas, motivo } = req.body;
    const index = db.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Lote não encontrado" });
    
    db[index].perdas = (db[index].perdas || 0) + perdas;
    db[index].motivoPerdas = motivo;
    res.status(200).json({ message: "Perdas registadas com sucesso", data: db[index] });
};

// Calcular produtividade (RN-35)
exports.getProductivity = (req, res) => {
    const lote = db.find(i => i.id === req.params.id);
    if (!lote) return res.status(404).json({ message: "Lote não encontrado" });
    
    const quantidadeInicial = lote.quantidadeInicial || 100;
    const perdas = lote.perdas || 0;
    const divisoes = lote.divisoes || 1;
    
    const produtividade = ((quantidadeInicial - perdas) / divisoes).toFixed(2);
    
    res.status(200).json({ 
        loteId: lote.id,
        produtividade: parseFloat(produtividade),
        quantidadeInicial,
        perdas,
        divisoes
    });
};