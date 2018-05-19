/*
    ToDo Update Methode fuer das Alignment. (Breite, Höhe ändert sich)
*/
var CONST_AXIS_ALIGNMENT_HORIZONTAL = "horizontal";
var CONST_AXIS_ALIGNMENT_VERTICAL = "vertical";
var CONST_AXIS_MAXTEXT_CLASS = "selectedValue";
var CONST_AXIS_BELOWMAX_CLASS = "selectedValueBelow";

class Axis {
    /* parent: HTML, values: Array, padding: String, init:Boolean, für Vererbung */
    constructor(parent, values, padding, init) {
        this.parent = parent;
        this.values = values;

        this.texts = [];
        //Padding ist ein % Wert.
        //Ermittlung des PadWerts, wenn Absolut angegeben anhand clienthoehe oder clientbreite.
        this.padding = 0;
        if (padding != null) {
            if (isNaN(padding)) {
                this.padding = parseFloat(padding);
            } else if (getClientHeight(parent) > getClientWidth(parent)) {
                this.padding = padding / getClientHeight(parent) * 100;
            } else {
                this.padding = padding / getClientWidth(parent) * 100;
            }
        }

        if (init == null || init) {
            this.drawAxis();
        }
    }

    drawAxis() {
        if (this.svg_axis == null) {
            this.svg_axis = this.parent.appendChild(createSVG(null, null));
            this.distributeValues();
        }
    }

    //Refresh values
    removeValues() {
        while (this.texts.length != 0) {
            this.texts.pop().remove();
        }
    }

    //Komplette Achse entfernen
    remove() {
        this.parent.removeChild(this.svg_axis);
    }

    onResize() {
        if ((this.alignment == CONST_AXIS_ALIGNMENT_HORIZONTAL && this.clientHeight > this.clientWidth) ||
            (this.alignment == CONST_AXIS_ALIGNMENT_VERTICAL && this.clientWidth >= this.clientHeight)) {
                this.resize();
        }
    }

    //damit von abgeleiteter Klasse aufrufbar.
    resize() {
        this.removeValues();
        this.distributeValues();
        //Maxtest zurücksetzen um die Bedingung für Eintritt in die selectValue zu genügen
        if (this.maxText != null) {
            var lastValue = this.maxText.text.textContent;
            this.maxText = null;
            this.selectValue(lastValue);
        }
    }

    //Verteile die Werte entlang der Achse.
    //Je nach größe des Clients ist das textSize auf x oder y Achse
    distributeValues() {
        for (var i in this.values) {
            //Fall x-Achse
            //Addition des Paddings ab Position 1
            var posX = (this.textSize * i) + (this.padding * i) + "%";
            var posY = "0%";
            this.textWidth = this.textSize + "%";
            this.textHeight = "100%";
            //Fall y-Achse
            if (this.clientHeight > this.clientWidth) {
                posY = posX;
                posX = "0%";
                this.textHeight = this.textWidth;
                this.textWidth = "100%";
            }

            this.texts.push(new Text(
                this.svg_axis,
                this.values[i],
                posX,
                posY,
                this.textWidth,
                this.textHeight
            ));
        }
        //aufsteigend sortieren
        //Zwischenspeichern, sonst wird falsches sortiert.
        this.sorted = this.texts.slice();
        this.sorted = this.sorted.sort((a, b) => (
            parseFloat(a.text.textContent) - parseFloat(b.text.textContent)
        ));
    }

    addClass(val) {
        for (var i in this.texts) {
            this.texts[i].addClass(val);
        }
    }

    //Suche nach dem nächsthöchsten Wert aus dem Werte Array
    selectValue(val) {
        if (!isNaN(val)) {
            var textAbove = this.sorted.find(
                t => !isNaN(t.textContent) &&
                    parseFloat(t.textContent) >= parseFloat(val)
            );
            if (textAbove != null && (this.maxText != textAbove || this.maxText == null)) {
                //zum markieren des Texts darunter - wird benötigt, wenn Abstände sehr groß sind
                var textBelow = this.texts.find(
                    t => !isNaN(t.text.textContent) &&
                        parseFloat(t.textContent) < parseFloat(textAbove.textContent)
                );
                if (this.maxText != null) {
                    this.maxText.removeClass(CONST_AXIS_MAXTEXT_CLASS);
                }
                if(this.belowText != null) {
                    this.belowText.removeClass(CONST_AXIS_BELOWMAX_CLASS);
                }
                this.belowText = textBelow;
                //Bei Null war MaxValue der niedrigste Wert
                if(textBelow != null) {
                    this.belowText.addClass(CONST_AXIS_BELOWMAX_CLASS);
                }
                this.maxText = textAbove;
                this.maxText.addClass(CONST_AXIS_MAXTEXT_CLASS);
            }
        }
    }

    get clientWidth() {
        return this.parent.getBoundingClientRect().width;
    }

    get clientHeight() {
        return this.parent.getBoundingClientRect().height;
    }

    get textSize() {
        //Berücksichtigung des Paddings. z.B. bei 10 Zeichen = 9 Leerzeichen.
        //Gesamtpadding wird dann von 100% subtrahiert.
        var padCount = this.values.length - 1;
        var padSize = this.padding * padCount;
        return (100 - padSize) / this.values.length;
    }

    get alignment() {
        if (this.textHeight == "100%") {
            return CONST_AXIS_ALIGNMENT_HORIZONTAL;
        } else {
            return CONST_AXIS_ALIGNMENT_VERTICAL;
        }
    }

    //Ermitteln des Abstands der Zeichen.
    //Wird von anderen Klassen fuer die Mitte der Zahlen benoetigt
    get getCurrentTextSize() {
        if (this.textHeight == "100%") {
            return this.textWidth;
        } else {
            return this.textHeight;
        }
    }
}