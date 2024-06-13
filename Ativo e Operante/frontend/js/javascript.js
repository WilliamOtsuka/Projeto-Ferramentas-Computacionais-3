var token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', (event) => {
        
    checkUserLoggedIn();
    
    if (!token) {
        var btnDenuncie = document.getElementById('btnDenuncie');
        btnDenuncie.classList.add('disabled');
        btnDenuncie.addEventListener('click', function(event) {
            event.preventDefault();
        });
    }
});

function signUp() {
    // Seleciona o campo de entrada de e-mail pelo ID
    var emailInput = document.getElementById('emailsu');
    // Obtém o valor do campo de entrada de e-mail
    var emailValue = emailInput.value;

    // Seleciona o campo de entrada de documento pelo ID
    var documentInput = document.getElementById('document');
    // Obtém o valor do campo de entrada de documento
    var documentValue = documentInput.value;

    // Seleciona o campo de entrada de senha pelo ID
    var passwordInput = document.getElementById('senhasu');
    // Obtém o valor do campo de entrada de senha
    var passwordValue = passwordInput.value;

    const usuario = {
        email: emailValue,
        senha: passwordValue,
        cpf: documentValue,
        nivel: 1
    };

    // Check if email contains @
    if (!usuario.email.includes('@')) {
        console.error('Invalid email');
        return;
    }
    
    fetch('http://localhost:8080/apis/security/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
        }
        if (response.headers.get('content-type').includes('application/json')) {
            return response.json();
        } else {
            return response.text().then(text => {
                throw new Error('Server response is not JSON: ' + text);
            });
        }
    })
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}

async function login(event) {
    event.preventDefault();
    // Seleciona o campo de entrada de e-mail pelo ID
    var emailInput = document.getElementById('email');
    // Obtém o valor do campo de entrada de e-mail
    var emailValue = emailInput.value;

    // Seleciona o campo de entrada de senha pelo ID
    var passwordInput = document.getElementById('senha');
    // Obtém o valor do campo de entrada de senha
    var passwordValue = passwordInput.value;

    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    if(emailInput.value === '') {
        emailError.textContent = 'Email is required';
    } else {
        emailError.textContent = '';
    }

    if(passwordInput.value === '') {
        passwordError.textContent = 'Password is required';
    } else {
        passwordError.textContent = '';
    }

    const usuario = {
        email: emailValue,
        senha: passwordValue
    };
    try {

        const response = await fetch('http://localhost:8080/apis/security/logar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        const json = await response.json();
        console.log(json);

        if(json.success === true) {
            localStorage.setItem('token', json.token);
            localStorage.setItem('id', json.usuario.id);
            localStorage.setItem('userEmail', usuario.email);
            localStorage.setItem('senha', json.usuario.senha);
            localStorage.setItem('nivel', json.usuario.nivel);
            localStorage.setItem('cpf', json.usuario.cpf);

            window.location.reload();
        }
        else {
            console.log('Erro ao fazer login: ' + json.message);
        }
    }catch(e) {
        console.error('Error:', e);
    }
    
    // .then(response => {
        //     if (response.ok) {
            //         return response.text();
            //     } else {
                //         throw new Error('Erro ao fazer login: ' + response.statusText);
    //     }
    // })
    // .then(() => {
    //     // Armazena o token de acesso no armazenamento local
    //     localStorage.setItem('token', usuario.token);
    //     localStorage.setItem('userEmail', usuario.email);
    
    //     // Recarrega a página
    //     window.location.reload();
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
}

function checkUserLoggedIn() {
    // Obtém o token de acesso e o email do usuário do armazenamento local
    var userEmail = localStorage.getItem('userEmail');
    var userNivel = localStorage.getItem('nivel');

    console.log('Email:', userEmail);
    console.log('Nivel de acesso:', userNivel);
            
    if (userNivel === '2') {
        try {
            var sidebar = document.querySelector('.sidebar');
            sidebar.style.display = 'block';

            var body = document.querySelector('.body');
            body.style.marginLeft = '200px';
        } catch (error) {
        }
    }

    // Verifica se o token existe
    if (token) {
        console.log('Usuário ' + userEmail + ' está logado');

        // Altera o conteúdo da tag <a> para o email do usuário
        var loginLink = document.querySelector('.login span');
        loginLink.textContent = userEmail;
    } else {
        console.log('Usuário não está logado');
    }
}

if(token) {    
    var login = document.getElementById('login');
    var dropdownLogout = document.getElementById('dropdownLogout');

    login.addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Clicou no login');

        if(dropdownLogout.classList.contains('show')) {
            dropdownLogout.classList.remove('show');
        } else {
            dropdownLogout.classList.add('show');
        }
    });

    document.addEventListener('click', function(event) {
        var isClickInside = login.contains(event.target);

        if (!isClickInside) {
            dropdownLogout.classList.remove('show');
        }
    });
}


document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'index.html';

    // Faz logout do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('nivel');
    localStorage.removeItem('cpf');
    localStorage.removeItem('id');
    localStorage.removeItem('senha');

    // Oculta o dropdown
    var dropdown = document.getElementById('dropdownLogout');
    dropdown.style.display = 'none';

    // Altera o conteúdo da tag <a> para 'Login'
    var loginLink = document.querySelector('.login span');
    loginLink.textContent = 'Login';

    // Oculta a barra lateral
    var sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';

});

//---------------------------------------------------------------------------------

    if(!token) {
        var openBtn = document.querySelector('.login')
        var main = document.querySelector('.main')
        var btns = document.querySelectorAll('.btn button')
        var signInBtn = document.querySelector('.sign_in')
        var signUpBtn = document.querySelector('.sign_up')
        var signInForm = document.querySelector('.sign_in_form')
        var signUpForm = document.querySelector('.sign_up_form')
        var inputField = document.querySelectorAll('input')
        var passwordInput = document.querySelector('.pass')
        var eyeBtn = document.querySelector('.eye')
        var passwordInput1 = document.querySelector('.pass1')
        var eyeBtn1 = document.querySelector('.eye1')
        var cross = document.querySelector('.cross')

        btns.forEach(btn => {
            btn.addEventListener('click', ()=>{
                btns.forEach(btn => {
                    btn.classList.remove('active')
                })
                btn.classList.add('active')

                if(btn.innerText == "Sign In"){
                    signUpForm.style.display = 'none'
                    signInForm.style.display = 'block'
                }

                else{
                    signInForm.style.display = 'none'
                    signUpForm.style.display = 'block'
                }
            })
        })

        passwordInput.addEventListener('focus', ()=>{
            if(passwordInput.value.trim() != ''){
                eyeBtn.style.display = "block"
            }

            passwordInput.onkeyup = ()=>{
                let val = passwordInput.value
                if(val.trim() != ''){
                    eyeBtn.style.display = "block"
                }
                else{
                    eyeBtn.style.display = "none"
                    passwordInput.setAttribute('type','password')
                    eyeBtn.classList.remove("fa-eye-slash")
                    eyeBtn.classList.add('fa-eye')
                }
            }
        })

        eyeBtn.addEventListener('click', ()=>{
            if(passwordInput.type == "password"){
                passwordInput.setAttribute('type', 'text')
                eyeBtn.classList.remove("fa-eye")
                eyeBtn.classList.add('fa-eye-slash')
            }

            else{
                passwordInput.setAttribute('type', 'password')
                eyeBtn.classList.add("fa-eye")
                eyeBtn.classList.remove('fa-eye-slash')
            }
        })


        passwordInput1.addEventListener('focus', ()=>{
            if(passwordInput1.value.trim() != ''){
                eyeBtn1.style.display = "block"
            }

            passwordInput1.onkeyup = ()=>{
                let val = passwordInput1.value
                if(val.trim() != ''){
                    eyeBtn1.style.display = "block"
                }
                else{
                    eyeBtn1.style.display = "none"
                    passwordInput1.setAttribute('type','password')
                    eyeBtn1.classList.remove("fa-eye-slash")
                    eyeBtn1.classList.add('fa-eye')
                }
            }
        })

        eyeBtn1.addEventListener('click', ()=>{
            if(passwordInput1.type == "password"){
                passwordInput1.setAttribute('type', 'text')
                eyeBtn1.classList.remove("fa-eye")
                eyeBtn1.classList.add('fa-eye-slash')
            }

            else{
                passwordInput1.setAttribute('type', 'password')
                eyeBtn1.classList.add("fa-eye")
                eyeBtn1.classList.remove('fa-eye-slash')
            }
        })

        openBtn.addEventListener('click', ()=>{
            main.classList.add('active')
            eyeBtn.style.display = "none"
            eyeBtn1.style.display = "none"
        })

        cross.addEventListener('click', ()=>{
            main.classList.remove('active')
            signInBtn.classList.add('active')
            signUpBtn.classList.remove('active')
            signInForm.style.display = 'block'
            signUpForm.style.display = 'none'

            inputField.forEach(inputVal =>{
                inputVal.value = ""
            })

            eyeBtn.style.display = 'none'
            passwordInput.setAttribute('type','password')
            eyeBtn.classList.add('fa-eye')
            eyeBtn.classList.remove("fa-eye-slash")

            eyeBtn1.style.display = 'none'
            passwordInput1.setAttribute('type','password')
            eyeBtn1.classList.add('fa-eye')
            eyeBtn1.classList.remove("fa-eye-slash")
        })
    }