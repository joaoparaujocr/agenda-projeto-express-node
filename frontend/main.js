import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import './assets/css/style.css';

import Login from './modules/Login';
import Contato from './modules/Contato';

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
login.init()
cadastro.init()

const contato = new Contato('.form_contato');
contato.init()