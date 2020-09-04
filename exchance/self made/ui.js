class UI {
  constructor(firstSelect, secondSelect) {
    this.firstSelect = firstSelect;
    this.secondSelect = secondSelect;
    this.outputFirstSpan = document.getElementById("outputFirst");
    this.outputSecondSpan = document.getElementById("outputSecond");
    this.outputResultInput = document.getElementById("outputResult");
  }
  changeFirstSpan() {
    this.outputFirstSpan.textContent = this.firstSelect.options[this.firstSelect.selectedIndex].textContent;
  }
  changeSecondSpan() {
    this.outputSecondSpan.textContent = this.secondSelect.options[this.secondSelect.selectedIndex].textContent;
  }
  changeResultInput(result) {
    this.outputResultInput.value = result;
  }
}
