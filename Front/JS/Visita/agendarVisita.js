document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("agendarForm").addEventListener("submit", function(event) {
        
        event.preventDefault();

        const token = localStorage.getItem('token');

        const visitante = document.getElementById("visitante").value;
        const dataHoraAgendada = document.getElementById("dataHora").value;

        const data = {
            visitante: visitante,
            dataHoraAgendada: dataHoraAgendada
        };

        
        if(!token){
            window.location.href = '../HTML/login.html';
        }
        

        fetch('http://localhost:8080/agendamento/novavisita', {
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
            var erroHoraAgendamento = document.querySelector('#erroHoraAgendamento');
            var erroAgendamentoRetroativo = document.querySelector('#erroAgendamentoRetroativo');
            var erroAgendamentoProximo = document.querySelector('#erroAgendamentoProximo');
            var erroCadastroVisitante = document.querySelector('#erroCadastroVisitante');

            erroHoraAgendamento.style.display = 'none';
            erroAgendamentoRetroativo.style.display = 'none';
            erroAgendamentoProximo.style.display = 'none';
            erroCadastroVisitante.style.display = 'none';
            sucesso.style.display = 'block';            
        })
            .catch(error => {
                const msg = error.message;
                
                sucesso.style.display = 'none';
                
                if(msg.includes('Hora agendada ja cadastrada!')){
                    var erroHoraAgendamento = document.querySelector('#erroHoraAgendamento');
                    erroHoraAgendamento.style.display = 'block';
                }
                if(msg.includes('Agendamento Retroativo!')){
                    var erroAgendamentoRetroativo = document.querySelector('#erroAgendamentoRetroativo');
                    erroAgendamentoRetroativo.style.display = 'block';
                }
                if(msg.includes('Agendamento Muito Próximo do Horário Atual!')){
                    var erroAgendamentoProximo = document.querySelector('#erroAgendamentoProximo');
                    erroAgendamentoProximo.style.display = 'block';
                }   
                if(msg.includes('Visitante nao cadastrado!')){
                    var erroCadastroVisitante = document.querySelector('#erroCadastroVisitante');
                    erroCadastroVisitante.style.display = 'block';
                }
            });
    });
});