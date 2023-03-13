'use strict';

export class PopUp{
    static success(text){
        this.#vytvorit(text, "#5bc236");
    }
    static #vytvorit(text, barva){
        const popup = document.createElement("div");
        popup.classList = "popup";
        popup.textContent = text;
        
        document.body.appendChild(popup);
    }
}