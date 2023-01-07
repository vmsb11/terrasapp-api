const Sequelize = require('sequelize');
const Sale = require('../models').sales;
const { getQueryFilter, getPagination, getPagingData } = require('../helpers/search_helpers');
const columns = [
    'purchaserName', 
    'itemDescription',
    'itemPrice',
    'purchaseCount',
    'merchantAddress',
    'merchantName',
    'createdAt',
    'updatedAt'
];

//variável de instância da própria classe
let instance = null;

/**
 * Classe na qual são implementados os métodos que realizam a manipulação das informações da Entidade Sale como cadastrar, consultar, consulta por campos, editar, remover e etc
 */
class SalePersistence {

    /**
     * Construtor padrão
     */
    constructor() {

        /**
         * Inicializa a variável global que armazenará a instância de um objeto da própria classe
         */
        if(instance === null) {

            instance = this;
        }
    }

    /**
     * Método utilizado para cadastrar uma venda na base de dados
     * @param sale dados da venda a ser cadastrado 
     * @param transaction instância da transação que tá controlando a operação
     * @returns retorna um objeto com as informações da venda cadastrado
     */
    async createSale(sale, transaction) {

        //cria a venda na base de dados
        const newSale = await Sale.create(sale, transaction);
    
         //retorna a venda criado
        return newSale;
    }

    /**
     * Método que realiza uma busca de todas as vendas cadastrados
     * @param parameter parâmetro de busca, se o valor informado for "undefined" ou '', o filtro é ignorado
     * @param page página atual da busca
     * @param size total de registros por página
     * @returns uma lista das vendas cadastrados ou uma lista vazia caso não seja encontrado 
     */
    async searchSales(parameter, page, size) {

        //configura a paginação e o total de registro por páginas e o offset (local de onde parte a busca)
        const { limit, offset } = getPagination(page - 1, size);
        //variável que armazena as configurações da busca
        const query = {};
        //armazena o operador de busca que pode ser AND ou OR
        const Op = Sequelize.Op;
        
        //configura a busca definindo o limite de registros a ser buscado e o offset de busca (necessário por a busca utilizar paginação)
        query.limit = limit;
        query.offset = offset;
        query.subQuery = false;
        query.distinct = true;
        query.duplicating = false;
        
        //se o parâmetro for informado
        if(parameter) {
            
            //monta o filtro de busca filtrando cada uma das colunas escolhidas com o parâmetro informado
            const searchFilter = getQueryFilter(columns, parameter);
            
            query.where = {...query.where, [Op.and]: searchFilter.where};
        }

        //faz a busca na base de dados com base nas configurações de busca realizadas com a paginação configurada
        const salesCollection = await Sale.findAndCountAll(query);
        
        //retorna uma lista com as informações das vendas configurado por página
        return getPagingData(salesCollection, page, limit);
    }

    /**
     * Método que realiza a busca de sale por meio do seu id
     * @param saleId id da venda a ser buscado 
     * @returns retorna as informações da venda ou null caso não seja encontrado
     */
    async findSaleById(saleId) {

        //realiza a busca da venda por meio do seu id e inclui no resultado da busca as informações do usuário associado a esse sale
        const saleCollection = await Sale.findByPk(saleId);

        //se encontrou retorna as informações da busca
        if(saleCollection) {

            return saleCollection;
        }
        
        //se não encontrou, retorna nulo
        return null;
    }

    /**
     * Método que realiza a busca de sale por meio de um filtro com base em uma lista de chaves (nome dos campos) e valores a serem utilizados para filtrar
     * Exemplo: filtrar por titulo e status então teremos uma lista de chaves do tipo
     * [
     *    {"field": "purchaserName", "value": "xxxxxxxxxx" },
     *    {"field": "status", "value": "yyy"}
     * ]
     * @param parameters lista com os campos e os valores a serem utilizados como filtro 
     * @returns retorna as informações da venda ou null caso não seja encontrado
     */
     async findSaleByParameters(parameters) {

        //variável que armazena o filtro de busca utilizando a cláusula where
        const query = {where:{}};
        const Op = Sequelize.Op;

        //percorre a lista de parametros
        for(let i = 0; i < parameters.length; i++) {

            //obtém o parametro atual.
            const parameter = parameters[i];

            //monta a cláusula Where com o nome do campo e o valor a ser buscado, o operador utilizado é sempre o AND para combinar quando houver mais de uma condição
            query.where = {...query.where, [parameter.field]: {
                [Op.and]: {[Op.eq]: parameter.value}
            }};
        }

        //faz a busca de um única venda com base no filtro montado e inclui no resultado da busca as informações do usuário associado a esse sale
        const saleCollection = await Sale.findOne(query);
        
         //se encontrou retorna as informações da busca
         if(saleCollection) {

            return saleCollection;
        }
        
        //se não encontrou, retorna nulo
        return null;
    }

    /**
     * Método utilizado para alterar uma venda na base de dados
     * @param saleId id da venda a ser atualizado
     * @param sale dados da venda a ser alterado 
     * @param transaction instância da transação que tá controlando a operação
     * @returns retorna um objeto com as informações da venda alterado ou null se a venda não foi encontrado
     */
    async updateSale(saleId, sale, transaction) {

        //faz a busca da venda com base no id para verificar se o mesmo existe na base de dados
        const saleCollection = await Sale.findByPk(saleId);

        //se encontrou
        if(saleCollection) {

            //atualiza as informações da venda com base nos dados informados como parâmetro
            await saleCollection.update(sale, transaction);

            //retorna a venda com as informações atualizadas
            return saleCollection;
        }
        
        //se não encontrou retorna null
        return null;
    }

    /**
     * Método utilizado para remover uma venda na base de dados
     * @param saleId id da venda a ser atualizado
     * @param transaction instância da transação que tá controlando a operação
     * @returns retorna um objeto com as informações da venda removido ou null se a venda não foi encontrado
     */
    async deleteSale(saleId, transaction) {

        //faz a busca da venda com base no id para verificar se o mesmo existe na base de dados
        const saleCollection = await Sale.findByPk(saleId);

        //se encontrou
        if(saleCollection) {

            //remove o cadastro da venda na base de dados
            await saleCollection.destroy(transaction);

            //retorna a venda removido
            return saleCollection;
        }
        
        //se não encontrou retorna null
        return null;
    }

     /**
     * Método que deleta todos as vendas cadastrados na base de dados
     * @param transaction instância da transação que tá controlando a operação
     */
    async deleteAllSales(transaction) {

        //deleta todos as vendas na base de dados
        await Sale.destroy({
            where: {},
            truncate: false,
            transaction
        });
    }

    /**
     * Método que conta o total de vendas cadastrados na base de dados
     * @returns total de vendas cadastrados
     */
    async countSales() {

        //faz a busca utilizando a função de agregação count para contar o total de vendas cadastrados
        const countSales = await Sale.findAll({
            attributes: [
                [Sequelize.fn('count', Sequelize.col('saleId')), 'countSales']
            ]
        });

        //retorna o total de vendas
        return countSales;
    }

    /**
     * Método que conta o total de itens adquiridos na base de dados
     * @returns total de itens adquiridos
     */
    async countPurchaseItens() {

        //faz a busca utilizando a função de agregação sum para somar o total de itens adquiridos
        const countPurchaseItens = await Sale.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('purchaseCount')), 'countPurchaseItens']
            ]
        });

        //retorna o total de itens
        return countPurchaseItens;
    }

    /**
     * Método que calcula a receita bruta das vendas
     * @returns receita bruta das vendas
     */
    async calculateGrossRevenue() {

        //faz a busca utilizando a função de agregação sum para calcular a receita bruta
        const grossRevenue = await Sale.findAll({
            attributes: [
                [Sequelize.where(Sequelize.col('purchaseCount'), '*', Sequelize.fn('SUM', Sequelize.col('itemPrice'))), 'grossRevenue']
            ]
        });

        //retorna a receita bruta calculada
        return grossRevenue;
    }
}

//exporta uma instância já criada da classe para ser utilizada em outros arquivos
module.exports = new SalePersistence();