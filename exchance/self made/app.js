const amountInput = document.getElementById("amount");
const firstCurrencySelect = document.getElementById("firstCurrency");
const secondCurrencySelect = document.getElementById("secondCurrency");

const ui = new UI(firstCurrencySelect, secondCurrencySelect);
const currency = new Currency("USD", "TRY");
const xxx = document.getElementById("outputResult");

eventListener();
function eventListener() {
  amountInput.addEventListener("input", changeAmount);
  firstCurrencySelect.onchange = function () {
    currency.firstCurrency = firstCurrencySelect.options[firstCurrencySelect.selectedIndex].textContent;
    setCurrency();
    ui.changeFirstSpan();
  };
  secondCurrencySelect.onchange = function () {
    currency.secondCurrency = secondCurrencySelect.options[secondCurrencySelect.selectedIndex].textContent;
    setCurrency();
    ui.changeSecondSpan();
  };
}

function changeAmount() {
  currency.amount = amountInput.value;
  setCurrency();
}
function setCurrency() {
  currency
    .getCurrency()
    .then((res) => {
      ui.changeResultInput(res);
    })
    .catch((err) => console.log("ERROR"));
}
