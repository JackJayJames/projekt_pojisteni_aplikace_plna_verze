'use strict';

export class PopUp{
    constructor(element){
        this.element = element;
    }
    success(text, id){
        this.#vytvorit(text, `popup-${id}`, "#5bc236");
    }
    #vytvorit(text, id, barva){
        const popup = document.createElement("div");
        popup.classList = "popup";
        popup.id = id;
        popup.textContent = text;
        popup.style.backgroundColor = barva;
        popup.appendChild(this.#getDelete(id));

        setTimeout(() => this.#smazatPopUp(id), 5000)

        document.body.appendChild(popup);
    }
    #getDelete(id){
        const del = document.createElement("button");
        del.classList = "popupDel";
        del.textContent = "X";
        del.onclick = () => {
            this.#smazatPopUp(id);
        };
        return del;
    }
    #smazatPopUp(id){
        const element = document.getElementById(id);
        if(!element) return;
        element.animation = "fadeOut";

        setTimeout(() => element.remove(), 2000)
    }
}