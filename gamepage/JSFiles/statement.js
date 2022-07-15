export class Statement {
    constructor(id, text, type) {
        this.choices = [];
        this.id = id;
        this.text = text;
        this.type = type;
    }
    addChoice(cObj) {
        this.choices.push(cObj);
    }
    getText() {
        return this.text;
    }
    getId() {
        return this.id;
    }
    getChoice(i) {
        return this.choices[i];
    }
}
