'use strict';

const privatni = new WeakMap();
export class TvoricTabulky{
    constructor(element){
        privatni.set(this, {
            _element: element,
            _vytvoritTabulku: function(data){
                this._element.innerHTML = "";
                const table = document.createElement("table");
                table.classList = "tabulka-pojistencu";
                table.appendChild(this._vytvoritHlavicku());
                table.appendChild(this._vytvoritTelo(data));

                this._element.appendChild(table);
            },
            _vytvoritHlavicku: function(){
                const thead = document.createElement("thead");
                const tr = document.createElement("tr");
                tr.appendChild(this._vytvoritBunku("th", "Jméno"));
                tr.appendChild(this._vytvoritBunku("th", "Bydliště", "schovat"));
                tr.appendChild(this._vytvoritBunku("th", "E-mail", "schovat"));
                tr.appendChild(this._vytvoritBunku("th", "Telefon"));
                thead.appendChild(tr);
                return thead;
            },
            _vytvoritBunku: function(type, text, trida = "", id = ""){
                const element = document.createElement(type);
                element.textContent = text;
                element.classList = trida;
                element.id = id;
                return element;
            },
            _vytvoritTelo: function(data){
                const tbody = document.createElement("tbody");
                for(const cast of data){
                    const tr = document.createElement("tr");
                    tr.appendChild(this._vytvoritBunku("td", `${cast.jmeno} ${cast.prijmeni}`, "pojJmeno", `poj-${cast._id}`));
                    tr.appendChild(this._vytvoritBunku("td", cast.mesto, "schovat"));
                    tr.appendChild(this._vytvoritBunku("td", cast.mail, "schovat"));
                    tr.appendChild(this._vytvoritBunku("td", cast.telefon));
                    tr.appendChild(this._vytvoritTlacitko(cast._id));
                    tbody.appendChild(tr);
                }

                return tbody;
            },
            _vytvoritTlacitko: function(id){
                const button = document.createElement("button");
                button.classList = "deleteBtn";
                button.id = id;
                return button;
            }
        });
    }
    vytvorit(data){
        privatni.get(this)._vytvoritTabulku(data);
    }
}