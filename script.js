document.addEventListener("DOMContentLoaded", () => {
  const adicionarLinhaBtn = document.getElementById("adicionar-linha");
  const tabelaOrcamento = document.getElementById("tabela-orcamento");

  let linhaContador = 0;

  // --- Funcionalidade da Tabela (Mantenha o que já tinha) ---
  const adicionarNovaLinha = () => {
    linhaContador++;
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
            <td data-label="Produto">
                <input type="text" placeholder="Ex: Chave Yale Simples" class="input-produto">
            </td>
            <td data-label="Quantidade">
                <input type="number" value="1" min="1" class="input-quantidade">
            </td>
            <td data-label="Valor Unitário (R$)">
                <input type="number" step="0.01" value="0.00" class="input-valor-unitario">
            </td>
            <td data-label="Valor Total (R$)">
                <span class="valor-total">0.00</span>
            </td>
        `;

    tabelaOrcamento.appendChild(novaLinha);

    const inputQuantidade = novaLinha.querySelector(".input-quantidade");
    const inputValorUnitario = novaLinha.querySelector(".input-valor-unitario");
    const spanValorTotal = novaLinha.querySelector(".valor-total");

    const calcularTotalDaLinha = () => {
      const quantidade = parseFloat(inputQuantidade.value) || 0;
      const valorUnitario = parseFloat(inputValorUnitario.value) || 0;
      const total = (quantidade * valorUnitario).toFixed(2);
      spanValorTotal.textContent = total;
    };

    inputQuantidade.addEventListener("input", calcularTotalDaLinha);
    inputValorUnitario.addEventListener("input", calcularTotalDaLinha);

    calcularTotalDaLinha();
  };

  // Adiciona a primeira linha ao carregar
  adicionarNovaLinha();

  // Event listener para o botão "Adicionar Linha"
  adicionarLinhaBtn.addEventListener("click", adicionarNovaLinha);

  // --- NOVA FUNCIONALIDADE: Upload de Logomarca ---
  const logoInput = document.getElementById("logo-input");
  const logoPreview = document.getElementById("logo-preview");
  const uploadText = document.querySelector(".upload-text");

  logoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoPreview.src = e.target.result;
        logoPreview.style.display = "block"; // Garante que a imagem seja exibida
        uploadText.style.display = "none"; // Esconde o texto "clique para adicionar"
      };
      reader.readAsDataURL(file);
    } else {
      // Se nenhum arquivo for selecionado, volta ao placeholder
      logoPreview.src = "https://via.placeholder.com/150x80?text=Sua+Logo+Aqui";
      logoPreview.style.display = "block";
      uploadText.style.display = "block";
    }
  });

  // --- NOVA FUNCIONALIDADE: Editar Informações de Contato e Redes Sociais ---
  const editarBotoes = document.querySelectorAll(".editar-info");

  editarBotoes.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      const target = event.target.dataset.target; // Pega o valor do data-target

      switch (target) {
        case "endereco":
          abrirModalEdicao(
            "Endereço",
            document.getElementById("endereco-texto")
          );
          break;
        case "contato":
          abrirModalEdicao("Contato", document.getElementById("contato-texto"));
          break;
        case "redes-sociais":
          abrirModalRedesSociais();
          break;
      }
    });
  });

  // Função para abrir modal de edição genérico (Endereço, Contato)
  function abrirModalEdicao(titulo, elementoTexto) {
    const novoValor = prompt(`Editar ${titulo}:\n${elementoTexto.textContent}`);
    if (novoValor !== null && novoValor.trim() !== "") {
      elementoTexto.textContent = novoValor.trim();
    }
  }

  // Função para abrir modal de edição de Redes Sociais (mais complexo)
  function abrirModalRedesSociais() {
    const instagramLink = document.getElementById("instagram-link");
    const facebookLink = document.getElementById("facebook-link");

    const novoInstagram = prompt(
      `Editar link do Instagram:\n${
        instagramLink.href === "#" ? "" : instagramLink.href
      }`
    );
    if (novoInstagram !== null) {
      instagramLink.href =
        novoInstagram.trim() === "" ? "#" : novoInstagram.trim();
      instagramLink.textContent =
        novoInstagram.trim() === ""
          ? "Instagram"
          : obterNomeRedeSocial(novoInstagram); // Atualiza texto
    }

    const novoFacebook = prompt(
      `Editar link do Facebook:\n${
        facebookLink.href === "#" ? "" : facebookLink.href
      }`
    );
    if (novoFacebook !== null) {
      facebookLink.href =
        novoFacebook.trim() === "" ? "#" : novoFacebook.trim();
      facebookLink.textContent =
        novoFacebook.trim() === ""
          ? "Facebook"
          : obterNomeRedeSocial(novoFacebook); // Atualiza texto
    }
  }

  // Função auxiliar para obter o nome da rede social a partir do link (opcional)
  function obterNomeRedeSocial(url) {
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("facebook.com")) return "Facebook";
    // Adicione mais redes sociais aqui
    return "Link"; // Retorna "Link" se não reconhecer
  }

  // Em um projeto real, você usaria modais mais sofisticados
  // (com HTML/CSS de modal) em vez de `prompt()` para melhor UX.
  // O `prompt()` é apenas para demonstração rápida aqui.
});
