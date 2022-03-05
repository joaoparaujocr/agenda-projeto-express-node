const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    const contatos = await Contato.buscarPorContatos()
    res.render('index', {
        contatos: contatos,
        title: 'Agenda'
    })
}