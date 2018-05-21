class Graph {
    //Parameter fillArea - Surface oder PolyLine
    //xValues = Anzahl an Werten auf der x-Achse
    //fillArea = ob Polyline (false) oder Path (true)
    constructor(parent, xValues, fillArea, yAxis) {
        this.parent = parent;
        this.stepWidth = this.clientWidth / xValues;
        //Prozent pro Schritt;
        this.stepWidthRelative = this.stepWidth / this.clientWidth;
        //Für Resizing
        this.initialWidth = this.clientWidth;
        this.initialHeight = this.clientHeight;
        this.graphMax = 0;
        this.graphScale = 1.0;
        this.currX = 0;
        this.lineMinVal = NaN;
        this.lineMaxVal = NaN;
        this.init(fillArea, yAxis);
    }

    init(fillArea, yAxis) {
        this.svg_graph = this.parent.appendChild(createSVG(this.viewBox, "none"));
        //Elemente in dieser Gruppe werden verschoben
        this.transgrp = this.parent.appendChild(createGroup());
        /*
            Plotter benötigt Methoden:
            onResize()
            resize(factorX, factorY, maxValue)
            draw(x, y)
        */
        this.plotter = null;
        if (fillArea == null || fillArea == false) {
            //Zum Zeichnen der Polylinie
            this.polygrp = this.transgrp.appendChild(createGroup());
            this.plotter = new PolyLine(this.polygrp);
        } else if (fillArea != null && fillArea == true) {
            //Zum Zeichnen der des Path Objekts - Ergibt Fläche unter dem Graphen
            this.surfgrp = this.transgrp.appendChild(createGroup());
            this.plotter = new Surface(this.surfgrp);
        }
        //Zeichnen von statischen Elementen z.B. Anzeige des letzten Werts
        this.nonTransGrp = this.parent.appendChild(createSVG());

        var distancePercent = this.stepWidth / this.clientWidth * 100;
        for (var i = 1; i < this.clientWidth / this.stepWidth; ++i) {
            var x = distancePercent * i;
            this.createLineX(x + "%");
            //Für die Verschieben. Prozentwert wird für die Ermittlung der Länge bei MovePlot verwendet
            this.lastDistancePercent = x;
        }
        this.indicatorLine = this.nonTransGrp.appendChild(createLine(0, "100%", this.clientHeight, this.clientHeight));
        this.indicatorLine.classList.add("indicatorLine");
        this.indicatorText = new Text(this.nonTransGrp, "", "100%", "100%", "8%", "5%");
        this.indicatorText.addClass("indicatorText");

        //Y Achse
        if (yAxis != null) {
            this.yAxis = new PlotAxis(yAxis, this.graphMax, "5%", "5%");
            this.yAxis.addClass("yAxis");
        }
    }

    onResize() {
        //was in xRichtung gemacht werden muss
        if (this.initialWidth != this.clientWidth) {
            //Anpassung der Viewbox auf neue Höhe und Breite
            this.svg_graph.setAttributeNS(null, "viewBox", this.viewBox);
            this.stepWidth = this.clientWidth * this.stepWidthRelative;
            this.currX *= this.clientWidth / this.initialWidth;
            this.initialWidth = this.clientWidth;
            this.movePlot();
        }
        //Was in y Richtung gemacht werden muss
        if (this.initialHeight != this.clientHeight) {
            this.svg_graph.setAttributeNS(null, "viewBox", this.viewBox);
            //indicatorLines
            var factor = this.clientHeight / this.initialHeight;
            if (this.graphMax != null) {
                this.graphScale = this.clientHeight / this.graphMax;
            }
            this.resizeY(factor);
            this.initialHeight = this.clientHeight;
        }
        this.plotter.onResize();
    }

    //Wird von onResize als auch von addPoint aufgerufen
    //Wenn die Skalierung nicht mehr passt, werden indicator, lines etc auf neue Skala angepasst
    resizeY(factor) {
        if (this.indicatorLine != null) {
            var indicatorLineY = this.indicatorLine.getAttribute("y1");
            indicatorLineY *= factor;
            this.moveIndicator(indicatorLineY, null);
        }
        //Min und MaxLine, wenns eine MaxLine gibt folgt auch Pruefung ob es Minline gibt
        if (this.maxLine != null) {
            var maxLineY = this.maxLine.getAttribute("y1");
            this.moveLine(this.maxLine, maxLineY * factor);
            this.moveText(this.maxIndicatorText, maxLineY * factor, null);
            if (this.minLine != null) {
                var minLineY = this.minLine.getAttribute("y1");
                this.moveLine(this.minLine, minLineY * factor);
                this.moveText(this.minIndicatorText, minLineY * factor, null);
            }
        }
    }

    createLineX(x) {
        var line = createLine(x, x, 0, "100%");
        line.setAttribute("class", "helper");
        this.nonTransGrp.appendChild(line);
    }

    movePlot() {
        if (this.currX > this.clientWidth) {
            /*  currx
                ----------------------------------------------
                clientWidth
                ----------------------------------------
                                                --------
                                    distance  lastDistance (<= distance)
                result              ------------
                --------------------
            */
            var distance = this.stepWidth / this.clientWidth;
            var lastDistance = this.lastDistancePercent / 100;
            var totalDistance = lastDistance - distance;
            var result = this.clientWidth - this.currX - ((1 - totalDistance) * this.clientWidth);

            this.transgrp.setAttribute("transform", "translate(" + result + ",0)");
        }
    }

    //Hinzufügen von Elementen, die den Max und Minwert angeben. (Kugeln vielleicht nicht optimal?)
    addMinMaxIndicator(val, x, y) {
        //Im ersten Schritt wird nur der MaxDot geadded. Der Mindot nimmt dann seine Stelle ein, wenn der Wert höher ist, als der letzte.
        if (this.maxLine == null) {
            this.lineMaxVal = val;
            this.maxLine = this.nonTransGrp.appendChild(createLine(0, "100%", y, y));
            this.maxLine.classList.add("maxValue");
            //Dirty Hack _____ um die SVG Box größer zu initialisieren als sie ist, damit Text nicht abgeschnitten wird
            this.maxIndicatorText = new Text(this.nonTransGrp, val, "0", y, "7%", "5%");
            this.maxIndicatorText.setText(val);
            this.maxIndicatorText.addClass("maxIndicator");
        } else if (this.minLine == null) {
            //this.max ist der alte Höchstwert, wenn der aktuelle Wert höher ist, wird an der alten Stelle das Minimum markiert
            if (val < this.lineMaxVal) {
                this.minLine = this.nonTransGrp.appendChild(createLine(0, "100%", y, y));
            } else {
                var oldY = this.maxLine.getAttribute("y1");
                this.minLine = this.nonTransGrp.appendChild(createLine(0, "100%", oldY, oldY))
            }
            this.minLine.classList.add("minValue");
            this.minIndicatorText = new Text(this.nonTransGrp, val, "0", y, "7%", "5%");
            this.minIndicatorText.setText(val);
            this.minIndicatorText.addClass("minIndicator");
            this.lineMinVal = val;
            //Y Wert muss größer sein (weiter unten)
        }

        //Bewegung des Indikators
        if (isNaN(this.lineMaxVal) || val > this.lineMaxVal) {
            this.lineMaxVal = val;
            this.moveLine(this.maxLine, y);
            this.moveText(this.maxIndicatorText, y, val);
        } else if (this.minLine != null && (isNaN(this.lineMinVal) || val < this.lineMinVal)) {
            this.lineMinVal = val;
            this.moveLine(this.minLine, y);
            this.moveText(this.minIndicatorText, y, val);
        }
    }

    //Darstellung des Textes und Linie. (Animation?)
    moveIndicator(y, val) {
        this.indicatorLine.setAttribute("y1", y);
        this.indicatorLine.setAttribute("y2", y);
        //Text vor verschieben setzen, sonst wirds nicht berücksichtigt
        //Text ist null beim OnResize
        if (val != null) {
            this.indicatorText.setText(val);
        }
        this.indicatorText.move("100%", y);
    }

    //Hilfsfunktion für Indikator
    moveLine(line, y) {
        line.setAttribute("y1", y);
        line.setAttribute("y2", y);
    }

    moveText(text, y, val) {
        if (val != null) {
            text.setText(val);
        }
        text.move(0, y);
    }

    //Manipulieren des Graphen
    addValue(val) {
        //Move, Text, Poly, Text, (Line), Surface
        this.movePlot();

        //Skalieren von Flächen bezogen auf neuen MaxValue
        if (val > this.graphMax) {
            this.graphScale = this.clientHeight / val;
            this.plotter.resize(1, this.graphScale, this.graphMax);
            if (this.maxLine != null) {
                this.maxIndicatorText.setText(val);
                if (this.minLine != null) {
                    var oldMin = this.graphMax - this.minLine.getAttribute("y1");
                    var newMin = this.graphMax - oldMin * this.graphScale;
                    this.moveLine(this.minLine, newMin);
                    this.moveText(this.minIndicatorText, newMin, null);
                }
            }
            if (this.yAxis != null) {
                this.yAxis.setMax(val);
            }
            this.graphMax = val;
        }

        //Umwandlung Koordinatensystem
        var yVal = this.clientHeight - (val * this.graphScale); //Umgewandelter Y-Wert. Zur Bestimmung der Höhe (y-value)
        if(this.yAxis != null) {
            this.yAxis.selectValue(val);
        }
        //Bereich darf nicht verlassen werden
        if (yVal < 0) {
            yVal = 0;
        }

        this.moveIndicator(yVal, val);

        this.addMinMaxIndicator(val, this.currX, yVal);

        this.plotter.draw(this.currX, yVal);

        this.currX += this.stepWidth;
    }

    get clientWidth() {
        return getClientWidth(this.parent);
    }

    get clientHeight() {
        return getClientHeight(this.parent);
    }

    get viewBox() {
        return "0 0 " + getClientWidth(this.parent) + " " + getClientHeight(this.parent);
    }
}