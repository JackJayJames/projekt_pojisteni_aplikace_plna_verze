'use strict';

const privatni = new WeakMap();
export class TvoricTabulky{
    constructor(element){
        privatni.set(this, {
            _element: element,
            _vytvoritTabulku: function(data){
                const table = document.createElement("table");
                table.appendChild(this._vytvoritHlavicku());

                this._element.appendChild(table);
            },
            _vytvoritHlavicku: function(){
                const thead = document.createElement("thead");
                const tr = document.createElement("tr");
                tr.appendChild(document.createElement("th").textContent = "Jméno");
                tr.appendChild(document.createElement("th").textContent = "Bydliště");

                return thead;
            }
        });
    }
    vytvorit(data){
        privatni.get(this)._vytvoritTabulku(data);
    }
}