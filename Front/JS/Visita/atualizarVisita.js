document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formAlterarVisita').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            id: document.getElementById('idVisita').value
        };

        const dataHoraEntrada = document.getElementById('dataHoraEntrada').value;
        const dataHoraSaida = document.getElementById('dataHoraSaida').value;
        const statusAgendamento = document.getElementById('statusAgendamento').value;

        if (dataHoraEntrada) {
            dados.dataHoraEntrada = dataHoraEntrada;
        }

        if (dataHoraSaida) {
            dados.dataHoraSaida = dataHoraSaida;
        }

        if (statusAgendamento) {
            dados.statusAgendamento = statusAgendamento;
        }

        fetch('http://localhost:8080/agendamento/atualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao alterar visita');
            }
            return response.text();
        })
        .then(data => {
            var sucesso = document.getElementById('sucesso');
            var erro = document.getElementById('erroAlterarVisita');

            sucesso.style.display = 'block';
            erro.style.display = 'none';
        })
        .catch(error => {
            var sucesso = document.getElementById('sucesso');
            var erro = document.getElementById('erroAlterarVisita');

            sucesso.style.display = 'none';
            erro.style.display = 'block';
        });
    });
});
