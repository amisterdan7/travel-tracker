// Captura de elementos do DOM

const inputDesc = document.querySelector("#desc-despesa");
const inputValor = document.querySelector("#valor-gringo");
const inputCotacao = document.querySelector("#cotacao");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaDespesasDOM = document.querySelector("#lista-despesas");
const totalBrlDOM = document.querySelector("#total-brl");

let despesas = JSON.parse(localStorage.getItem("viagem_despesas")) || [];

const salvarDespesas = () => {
  // Salva as despesas no localStorage
  // O método JSON.stringify é usado para converter o array de despesas em uma string JSON
  localStorage.setItem("viagem_despesas", JSON.stringify(despesas));
};

const adicionarDespesa = () => {
  const desc = inputDesc.value.trim();

  const valorOriginal = parseFloat(inputValor.value);
  const cotacao = parseFloat(inputCotacao.value);

  if (desc === "" || isNaN(valorOriginal) || isNaN(cotacao)) {
    alert(
      "Por favor, preencha todos os campos corretamente com valores válidos."
    );
    return;
  }
  const valorConvertidoBRL = valorOriginal * cotacao;

  const novaDespesa = {
    id: Date.now(),

    descricao: desc,
    valorEstrangeiro: valorOriginal,
    valorReal: valorConvertidoBRL,
  };
  despesas.push(novaDespesa);
  salvarDespesas();

  inputDesc.value = "";
  inputValor.value = "";
  inputCotacao.value = "";

  atualizarTela();
};

btnAdicionar.addEventListener("click", adicionarDespesa);

const atualizarTela = () => {
  const htmlDaLista = despesas.map((item) => {
    return `
            <li>
                <div> 
                    <strong>${item.descricao}</strong><br>
                
                    <small> U$ ${item.valorEstrangeiro.toFixed(2)} </small>
                </div>
                <span class="valor"> R$ ${item.valorReal.toFixed(2)} </span>
            </li>
        `;
  });

  
  listaDespesasDOM.innerHTML = htmlDaLista.join('');

  let somaTotal = 0;

  despesas.forEach((item) => {
    somaTotal += item.valorReal;
  });

  totalBrlDOM.textContent = `R$ ${somaTotal.toFixed(2)}`;
};

atualizarTela();
