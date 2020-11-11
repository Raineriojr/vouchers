const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports= {
    //cadastrar captador
    async create(req, res){
        const auth = req.headers.authorization;
        const { cpf_cap, nome_cap, email_cap, senha } = req.body;

        if(auth !== 'admin'){
            return res.status(401).send({ erro: 'Não Autorizado'})
        }

        const captador = await connection('captadores').where('cpf_cap', cpf_cap).select('cpf_cap').first();
        
        if (captador){
            return res.send('Este usuário já está cadastrado!');    
    } 
        bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
            if(errBcrypt){
                return res.status(500).send({erro: errBcrypt})
            }
            const senha = hash;
            await connection('captadores').insert({
                cpf_cap, 
                nome_cap, 
                email_cap,
                senha
            })
                return res.send('Usuário cadastrado com sucesso! Nome: '+ nome_cap);
                
        })
        
        
    },
    //listar
    async index(req, res){
        const auth = req.headers.authorization;

        if(auth !== 'admin'){
            return res.status(401).send({ erro: 'Não Autorizado'})
        }

        const captadores = await connection('captadores').select('nome_cap');

        return res.json(captadores);
    },

    //deletar 
    async delete (req, res){
        const auth = req.headers.authorization;
        const { id } = req.params;
        
        if(auth !== 'admin'){
            return res.status(401).send({ erro: 'Não Autorizado'})
        }        

        await connection('captadores').where('id', id).delete();

        return res.status(204);
    }
}
