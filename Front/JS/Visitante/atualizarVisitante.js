document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formAlterarVisitante').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            nome: document.getElementById('nome').value
        }

        const novoNome = document.getElementById('novoNome').value;
        const cnpj = document.getElementById('cnpj').value;
        const tipo = document.getElementById('tipo').value;

        if (novoNome) {
            dados.novoNome = novoNome;
        }

        if (cnpj) {
            dados.cnpj = cnpj;
        }

        if (tipo) {
            dados.tipo = tipo;
        }

        fetch('http://localhost:8080/visitante/alterar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao alterar visitante');
            }
            return response.text();
        })
        .then(data => {
            var sucesso = document.querySelector('.sucesso');
            var erroBusca = document.querySelector('.erroBusca');
            
            sucesso.style.display = 'block';
            erroBusca.style.display = 'none';
        }).catch(error => {
            var sucesso = document.querySelector('.sucesso');
            var erroBusca = document.querySelector('.erroBusca');
            
            sucesso.style.display = 'none';
            erroBusca.style.display = 'block';
        });
    });
});