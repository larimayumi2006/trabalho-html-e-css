alert("O JavaScript está funcionando!");

// 1. Mapeia os elementos do HTML que vamos usar
const botaoBuscar = document.getElementById('botaoBuscar');
const campoBusca = document.getElementById('campoBusca');
const containerResultado = document.getElementById('resultado');

// 2. Cria a função que faz a busca na API
function buscarLinguagem() {
    const termo = campoBusca.value.trim(); // Pega o que foi digitado e remove espaços extras

    // Se o usuário clicar sem digitar nada, avisa e para a execução
    if (termo === "") {
        containerResultado.innerHTML = "<p style='color: red;'>Por favor, digite algo para pesquisar.</p>";
        return;
    }

    // Mostra uma mensagem de carregando (muito comum no W3Schools)
    containerResultado.innerHTML = "<p>Buscando informações...</p>";

    // Monta a URL oficial da API da Wikipédia
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termo)}`;

    // Faz a requisição para a API
    fetch(url)
        .then(response => {
            // Se der erro (ex: termo não existe), avisa o usuário
            if (!response.ok) {
                throw new Error('Linguagem ou artigo não encontrado.');
            }
            return response.json();
        })
        .then(dados => {
            // 3. Monta o HTML com o resultado estilizado
            containerResultado.innerHTML = `
                <div class="artigo-w3">
                    <h2>${dados.title}</h2>
                    ${dados.thumbnail ? `<img src="${dados.thumbnail.source}" alt="${dados.title}" class="logo-linguagem">` : ''}
                    <p class="descricao">${dados.extract}</p>
                    <a href="${dados.content_urls.desktop.page}" target="_blank" class="link-leia-mais">Leia o artigo completo na Wikipédia →</a>
                </div>
            `;
        })
        .catch(erro => {
            // Caso aconteça algum erro ou não encontre a linguagem
            containerResultado.innerHTML = `<p style='color: red;'>Linguagem "${termo}" não encontrada. Tente termos como "Python", "JavaScript" ou "HTML".</p>`;
        });
}

// 3. Ativa a busca quando o usuário CLICAR no botão da lupa
botaoBuscar.addEventListener('click', buscarLinguagem);

// 4. BÔNUS: Ativa a busca também se o usuário apertar a tecla "Enter" no teclado
campoBusca.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        buscarLinguagem();
    }
});