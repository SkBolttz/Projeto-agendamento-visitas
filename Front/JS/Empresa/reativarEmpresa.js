document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reativarForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            razaoSocial: document.getElementById('razaoSocial').value,
        };

        fetch('http://localhost:8080/empresa/reativar', {
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
                var erroReativar = document.querySelector('.erroReativar');
                erroReativar.style.display = 'none';
                sucesso.style.display = 'none';
                document.getElementById('reativarForm').reset();
                sucesso.style.display = 'block';
            })
            .catch(error => {
                var erroReativar = document.querySelector('.erroReativar');
                var sucesso = document.querySelector('.sucesso');

                sucesso.style.display = 'none';
                erroReativar.style.display = 'block';
            });
    })
})