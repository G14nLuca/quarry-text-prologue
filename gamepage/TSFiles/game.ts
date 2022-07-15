import { Choice } from "./choice.js";
import { Statement } from "./statement.js";

let choiceBtns: HTMLCollectionOf<Element>;
let textWindow: HTMLCollectionOf<Element>;
let textObjects: Statement[];
let index: number;

function init() {
    choiceBtns = document.getElementsByClassName("choice-btn")
    textWindow = document.getElementsByClassName("text-window")

    textObjects = [];
    index = 0;
    loadTextObjects();
    sendTextToFront(index);
}

function sendTextToFront(index: number) {
}

function showNextLine() {

}

function showOptions() {

}

function selectOption() {

}

async function loadTextObjects() {
    const textArray: string[] = await readFromFile();
    let templateChoice: Statement;


    textArray.forEach(
        (text, id) => {

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
                let type: string = "";
                if (text.includes("*")) {
                    type = "Narration";
                } else if (text.includes("**")) {
                    type = "Talk";
                }

                textObjects.push(new Statement(id, text, type));
            }
        }
    )

    console.log(textObjects);

}

async function readFromFile() {

    let myHeaders: HeadersInit = new Headers();
    myHeaders.set('Content-Type', 'text/plain; charset=UTF-8');

    let script: Response = await fetch("/resources/script.txt", { headers: myHeaders });
    const decoder = new TextDecoder('UTF-8');
    const text: string = decoder.decode(await script.arrayBuffer());

    return text.split(/\r?\n/);


}

init();