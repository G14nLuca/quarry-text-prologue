var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Choice } from "./choice.js";
import { Statement } from "./statement.js";
let choiceBtns;
let choiceTexts;
let scriptWindow;
let scriptTags;
let textObjects;
let index;
let start;
let block;
function loadElements() {
    choiceBtns = document.getElementsByClassName("choice-btn");
    choiceTexts = document.getElementsByClassName("choice-text");
    scriptWindow = document.querySelector(".script-window");
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
        let line = textObjects.filter(obj => { return obj.getId() === index; })[0];
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
function sendTextToFront(line) {
    const newElement = document.createElement("p");
    newElement.className = 'script-line';
    const newText = document.createTextNode(line.getText());
    newElement.appendChild(newText);
    scriptWindow.appendChild(newElement);
}
function setChoices(line) {
    choiceTexts[0].innerHTML = line.getChoice(0).getText();
    choiceBtns[0].removeAttribute("disabled");
    choiceTexts[1].innerHTML = line.getChoice(1).getText();
    choiceBtns[1].removeAttribute("disabled");
    block = true;
}
function selectOption() {
}
function removeTags(text) {
    let tagless = "";
    scriptTags.forEach((tag) => {
        if (text.includes(tag)) {
            tagless = text.replace(tag, "");
        }
    });
    return tagless;
}
function loadTextObjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const textArray = yield readFromFile();
        let templateChoice;
        textArray.forEach((text, id) => {
            let taglessText = removeTags(text);
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
                let type = "";
                if (text.includes("**")) {
                    type = "Talk";
                }
                else if (text.includes("*")) {
                    type = "Narration";
                }
                textObjects.push(new Statement(id, taglessText, type));
            }
        });
    });
}
function readFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'text/plain; charset=UTF-8');
        let script = yield fetch("/resources/script.txt", { headers: myHeaders });
        const decoder = new TextDecoder('UTF-8');
        const text = decoder.decode(yield script.arrayBuffer());
        return text.split(/\r?\n/);
    });
}
loadElements();
