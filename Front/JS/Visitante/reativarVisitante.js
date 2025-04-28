document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reativarForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const data = {
            nome: document.getElementById('idVisitaInput').value
        };

        fetch('http://localhost:8080/visitante/reativar', {
            method: 'PUT',
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
                var sucesso = document.querySelector('.sucesso');
                var erroReativar = document.querySelector('.erroReativar');
                erroReativar.style.display = 'none';
                sucesso.style.display = 'none';
                document.getElementById('reativarForm').reset();
                sucesso.style.display = 'block';
            }).catch(error => {
                var erroReativar = document.querySelector('.erroReativar');
                var sucesso = document.querySelector('.sucesso');

                sucesso.style.display = 'none';
                erroReativar.style.display = 'block';
            })
    })
});