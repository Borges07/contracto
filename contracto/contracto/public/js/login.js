document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta recebida do servidor:', data);
        const message = document.getElementById('login_message');

        // Exibe a mensagem recebida do servidor, seja de sucesso ou erro
        if (message) {
            message.textContent = data.message;
            message.style.color = data.success ? 'green' : 'red'; // Verde para sucesso, vermelho para erro
        }

        if (data.success) {
            alert('Login realizado com sucesso!');
            console.log("Redirecionando para serviços.html...");
            window.location.href = '/pages/serviços.html'; // Redireciona após login bem-sucedido
        }
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
        const message = document.getElementById('login_message');
        if (message) {
            message.textContent = 'Erro ao se conectar ao servidor. Tente novamente.';
            message.style.color = 'red'; // Estiliza a mensagem de erro de conexão
        }
    });
});
