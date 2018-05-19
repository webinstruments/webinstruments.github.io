var CONST_PLOTAXIS_ALIGNMENT_HORIZONTAL = "horizontal";
var CONST_PLOTAXIS_ALIGNMENT_VERTICAL = "vertical";

class PlotAxis {
    /*
        https://www.w3resource.com/javascript-exercises/javascript-math-exercise-28.php
        max: Achsenmaximum
        textSize: Größe der Schrift
        padding: Abstand zwischen den Werten
        Kann Werte in Y und X Richtung darstellen
        Nicht aufgefüllte Achse (Y - Richtung) wird aufgefüllt mit padding, damit man auf Wunschhöhe kommt
    */
    constructor(parent, max, textSize, padding) {
        this.parent = parent;
        var size = 0;
        if (getClientHeight(parent) > getClientWidth(parent)) {
            size = getClientHeight(parent);
            this.alignment = CONST_PLOTAXIS_ALIGNMENT_VERTICAL;
        } else {
            size = getClientWidth(parent);
            this.alignment = CONST_PLOTAXIS_ALIGNMENT_HORIZONTAL;
        }

        this.textSizePercent = textSize;
        if (!isNaN(textSize)) {
            this.textSizePercent = (textSize / size * 100) + "%";
        }
        this.paddingPercent = padding;
        if (padding == null) {
            this.paddingPercent = "0%";
        } if (!isNaN(padding)) {
            this.paddingPercent = (padding / size * 100) + "%";
        }
        this.scale(max);
    }

    scale(max) {
        var calledMax = max;
        var distance = (parseFloat(this.textSizePercent) + parseFloat(this.paddingPercent)) / 100;
        //Schrittgroesse
        var stepSize = max * distance;
        //Vielfaches von? Auf entsprechende 10er aufrunden
        var log10 = Math.floor(Math.log10(stepSize));
        var potency = Math.pow(10, log10);
        //Auf eine kleine Kommastelle bringen, aufrunden und mit der Potenz wieder multiplizieren (Vielfaches von 100)
        this.stepValue = Math.ceil(stepSize / potency) * potency;
        var values = [];

        //Höchster Wert oben
        if (this.alignment == CONST_PLOTAXIS_ALIGNMENT_VERTICAL) {
            for (var i = max; max > 0; ++i) {
                //Auch abbruch, wenn Höhe der Änderung kleiner als die Schrifthöhe ist
                if (max / calledMax < distance) {
                    break;
                }
                values.push(max);
                max -= this.stepValue;
            }
        } else {
            for (var i = 0; i <= Math.floor(1 / distance); ++i) {
                values.push((i + 1) * this.stepValue);
            }
        }

        this.axis = new GradientBar(this.parent, values, this.paddingPercent);
        if (this.classes != null) {
            for (var i in this.classes) {
                this.axis.addClass(this.classes[i]);
            }
        }

        //Wenn nach oben oder unten etwas übrig bleibt
        //erster Wert durch letzten, damit man Verhältnis des Schritts bekommt
        var remainderPercent = (1 - values[values.length - 1] / values[0]) * 100;
        if (this.alignment == CONST_PLOTAXIS_ALIGNMENT_VERTICAL) {
            //Offset wird um die Höhe der Schrift verringert.
            //Je größer der Wert, desto weiter unten ist der letzte Wert
            remainderPercent += parseFloat(this.textSizePercent);
            this.axis.svg_axis.setAttribute("height", remainderPercent + "%");
        }
    }


    addClass(val) {
        //Speichern der Klasse, da bei Neuaufbau neue Achse erstellt wird
        this.classes = [];
        this.classes.push(val);
        this.axis.addClass(val);
    }

    //Um Maxwert von aussen zu beeinflussen
    setMax(max) {
        //Löschen des vorhandenen Graphen
        this.axis.remove();
        this.axis = null;
        this.scale(max)
    }

    selectValue(val) {
        this.axis.selectValue(val);
    }

    /*inTenthSteps(val) {
        if (val < 100) {
            return Math.floor(val);
        } else {
            return Math.ceil(val / 10) * 10;
        }
    }*/
}