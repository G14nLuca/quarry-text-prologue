const choiceBtns = document.getElementsByClassName("choice-btn");
const textsGame = document.getElementsByClassName("text-item");

let textObjects = []
let choiceTemplate = {}

function init() {
    loadTextObjects();
    //showArrayItem(0);
}

function loadTextObjects() {
    const textArray = loadScript();
    console.log(textArray);

    textArray.forEach(
        (text, index) => {

            if (text.includes("[empty line]")) {
                textObjects.push(
                    { id: index, item: " ", next: index + 1 }
                );
            }

            else if (text.includes("[?]")) {
                choiceTemplate.id = index;
                choiceTemplate.item = text;
                choiceTemplate.choices = [];
            }

            else if (text.includes("[Choice 1]") || text.includes("[Choice 2]")) {
                choiceTemplate.choices.push({ item: text, following: [] });
            }

            else if (text.includes("[C1]")) {
                choiceTemplate.choices[0].following.push({ id: index, item: text, next: index + 1 });
            }

            else if (text.includes("[C2]")) {
                choiceTemplate.choices[1].following.push({ id: index, item: text, next: index + 1 });
            }

            else if (text.includes("[end of Choice 2]")) {
                textObjects.push(choiceTemplate);
            }

            else {
                nValue = index + 1

                if ((index + 1) == (textArray.length)) {
                    nValue = null
                }

                textObjects.push(
                    { id: index, item: text, next: nValue }
                );

            }
        }
    )
}

function loadScript() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain; charset=UTF-8');

    let array = fetch("/resources/script.txt", myHeaders)
        .then(function (response) {
            return response.arrayBuffer();
        })
        .then(function (buffer) {
            const decoder = new TextDecoder('iso-8859-1');
            const text = decoder.decode(buffer);
            return text.split(/\r?\n/);
        });

    return array;
}

init();