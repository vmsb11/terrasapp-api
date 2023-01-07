const express = require('express');
const router = express.Router();
const { formatDatetime } = require('../helpers/date_helpers');
const { verifyJWTToken } = require('../helpers/api_helpers');
const UserController = require('../controllers/userController');
const SaleController = require('../controllers/saleController');

/**
 * Define as rotas da API
 * Nas que precisam de autenticação, passa como parâmetro a função de middleware que checa se o token de autenticação é válido
 */
router.post('/sales/', verifyJWTToken, SaleController.createSale);
router.post('/sales/import', verifyJWTToken, SaleController.importSales);
router.put('/sales/:id', verifyJWTToken, SaleController.updateSale);
router.delete('/sales/:id', verifyJWTToken, SaleController.deleteSale);
router.get('/sales/', verifyJWTToken, SaleController.searchSales);
router.get('/sales/:id', verifyJWTToken, SaleController.findSaleById);
router.get('/sales/tasks/count', verifyJWTToken, SaleController.countSales);
router.get('/users/', verifyJWTToken, UserController.searchUsers);
router.get('/users/:id', verifyJWTToken, UserController.findUserById);
router.get('/users/tasks/count', verifyJWTToken, UserController.countUsers);
router.post('/users/', UserController.createUser);
router.put('/users/:id', verifyJWTToken, UserController.updateUser);
router.post('/users/login', UserController.authenticateUser);
router.post('/users/recovery', UserController.recoverUserPassword);

/**
 * Função especial que verifica se a rota não existe, se não existir, envia uma mensagem indicadno
 */
router.use(function(req, res, next) {
    if (!req.route) {
        res.status(404).send({
            code: 404,
            type: 'error',
            message: 'Rota não encontrada',
            date: formatDatetime(new Date())
        });
        return;
    }
    next();
});

module.exports = router;