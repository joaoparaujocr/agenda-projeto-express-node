const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criandoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = []
        this.contato = null,
        this.email = null,
        this.telefone = null
    }

    async register() {
        this.valida()
        if (this.errors.length > 0) return;

        this.contato = await ContatoModel.create(this.body)
    }

    valida() {
        this.cleanUp()

        // Validação
        // O e-mail precisa ser válido
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')

        // O nome precisa ser válido
        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.')

        if (!this.body.telefone && !this.body.email){
            this.errors.push('Pelo menos um meio de contado sendo ele e-mail ou telefone.')
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

    static async buscarPorId(id) {
        if (typeof id !== 'string') return;
        return await ContatoModel.findById(id);
    }

    static async buscarPorContatos() {
        return await ContatoModel.find().sort( { criadoEm: -1 });
    }

    // async contatoExiste() {
    //     this.email = await ContatoModel.findOne({ email: this.body.email });
    //     if(this.email) {
    //         this.errors.push('O e-mail já está em um contato');
    //     };

    //     this.telefone = await ContatoModel.findOne({ telefone: this.body.telefone });
    //     if(this.telefone) {
    //         this.errors.push('O telefone já está em um contato');
    //     };


    // }

    async edit(id) {
        if (typeof id !== 'string') return;
        this.valida()
        if (this.errors.length > 0) return;

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    static async deleteUser(id) {
        if (typeof id !== "string") return;
        return await ContatoModel.findOneAndDelete({ _id: id })
    }
}

// Contato.buscarPorId = async (id) => {
//     if (typeof id !== 'string') return;
//     const user = await ContatoModel.findById(id)
//     return user
// }

// Contato.prototype.edit = async(id) {

// }

module.exports = Contato;