window.onload = function () {
    let _btn = document.querySelector(".arrow");
    let _inputs = document.querySelectorAll("input");
    let dataCorrente = new Date();
    let giorno = dataCorrente.getDate();
    let mese = dataCorrente.getMonth() + 1; // Mese corrente (da 0-11)
    let anno = dataCorrente.getFullYear();
    let _spanAnno = document.querySelector(".result div:nth-of-type(1) span:nth-of-type(1)");
    let _spanMese = document.querySelector(".result div:nth-of-type(2) span:nth-of-type(1)");
    let _spanGiorno = document.querySelector(".result div:nth-of-type(3) span:nth-of-type(1)");

    _btn.addEventListener("click", function () {
        ripulisci();
        if (controllo()) {
            calcoloTempo();
        }
    });

    function controllo() {
        let isValid = true;

        if (_inputs[0].value == "" || _inputs[0].value < 1 || _inputs[0].value > 31) {
            let _span = document.querySelector("input:nth-of-type(1) + span");
            let _text = document.querySelector(".data span:nth-of-type(1)");
            invalid(_span, _text);
            isValid = false;
        }

        if (_inputs[1].value == "" || _inputs[1].value > 12 || _inputs[1].value < 1) {
            let _span = document.querySelector("input:nth-of-type(2) + span");
            let _text = document.querySelector(".data span:nth-of-type(2)");
            invalid(_span, _text);
            isValid = false;
        }

        if (_inputs[2].value == "") {
            let _span = document.querySelector("input:nth-of-type(3) + span");
            let _text = document.querySelector(".data span:nth-of-type(3)");
            invalid(_span, _text);
            isValid = false;
        }

        if (parseInt(_inputs[2].value) > parseInt(anno)) {
            let _span = document.querySelector("input:nth-of-type(3) + span");
            let _text = document.querySelector(".data span:nth-of-type(3)");
            invalid(_span, _text);
            isValid = false;
        }

        if (parseInt(_inputs[2].value) == parseInt(anno) && parseInt(_inputs[1].value) > parseInt(mese)) {
            let _span = document.querySelector("input:nth-of-type(2) + span");
            let _text = document.querySelector(".data span:nth-of-type(2)");
            invalid(_span, _text);
            isValid = false;
        }

        if (parseInt(_inputs[2].value) == parseInt(anno) && parseInt(_inputs[1].value) == parseInt(mese) 
            && parseInt(_inputs[0].value) > parseInt(giorno)) {
            let _span = document.querySelector("input:nth-of-type(1) + span");
            let _text = document.querySelector(".data span:nth-of-type(1)");
            invalid(_span, _text);
            isValid = false;
        }

        if (parseInt(_inputs[0].value) > getGiorniNelMese(parseInt(_inputs[1].value), parseInt(_inputs[2].value))) {
            let _span = document.querySelector("input:nth-of-type(1) + span");
            let _text = document.querySelector(".data span:nth-of-type(1)");
            invalid(_span, _text);
            isValid = false;
        }

        return isValid;
    }

    function invalid(_span, _text) {
        _span.innerHTML = "Must be a valid date";
        _span.style.color = "red";
        _text.style.color = "red";
    }

    function getGiorniNelMese(mese, anno) {
        return new Date(anno, mese, 0).getDate();
    }

    function calcoloTempo() {
        let inputAnno = parseInt(_inputs[2].value);
        let inputMese = parseInt(_inputs[1].value);
        let inputGiorno = parseInt(_inputs[0].value);

        let anni = anno - inputAnno;
        let mesi = mese - inputMese;
        let giorni = giorno - inputGiorno;

        if (giorni < 0) {
            mesi--;
            giorni += getGiorniNelMese(mese - 1, anno);
        }

        if (mesi < 0) {
            anni--;
            mesi += 12;
        }

        _spanAnno.innerHTML = anni;
        _spanMese.innerHTML = mesi;
        _spanGiorno.innerHTML = giorni;
    }

    function ripulisci() {
        let _span = document.querySelector("input:nth-of-type(1) + span");
        let _text = document.querySelector(".data span:nth-of-type(1)");
        settaDefault(_span, _text);

        _span = document.querySelector("input:nth-of-type(2) + span");
        _text = document.querySelector(".data span:nth-of-type(2)");
        settaDefault(_span, _text);

        _span = document.querySelector("input:nth-of-type(3) + span");
        _text = document.querySelector(".data span:nth-of-type(3)");
        settaDefault(_span, _text);

        _spanAnno.innerHTML="--"
        _spanGiorno.innerHTML="--"
        _spanMese.innerHTML="--"
    }

    function settaDefault(_span, _text) {
        _span.innerHTML = "";
        _text.style.color = "#ccc";
    }
}
