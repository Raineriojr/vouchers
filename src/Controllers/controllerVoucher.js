const connection = require('../database/connection');
const voucher_code = require('voucher-code-generator');
const moment = require('moment');

module.exports = {
    async create (req, res){
        const auth = req.headers.authorization;
        const { desconto, quantidade, fk_captador, curso } = req.body;

        if(auth !== 'admin'){
            return res.status(401).send({ erro: 'Não Autorizado'})
        }
        
        const codigo = await voucher_code.generate({
            length: 8,
            count: quantidade,
            charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        })

        const data = await moment().format("DD/MM/yyyy HH:mm");
    
        async function inserirVoucher(item){
            const codigo = item;
            await connection('vouchers').insert({
                desconto,
                curso,
                fk_captador,
                codigo,
                data,
                status: false
            })
        }
        codigo.forEach(inserirVoucher);
        return res.json('Vouchers Criados!');
        
},
    //listar vouchers disponiveis por captador
    async index (req, res){
        const { id } = req.params;

        const [count] = await connection('vouchers')
        .where('fk_captador', id)
        .where('status', false)
        .count();

        if (count > 0){
            res.header('X-Total-Count', count['count(*)'])
        } else{
            count = 0;
            res.header('X-Total-Count', count['count(*)'])
        }
        const vouchers = await connection('vouchers')
        .where('fk_captador', id)
        .where('status', false)
        .join('captadores', 'id', '=', 'vouchers.fk_captador')
        .join('cursos', 'id_curso', '=', 'vouchers.curso')
        .select('vouchers.codigo', 'cursos.nome_curso', 'vouchers.desconto', 'cursos.valor');
        
        return res.json(vouchers);
},
    //lista vouchers usados por captador
    async index2 (req, res){
        const { id }  = req.params;

        const clientes = await connection('vouchers')
        .where('fk_captador', id)
        .where('status', true)
        .join('clientes', 'cod_voucher', '=', 'vouchers.codigo')
        .join('cursos', 'id_curso', '=', 'vouchers.curso')
        .select('clientes.nome', 'vouchers.codigo', 'cursos.nome_curso', 'vouchers.desconto')

        return res.json(clientes);
    },
    //consultar voucher
    async search (req, res){
        const { cod_voucher } = req.body;
        
        const codigo = await connection('vouchers').where('codigo', cod_voucher);

        if(codigo < cod_voucher || codigo == ''){
            return res.json('Código não encontrado.');
        }

        const voucher  = await connection('vouchers')
            .where('codigo', cod_voucher)
            .join('captadores', 'id', '=', 'vouchers.fk_captador')
            .join('cursos', 'id_curso', '=', 'vouchers.curso')
            .select('vouchers.codigo', 'cursos.nome_curso', 'vouchers.desconto','vouchers.data','captadores.nome_cap', 'cursos.valor')
            .first();
            
            return res.json(voucher);        
    },

    //deletar
    async delete (req, res){
        const auth = req.headers.authorization;
        const { codigo } = req.params;

        if(auth !== 'admin'){
            return res.status(401).send({ erro: 'Não Autorizado'})
        }        
    
        await connection('vouchers').where('codigo', codigo).first().delete();
    
        return res.status(204);
    }
}
