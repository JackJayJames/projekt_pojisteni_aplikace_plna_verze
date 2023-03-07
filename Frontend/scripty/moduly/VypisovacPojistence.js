'use strict';

const privatni = new WeakMap();
export class VypisovacPojistence{
    constructor(){
        privatni.set(this, {
            _jmeno: document.querySelector("#jmeno"),
            _prijmeni: document.querySelector("#prijmeni"),
            _narozeni: document.querySelector("#narozeni"),
            _mail: document.querySelector("#mail"),
            _telefon: document.querySelector("#telefon"),
            _ulice: document.querySelector("#ulice"),
            _mesto: document.querySelector("#mesto"),
            _psc: document.querySelector("#psc"),

            _pojisteni: document.querySelector(".pojisteni"),

            _vypsatPojistence: function(pojistenec){
                this._jmeno.textContent = pojistenec.jmeno;
                this._prijmeni.textContent = pojistenec.prijmeni;
                this._narozeni.textContent = new Date(pojistenec.narozeni).toLocaleDateString();
                this._mail.textContent = pojistenec.mail;
                this._telefon.textContent = pojistenec.telefon;
                this._ulice.textContent = pojistenec.ulice;
                this._mesto.textContent = pojistenec.mesto;
                this._psc.textContent = pojistenec.psc;
            },

            _smazatPojisteni: function(poj){
                poj === 0 ? this._pojisteni.innerHTML = "Žádná pojištění" : this._pojisteni.innerHTML = "";
            },

            _vypsatPojisteni: function(pojisteni){
                const div = document.createElement("div");
                div.classList = "pojist";
                div.appendChild(this._vytvoritDiv(pojisteni.nazev, "nazev"));
                div.appendChild(this._vytvoritDiv(pojisteni.predmet, "predmet"));
                div.appendChild(this._vytvoritDiv(pojisteni.castka, "castka"));
                div.appendChild(this._vytvoritDiv(new Date(pojisteni.platnost_od).toLocaleDateString(), "platnostOd"));
                div.appendChild(this._vytvoritDiv(new Date(pojisteni.platnost_do).toLocaleDateString(), "platnostDo"));
                div.appendChild(this._vytvoritDelBtn(pojisteni._id, "delBtnPojist"));

                this._pojisteni.appendChild(div);
            },
            _vytvoritDiv: function(text, trida){
                const div = document.createElement("div");
                div.classList = trida;
                div.textContent = text;
                return div;
            },
            _vytvoritDelBtn: function(id, trida){
                const button = document.createElement("button");
                button.textContent = "Smazat";
                button.id = id;
                button.classList = trida;
                return button;
            }
        });
    }
    vypsatPojistence(pojistenec){
        privatni.get(this)._vypsatPojistence(pojistenec);
    }

    smazatPojisteni(poj){
        privatni.get(this)._smazatPojisteni(poj);
    }
    vypsatPojisteni(pojisteni){
        privatni.get(this)._vypsatPojisteni(pojisteni);
    }
}