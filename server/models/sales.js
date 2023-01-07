
module.exports = (sequelize, DataType) => {

    /**
     * Configuração da entidade Sale pelo Sequelize
     * Aqui são definidos os nomes dos campos da entidade e os seus respectivos tipos de dados
     */
    const Sale = sequelize.define('sales', {
        saleId: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchaserName: {
            type: DataType.STRING
        },
        itemDescription: {
            type: DataType.STRING
        },
        itemPrice: {
            type: DataType.DOUBLE
        },
        purchaseCount: {
            type: DataType.INTEGER,
        },
        merchantAddress: {
            type: DataType.STRING
        },
        merchantName: {
            type: DataType.STRING
        },
        createdAt: {            
            type: DataType.STRING
        },
        updatedAt: {            
            type: DataType.STRING
        }
    }, {
        timestamps: false
    });

    return Sale;
}