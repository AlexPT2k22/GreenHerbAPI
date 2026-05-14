const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/herbs.controller');

// Configurar multer para upload de ficheiros em memória
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv|txt)$/)) {
            return cb(new Error('Only CSV files are allowed'), false);
        }
        cb(null, true);
    }
});

/**
 * @swagger
 * /herbs:
 *   get:
 *     summary: Listar todas as ervas aromáticas
 *     tags: [Herbs]
 *     responses:
 *       200:
 *         description: Lista de ervas aromáticas
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /herbs:
 *   post:
 *     summary: Criar nova erva aromática
 *     tags: [Herbs]
 *     responses:
 *       201:
 *         description: Erva criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', controller.create);

/**
 * @swagger
 * /herbs/import:
 *   post:
 *     summary: Importar ervas a partir de ficheiro CSV
 *     tags: [Herbs]
 *     responses:
 *       200:
 *         description: Importação concluída
 *       400:
 *         description: Ficheiro inválido ou vazio
 */
router.post('/import', upload.single('file'), controller.importCSV);

/**
 * @swagger
 * /herbs/{id}:
 *   get:
 *     summary: Obter erva por ID
 *     tags: [Herbs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Erva encontrada
 *       404:
 *         description: Erva não encontrada
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /herbs/{id}:
 *   put:
 *     summary: Atualizar erva
 *     tags: [Herbs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Erva atualizada
 *       404:
 *         description: Erva não encontrada
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /herbs/{id}:
 *   delete:
 *     summary: Remover erva
 *     tags: [Herbs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Erva removida
 *       404:
 *         description: Erva não encontrada
 */
router.delete('/:id', controller.delete);

module.exports = router;