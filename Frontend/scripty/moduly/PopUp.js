'use strict';

export class PopUp{
    static success(text, id){
        this.#vytvorit(text, id, "#5bc236");
    }
    static #vytvorit(text, id, barva){
        const popup = document.createElement("div");
        popup.classList = "popup";
        popup.id = id;
        popup.textContent = text;
        popup.style.backgroundColor = barva;
        popup.appendChild(this.#getDelete(id));
        document.body.appendChild(popup);
    }
    static #getDelete(id){
        const del = document.createElement("button");
        del.classList = "popupDel";
        del.onclick = () => {
            console.log(id);
        };
        return del;
    }
}