'use strict';

const privatni = new WeakMap();
export class TvoricTabulky{
    constructor(element){
        privatni.set(this, {
            _element: element,
            _vytvoritTabulku: function(data){
                const table = document.createElement("table");
                table.appendChild(this._vytvoritHlavicku());
                table.appendChild(this._vytvoritTelo(data));

                this._element.appendChild(table);
            },
            _vytvoritHlavicku: function(){
                const thead = document.createElement("thead");
                const tr = document.createElement("tr");
                tr.appendChild(this._vytvoritBunku("th", "Jméno"));
                tr.appendChild(this._vytvoritBunku("th", "Bydliště"));
                tr.appendChild(this._vytvoritBunku("th", "e-mail"));
                tr.appendChild(this._vytvoritBunku("th", "telefon"));
                tr.appendChild(this._vytvoritBunku("th", ""));
                thead.appendChild(tr);
                return thead;
            },
            _vytvoritBunku: function(type = "td", text){
                const element = document.createElement(type);
                element.textContent = text;
                return element;
            },
            _vytvoritTelo: function(data){
                const tbody = document.createElement("tbody");
                for(const cast of data){
                    const tr = document.createElement("tr");
                    tr.appendChild(this._vytvoritBunku("td", `${cast.jmeno} ${cast.prijmeni}`));
                    tr.appendChild(this._vytvoritBunku("td", cast.mesto));
                    tr.appendChild(this._vytvoritBunku("td", cast.mail));
                    tr.appendChild(this._vytvoritBunku("td", cast.telefon));
                    tbody.appendChild(tr);
                }

                return tbody;
            }
        });
    }
    vytvorit(data){
        privatni.get(this)._vytvoritTabulku(data);
    }
}