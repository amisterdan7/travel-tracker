const inputDesc = document.querySelector("#desc-despesa");
const inputValor = document.querySelector("#valor-gringo");
const inputCotacao = document.querySelector("#cotacao");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaDespesasDOM = document.querySelector("#lista-despesas");
const totalBrlDOM = document.querySelector("#total-brl");

// Carrega as despesas salvas para manter os dados entre sessões.
let despesas = JSON.parse(localStorage.getItem("viagem_despesas")) || [];

// Persiste o estado atual da lista no localStorage.
const salvarDespesas = () => {
  localStorage.setItem("viagem_despesas", JSON.stringify(despesas));
};

// Valida os campos, cria a nova despesa e atualiza a interface.
const adicionarDespesa = () => {
  const desc = inputDesc.value.trim();
  const valorOriginal = parseFloat(inputValor.value);
  const cotacao = parseFloat(inputCotacao.value);

  if (desc === "" || Number.isNaN(valorOriginal) || Number.isNaN(cotacao)) {
    alert("Por favor, preencha todos os campos corretamente com valores válidos.");
    return;
  }

  const novaDespesa = {
    id: Date.now(),
    descricao: desc,
    valorEstrangeiro: valorOriginal,
    valorReal: valorOriginal * cotacao,
  };

  despesas.push(novaDespesa);
  salvarDespesas();

  inputDesc.value = "";
  inputValor.value = "";
  inputCotacao.value = "";

  atualizarTela();
};


const atualizarTela = () => {
  const htmlDaLista = despesas.map((item) => {
    return `
      <li>
        <div>
          <strong>${item.descricao}</strong>
          <button class="btn-deletar" data-id="${item.id}">
            <img src="assets/trash2.svg" alt="Excluir despesa" class="icone-lixeira">
          </button>
          <br>
          <small>U$ ${item.valorEstrangeiro.toFixed(2)}</small>
        </div>
        <span class="valor">R$ ${item.valorReal.toFixed(2)}</span>
      </li>
    `;
  });

  listaDespesasDOM.innerHTML = htmlDaLista.join("");

  const somaTotal = despesas.reduce((total, item) => total + item.valorReal, 0);
  totalBrlDOM.textContent = `R$ ${somaTotal.toFixed(2)}`;
};


btnAdicionar.addEventListener("click", adicionarDespesa);


listaDespesasDOM.addEventListener("click", (event) => {
  const botaoDeletar = event.target.closest(".btn-deletar");

  if (!botaoDeletar) {
    return;
  }

  if (
    confirm("Tem certeza que deseja executar essa ação?")
  ) {
    const idParaDeletar = Number(botaoDeletar.dataset.id);
    executarDelecao(idParaDeletar);
  }
});

const executarDelecao = (id) => {
  despesas = despesas.filter((item) => item.id !== id);
  salvarDespesas();
  atualizarTela();
};


atualizarTela();



