const connection = require('../database/connection')
const moment = require('moment');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
    async create (req, res){
        const { cpf1, nome, email, telefone, cep, rua, numero, bairro, complemento, cidade, uf, cod_voucher } = req.body;
               
        const data_cadastro = await moment().format("DD/MM/yyyy HH:mm");
        
        const teste_cpf = await connection('clientes').where('cpf', cpf1).select('cpf');
        
        const trx = await connection.transaction();

        if(teste_cpf < 1){
            const codigo = await connection('clientes').where('cod_voucher', cod_voucher).first();
            if(codigo){
                return res.status(400).json('Código já cadastrado');
            } else {
                const teste_cpf = cpf1;
                if(!cpf.isValid(teste_cpf)){
                    return res.status(400).send({ mensagem: 'CPF inválido.' }); 
                 } else {
            await trx('clientes').insert({
                cpf: cpf1, 
                nome, 
                email, 
                telefone,
                cep, 
                rua, 
                numero, 
                bairro, 
                complemento, 
                cidade, 
                uf,
                cod_voucher,
                data_cadastro
             })
            await trx('vouchers').where('codigo', cod_voucher).update('status', true);

            await trx.commit();

            return res.status(200).send({mensagem: 'Cadastro realizado!'});
           
        } } }
        return res.status(400).send({mensagem:'Usuário já está cadastrado.'});
       
    },

    
    }
