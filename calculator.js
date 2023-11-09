const allOpButtons = document.querySelectorAll(".opb");
const allNumButtons = document.querySelectorAll(".nb");
const eqButton = document.querySelector(".eq");
const prodScreen = document.querySelector(".prod");
const screen = document.querySelector(".screen");

const clearButton = document.querySelector("#clear");
const delButton = document.querySelector("#delete");

allNumButtons.forEach((el) => el.addEventListener("click", UpdateScreen));
allOpButtons.forEach((el) => el.addEventListener("click", SetOperator));
clearButton.addEventListener("click", ClearCalc);
delButton.addEventListener("click", DeleteN);
eqButton.addEventListener("click", Equals);

let startedSecond = false;
let newWrite = false;

let currOp = "";
let nextOp = ""
let numA = 0;
let numB = 0;
let prod = 0;

function UpdateScreen(e)
{
    if(newWrite){
        ClearScreen();
        newWrite = false;
    }

    console.log(e.target.id);
    if(screen.textContent === "0") 
        screen.textContent = e.target.id;
    else
        screen.textContent += e.target.id; 
}

function SetOperator(e)
{
    if(currOp === "")
        currOp = e.target.id;
    else
        nextOp = e.target.id;
    if(newWrite === false)
        EvaluateOperator();
}

function EvaluateOperator(e)
{
    if(!startedSecond){
        numA = parseFloat(screen.textContent);
        startedSecond = true;
        newWrite = true;
    } else{
        numB = parseFloat(screen.textContent);        
        prod = Operate(numA, numB, currOp);
        numA = prod;

        currOp = nextOp;
        newWrite = true;

        console.log(prod);
    }

    prodScreen.textContent = prod;
}

function ClearScreen()
{
    screen.textContent = "0";
}

function ClearCalc()
{
    ClearScreen()
    currOp = "";
    numA = 0;
    numB = 0;
    prod = 0;
    startedSecond = false;
}

function DeleteN(e)
{
    screen.textContent = screen.textContent.slice(0, -1);
}

function Operate(a, b, op)
{
    switch(op)
    {
        case "+":
            return Add(a, b);
        case "-":
            return Subtract(a, b);
        case "*":
            return Multiply(a, b);
        case "/":
            return Divide(a, b);
    }
}

function Add(a, b)
{
    return a + b;
}

function Subtract(a, b)
{
    return a - b;
}

function Multiply(a, b)
{
    return a * b;
}

function Divide(a, b)
{
    return a / b;
}

function Equals()
{
    if(startedSecond){
        numB = parseFloat(screen.textContent);
        prod = Operate(numA, numB, currOp);
        numA = prod;

        newWrite = true;

        currOp = "";
        nextOp = ""

        prodScreen.textContent = prod;

        ClearScreen();
    }
}