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

router.get('/', controller.getAll);
router.post('/', controller.create);
router.post('/import', upload.single('file'), controller.importCSV);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;