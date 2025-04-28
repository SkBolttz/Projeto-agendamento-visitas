document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formVisitante').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const data = {
            nome: document.getElementById('nome').value,
            empresa: document.getElementById('empresa').value,
            tipo: document.getElementById('tipo').value
        };

        fetch('http://localhost:8080/visitante/novovisitante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro desconhecido');
            }
            return response.text();
        })
        .then(data => {
            var sucesso = document.querySelector('#sucesso');
            var erroVisitante = document.querySelector('#erroCadastro');
            var cnpjErro = document.querySelector('#erroCNPJ');
            erroVisitante.style.display = 'none';
            cnpjErro.style.display = 'none';
            sucesso.style.display = 'block';
            document.getElementById('formVisitante').reset();
        })
        .catch(error => {

            const msg = error.message;

            var erroVisitante = document.querySelector('#erroCadastro');
            var cnpjErro = document.querySelector('#erroCNPJ');

            erroVisitante.style.display = 'none';
            cnpjErro.style.display = 'none';
            sucesso.style.display = 'none';

            if(msg.includes('Visitante já cadastrado!')) {
                erroVisitante.style.display = 'block';
            }
            if(msg.includes('Empresa nao cadastrada!')){
                cnpjErro.style.display = 'block';
            }
        });
    });
});