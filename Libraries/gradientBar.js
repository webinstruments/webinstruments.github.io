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
    constructor(parent, values, padding) {
        //nicht zeichnen, da sonst alles über den Text
        super(parent, values, padding, false);
        //this.values = values;
        this.parent = parent;
        //Erstellung der Definition
        this.svg_def = parent.appendChild(createElement("defs"));
        var currId = this.id;
        //Erstellung der LinearGradients mit 3 Stops 1 ist Cursor
        this.gradient = this.svg_def.appendChild(createLinearGradient(currId, null, null, null, null));
        this.stop0 = this.gradient.appendChild(createElement("stop"));
        this.stop0.setAttributeNS(null, "offset", "0");
        this.stop0.setAttributeNS(null, "stop-color", "transparent");
        this.cursor = this.gradient.appendChild(createElement("stop"));
        //this.cursor.setAttributeNS(null, "stop-color", "yellow");
        this.cursor.setAttributeNS(null, "class", CONST_GB_CURSOR_STOP_CLASS);
        this.stop2 = this.gradient.appendChild(createElement("stop"));
        this.stop2.setAttributeNS(null, "offset", "100%");
        this.stop2.setAttributeNS(null, "stop-color", "transparent");
        //Rechteck fuer die Anzeige erstellen
        this.background = this.parent.appendChild(createRect(0, 0, "100%", "100%"));
        this.background.setAttributeNS(null, "style", "fill:url(#" + currId + ")");
        this.line = new Line(parent);
        this.line.addClass(CONST_GB_CURSOR_LINE_CLASS);
        //Darstellung der Zahlen auf der Achse
        //this.axis = new Axis(parent, values, padding, grid);
        super.drawAxis();
        //Axis muss initialisiert sein!
        this.setCursor(0);
        this.onResize();
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

    selectValue(val) {
        var max = this.sorted[this.sorted.length - 1];
        super.selectValue(val);
        //der Maximalwert ist unten
        var offset = val / parseFloat(max.textContent);
        //maxValue von Basisklassen beinhaltet Element - Frage der Ausrichtung:
        if(this.alignment == CONST_GB_ALIGNMENT_VERTICAL) {
            //Wenn Wert z.B. 87% dann auf 100% aufrunden
            var yVal = parseFloat(max.attributeY) / 100;
            var maxPercent = 1 - Math.ceil(yVal);
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

    /*get maxValue() {
        var max = parseFloat(this.values[0]);
        for (var i = 1; i < this.values.length; ++i) {
            if (parseFloat(this.values[i]) > max) {
                max = this.values[i];
            }
        }
        return max;
    }*/

    get id() {
        var id = "lg0";
        for (var i = 1; document.getElementById(id) != null; ++i) {
            id = "lg" + i;
        }
        return id;
    }

    get alignment() {
        if(this.gradient.hasAttribute("x1")) {
            return CONST_GB_ALIGNMENT_VERTICAL;
        } else {
            return CONST_GB_ALIGNMENT_HORIZONTAL;
        }
    }
}