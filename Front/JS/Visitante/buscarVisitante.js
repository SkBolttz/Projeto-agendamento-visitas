document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buscarForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const nomeUsuario = document.getElementById('nomeUsuario').value;

        fetch('http://localhost:8080/visitante/buscar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ visitante: nomeUsuario })
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro desconhecido');
            }
            return response.json();
        })
        .then(data => {
                // Acessando a propriedade 'nome' dentro de 'empresa'
                document.getElementById('empresaUsuario').textContent = data.empresa ? data.empresa.razaoSocial : '';
                document.getElementById('tipoUsuario').textContent = data.tipo || '';
                document.getElementById('statusUsuario').textContent = data.status || '';
                
                // Esconde a mensagem de erro
                document.querySelector('.erroBusca').style.display = 'none';
            }).catch(error => {
            document.querySelector('.erroBusca').style.display = 'block';

            document.getElementById('empresaUsuario').textContent = '';
            document.getElementById('tipoUsuario').textContent = '';
            document.getElementById('statusUsuario').textContent = '';
        });
    });
});
