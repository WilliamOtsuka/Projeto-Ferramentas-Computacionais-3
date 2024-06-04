
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
                setValue(categoria.id);
            };
            select.appendChild(a);
        });
    })
    .catch(error => console.error('Error:', error));
}

function submitForm() {
    // preventDefault();

    // Seleciona o campo de titulo pelo ID
    var titleInput = document.getElementById('title');
    // Obtém o valor do campo de titulo
    var titleValue = titleInput.value;
    console.log("Titulo: " + titleValue);


    // Seleciona o campo de denuncia pelo ID
    var denunciaInput = document.getElementById('report');
    // Obtém o valor do campo de denuncia
    var denunciaValue = denunciaInput.value;
    console.log("Denuncia: " + denunciaValue);

    // Seleciona o campo de orgaos pelo ID
    var orgaoInput = document.getElementById('orgao');
    // Obtém o valor do campo de orgaos
    var orgaoValue = parseInt(orgaoInput.value, 10);
    console.log("Orgao: " + orgaoValue);

    // Seleciona o campo de categorias pelo ID
    var categoriaInput = document.getElementById('categoriaSelecionada');
    // Obtém o valor do campo de categorias
    var categoriaValue = parseInt(categoriaInput.value, 10);
    console.log("Categoria: " + categoriaValue);

    // Seleciona o campo de urgencia pelo ID
    var urgenciaValue = selectedValue;
    console.log("Urgencia: " + urgenciaValue);

    usuarioID = Number(localStorage.getItem('id'));
    console.log("ID do usuario: " + usuarioID);
    
    fetch('http://localhost:8080/apis/reports/gerarDenuncia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titleValue,
            texto: denunciaValue,
            IDOrgao: orgaoValue,
            IDTipo: categoriaValue,
            urgencia: urgenciaValue,
            IDusuario: usuarioID
        })
    })
    .then(response => {
        return response.json();
    }) 
    .then(data => {
        console.log(data);
        window.location.href = "denuncia.html";
    }
    )
    //     if (response.ok) {
    //         window.location.reload();
    //     }
    //     if (response.headers.get('content-type').includes('application/json')) {
    //         return response.json();
    //     } else {
    //         return response.text().then(text => {
    //             throw new Error('Server response is not JSON: ' + text);
    //         });
    //     }
    // })
    // .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}
