'use strict';

export class Validace{
    static #_response;

    /*
    static zvalidovat(pojistenec){
        this.#_response = { status: true };
        this.#_response.jmeno = this.zvalidovatJmeno(pojistenec.jmeno.trim());
        this.#_response.prijmeni = this.zvalidovatJmeno(pojistenec.prijmeni.trim());
        this.#_response.mail = this.#_zvalidovatEmail(pojistenec.mail.trim());
        this.#_response.telefon = this.#_zvalidovatTelefon(pojistenec.telefon.trim());
        this.#_response.ulice = this.#_zvalidovatAdresu(pojistenec.ulice.trim());
        this.#_response.mesto = this.#_zvalidovatAdresu(pojistenec.mesto.trim());
        this.#_response.psc = this.#_zvalidovatPsc(pojistenec.psc.trim().split(" ").join(""));
        this.#_response.narozeni = this.#_zvalidovatNarozeni(pojistenec.narozeni);

        return this.#_response;
    }*/

    static zvalidovatUsername(username){
        return "";
    }
    static zvalidovatPassword(password){
        return "";
    }
    static zvalidovatJmeno(jmeno){
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
        if(!this.#_obsahujeCeskaPismena(jmeno)){
            this.#_response.status = false;
            return "Invalidní znaky";
        }
    }
    static zvalidovatEmail(mail){
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
    static zvalidovatTelefon(telefon){
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
    static zvalidovatAdresu(adresa){
        if(!adresa){
            this.#_response.status = false;
            return "Toto pole je povinné";
        }
        if(!this.#_delka(adresa, 3, 50)){
            this.#_response.status = false;
            return "Délka musí být delší než 2 znaky a kratší než 50";
        }
        if(!this.#_obasahujePismenaCisla(adresa.split(" ").join(""))){
            this.#_response.status = false;
            return "Invalidní znaky"
        }
    }
    static zvalidovatPsc(psc){
        if(!psc){
            this.#_response.status = false;
            return "Toto pole je povinné";
        }
        if(!this.#_obasahujeCisla(psc)){
            this.#_response.status = false;
            return "Může obsahovat jenom čísla";
        }
        if(!this.#_delka(psc, 5, 5)){
            this.#_response.status = false;
            return "Invaldiní délka";
        }
    }
    static zvalidovatNarozeni(narozeni){
        console.log(narozeni);
        if(!narozeni){
            this.#_response.status = false;
            return "Toto pole je povinné";
        }
        const datum = new Date(narozeni);
        if(datum.getTime() > Date.now()){
            
            this.#_response.status = false;
            return "Datum je v budoucnosti";
        }
    }

    static delka(input, min, max){
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
}