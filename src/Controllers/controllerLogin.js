const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(req, res){
        const { cpf, senha } = req.body;

        const results = await connection('captadores').where('cpf_cap', cpf);

        if(results < 1){
            return res.status(401).send({ mensagem: 'Falha na autenticação' })
        }
      
        bcrypt.compare(senha, results[0].senha).then((result) => {
            if(result){
                const token = jwt.sign({
                    id: results[0].id,
                    cpf: results[0].cpf_cap
                }, 
                    process.env.SECRET, {
                        expiresIn: "20"
                    });

                    return res.status(200).send({ 
                        id: results[0].id,
                        nome: results[0].nome_cap,
                        mensagem: 'Autenticado com sucesso!',
                        token: token
                    })
                }
               return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        
    
}   
}
