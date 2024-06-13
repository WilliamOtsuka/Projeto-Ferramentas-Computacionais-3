// Função para buscar todos os tipos
function buscarTodasDenuncias() {
    fetch('http://localhost:8080/apis/adm/get-all-denuncias')
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
            preencherTabelaDenuncia(data);
        })
        .catch(error => console.error('Error:', error));
}

// Função para preencher a tabela com as Denuncias
function preencherTabelaDenuncia(den) {
    const tabela = document.querySelector('.table table');
    den.forEach(den => {
        console.log(den.id);

        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = den.id;
        tr.appendChild(tdId);

        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = den.titulo;
        tr.appendChild(tdTitulo);

        const tdTexto = document.createElement('td');
        tdTexto.textContent = den.texto;
        tr.appendChild(tdTexto);
        
        const tdUrgencia = document.createElement('td');
        tdUrgencia.textContent = den.urgencia;
        tr.appendChild(tdUrgencia);

        const tdData = document.createElement('td');
        tdData.textContent = den.data;
        tr.appendChild(tdData);

        const tdOrgao = document.createElement('td');
        tdOrgao.textContent = den.orgao.nome;
        tr.appendChild(tdOrgao);

        const tdTipo = document.createElement('td');
        tdTipo.textContent = den.tipo.nome;
        tr.appendChild(tdTipo);
 
        const tdUsuario = document.createElement('td');
        tdUsuario.textContent = den.usuario.email;
        tr.appendChild(tdUsuario);

        const tdDarFeedback = document.createElement('td');
        const btnDarFeedback = document.createElement('button');
        btnDarFeedback.textContent = 'Dar Feedback';

        btnDarFeedback.className = 'feedback';
        btnDarFeedback.addEventListener('click', () => {
            const input = document.createElement('textarea');
            input.value = "";
            input.className = 'edit-text';
            tdDarFeedback.textContent = '';
            tdDarFeedback.appendChild(input);
            input.focus();
        
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    darFeedback(input.value, den.id, tdDarFeedback)
                        .then(() => {
                            tdDarFeedback.textContent = input.value;
                        });
                }
            });
        });

        tdDarFeedback.appendChild(btnDarFeedback);
        tr.appendChild(tdDarFeedback);

        const tdDeletar = document.createElement('td');
        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Deletar';
        btnDeletar.className = 'delete';
        btnDeletar.addEventListener('click', () => {
            deletarDenuncia(den.id)
                .then(() => {
                    tabela.removeChild(tr);
                });
        });
        tdDeletar.appendChild(btnDeletar);
        tr.appendChild(tdDeletar);

        tabela.appendChild(tr);
    });
}

function darFeedback(feedback, denID, tdDarFeedback) {
    fetch('http://localhost:8080/apis/adm/add-feedback', {
        method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        texto: feedback,
    denuncia: {id: denID}
    })
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
        alert("Erro ao enviar o feedback!");
        tdDarFeedback.textContent = 'Erro ao enviar feedback';

    });
}

// Função para deletar uma Denuncia
function deletarDenuncia(id) {
    return fetch(`http://localhost:8080/apis/adm/delete-denuncia?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            alert("Feedback já cadastrado! Não é possível deletar a denúncia!");
        }
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

// Buscar todos os tipos quando a página carregar
window.onload = buscarTodasDenuncias;


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

