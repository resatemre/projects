class Currency {
  constructor(firstCurrency, secondCurrency) {
    this.firstCurrency = firstCurrency;
    this.secondCurrency = secondCurrency;
    this.amount = null;
    this.url = "https://api.exchangeratesapi.io/latest?base=";
  }
  async getCurrency(firstCurrency) {
    let response = await fetch(this.url + this.firstCurrency);
    let getData = await response.json();
    return getData.rates[this.secondCurrency] * this.amount;
  }
}
