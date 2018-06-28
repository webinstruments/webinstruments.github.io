/*
    Plotter kann eine Surface oder eine PolyLine sein
*/
class Surface {
    constructor(parent) {
        this.parent = parent;
        this.surface = this.parent.appendChild(createPath());
        this.initialWidth = this.clientWidth;
        this.initialHeight = this.clientHeight;
        this.resizing = false;
        this.pairs = [];
    }

    /* Ausrechnen des Versatzes um Wieviel sich alles verschoben hat und alle Punkte um diese Korrektur ändern */
    onResize() {
        if (this.initialWidth != this.clientWidth || this.initialHeight != this.clientHeight) {
            var widthDifference = this.clientWidth / this.initialWidth;
            var heightDifference = this.clientHeight / this.initialHeight;

            this.resize(widthDifference, heightDifference);

            this.initialWidth = this.clientWidth;
            this.initialHeight = this.clientHeight;
        }
    }

    //Skalierung aller Punkte, die sich im Paar-Array befinden.
    resize(factorX, factorY, graphMax) {
        this.resizing = true;

        this.surface.removeAttribute("d");

        for (var i in this.pairs) {
            this.pairs[i].x *= factorX;
            if(!isNaN(graphMax)) {
                var oldScale = graphMax / this.clientHeight;
                var beforeConversion = graphMax - (this.pairs[i].y * oldScale);
                this.pairs[i].y = this.clientHeight - (beforeConversion * factorY);
            } else {
                this.pairs[i].y *= factorY;
            }

            this.draw(this.pairs[i].x, this.pairs[i].y);
        }

        this.resizing = false;
    }

    draw(x, y) {
        //rvlasveld.github.io/blog/2013/07/02/creating-interactive-graphs-with-svg-part-1/
        /*
        Erster Punkt immer x=0 und y=MaxWert vom Graph. Somit hat man einen Bezugspunkt
        Letzter Punkt muss immer x=derzeitiger Wert und y=MaxWert vom Graph sein, damit dieser mit Z nach unten hin abschließen kann
        Mit jeder Iteration wird das Z entfernt, ein neues Element hinzugefügt und der Bezugspunkt am Punkt x wieder neu gesetzt
        */
        var att = this.surface.getAttribute("d");
        var l_att = x + "," + y;
        //Sonst Endlosschleife mit Aufruf aus onResize
        if (!this.resizing) {
            this.pairs.push({ x: x, y: y });
        }
        var z_att = x + "," + this.clientHeight + "Z";
        if (att === null) {
            att = "M" + x + "," + this.clientHeight;
        } else {
            att = att.substr(0, att.lastIndexOf("L"));
        }
        att += "L" + l_att + "L" + z_att;

        this.surface.setAttribute("d", att);
    }

    removeFirst() {
        this.pairs = this.pairs.slice(1, this.pairs.length);
        var att = this.surface.getAttribute("d");
        var firstL = att.indexOf("L");
        firstL = att.indexOf("L", firstL + 1);
        att = att.substr(firstL + 1); //beginnt erst mit 2. L
        //M0,800L0,400L10,300L20,150
        //Ziel->M10,800L10,300L20,150
        //10
        var firstVal = att.substr(0, att.indexOf(","));
        //M10,800
        var firstPair = "M" + firstVal + "," + this.clientHeight;
        //L10,300
        var secondPair = "L" + att.substr(0, att.indexOf("L"));
        //M10,800L10,300L20,150...
        att = firstPair + secondPair + att.substr(att.indexOf("L"));
        this.surface.setAttribute("d", att);
    }

    get clientWidth() {
        return getClientWidth(this.parent);
    }

    get clientHeight() {
        return getClientHeight(this.parent);
    }
}

class PolyLine {
    constructor(parent) {
        this.parent = parent;
        this.poly = this.parent.appendChild(createPoly());
        this.initialWidth = this.clientWidth;
        this.initialHeight = this.clientHeight;
        this.resizing = false;
        this.pairs = [];
    }

    onResize() {
        if (this.initialWidth != this.clientWidth || this.initialHeight != this.clientHeight) {
            var widthDifference = this.clientWidth / this.initialWidth;
            var heightDifference = this.clientHeight / this.initialHeight;

            this.resize(widthDifference, heightDifference);

            this.initialWidth = this.clientWidth;
            this.initialHeight = this.clientHeight;
        }
    }

    /* 
        Graphmax wird benötigt, wenn der Graph aufgrund eines größeren Wertes Skaliert wird
        hier ist eine Rücktransformation auf das alte Koordinatensystem nötig
    */
    resize(factorX, factorY, graphMax) {
        this.resizing = true;
        this.poly.removeAttribute("points");
        for (var i in this.pairs) {
            this.pairs[i].x *= factorX;
            if(!isNaN(graphMax)) {
                //Alte Skalierung muss berücksichtigt werden, damit man auf den alten Wert rückschließen kann
                //Beim Umformen muss der Kehrwert des Skalierungsverhältnisses multipliziert werden
                /*
                    Beispiel:
                    WindowHöhe 400 
                    Neue Graphhöhe 800 -> Verhältnis: 1/2
                    Alter Wert 200px
                    Neuer Wert: 400 - (200 / 2) = 300px
                    Retour: 800 - 300px * 2 = 200
                */
                var oldScale = graphMax / this.clientHeight;
                var beforeConversion = graphMax - (this.pairs[i].y * oldScale);
                this.pairs[i].y = this.clientHeight - (beforeConversion * factorY);
            } else {
                this.pairs[i].y *= factorY;
            }
            this.draw(this.pairs[i].x, this.pairs[i].y);
        }
        this.resizing = false;
    }

    //Setzen der Punkte zur Darstellung der Kurve
    draw(x, y) {
        var added = x + "," + y;

        //Sonst Endlosschleife mit Aufruf aus onResize
        if (!this.resizing) {
            this.pairs.push({ x: x, y: y });
        }

        var currAtt = this.poly.getAttribute("points");
        if (currAtt === null) {
            currAtt = added;
        } else {
            currAtt += "\n" + added;
        }
        this.poly.setAttribute("points", currAtt);
    }

    removeFirst() {
        this.pairs = this.pairs.slice(1, this.pairs.length);
        var att = this.poly.getAttribute("points");
        att = att.substr(att.indexOf("\n") + 1);
        this.poly.setAttribute("points", att);
    }

    get clientWidth() {
        return getClientWidth(this.parent);
    }

    get clientHeight() {
        return getClientHeight(this.parent);
    }
}