//inputs
const billAmountInput = document.getElementById("billAmount");
const peopleNumberInput = document.getElementById("people");
//buttons
const tipBtns = document.querySelectorAll(".tipAmount");
const inputs = document.querySelectorAll(".input-num");
const customTipPercentage = document.getElementById("custom-tip");
const resetBtn = document.getElementById("reset");
//results
const tipResult = document.getElementById("tipPerPerson");
const totalResult = document.getElementById("totalPerPerson");
//error
const errorLabel = document.getElementById("people-error");

//button on click becomes active and passes its value
tipBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e)  {
        e.preventDefault();
        tipBtns.forEach(function(button){
            button.classList.remove("active");
        });
        e.target.classList.add("active");
        const tipPercentage = parseInt(e.target.dataset.tip)/100;
        calcTipForEveryone(tipPercentage);
    });
});

customTipPercentage.addEventListener("input",function(){
    const customTipValue = customTipPercentage.value;
    const tipPercentage = customTipValue/100;
    calcTipForEveryone(tipPercentage);
});

//reset button resets inputs, buttons
resetBtn.addEventListener("click", function() {
    document.getElementById("form").reset();
    tipBtns.forEach(function(button){
        button.classList.remove("active");
    });
    tipResult.innerText = `$0.00`;
    totalResult.innerText = `$0.00`;
})

//when clicking on input its value refreshes
inputs.forEach(function(input) {
    input.addEventListener("click", function(e)  {
        e.target.value = "";
    });
});

//function calculates tip
function calcTipForEveryone(tipPercentage) {
    const billAmount = parseFloat(billAmountInput.value);
    const peopleNumber = parseInt(peopleNumberInput.value);
    if (billAmount && peopleNumber) {
      errorLabel.classList.remove("error");
      peopleNumberInput.classList.remove("error");
      let totalAmount = (billAmount * (1 + tipPercentage)) / peopleNumber;
      totalAmount = Math.round(totalAmount * 100) / 100;
      let tipAmount = (billAmount * tipPercentage) / peopleNumber;
      tipAmount = Math.round(tipAmount * 100) / 100;
      console.log(totalAmount, tipAmount);
      tipResult.innerText = `$${tipAmount}`;
      totalResult.innerText = `$${totalAmount}`;
    }
    if(!peopleNumber){
        errorLabel.classList.add("error");
        peopleNumberInput.classList.add("error");
    }
};