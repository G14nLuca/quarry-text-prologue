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
let textWindow;
let textObjects;
let index;
function init() {
    choiceBtns = document.getElementsByClassName("choice-btn");
    textWindow = document.getElementsByClassName("text-window");
    textObjects = [];
    index = 0;
    loadTextObjects();
    sendTextToFront(index);
}
function sendTextToFront(index) {
}
function showNextLine() {
}
function showOptions() {
}
function selectOption() {
}
function loadTextObjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const textArray = yield readFromFile();
        let templateChoice;
        textArray.forEach((text, id) => {
            if (text.includes("[empty line]")) {
                textObjects.push(new Statement(id, " ", "Empty"));
            }
            else if (text.includes("[?]")) {
                templateChoice = new Statement(id, text, "Question");
            }
            else if (text.includes("[Choice 1]") || text.includes("[Choice 2]")) {
                templateChoice.addChoice(new Choice(id, text));
            }
            else if (text.includes("[C1]")) {
                templateChoice.getChoice(0).addEvent(id, text, "Consquence 1");
            }
            else if (text.includes("[C2]")) {
                templateChoice.getChoice(1).addEvent(id, text, "Consquence 2");
            }
            else if (text.includes("[end of Choice 2]")) {
                textObjects.push(templateChoice);
            }
            else {
                let type = "";
                if (text.includes("*")) {
                    type = "Narration";
                }
                else if (text.includes("**")) {
                    type = "Talk";
                }
                textObjects.push(new Statement(id, text, type));
            }
        });
        console.log(textObjects);
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
init();
