document.addEventListener('DOMContentLoaded', (event) => {
    checkUserLoggedIn();
});

window.onload = function() {
    var token = localStorage.getItem('accessToken');

    if (!token) {
        var btnDenuncie = document.getElementById('btnDenuncie');
        btnDenuncie.classList.add('disabled');
        btnDenuncie.addEventListener('click', function(event) {
            event.preventDefault();
        });
    }

    // Fetch para pegar os orgãos
    fetch('http://localhost:8080/apis/cidadao/get-all-orgaos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        const select = document.querySelector('select');
        data.forEach(orgao => {
            const option = document.createElement('option');
            option.value = orgao.id;
            option.textContent = orgao.nome;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));

    // Fetch para pegar as categorias
    fetch('http://localhost:8080/apis/cidadao/get-all-tipos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        //<div class="buttons">
        const select = document.querySelector('.buttons');
        data.forEach(categoria => {
            // <a class="categoria" onclick="toggleSelection(this)">exemplo</a>
            const a = document.createElement('a');
            a.classList.add('categoria');
            a.textContent = categoria.nome;
            a.onclick = function() {
                toggleSelection(this);
                setValue(categoria.id);
            };
            select.appendChild(a);
        });
    })
    .catch(error => console.error('Error:', error));
}
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

function login() {
    // Seleciona o campo de entrada de e-mail pelo ID
    var emailInput = document.getElementById('email');
    // Obtém o valor do campo de entrada de e-mail
    var emailValue = emailInput.value;

    // Seleciona o campo de entrada de senha pelo ID
    var passwordInput = document.getElementById('senha');
    // Obtém o valor do campo de entrada de senha
    var passwordValue = passwordInput.value;

    const usuario = {
        email: emailValue,
        senha: passwordValue
    };
    
    fetch('http://localhost:8080/apis/security/logar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Erro ao fazer login: ' + response.statusText);
        }
    })
    .then(token => {
        // Armazena o token de acesso no armazenamento local
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userEmail', usuario.email);
        localStorage.setItem('userNivel', token.nivel);
        // Recarrega a página
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function checkUserLoggedIn() {
    // Obtém o token de acesso e o email do usuário do armazenamento local
    var token = localStorage.getItem('accessToken');
    var userEmail = localStorage.getItem('userEmail');
    var userNivel = localStorage.getItem('userNivel');

    //printa o nivel do usuario
    console.log('Nivel do usuario: ' + userNivel);
            
    if (userNivel === 2) {
        var sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'block';
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

function logout() {
    var token = localStorage.getItem('accessToken');

    if(token) {
        document.getElementById("dropdownLogout").classList.toggle("show");
        
        document.addEventListener('click', function(event) {
            if (!event.target.matches('.login')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        });
    }
}

document.getElementById('logoutButton').addEventListener('click', function() {
    // Faz logout do usuário
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');

    // Oculta o dropdown
    var dropdown = document.getElementById('dropdownLogout');
    dropdown.style.display = 'none';

    // Altera o conteúdo da tag <a> para 'Login'
    var loginLink = document.querySelector('.login span');
    loginLink.textContent = 'Login';

    // Recarrega a página
    window.location.reload();
});

function submitForm() {
    var titleInput = document.getElementById('title').value;
    var reportInput = document.getElementById('report').value;
    var orgaoInput = {
        id: document.getElementById('orgao').value,
        nome: document.getElementById('orgao').options[document.getElementById('orgao').selectedIndex].text
    };
    var categoriaInput = {
        id: document.getElementById('categoriaSelecionada').value,
        nome: document.querySelector('.selected').textContent
    };

    var urgencyInput = selectedValue;
    var user = {
        id: localStorage.getItem('userId'),
        email: localStorage.getItem('userEmail'),
        senha: localStorage.getItem('userPassword'),
        cpf: localStorage.getItem('userCpf'),
        nivel: localStorage.getItem('userNivel')
    };
    
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    
    var formattedDate = year + '-' + month + '-' + day;
        
    var denuncia = {
        titulo: titleInput,
        texto: reportInput,
        urgencia: urgencyInput,
        data: formattedDate,
        orgao: orgaoInput,
        tipo: categoriaInput,
        usuario: user
    };

    fetch('http://localhost:8080/apis/reports/gerarDenuncia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(denuncia)
    })
    .then(response => {
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

//---------------------------------------------------------------------------------

var token = localStorage.getItem('accessToken');
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

function toggleSelection(element) {
    // Remove a classe "selected" de todos os elementos e adiciona a classe "categoria"
    var buttons = document.querySelectorAll(".selected");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
        buttons[i].classList.add("categoria");
    }

    // Se o elemento clicado já tem a classe "categoria", remove "categoria" e adiciona "selected"
    if(element.classList.contains("categoria")) {
        element.classList.remove("categoria");
        element.classList.add("selected");
    }
}

function setValue(value) {
    // Define o valor do campo oculto com o valor do botão selecionado
    document.getElementById("categoriaSelecionada").value = value;
}

var selectedValue; // Global variable to store the selected value

function checkOnlyOne(clickedCheckbox) {
    var checkboxes = document.getElementsByClassName('checkbox-input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== clickedCheckbox) {
            checkboxes[i].checked = false;
        } else {
            selectedValue = checkboxes[i].value; // Store the value of the selected checkbox
        }
    }
}

var orgaoValue = document.getElementById('orgao').value;
if (orgaoValue === "") {
    console.error('Nenhum orgão selecionado');
} else {
    console.log('Orgão selecionado:', orgaoValue);
}


