//storing random numbers into an array
let randomNumbersArray=[];
//getting the random number
let randomNumber = 0;
//numbers of tries for the user
let maxtriesAmount = 3;
let usertriesAmount = 1;
//randomNumberMaxValue
let randomNumberMaxValue = 10;
//actual random number for uniqueRandomNumberChecker()
let actualRandomNumber = 0;
//every time the webapp starts
setInitialInstructions();

//comparing user number with the random number
const checkUserTry= () =>{
    if (usertriesAmount<=maxtriesAmount) {
        let userNumberInput = parseInt(document.getElementById('userNumberInput').value);
        if(userNumberInput === randomNumber){
            innerTextHtmlTags('p',`Felicidades, el numero escondido es ${randomNumber}`);
            console.log(`Lo hiciste en ${usertriesAmount} ${usertriesAmount===1?'intento':'intentos'}`);
            activateNewgameButton();
            deactivateTryButton();
            return;
        }else{
            if (userNumberInput > randomNumber) {
                innerTextHtmlTags('p',`No estimad@, el numero escondido no es ${userNumberInput}. El numero es menor`);
                //console.log(`El numero escondido es menor que ${userNumberInput}`);
            } else {
                innerTextHtmlTags('p',`No estimad@, el numero escondido no es ${userNumberInput}. El numero es mayor`);
                //console.log(`El numero escondido es mayor que ${userNumberInput}`);
            }
            cleanerInputField();
            if (usertriesAmount === maxtriesAmount) {
                console.log(`Ya usaste tu(s) ${maxtriesAmount} ${(maxtriesAmount===1)?'intento':'intentos'}`);
                usertriesAmount++;
                activateNewgameButton();
                deactivateTryButton();
                return;
            }else{
                console.log(`==Solo tienes ${maxtriesAmount-usertriesAmount} ${(usertriesAmount===2)?'intento':'intentos'} mas==`);
                usertriesAmount++;
            }
        }
    }
    return;
    
}

//innerText to any html element
function innerTextHtmlTags(tagElement,text){
    let selectTag = document.querySelector(tagElement);
    //console.log(`datatype de ${selectTag}: ${typeof(selectTag)}`);
    selectTag.innerHTML = text;
    return;
}
//get a random number function, its a normal function because of "function"
function randomNumberGenerator(limitNumber){
    let randomNumber = Math.floor(Math.random()*limitNumber)+1;
    //console.log(`==El numero a adivinar es: ${randomNumber}==`);
    return randomNumber;
}
//cleaner input field
function cleanerInputField(){
    document.getElementById('userNumberInput').value = '';
    return;
}
//activate nuevo juego button
function activateNewgameButton() {
    document.getElementById('reiniciar').removeAttribute('disabled');
    return;
}
//deactivate intentar button
function deactivateTryButton() {
    document.getElementById('intentar').setAttribute('disabled', 'true');
    return;
}
//desactivate nuevo juego button
function deactivateNewgameButton() {
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    return;
}
function activateTryButton(){
    document.getElementById('intentar').removeAttribute('disabled');
    return;
}
//restart game
function restartGameFunction() {
    usertriesAmount = 1;
    cleanerInputField();
    setInitialInstructions();
    return;
}
//setting the initial values of the app
function setInitialInstructions() {
    activateTryButton();
    innerTextHtmlTags('h1','Juego del numero escondido');
    innerTextHtmlTags('p',`Indica un numero del 1 al ${randomNumberMaxValue}`);
    randomNumber = uniqueRandomNumberChecker();
    deactivateNewgameButton();
    return;
}
//checker of unique random number values
function uniqueRandomNumberChecker() {
    actualRandomNumber = randomNumberGenerator(parseInt(randomNumberMaxValue));
    const foundSimilarRandomNumber = randomNumbersArray.find((randomNumber)=>randomNumber === actualRandomNumber);
    //in case every randomNumber was on the list
    if(randomNumbersArray.length<randomNumberMaxValue){
        if (!foundSimilarRandomNumber) {
            randomNumbersArray.push(actualRandomNumber);
            //console.log(randomNumbersArray);
            return actualRandomNumber;
        }else{
            return uniqueRandomNumberChecker();
        }
    }else{
        deactivateTryButton();
        innerTextHtmlTags('p',`Ya utilizo sus ${randomNumberMaxValue} intentos. Por favor, actualice la pagina`);
        return;
    }
}
