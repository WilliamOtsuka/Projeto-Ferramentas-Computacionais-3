
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

function setValue(id, name) {
    // Define o valor do campo oculto com o valor do botão selecionado
    document.getElementById("categoriaSelecionada").value = id;
    document.getElementById("categoriaSelecionada").name = name;
}

var selectedValue;
function checkOnlyOne(clickedCheckbox) {
    var checkboxes = document.getElementsByClassName('checkbox-input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== clickedCheckbox) {
            checkboxes[i].checked = false;
        } else {
            selectedValue = checkboxes[i].value;
        }
    }
}

window.onload = function() {
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
                setValue(categoria.id, categoria.nome);
            };
            select.appendChild(a);
        });
    })
    .catch(error => console.error('Error:', error));
}

function submitForm(event) {
    // event.preventDefault();

    var formulario = document.getElementById("denunciaForm");
    var idUser = localStorage.getItem("id");

    fetch("http://localhost:8080/apis/cidadao/add-denuncia", {
        method: 'POST', body: (new FormData(formulario), idUser)
    })
    .then(resp => {
        return console.log(resp);
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}
