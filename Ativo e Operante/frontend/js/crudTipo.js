// Função para buscar todos os tipos
function buscarTodosTipos() {
    return fetch('http://localhost:8080/apis/adm/get-all-tipos')
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
            preencherTabelaTipo(data);
        })
        .catch(error => console.error('Error:', error));
}

// Função para preencher a tabela com os tipos
function preencherTabelaTipo(tipos) {
    const tabela = document.querySelector('.table table');
    tipos.forEach(tipo => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = tipo.id;
        tr.appendChild(tdId);

        const tdNome = document.createElement('td');
        tdNome.textContent = tipo.nome;
        tr.appendChild(tdNome);

        const tdEditar = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'edit';
        btnEditar.addEventListener('click', () => {
            const input = document.createElement('input');
            input.value = tipo.nome;
            input.className = 'edit-input';
            tdNome.textContent = '';
            tdNome.appendChild(input);
            input.focus();

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    atualizarTipo(tipo.id, input.value)
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
            deletarTipo(tipo.id)
                .then(() => {
                    tabela.removeChild(tr);
                });
        });
        tdDeletar.appendChild(btnDeletar);
        tr.appendChild(tdDeletar);

        tabela.appendChild(tr);
    });
}

// Função para atualizar o tipo
function atualizarTipo(id, novoNome) {
    return fetch('http://localhost:8080/apis/adm/update-tipo', {
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

// Função para deletar um tipo
function deletarTipo(id) {
    return fetch(`http://localhost:8080/apis/adm/delete-tipos?id=${id}`, {
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

// Buscar todos os tipos quando a página carregar
window.onload = buscarTodosTipos;


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

