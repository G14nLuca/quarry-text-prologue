import { Statement } from "./statement.js";
export class Choice {
    constructor(id, text) {
        this.events = [];
        this.id = id;
        this.text = text;
    }
    getText() {
        return this.text;
    }
    addEvent(id, text, type) {
        this.events.push(new Statement(id, text, type));
    }
}
