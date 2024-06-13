<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', (event) => {
    denuncias();
});

function toggleDenuncia(event) {
    var denunciaDiv = event.target.closest('.den');
    var detail = denunciaDiv.querySelector('#denunciaDetails');
    if (detail.style.maxHeight){
        detail.style.maxHeight = null;
    } else {
        detail.style.maxHeight = detail.scrollHeight + "px";
    } 
}

function denuncias() {
    var userId = localStorage.getItem('id');

    fetch(`http://localhost:8080/apis/cidadao/get-denuncias-by-user?userId=${userId}`)
    .then(response => {
        if (!response.ok) {

            var denuncias = document.createElement('div');
            denuncias.className = 'den';
            denuncias.onclick = toggleDenuncia;

            var titulo = document.createElement('h2');
            titulo.textContent = "Faça login para ver suas denuncias";

            denuncias.appendChild(titulo);

            document.body.appendChild(denuncias);
            
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(den => {
            var denuncias = document.createElement('div');
            denuncias.className = 'den';
            denuncias.onclick = toggleDenuncia;

            var titulo = document.createElement('h2');
            titulo.textContent = den.titulo;
            titulo.textContent = titulo.textContent.charAt(0).toUpperCase() + titulo.textContent.slice(1);

            var details = document.createElement('div');
            details.id = 'denunciaDetails';

            var descricao = document.createElement('p');
            descricao.textContent = "Descrição: " + den.texto;

            var urgencia = document.createElement('p');
            urgencia.textContent = "Nivel de Urgencia: " + den.urgencia;

            var data = document.createElement('p');
            data.textContent = "Data da Denuncia:" + den.data;

            var orgao = document.createElement('p');
            orgao.textContent = "Orgão Responsável: " + den.orgao.nome;

            var tipo = document.createElement('p');
            tipo.textContent = "Tipo do Problema: " + den.tipo.nome;   

            var usuario = document.createElement('p');
            usuario.textContent = "Usuario: " + den.usuario.email;
            
            var br = document.createElement('br');

            var feedback = document.createElement('p');
            try {
                feedback.textContent = "Feedback: " + den.feedback.texto;
            }catch(e) {
                feedback.textContent = "Feedback: " + "Ainda não foi dado um feedback";
            }

            details.appendChild(descricao);
            details.appendChild(urgencia);
            details.appendChild(data);
            details.appendChild(orgao);
            details.appendChild(tipo);
            details.appendChild(usuario);
            details.appendChild(br);
            details.appendChild(feedback);

            denuncias.appendChild(titulo);
            denuncias.appendChild(details);

            document.body.appendChild(denuncias);
        });

        if(data == null || data.length == 0) {
            var denuncias = document.createElement('div');
            denuncias.className = 'den';
            denuncias.onclick = toggleDenuncia;

            var titulo = document.createElement('h2');
            titulo.textContent = "Você não possui denuncias registradas";

            denuncias.appendChild(titulo);

            document.body.appendChild(denuncias);
        }
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
=======
document.addEventListener('DOMContentLoaded', (event) => {
    denuncias();
});

function toggleDenuncia(event) {
    var denunciaDiv = event.target.closest('.den');
    var detail = denunciaDiv.querySelector('#denunciaDetails');
    if (detail.style.maxHeight){
        detail.style.maxHeight = null;
    } else {
        detail.style.maxHeight = detail.scrollHeight + "px";
    } 
}

function denuncias() {
    var userId = localStorage.getItem('id');

    fetch(`http://localhost:8080/apis/cidadao/get-denuncias-by-user?userId=${userId}`)
    .then(response => {
        if (!response.ok) {
<<<<<<< HEAD

            var denuncias = document.createElement('div');
            denuncias.className = 'den';
            denuncias.onclick = toggleDenuncia;

            var titulo = document.createElement('h2');
            titulo.textContent = "Faça login para ver suas denuncias";

            denuncias.appendChild(titulo);

            document.body.appendChild(denuncias);
            
=======
>>>>>>> 47b25cd4bd9662ea4c9dd422c28e49e2b2a50b9a
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(den => {
            var denuncias = document.createElement('div');
            denuncias.className = 'den';
            denuncias.onclick = toggleDenuncia;

            var titulo = document.createElement('h2');
            titulo.textContent = den.titulo;
            titulo.textContent = titulo.textContent.charAt(0).toUpperCase() + titulo.textContent.slice(1);

            var details = document.createElement('div');
            details.id = 'denunciaDetails';

            var descricao = document.createElement('p');
            descricao.textContent = "Descrição: " + den.texto;

            var urgencia = document.createElement('p');
            urgencia.textContent = "Nivel de Urgencia: " + den.urgencia;

            var data = document.createElement('p');
            data.textContent = "Data da Denuncia:" + den.data;

            var orgao = document.createElement('p');
            orgao.textContent = "Orgão Responsável: " + den.orgao.nome;

            var tipo = document.createElement('p');
            tipo.textContent = "Tipo do Problema: " + den.tipo.nome;   

            var usuario = document.createElement('p');
            usuario.textContent = "Usuario: " + den.usuario.email;
            
            var br = document.createElement('br');

            var feedback = document.createElement('p');
<<<<<<< HEAD
            try {
                feedback.textContent = "Feedback: " + den.feedback.texto;
            }catch(e) {
                feedback.textContent = "Feedback: " + "Ainda não foi dado um feedback";
            }
=======
            feedback.textContent = "Feedback: " + den.feedback.texto;
>>>>>>> 47b25cd4bd9662ea4c9dd422c28e49e2b2a50b9a

            details.appendChild(descricao);
            details.appendChild(urgencia);
            details.appendChild(data);
            details.appendChild(orgao);
            details.appendChild(tipo);
            details.appendChild(usuario);
            details.appendChild(br);
            details.appendChild(feedback);

            denuncias.appendChild(titulo);
            denuncias.appendChild(details);

            document.body.appendChild(denuncias);
        });

        if(data == null || data.length == 0) {
            var denuncias = document.createElement('div');
            denuncias.className = 'den';
            denuncias.onclick = toggleDenuncia;

            var titulo = document.createElement('h2');
            titulo.textContent = "Você não possui denuncias registradas";

            denuncias.appendChild(titulo);

            document.body.appendChild(denuncias);
        }
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
>>>>>>> aa42cc28c4968079a1ec2071265724fcbae4854f
}