/*
    Erstellung eines Lauflichts. Ermittlung des niedrigsten und des höchsten Werts,
    damit es möglich ist den derzeigtigen Wert grafisch anzuzeigen. 
    ToDo Änderung auf css Klassen damit dynamischer. Ermittlung MinWert ob bei 0 oder 1 begonnen wird.
    Daraus den offset der jeweiligen Werte ermitteln
*/

var CONST_GB_ALIGNMENT_HORIZONTAL = "horizontal";
var CONST_GB_ALIGNMENT_VERTICAL = "vertical";
var CONST_GB_CURSOR_STOP_CLASS = "cursorGradientColor";
var CONST_GB_CURSOR_LINE_CLASS = "barLine";

class GradientBar extends Axis {
    constructor(parent, values, padding, checkDistribution) {
        //nicht zeichnen, da sonst alles über den Text
        super(parent, values, padding, false);
        //this.values = values;
        this.parent = parent;
        //Erstellung der Definition
        this.svg_def = new Gradient(this.parent);
        //Erstellung der LinearGradients mit 3 Stops 1 ist Cursor
        //Index 0 und 1 ist Hintergrund
        this.checkDistribution = checkDistribution;
        var idGradient = this.svg_def.addLinearGradient(null, null, null, null,
            "0", "stop0", "0", CONST_GB_CURSOR_STOP_CLASS, "100", "stop2");
        this.gradient = this.svg_def.elementById(idGradient).gradient;
        this.cursor = this.svg_def.elementById(idGradient).children[1];
        //ausblenden der 2 Elmente bis auf Cursor
        this.svg_def.elementById(idGradient).children[0].setAttributeNS(null, "style", "stop-opacity:0;");
        this.svg_def.elementById(idGradient).children[2].setAttributeNS(null, "style", "stop-opacity:0;");
        this.background = this.parent.appendChild(createRect(0, 0, "100%", "100%"));
        this.background.setAttributeNS(null, "style", "fill:url(#" + idGradient + ")");
        this.line = new Line(parent);
        this.line.addClass(CONST_GB_CURSOR_LINE_CLASS);
        //Darstellung der Zahlen auf der Achse
        //Axis muss initialisiert sein!
        super.drawAxis();
        this.onResize();
        this.setCursor(0);
        this.selectValue(0);
    }

    //Damit Gradient von oben nach unten geht muss man den y1 Parameter auf 1 setzen.
    //Standardmaessig geht Gradient von links nach rechts.
    onResize() {
        //Vertikal
        if (this.alignment == CONST_GB_ALIGNMENT_HORIZONTAL && getClientHeight(this.parent) > getClientWidth(this.parent)) {
            this.gradient.setAttributeNS(null, "x1", 0);
            this.gradient.setAttributeNS(null, "x2", 0);
            this.gradient.setAttributeNS(null, "y1", 0);
            this.gradient.setAttributeNS(null, "y2", 1);
            //Superklasse kann nicht auf Ihre alignment-Methode zugreifen.
            super.resize();
        } else if (this.alignment == CONST_GB_ALIGNMENT_VERTICAL && getClientHeight(this.parent) <= getClientWidth(this.parent)) {
            this.gradient.removeAttributeNS(null, "x1");
            this.gradient.removeAttributeNS(null, "x2");
            this.gradient.removeAttributeNS(null, "y1");
            this.gradient.removeAttributeNS(null, "y2");
            super.resize();
        }
        this.line.onResize();
    }

    remove() {
        //eigene Kinder entfernen, sonst sieht man die Artefakte (Line ist sichtbar)
        this.svg_def.remove();
        this.parent.removeChild(this.background);
        this.line.remove();
        super.remove();
    }

    selectValue(val) {
        if(isNaN(val)) {
            return;
        }
        //Für OnResize - damit eine Neuberechnung stattfinden kann
        var max = this.sorted[this.sorted.length - 1];
        super.selectValue(val);
        //sonst Absturz beim Initialisieren, wenn keine (gültige) Werte vorhanden.
        if(max == null || isNaN(max.textContent)) {
            return;   
        }
        var maxValue = parseFloat(max.textContent);
        //der Maximalwert ist unten
        var offset = val / maxValue;
        if(this.checkDistribution && this.values.length > 0 && this.maxText != null) {
            var strideLen = 1 / this.values.length;
            var maxVal = parseFloat(this.maxText.textContent);
            //Erster Wert
            if(this.belowText == null) {
                offset = 0;
            //Letzter Wert
            } else if(val >= maxVal) {
                //bleibt davor stehen
                offset = strideLen * this.sorted.indexOf(this.maxText);
            } else if(this.maxText != null) {
                var minVal = parseFloat(this.belowText.textContent);
                var maxVal = parseFloat(this.maxText.textContent);
                var distance = maxVal - minVal;
                val -= minVal;
                offset = val / distance * strideLen + strideLen * this.sorted.indexOf(this.belowText);
            }
        }
        //maxValue von Basisklassen beinhaltet Element - Frage der Ausrichtung:
        if(this.alignment == CONST_GB_ALIGNMENT_VERTICAL) {
            //Wenn Wert z.B. 87% dann auf 100% aufrunden
            var maxPercent = 1 - Math.ceil(parseFloat(max.attributeY) / 100);
            //Kann 0 oder 1 sein. Bei 1 ist es invertiert - MaxWert ist oben, bzw. ganz Links (x)
        } else {
            var maxPercent = 1 - Math.ceil(parseFloat(max.attributeX) / 100);
        }

        offset = Math.abs(offset - maxPercent);

        this.setCursor(offset * 100);
    }

    setCursor(val) {
        val = parseFloat(val);
        val = val + "%";
        this.cursor.setAttributeNS(null, "offset", val);
        this.line.move(val);
    }

    get alignment() {
        if(this.gradient.hasAttribute("x1")) {
            return CONST_GB_ALIGNMENT_VERTICAL;
        } else {
            return CONST_GB_ALIGNMENT_HORIZONTAL;
        }
    }
}
