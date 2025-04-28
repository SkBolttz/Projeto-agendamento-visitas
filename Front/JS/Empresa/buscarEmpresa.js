document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buscarForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const token = localStorage.getItem('token');
  
      const dados = {
        razaoSocial: document.getElementById('razaoSocial').value,
      };
  
      fetch('http://localhost:8080/empresa/buscar', {
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
        .then(empresa => {
          document.getElementById('erroBuscar').style.display = 'none';
  
          const endereo = empresa.endereco;
  
          document.getElementById('razaoSocial').textContent = empresa.razaoSocial || '';
          document.getElementById('cnpj').textContent = empresa.cnpj || '';
          document.getElementById('telefone').textContent = empresa.telefone || '';
          document.getElementById('email').textContent = empresa.email || '';
          document.getElementById('logradouro').textContent = endereo.logradouro || '';
          document.getElementById('numero').textContent = endereo.numero || '';
          document.getElementById('complemento').textContent = endereo.complemento || '';
          document.getElementById('bairro').textContent = endereo.bairro || '';
          document.getElementById('cidade').textContent = endereo.cidade || '';
          document.getElementById('uf').textContent = endereo.estado || ''; 
          document.getElementById('cep').textContent = endereo.cep || '';
          document.getElementById('pais').textContent = endereo.pais || '';
        })
        .catch(error => {
          const erro = document.getElementById('erroBuscar');
          erro.style.display = 'block';
        });
    });
  });
  