const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const controllerCaptadores = require('./Controllers/controllerCaptadores');
const controllerVoucher = require('./Controllers/controllerVoucher');
const controllerClientes = require('./Controllers/controllerClientes');
const controllerLogin = require('./Controllers/controllerLogin');


routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpf: Joi.string().required(),
        senha: Joi.string().required()
    })
}) , controllerLogin.create);

routes.post('/captadores/cadastro', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpf_cap: Joi.string().required().length(11),
        nome_cap: Joi.string().required().min(3),
        email_cap: Joi.string().required().email(),
        senha: Joi.string().required().min(8)
    })
}), controllerCaptadores.create);

routes.get('/captadores', controllerCaptadores.index);

routes.delete('/captadores/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),controllerCaptadores.delete);
    
routes.post('/voucher', celebrate({
    [Segments.BODY]: Joi.object().keys({
        desconto: Joi.number().required().positive(),
        quantidade: Joi.number().required().positive(),
        fk_captador: Joi.number().required(),
        curso: Joi.number().required()
    })
}) , controllerVoucher.create);

routes.get('/vouchers_disponiveis/captador/:id', controllerVoucher.index);


routes.get('/buscar/voucher', controllerVoucher.search);

routes.delete('/voucher/:codigo', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        codigo: Joi.string().required().min(8)
    })
}) , controllerVoucher.delete);

routes.get('/vouchers_usados/captador/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), controllerVoucher.index2);

routes.post('/clientes/cadastro', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpf1: Joi.string().required().length(11),
        nome: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        telefone: Joi.string().min(10).required(),
        cep: Joi.string().required().length(8),
        rua: Joi.string().required().min(2),
        numero: Joi.string().required(),
        bairro: Joi.string().required().min(3),
        complemento: Joi.string(),
        cidade: Joi.string().required().min(5),
        uf: Joi.string().required().length(2),
        cod_voucher: Joi.string().required().length(8)
    })
}) ,controllerClientes.create);

module.exports = routes;