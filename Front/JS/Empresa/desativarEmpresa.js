document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('desativarForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            razaoSocial: document.getElementById('razaoSocial').value,
        };

        fetch('http://localhost:8080/empresa/desativar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dados)
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.erro || 'Erro desconhecido');
                }
                return response.text();
            })
            .then(dados => {
                var sucesso = document.querySelector('.sucesso');
                var erroDesativar = document.querySelector('.erroDesativar');
                erroDesativar.style.display = 'none';
                sucesso.style.display = 'none';
                document.getElementById('desativarForm').reset();
                sucesso.style.display = 'block';
            })
            .catch(error => {
                var erroDesativar = document.querySelector('.erroDesativar');
                var sucesso = document.querySelector('.sucesso');

                sucesso.style.display = 'none';
                erroDesativar.style.display = 'block';

            });
    });
});