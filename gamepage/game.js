const choiceBtns = document.getElementsByClassName("choice-btn");
const textsGame = document.getElementsByClassName("text-item");

const { readFileSync, promises: fsPromises } = require('fs');

let textObjects = {};

let choiceTemplate = {}

function init() {
    loadTextObjects();
    showArrayItem(0);
}

function loadTextObjects() {
    const textArray = loadScript();

    textArray.forEach(
        (text, index) => {

            if (text.contains("[empty line]")) {
                textObjects.push(
                    { id: index, item: " ", next: index + 1 }
                );
            }

            else if (text.contains("[?]")) {
                
            }

            else if (text.contains("[Choice 1]")) {
                
            }

            else if (text.contains("[Choice 2]")) {
                
            }

            else if (text.contains("[C1]")) {
                
            }

            else if (text.contains("[C2]")) {
                
            }

            else if (text.contains("[end of Choice 1]")) {
                
            }

            else if (text.contains("[end of Choice 2]")) {
                
            }

            else {
                textObjects.push(
                    { id: index, item: text, next: index + 1 }
                );
            }


        }
    )
}

function loadScript() {
    const script = readFileSync("/resources/script.txt", 'utf-8');
    const arr = script.split(/\r?\n/);
    return arr;
}

init()