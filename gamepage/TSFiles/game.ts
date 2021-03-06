import { Choice } from "./choice.js";
import { Statement } from "./statement.js";

let choiceBtns: HTMLCollectionOf<Element>;
let choiceTexts: HTMLCollectionOf<Element>;
let scriptWindow: Element;
let scriptTags: string[];
let textObjects: Statement[];
let index: number;
let start: boolean;
let block: boolean;

function loadElements() {
    choiceBtns = document.getElementsByClassName("choice-btn");
    choiceTexts = document.getElementsByClassName("choice-text");
    scriptWindow = document.querySelector(".script-window") as Element;
    scriptTags = ["[empty line]", "[?]", "[Choice 1]", "[Choice 2]", "[C1]", "[C2]", "*", "**"];

    start = false;
    block = false;
    textObjects = [];
    index = 0;
    loadTextObjects();
    keyboardAndMouse();

}

function keyboardAndMouse() {
    document.getElementsByTagName("body")[0].addEventListener('keyup', e => {
        if (e.code == "Space") {
            pressed();
        }
    });

    document.getElementsByTagName("body")[0].addEventListener("click", e => {
        if (e.button == 0) {
            pressed();
        }
    });

}

function checkType() {
    if (block == false) {

        let line: Statement | Choice = textObjects.filter(obj => { return obj.getId() === index })[0];
        sendTextToFront(line);
        if (line.getType() == "Question") {
            setChoices(line);
        }
        index += 1;
    }

}

function pressed() {
    if (!start) {
        document.getElementsByClassName("start-text")[0].setAttribute("style", "display: none;");
        start = true;
    }

    checkType();

}

function sendTextToFront(line: Statement | Choice) {
    const newElement = document.createElement("p");
    newElement.className = 'script-line';
    const newText = document.createTextNode(line.getText());
    newElement.appendChild(newText);
    scriptWindow.appendChild(newElement);
}

function setChoices(line: Statement) {
    choiceTexts[0].innerHTML = line.getChoice(0).getText();
    choiceBtns[0].removeAttribute("disabled");

    choiceTexts[1].innerHTML = line.getChoice(1).getText();
    choiceBtns[1].removeAttribute("disabled");

    block = true;

}

function selectOption() {

}

function removeTags(text: string) {
    let tagless: string = "";

    scriptTags.forEach((tag: string) => {
        if (text.includes(tag)) {
            tagless = text.replace(tag, "");
        }
    });

    return tagless;
}

async function loadTextObjects() {
    const textArray: string[] = await readFromFile();
    let templateChoice: Statement;


    textArray.forEach(
        (text, id) => {

            let taglessText: string = removeTags(text);

            if (text.includes("[empty line]")) {
                textObjects.push(new Statement(id, taglessText, "Empty"));
            }

            else if (text.includes("[?]")) {
                templateChoice = new Statement(id, taglessText, "Question");
            }

            else if (text.includes("[Choice 1]") || text.includes("[Choice 2]")) {
                templateChoice.addChoice(new Choice(id, taglessText));
            }

            else if (text.includes("[C1]")) {
                templateChoice.getChoice(0).addEvent(id, taglessText, "Consquence 1");
            }

            else if (text.includes("[C2]")) {
                templateChoice.getChoice(1).addEvent(id, taglessText, "Consquence 2");
            }

            else if (text.includes("[end of Choice 2]")) {
                textObjects.push(templateChoice);
            }

            else {
                let type: string = "";
                if (text.includes("**")) {
                    type = "Talk";
                } else if (text.includes("*")) {
                    type = "Narration";
                }
                textObjects.push(new Statement(id, taglessText, type));
            }
        }
    )

}

async function readFromFile() {

    let myHeaders: HeadersInit = new Headers();
    myHeaders.set('Content-Type', 'text/plain; charset=UTF-8');

    let script: Response = await fetch("/resources/script.txt", { headers: myHeaders });
    const decoder = new TextDecoder('UTF-8');
    const text: string = decoder.decode(await script.arrayBuffer());

    return text.split(/\r?\n/);


}

loadElements();