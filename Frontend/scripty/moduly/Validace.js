'use strict';

export class Validace{
    static zvalidovatNazev(nazev){
        if(!nazev) return "Toto pole je povinné";
        if(!this.#_delka(nazev, 5, 30)) return "Invalidní délka";
        if(!this.#_obasahujePismenaCisla(nazev)) return "Invalidní znaky";
    }
    static zvalidovatCastku(castka){
        if(!castka) return "Toto pole je povinné";
        if(!this.#_obasahujeCisla(castka)) return "Může obsahovat jenom čísla";
        if(Number(castka) < 1) return "Částka je příliš malá";
        if(Number(castka) > 10000000) return "Částka je příliš velká";
    }
    static zvalidovatPredmet(predmet){
        return "predmet";
    }
    static zvalidovatPlatnost(platnost){
        return "platnost";
    }
    static zvalidovatUsername(username){
        if(!username) return "Toto pole je povinné";
        if(!this.#_delka(username, 6, 20))   return "Musí být delší než 5 a kratší než 21";
        if(!this.#_obasahujePismenaCisla(username)) return "Může obsahovat jenom písmena a čísla";
    }
    static zvalidovatPassword(password){
        if(!password) return "Toto pole je povinné";
        if(!this.#_delka(password, 6, 20)) return "Musí být delší než 5 a kratší než 21";
        if(!this.#_obsahujePismenaCislaZnaky(password)) return "Invalidní znaky";
    }
    static zvalidovatJmeno(jmeno){
        if(!jmeno){
            return "Toto pole je povinné";
        }
        if(!this.#_delka(jmeno, 2, 30)){
            return "Délka musí být delší než 1 a k ratší než 31";
        }
        if(!this.#_jednoSlovo(jmeno)){
            return "Musí obsahovat jedno slovo";
        }
        if(!this.#_obsahujeCeskaPismena(jmeno)){
            return "Invalidní znaky";
        }
    }
    static zvalidovatEmail(mail){
        if(!mail){
            return "Toto pole je povinné";
        }
        if(!this.#_delka(mail, 2, 30)){
            return "Délka musí být delší než 1 a kratší než 31";
        }
        if(!this.#_jednoSlovo(mail)){
            return "Musí obsahovat jedno slovo";
        }
        if(!this.#_obsahujeZnaky(["@", "."], mail)){
            return "Musí obsahovat znaky @ a .";
        }
        if(!this.#_schemaEmail(mail)){
            return "Invalidní schéma E-mailu";
        }
    }
    static zvalidovatTelefon(telefon){
        if(!telefon){
            return "Toto pole je povinné";
        }
        if(!this.#_obasahujeCisla(telefon.trim().split(" ").join(""))){
            return "Musí obsaovat jenom čísla";
        }
        if(!this.#_delka(telefon.trim().split(" ").join(""), 9, 9)){
            return "Číslo musí být dlouhé 9 čísel";
        }
    }
    static zvalidovatAdresu(adresa){
        if(!adresa){
            return "Toto pole je povinné";
        }
        if(!this.#_delka(adresa, 3, 50)){
            return "Délka musí být delší než 2 znaky a kratší než 50";
        }
        if(!this.#_obasahujePismenaCisla(adresa.split(" ").join(""))){
            return "Invalidní znaky"
        }
    }
    static zvalidovatPsc(psc){
        if(!psc){
            return "Toto pole je povinné";
        }
        if(!this.#_obasahujeCisla(psc)){
            return "Může obsahovat jenom čísla";
        }
        if(!this.#_delka(psc, 5, 5)){
            return "Invaldiní délka";
        }
    }
    static zvalidovatNarozeni(narozeni){
        if(!narozeni){
            return "Toto pole je povinné";
        }
        const datum = new Date(narozeni);
        if(datum.getTime() > Date.now()){
            return "Datum je v budoucnosti";
        }
    }

    static #_delka(input, min, max){
        return (min <= input.length) && (input.length <= max);
    }
    static #_jednoSlovo(slovo){
        return slovo.trim().split(" ").length == 1;
    }
    static #_obsahujeZnaky(znaky, mail){
        for(const znak of znaky){
            if(mail.indexOf(znak) == -1)   return false;
        }
        return true;
    }
    static #_schemaEmail(mail){
        mail = mail.trim();
        const arr = mail.split("@").join(".").split('.');
        if(arr.length !== 3)    return false;
        if(arr.some((a) => a === ""))   return false;
        if(!this.#_obasahujePismenaCisla(arr.join(""))) return false;
        if(!this.#_obasahujePismena(arr[2])) return false;

        return true;
    }
    static #_obasahujePismenaCisla(string){
        return /^[A-Za-zÁ-Žá-ž0-9]*$/.test(string);
    }
    static #_obasahujePismena(string){
        return /^[A-Za-z]*$/.test(string);
    }
    static #_obasahujeCisla(cislo){
        return /^[0-9]*$/.test(cislo);
    }
    static #_obsahujeCeskaPismena(string){
        return /^[a-zA-Zá-žÁ-Ž]*$/.test(string);
    }
    static #_obsahujePismenaCislaZnaky(string){
        return /^[a-zA-Z0-9!?@&]*$/.test(string);
    }
}