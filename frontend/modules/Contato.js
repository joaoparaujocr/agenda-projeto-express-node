const validator = require('validator');

export default class Contato {
    constructor(formCLass) {
        this.form = document.querySelector(formCLass)
    }

    init() {
        this.events()
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            if (this.validate(e)) this.form.submit()
        })
    }

    validate(e) {
        let valid = true;
        const elemento = e.target;
        const nome = elemento.querySelector('input[name=nome]');
        const email = elemento.querySelector('input[name=email]');
        const telefone = elemento.querySelector('input[name=telefone]');

        if(!nome.value) {
            alert('O nome é obrigatório.');
            valid = false
        };

        if(!email.value && !telefone.value) {
            alert('Você precisa de um número ou e-mail.')
            valid = false
            return
        };

        if(email.value && !validator.isEmail(email.value)) {
            alert('E-mail invalido.');
            valid = false;
        };

        return valid;
    }
}