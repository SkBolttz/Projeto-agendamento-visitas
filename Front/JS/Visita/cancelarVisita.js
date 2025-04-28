document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formCancelar').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            id: document.getElementById('codigoVisita').value
        }

        fetch('http://localhost:8080/agendamento/cancelar', {
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
                return response.json();
            })
            .then(dados => {
                var erro = document.getElementById('erroCancelar');
                var sucesso = document.getElementById('sucesso');

                erro.style.display = 'none';
                sucesso.style.display = 'block';
                document.getElementById('formCancelar').reset();    

            }).catch(error => {
                var erro = document.getElementById('erroCancelar');
                var sucesso = document.getElementById('sucesso');

                erro.style.display = 'block';
                sucesso.style.display = 'none';
            });
    });
});