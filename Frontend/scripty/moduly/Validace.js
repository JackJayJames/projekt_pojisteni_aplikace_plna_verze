'use strict';

export class Validace{
    static #_response;

    static zvalidovat(pojistenec){
        this.#_response = { status: true };
        this.#_response.jmeno = this.#_zvalidovatJmeno(pojistenec.jmeno);
        this.#_response.prijmeni = this.#_zvalidovatJmeno(pojistenec.prijmeni);
        this.#_response.email = this.#_zvalidovatEmail(pojistenec.email);
        this.#_response.telefon = this.#_zvalidovatTelefon(pojistenec.telefon);

        return this.#_response;
    }
    static #_zvalidovatJmeno(jmeno){
        if(!jmeno){
            this.#_response.status = false;
            return "Toto pole je povinné";
        }
        if(!this.#_delka(jmeno, 2, 30)){
            this.#_response.status = false;
            return "Délka musí být delší než 1 a kratší než 31";
        }
        if(!this.#_jednoSlovo(jmeno)){
            this.#_response.status = false;
            return "Musí obsahovat jedno slovo";
        }
    }
    static #_zvalidovatEmail(mail){
        if(!mail){
            this.#_response.status = false;
            return "Toto pole je povinné";
        }
        if(!this.#_delka(mail, 2, 30)){
            this.#_response.status = false;
            return "Délka musí být delší než 1 a kratší než 31";
        }
        if(!this.#_jednoSlovo(mail)){
            this.#_response.status = false;
            return "Musí obsahovat jedno slovo";
        }
        if(!this.#_obsahujeZnaky(["@", "."], mail)){
            this.#_response.status = false;
            return "Musí obsahovat znaky @ a .";
        }
        if(!this.#_schemaEmail(mail)){
            this.#_response.status = false;
            return "Invalidní schéma E-mailu";
        }
    }
    static #_zvalidovatTelefon(telefon){
        if(!telefon){
            this.#_response.status = false;
            return "Toto pole je povinné";
        }
        if(!this.#_obasahujeCisla(telefon.trim().split(" ").join(""))){
            this.#_response.status = false;
            return "Musí obsaovat jenom čísla";
        }
        if(!this.#_delka(telefon.trim().split(" ").join(""), 9, 9)){
            this.#_response.status = false;
            return "Číslo musí být dlouhé 9 čísel";
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
        return /^[A-Za-z0-9]*$/.test(string);
    }
    static #_obasahujePismena(string){
        return /^[A-Za-z]*$/.test(string);
    }
    static #_obasahujeCisla(cislo){
        return /^[0-9]*$/.test(cislo);
    }
}