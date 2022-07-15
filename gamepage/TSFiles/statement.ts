import { Choice } from "./choice.js";

export class Statement {
    private readonly id: number;
    private readonly text: string;
    private readonly type: string;
    private choices: Choice[] = [];

    constructor(id: number, text: string, type: string){
        this.id = id;
        this.text = text;
        this.type = type;
    }

    addChoice(cObj: Choice){
        this.choices.push(cObj);
    }

    getText(){
        return this.text;
    }

    getId(){
        return this.id;
    }

    getChoice(i: number){
        return this.choices[i];
    }

}