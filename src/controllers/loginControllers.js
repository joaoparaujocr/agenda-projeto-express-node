const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) {
        req.flash('errors', 'Você já está logado em uma sessão')
        return res.redirect('/')
    }

    return res.render('login', {
        title: 'Login',
    })
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
               return res.redirect('/login/index')
            })
            return
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
            req.session.save(() => {
               return res.redirect('/login/index')
            })
        return;
        
    } catch (error) {
        console.log(e)
        return res.render('404')
    }

}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.logar();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
               return res.redirect('/login/index')
            });
            return
        }

        req.flash('success', 'Logado');
        req.session.user = login.user;
        req.session.save(() => {
           return res.redirect('/')
        });
        return;
        
    } catch (error) {
        console.log(e);
        return res.render('404');
    }

}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login/index')
}