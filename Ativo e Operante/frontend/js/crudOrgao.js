// Função para buscar todos os orgaos
function buscarTodosOrgaos() {
    return fetch('http://localhost:8080/apis/adm/get-all-orgaos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Data is not an array:', data);
                return;
            }
            preencherTabelaOrgao(data);
        })
        .catch(error => console.error('Error:', error));
}

// Função para preencher a tabela com os orgaos
function preencherTabelaOrgao(orgaos) {
    const tabela = document.querySelector('.table table');
    orgaos.forEach(orgao => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = orgao.id;
        tr.appendChild(tdId);

        const tdNome = document.createElement('td');
        tdNome.textContent = orgao.nome;
        tr.appendChild(tdNome);

        const tdEditar = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'edit';
        btnEditar.addEventListener('click', () => {
            const input = document.createElement('input');
            input.value = orgao.nome;
            input.className = 'edit-input';
            tdNome.textContent = '';
            tdNome.appendChild(input);
            input.focus();

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    atualizarOrgao(orgao.id, input.value)
                        .then(() => {
                            tdNome.textContent = input.value;
                        });
                }
            });
        });
        tdEditar.appendChild(btnEditar);
        tr.appendChild(tdEditar);

        const tdDeletar = document.createElement('td');
        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Deletar';
        btnDeletar.className = 'delete';
        btnDeletar.addEventListener('click', () => {
            deletarOrgao(orgao.id)
                .then(() => {
                    tabela.removeChild(tr);
                });
        });
        tdDeletar.appendChild(btnDeletar);
        tr.appendChild(tdDeletar);

        tabela.appendChild(tr);
    });
}

// Função para atualizar o orgao
function atualizarOrgao(id, novoNome) {
    return fetch('http://localhost:8080/apis/adm/update-orgao', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: novoNome
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

// Função para deletar um orgao
function deletarOrgao(id) {
    return fetch(`http://localhost:8080/apis/adm/delete-orgaos?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}


document.getElementById('add').addEventListener('click', function() {
    //cria a linha da tabela
    const tabela = document.querySelector("table");
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdNome = document.createElement('td');

    const tdEditar = document.createElement('td');
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'edit';
    
    const tdDeletar = document.createElement('td');
    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = 'Deletar';
    btnDeletar.className = 'delete';

    tabela.appendChild(tr);
    tr.appendChild(tdId);
    tr.appendChild(tdNome);

    tdEditar.appendChild(btnEditar);
    tr.appendChild(tdEditar);

    tdDeletar.appendChild(btnDeletar);
    tr.appendChild(tdDeletar);

    //cria o input para o novo orgao
    const input = document.createElement('input');
    input.id = 'nome';
    input.className = 'edit-input';
    tdNome.appendChild(input);
    input.focus();
    
    //adiciona o evento de salvar o novo orgao
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const nome = document.getElementById('nome').value;
            return fetch('http://localhost:8080/apis/adm/add-orgao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                //apaga a linha da tabela
                tabela.removeChild(tr);
                
                window.location.reload();
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
        };
    });
});

// Buscar todos os orgaos quando a página carregar
window.onload = buscarTodosOrgaos;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

