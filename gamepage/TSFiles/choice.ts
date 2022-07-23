import { Statement } from "./statement.js";

export class Choice{
    private readonly id: number;
    private readonly text: string;
    private events: Statement[] = [];

    constructor(id: number, text: string){
        this.id = id;
        this.text = text;
    }

    getText(){
        return this.text;
    }

    getEvents(){
        return this.events;
    }

    addEvent(id: number, text: string, type: string){
        this.events.push(new Statement(id, text, type));
    }

}