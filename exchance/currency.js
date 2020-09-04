class Currency {
  constructor(firstCurrency, secondCurrency) {
    this.firstCurrency = firstCurrency;
    this.secondCurrency = secondCurrency;
    this.url = "https://api.exchangeratesapi.io/latest?base=";
    this.amount = null;
  }
  async exchange() {
    let response = await fetch(this.url + this.firstCurrency);
    let getData = await response.json();
    return getData.rates[this.secondCurrency] * Number(this.amount);
  }
  changeAmount(amount) {
    this.amount = amount;
  }
  changeFirstCurrency(newFirstCurrency) {
    this.firstCurrency = newFirstCurrency;
    console.log(this.firstCurrency);
  }
  changeSecondCurrency(newSecondCurrency) {
    this.secondCurrency = newSecondCurrency;
    console.log(this.secondCurrency);
  }
}
