const { faker } = require('@faker-js/faker');

const DataFactory = {
    gerarUsuario: (admin = "true") => {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: admin
        };
    },

    gerarProduto: () => {
        return {
            nome: faker.commerce.productName() + " " + faker.string.uuid(),
            preco: parseInt(faker.commerce.price({ min: 10, max: 1000 })),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 10, max: 100 })
        };
    }
};

module.exports = DataFactory;