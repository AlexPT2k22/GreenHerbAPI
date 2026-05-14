# 📚 DOCUMENTAÇÃO OPENAPI/SWAGGER

## O que é Swagger?

**Interface web visual** para documentar e testar a API:

```
http://localhost:3000/api-docs
```

![Exemplo Swagger](https://swagger.io/swagger/media/assets/images/swagger_logo.svg)

---

## 🚀 Instalação

### 1. Instalar dependências:
```bash
npm install swagger-ui-express swagger-jsdoc
```

### 2. Criar ficheiro de configuração:

**`config/swagger.config.js`:**
```javascript
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GREENHERB API',
      version: '1.0.0',
      description: 'API para gestão de ervas aromáticas em estufa',
      contact: {
        name: 'ESII - GREENHERB',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os ficheiros com anotações
};

module.exports = swaggerJsdoc(options);
```

### 3. Atualizar `index.js`:
```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');

// ... código existente ...

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

---

## 📝 Documentar Endpoints

### **Exemplo: `routes/herbs.route.js`**

```javascript
/**
 * @swagger
 * /herbs:
 *   get:
 *     summary: Listar todas as ervas aromáticas
 *     tags: [Herbs]
 *     responses:
 *       200:
 *         description: Lista de ervas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   especie:
 *                     type: string
 *                   tempMin:
 *                     type: number
 *                   tempMax:
 *                     type: number
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /herbs:
 *   post:
 *     summary: Criar nova erva aromática
 *     tags: [Herbs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - especie
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Hortelã"
 *               especie:
 *                 type: string
 *                 example: "Mentha spicata"
 *               tempMin:
 *                 type: number
 *                 example: 15
 *               tempMax:
 *                 type: number
 *                 example: 25
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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Importação concluída
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 valid:
 *                   type: number
 *                 invalid:
 *                   type: number
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/import', upload.single('file'), controller.importFromCSV);
```

---

## 🎯 Resultado

Acede a:
```
http://localhost:3000/api-docs
```

Verás:
- ✅ Listagem de todos os endpoints
- ✅ Parâmetros de entrada
- ✅ Exemplos de requests/responses
- ✅ Botão "Try it out" para testar

---

## 📋 Checklist Implementação

### **Mínimo (enunciado):**
- [ ] Instalar `swagger-ui-express` e `swagger-jsdoc`
- [ ] Criar `config/swagger.config.js`
- [ ] Adicionar rota `/api-docs` no `index.js`
- [ ] Documentar **pelo menos** os endpoints críticos:
  - [ ] POST /herbs/import
  - [ ] POST /batches/:id/apply-plan
  - [ ] PATCH /alerts/:id
  - [ ] GET /batches/:id/productivity
  - [ ] PATCH /automation/mode

### **Completo (ideal):**
- [ ] Documentar todos os 59 endpoints
- [ ] Adicionar schemas reutilizáveis em `components/schemas`
- [ ] Documentar códigos de erro (400, 401, 404, 500)
- [ ] Adicionar exemplos de requests

---

## 🔗 Recursos

- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
- [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc)
- [OpenAPI 3.0 Spec](https://swagger.io/specification/)

---

**NOTA:** Podes implementar isto no **Sprint 3** se não for prioritário agora.
