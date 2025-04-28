document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');

    function carregarVisitasAbertas() {
        fetch('http://localhost:8080/agendamento/visitasAbertas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro desconhecido');
            }
            return response.json();
        })
        .then(dados => {
const lista = document.getElementById('lista-visitas');

lista.innerHTML = '';

for (let i = 0; i < dados.length; i++) {
    const visita = document.createElement('p');
    visita.classList.add('linha-visita');

    visita.textContent = `Visitante: ${dados[i].visitante?.nome || ''} |  Empresa: ${dados[i].visitante?.empresa?.razaoSocial || ''} |  Data: ${dados[i].dataHoraAgendada || ''} |  Status: ${dados[i].statusAgendamento || ''}`;

    lista.appendChild(visita);
}
        })
        .catch(error => {
            console.error('Erro ao carregar visitas abertas:', error.message);
        });
    }

    carregarVisitasAbertas();
    setInterval(carregarVisitasAbertas, 60000);
});
