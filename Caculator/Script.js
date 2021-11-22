const keys = document.querySelector(".calculator__keys")
const displayBot = document.getElementById("displayBot")
const displayTop = document.getElementById("displayTop")

var firstValue, secondValue, operation, sumValue, inputValue
inputValue = "0"

//resets values to there defualt
function clear(){
    firstValue = undefined
    secondValue = undefined
    inputValue = "0"
    operation = undefined
    sumValue = undefined
}

// updates display with new values it recieves
function displayUpdate(displayTopInput, displayBotInput) {   
    if (!displayTopInput) {
        displayTop.textContent = ""
        displayBot.textContent = displayBotInput
    } else {
    displayTop.textContent = displayTopInput
    displayBot.textContent = displayBotInput
    }
}


//does the math XD
function compute(){
    let computation
    const prev = Number(firstValue)
    const current = Number(secondValue)
    if (isNaN(prev)||isNaN(current)) return
    switch (this.operation){
        case " + " :
            computation = prev + current
            break
        case " - " :
            computation = prev - current
            break
        case " x " :
            computation = prev * current
            break
         case " / " :
            computation = prev / current
            break                 
    }
    sumValue = computation
}

// does a whole bunch of stuff based on operator input 
function operator(ValueInput , operationInput){
    if (firstValue == undefined && operation == undefined && secondValue == undefined){//checks if  first value has been assigned and assign if not
        firstValue = ValueInput
        operation = operationInput
        inputValue = "0"
        displayUpdate(firstValue + operation , inputValue)
    } else if (firstValue != undefined && operation == undefined && secondValue == undefined){// Dumn thing to check if theres operation after = was done on caculator
        operation = operationInput
        displayUpdate(firstValue + operation , inputValue)
    } else if (firstValue != undefined && operation != undefined && inputValue == "0"){ //check operator and changes it if theres no new input
        operation = operationInput
        displayUpdate(firstValue + operation , inputValue)
    } else if (firstValue != undefined && operation != undefined && inputValue != "0"){ //checks if all fields are filled and does math 
        secondValue = ValueInput
        compute()
        inputValue = "0"
        operation = operationInput
        firstValue = sumValue
        displayUpdate(firstValue + operation , inputValue)
        
    } 
   }
 
// checks for number presses and append them
function numberKeyPress(press) {
        const keyContent = press
        if (sumValue != undefined && operation == undefined){
            sumValue = undefined
            firstValue = undefined
            inputValue = keyContent
            displayUpdate(firstValue + operation, inputValue)
        } else if (inputValue === "0") {
            inputValue = keyContent
            displayUpdate(firstValue + operation, inputValue)  
        } else { 
            inputValue = inputValue + String(keyContent)
            displayUpdate(firstValue + operation , inputValue) 
        }
    }

keys.addEventListener("click", e => { //key press
    if (e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
            switch(action){ // determine which key was pressed and preform operation based on that 
                case "plus":
                    operator(inputValue, " + ")
                break
                case "minus":
                    if (firstValue == undefined && inputValue == "0"){//enables negative numbers
                        inputValue = "-"
                        displayUpdate("   " , inputValue)
                    }else
                    operator(inputValue, " - ")
                break
                case "multi":
                    operator(inputValue, " x ")
                break
                case "divade":
                    operator(inputValue, " / ")                
                break
                case "decimal":
                    if (sumValue != undefined && operation == undefined){
                        sumValue = undefined
                        firstValue = undefined
                        inputValue = "0."
                        displayUpdate(firstValue + operation, inputValue)
                    }else if (inputValue.includes(".")){ //uhm checks for "." ?
                    }else{
                        inputValue = inputValue + "."
                    }
                break
                case "clear":
                    clear()
                    displayUpdate(firstValue, inputValue)
                break
                case "sum":
                    if (firstValue != undefined && operation != undefined && inputValue != "0"){//checks if required fields are there and completes what is need to do math
                        secondValue = inputValue                  
                    compute()
                    displayUpdate( firstValue + operation + secondValue + " = " + sumValue , "0")
                    firstValue = sumValue
                    operation = undefined
                    secondValue = undefined
                    inputValue = "0"
                    }
                break
                default: // this adds numbers together
                    numberKeyPress(key.textContent)
                    

            }
        }
    
    }
    
)

