alert("O JavaScript está funcionando!");

//1. Mapeia os elementos do HTML
const botaoBuscar = document.getElementById('botaoBuscar');
const campoBusca = document.getElementById('campoBusca');
const containerResultado = document.getElementById('resultado');

// função que faz a busca na API
function buscarLinguagem() {
    const termo = campoBusca.value.trim(); // Pega o que foi digitado e remove espaços extras


    if (termo === "") {
        containerResultado.innerHTML = "<p style='color: red;'>Por favor, digite algo para pesquisar.</p>";
        return;
    }

    // Monta a URL oficial da API da Wikipédia
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termo)}`;

    // Faz a requisição para a API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Linguagem ou artigo não encontrado.');
            }
            return response.json();
        })
        .then(dados => {
            console.log("Dados: ", dados);
            
            // Tratamento da data ( aaaa-mm-dd em dd/mm/aa)
            const dataFormatada = new Date(dados.timestamp).toLocaleDateString('pt-BR');

            // interface
            containerResultado.innerHTML = `
                <div class="divInformacoes">
                    <h1 class="titulo-linguagem">${dados.title}</h1>
                    
                    ${dados.description ? `<p class="subtitulo-linguagem">${dados.description}</p>` : ''}
                    
                    <hr class="linha-divisoria">

                    <div class="conteudo-principal">
                        
                        <div class="texto-explicativo">
                            ${dados.extract_html}
                        </div>
                    </div>

                    <div class="rodape-artigo">
                        <p><strong>Última modificação:</strong> ${dataFormatada}</p>
                        <a href="${dados.content_urls.desktop.page}" target="_blank" class="botaolink"> 
                            Ler documentação completa na Wikipédia ->
                        </a>
                    </div>
                </div>
            `;
        })
        .catch(erro => {
            containerResultado.innerHTML = `<p style='color: red;'>Linguagem "${termo}" não encontrada.</p>`;
        });
}

// Ativa a busca quando o usuário CLICAR no botão da lupa
botaoBuscar.addEventListener('click', buscarLinguagem);

// 4. BÔNUS: Ativa a busca também se o usuário apertar a tecla "Enter" no teclado
campoBusca.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        buscarLinguagem();
    }
});