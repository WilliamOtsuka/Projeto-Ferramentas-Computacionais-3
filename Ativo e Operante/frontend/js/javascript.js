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

function toggleSelection(element) {
    if(element.classList.contains("categoria")) {
        // Remove a classe "selected" de todos os elementos
        var buttons = document.getElementsByClassName("selected");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("categoria");
        }

        element.classList.remove("categoria");
        element.classList.add("selected");
    }
    else {
        element.classList.remove("selected");
        element.classList.add("categoria");
    }
}

function setValue(value) {
    // Define o valor do campo oculto com o valor do botão selecionado
    document.getElementById("categoriaSelecionada").value = value;
}

function checkOnlyOne(clickedCheckbox) {
    var checkboxes = document.getElementsByClassName('checkbox-input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== clickedCheckbox) {
            checkboxes[i].checked = false;
        }
    }
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
    
    fetch('http://localhost:8080/apis/security/cadastrar/', {
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

function login(usuario) {
    return fetch('http://localhost:8080/apis/security/logar/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                console.error('Error status:', response.status, 'Error text:', errorText);
                throw new Error('Erro ao fazer login');
            });
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        } else {
            console.log('The response is not JSON');
            return null;
        }
    });
}

function signIn() {
    var emailInput = document.getElementById('email');
    var emailValue = emailInput.value;

    var passwordInput = document.getElementById('senha');
    var passwordValue = passwordInput.value;

    const usuario = {
        email: emailValue,
        senha: passwordValue
    };

    login(usuario)
    .then(userData => {
        var loginButton = document.getElementById('login');

        if (userData) {
            loginButton.textContent = emailValue;
        } else {
            console.error('User data is null');
        }
    })
    .catch(error => {
        console.error(error);
    });
}