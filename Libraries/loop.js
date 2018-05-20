var CONST_LOOP_INVIS_CLASS = "invisible";
class Loop {
    constructor(parent, texts) {
        this.parent = parent;
        //Debugmodus
        drawCoordinateCross(this.parent);
        this.initLoop();
        this.setCircleIndicator(0);
        this.initTextSVG();
        if(texts != null) {
            for(var i in texts) {
                this.addText(texts[i]);
            }
        }
    }

    onResize() {
        this.textLayer.onResize();
    }

    //Layer für Text, da dieser nicht skaliert werden sollte
    initTextSVG() {
        var wh = this.circleDiameterPercent;
        var w = parseFloat(wh[0]);
        var h = parseFloat(wh[1]);
        var offsetX = ((100 - w) / 2) + "%";
        var offsetY = ((100 - h) / 2) + "%"; //statischer Offset von 3%, da Text immer nach oben kann
        //Verschiebung des Layers, der die Texte beinhaltet

        //Layer zum Schreiben des Textes
        this.textLayer = new TextQuadrant(this.parent, w + "%", h + "%", offsetX, offsetY);
        //parent, text, x, y
    }

    addText(text) {
        return this.textLayer.addText(text);
    }

    initLoop() {
        //Wird zur Ellipse wenn Verhältnis nicht passt.
        this.loopLayer = this.parent.appendChild(createSVG(null, "none"));

        //Umfang 100, damit radius mit Prozent gleichgesetzt werden kann.
        this.radius = 100 / (2 * Math.PI);
        //Kreis wird mittig gesetzt
        this.loop = this.loopLayer.appendChild(createCircle(this.radius, "0", "0"));
        this.loop.setAttributeNS(null, "class", "loop");
        //0%
        this.setDashArray(0);
        //Ermitteln der Dicke des Rahmens. 
        //Rahmen steht zur Hälfte aus dem Ende des Kreises raus
        var style = window.getComputedStyle(this.loop);
        this.strokeWidth = style.getPropertyValue("stroke-width");
        //numeric value need for further computation
        if (isNaN(this.strokeWidth)) {
            this.strokeWidth = parseFloat(this.strokeWidth);
        } else {
            this.strokeWidth = parseFloat(this.strokeWidth) / this.diameter * 100;
        }
        
        var vpHeight = this.radius / (1 - this.strokeWidth / 100) * 2;
        this.loopLayer.setAttributeNS(null, "viewBox", (-vpHeight / 2) + " " + (-vpHeight / 2) + " " + vpHeight + " " + vpHeight);
    }

    update(val) {
        //move loop
        this.setDashArray(val);
        //set indicators
        this.setCircleIndicator(val);
        /*this.setLoopText(val);
        this.indicatorText.setText(val);*/
    }

    setDashArray(val) {
        this.loop.setAttributeNS(null, "stroke-dasharray", val + " 100");
    }

    setCircleIndicator(val) {
        if (this.indicatorCircle != null) {
            this.loopLayer.removeChild(this.indicatorCircle);
        }

        var xy = circlePointsFromPercent(val / 100);
        //Radius des Kreises ist die Hälfte des Rahmens des Hauptkreises
        //Der Einheitskreis wird mit dem Radius des Hauptkreises multipliziert, sodass der Kreis am Beginn der Loop ist.
        var circleRad = (this.strokeWidth / 2) + "%";
        this.indicatorCircle = this.loopLayer.appendChild(createCircle(circleRad, xy[0] * this.radius, xy[1] * this.radius));
    }

    get diameter() {
        return this.radius * 2;
    }

    get htmlCircleWidth() {
        return this.loop.getBoundingClientRect().width;
    }

    get htmlCircleHeight() {
        return this.loop.getBoundingClientRect().height;
    }

    get clientWidth() {
        return getClientWidth(this.parent);
    }

    get clientHeight() {
        return getClientHeight(this.parent);
    }

    get circleDiameterPercent() {
        /*  Gesamte Breite
            ---------------------------------------------
             Kreis
              -----------------------------------------
              stroke    <Gewünschte Breite>
              --<----------------------------------->--
        */
        //45 Grad, damit man das Inner des Kreises bekommt - 45 = Querformat
        if (this.clientHeight > this.clientWidth) {
            //30 Querformat damit mehr Platz nach rechts
            var angle = Math.PI / 6;
        } else {
            //45 Querformat
            var angle = Math.PI / 4;
        }
        var width = ((this.htmlCircleWidth / this.clientWidth * 100 - this.strokeWidth * 2) * Math.cos(angle)) + "%";
        var height = ((this.htmlCircleHeight / this.clientHeight * 100 - this.strokeWidth * 2) * Math.sin(angle)) + "%";

        return [width, height];
    }
}

/*
        0%/0%       |    100-width%/0%
                    |
          Q2        |       Q1
                    |
        --------------------------
          Q3        |       Q4
    0/100-height%   |   100-width%/100-height%
                    |
                    |
    Es können bis zu 4 Werte dargestellt werden. Wenn 1 Wert pro Quadrant, dann 100% auffüllen
    Wenn unförmig, Auswahl von 2 Werten und Aufteilung
*/
//Absoluter Wert in Pixeln. Wenn dieser über oder unterschritten wird, werden diverse Elemente ausgeblendet
var CONST_QUADRAT_X_THRESHOLD_VALUE = 300;
var CONST_QUADRAT_Y_THRESHOLD_VALUE = 150;
var CONST_QUADRAT_HORZ_ALIGN = "horizontal";
var CONST_QUADRAT_VERT_ALIGN = "vertical";
//ab diesen Wert werden die Werte, die angezeigt werden gecappt
var CONST_QUADRAT_RATIO_THRESHOLD = 4;
class TextQuadrant {
    constructor(parent, width, height, x, y) {
        this.parent = parent;
        this.height = height;
        this.width = width;
        this.quadrant = this.parent.appendChild(createSVG(null, null));
        this.setWidthAndHeight(width, height);
        this.move(x, y);
        this.texts = [];
    }

    setWidthAndHeight(width, height) {
        this.quadrant.setAttributeNS(null, "width", width);
        this.quadrant.setAttributeNS(null, "height", height);
    }

    move(x, y) {
        this.quadrant.setAttributeNS(null, "x", x);
        this.quadrant.setAttributeNS(null, "y", y);
    }

    //Resizing checkt, ob man durch die neue Größe mehr Elemente zeichen kann.
    onResize() {
        if (this.drawnCount != this.drawCount()) {
            this.alignText();
        }
    }

    addText(txt) {
        var text = new Text(this.quadrant, txt, 0, 0);
        this.texts.push(text);
        this.alignText();
        return text;
    }

    //Invisble Klasse entfernen
    removeClasses() {
        for (var i in this.texts) {
            this.texts[i].removeClass(CONST_LOOP_INVIS_CLASS);
            //Reseten des Texts, sodass dieser wieder von l nach r geschrieben wird
            if (this.texts[i].isVertical) {
                this.texts[i].alignHorizontal();
            }
        }
    }

    //0 basierter Index, von wo unsichtbar gesetzt wird
    addInvisibleClass(fromIndex) {
        for (var i = fromIndex; i < this.texts.length; ++i) {
            this.texts[i].addClass(CONST_LOOP_INVIS_CLASS);
        }
    }

    drawCount() {
        if (this.texts.length == 1) {
            return 1;
        }
        //Wie groß ist das Rechteck
        var size1 = this.rectMaxWidth;
        var size2 = this.rectMaxHeight;
        if (this.alignment == CONST_QUADRAT_VERT_ALIGN) {
            size1 = size2;
            size2 = this.rectMaxWidth;
        }

        //das Rechteck erfüllt die Anforderungen damit bis zu 4 Werte verteilt werden können
        if (size1 >= CONST_QUADRAT_X_THRESHOLD_VALUE && size2 >= CONST_QUADRAT_Y_THRESHOLD_VALUE) {
            return this.texts.length;
            //Ein Wert unterschritten - Länge oder Höhe
        } else if (size1 > CONST_QUADRAT_X_THRESHOLD_VALUE || size2 > CONST_QUADRAT_Y_THRESHOLD_VALUE) {
            return 2;
        } else {
            return 1;
        }
    }

    alignText() {
        this.removeClasses();
        this.drawnCount = this.drawCount();

        if (this.drawnCount == 1) {
            this.textQ12(this.texts[0], null, 100);
            if (this.alignment == CONST_QUADRAT_VERT_ALIGN) {
                //Gesamte Höhe einnehmen
                //this.textQ12(this.texts[0], null, 100);
                this.texts[0].alignVertical();
            }
        } else if (this.drawnCount == 2) {
            //Hochformat
            if (this.alignment == CONST_QUADRAT_VERT_ALIGN) {
                this.alignTextsAboveEachOther(this.texts[0], this.texts[1]);
            } else {
                this.alignTextsNextToEachOther(this.texts[0], this.texts[1], null, 100);
            }
        } else if (this.drawnCount == 3) {
            //Ausblenden des letzten Elements anzeigen der Elemente übereinander
            //Abfrage auf Breite, sonst wird Text immer ausgeblendet
            if (this.alignment == CONST_QUADRAT_VERT_ALIGN && this.rectMaxWidth <= CONST_QUADRAT_X_THRESHOLD_VALUE) {
                this.alignTextsAboveEachOther(this.texts[0], this.texts[1]);
                this.drawnCount = 2; //ab Index 2 ausblenden
            } else {
                //2 oben, 1 breites unten
                this.alignTextsNextToEachOther(this.texts[0], this.texts[1], null, 60);
                this.textQ34(this.texts[2]);
            }
        } else if (this.drawnCount == 4) {
            /*if (this.alignment == CONST_QUADRAT_VERT_ALIGN) {
                this.alignTextsAboveEachOther(this.texts[0], this.texts[1]);
            } else {*/
            //this.alignTextsNextToEachOther(this.texts[0], this.texts[1]);
            this.fourTexts();
            //}
        }

        this.addInvisibleClass(this.drawnCount);
    }

    //oberer Quadrant
    alignTextsNextToEachOther(text1, text2, width, height) {
        this.textQ1(text1, width, height);
        this.textQ2(text2, width, height);
    }

    fourTexts() {
        this.alignTextsNextToEachOther(this.texts[0], this.texts[1]);
        this.textQ3(this.texts[2]);
        this.textQ4(this.texts[3]);
    }

    alignTextsAboveEachOther(text1, text2) {
        this.textQ12(text1);
        this.textQ34(text2);
    }

    //Helpermethode die W H für alle auswertet
    //% wird hinzugefügt und Defaultwert für w h wird gesetzt.
    //Alles was unter 50% ist, ist margin zwischen den Elementen
    //Aufruf mit % aber ohne Symbol!
    setWH(text, w, h) {
        if (w == null) {
            w = 35;
        }
        if (h == null) {
            h = 35;
        }

        text.setWidthAndHeight(w + "%", h + "%");

        return [w, h];
    }

    //1 Quadrant 100 - w%, 0
    textQ1(text, w, h) {
        var wh = this.setWH(text, w, h);
        text.move((100 - wh[0]) + "%", 0);
    }

    //2 Quadrant 0, 0
    textQ2(text, w, h) {
        var wh = this.setWH(text, w, h);
        text.move(0, 0);
    }

    //1 und 2 Quadrant 0,0 Breite 100%
    textQ12(text, w, h) {
        if (w == null) {
            w = 100;
        }
        if (h == null) {
            h = 40;
        }
        text.setWidthAndHeight(w + "%", h + "%");
        text.move(0, 0);
    }

    //3 Quadrant 0, 100-h%
    textQ3(text, w, h) {
        var wh = this.setWH(text, w, h);
        text.move(0, (100 - wh[1]) + "%");
    }

    //4 Quadrant 100-w%, 100-h%
    textQ4(text, w, h) {
        var wh = this.setWH(text, w, h);
        text.move((100 - wh[0]) + "%", (100 - wh[1]) + "%")
    }

    //3 4 Quadrant 0, 100-h% Breite 100%
    textQ34(text, w, h) {
        text.setWidthAndHeight("100%", "40%");
        text.move(0, "60%");
    }

    get clientWidth() {
        return getClientWidth(this.parent);
    }

    get clientHeight() {
        return getClientHeight(this.parent);
    }

    get alignment() {
        //Wenn Top und Width zu nahe beieinander sind ist eine eindeutige Zuordnung nicht möglich
        if (this.clientWidth * 1.5 > this.clientHeight) {
            return CONST_QUADRAT_HORZ_ALIGN;
        } else {
            return CONST_QUADRAT_VERT_ALIGN;
        }
    }

    //SVG nimmt nicht die gesamte Größe ein. Angabe der Maximalpixel, die das Rect einnehmen kann
    //wird zur Auswertung der Felder benötigt
    get rectMaxWidth() {
        return this.clientWidth * parseFloat(this.width) / 100;
    }

    get rectMaxHeight() {
        return this.clientHeight * parseFloat(this.height) / 100;
    }
}