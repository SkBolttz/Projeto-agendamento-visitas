document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formConsultaVisita').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const dados = {
            id: document.getElementById('codigoVisita').value
        };

        fetch('http://localhost:8080/agendamento/consultar', {
            method: 'POST',
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
            const erro = document.getElementById('erroConsulta');
            erro.style.display = 'none';

            document.getElementById('codigoVisita').value = dados.id;
            document.getElementById('visitante').textContent = dados.visitante?.nome || '';
            document.getElementById('dataHoraAgendada').textContent = dados.dataHoraAgendada || '';
            document.getElementById('dataHoraEntrada').textContent = dados.dataHoraEntrada || '';
            document.getElementById('dataHoraSaida').textContent = dados.dataHoraSaida || '';
            document.getElementById('statusAgendamento').textContent = dados.statusAgendamento || '';
            document.getElementById('status').textContent = dados.ativo ? 'Não' : 'Sim';
        })
        .catch(error => {
            const erro = document.getElementById('erroConsulta');
            erro.style.display = 'block';
        });
    });
});
