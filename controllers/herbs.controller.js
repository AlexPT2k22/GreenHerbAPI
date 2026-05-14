const fs = require('fs');
const path = require('path');
const herbsService = require('../src/services/herbsService');

// Estrutura em memória para herbs - EXPORTADA para acesso em testes
let db = [];

exports.db = db;

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

/**
 * Importa ervas a partir de ficheiro CSV
 * @param {Request} req - Request com ficheiro na propriedade file
 * @param {Response} res - Response para enviar resultado
 */
exports.importCSV = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                message: "Ficheiro CSV é obrigatório",
                total: 0,
                valid: 0,
                invalid: 0,
                errors: ['No file provided'],
                data: []
            });
        }

        const csvContent = req.file.buffer.toString('utf-8');
        const result = herbsService.importFromCSV(csvContent);

        if (result.errors.length > 0 && result.valid === 0) {
            return res.status(400).json({
                message: "Ficheiro CSV vazio ou inválido",
                ...result
            });
        }

        // Adiciona ervas válidas à base de dados
        db.push(...result.data);

        return res.status(201).json({
            message: `Importação concluída: ${result.valid} válidas, ${result.invalid} inválidas`,
            total: result.total,
            valid: result.valid,
            invalid: result.invalid,
            errors: result.errors,
            data: result.data
        });
    } catch (error) {
        console.error('Erro na importação CSV:', error);
        return res.status(500).json({
            message: "Erro ao processar ficheiro CSV",
            error: error.message
        });
    }
};