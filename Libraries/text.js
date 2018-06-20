/*  https://www.w3.org/TR/SVG2/text.html#TextPropertiesSVG
    https://developer.mozilla.org/en-US/docs/Web/API/SVGTextContentElement
    https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
    Utility Klasse zum Erstellen, Setzen, Verschieben von Texten.
    Erkennung ob Bereich verlassen wird und Unterstuetzung zum setzen der verschiedenen Text Allignments
*/
//Schwellenwert, damit Elemente nach unten verschoben werden. Chrome setzt den Text immer zu nah an den Rand oben.
var CONST_TEXT_TOP_THRESHOLD = 8;

class Text {

    //Erstellung einer neuen Instanz von Text ähnlich wie rect
    constructor(parent, text, x, y, width, height) {
        this.parent = parent;
        this.calledX = x;
        this.calledY = y;
        //Speichert den Text
        this.text = createText(text, x, y);
        //Ist das svg_element
        this.text = this.parent.appendChild(this.text);
        this.verticalAlign = "hanging";
        this.horizontalAlign = "start";
        this.onResize();
        this.alignBottom();
        //Text wird mit Laenge und Hoehe initialisiert
        if (width != null && height != null) {
            //Damit Text angepasst werden kann, wenn dieser größer als Ursprungstext wird
            this.calledWidth = width;
            this.calledHeight = height;
            this.setWidthAndHeight(width, height);
            this.move(this.calledX, this.calledY);
        }
    }

    //Was alles getan werden muss, sodass Text nach Größenänderung bleibt
    //Änderung der Textgröße
    onResize() {
        switch (this.textSizeSetting) {
            case "width":
                this.setWidth(this.widthPercentage);
                break;
            case "height":
                this.setHeight(this.heightPercentage);
                break;
            case "heightfillwidth":
                this.setHeightFillWidth(this.widthPercentage, this.heightPercentage);
                break;
            case "widthrestrictedbyheight":
                this.setWidthRestrictedByHeight(this.widthPercentage, this.heightPercentage);
                break;
            case "widthandheight":
                this.setWidthAndHeight(this.calledWidth, this.calledHeight);
                break;
            default:
                break;
        }
    }

    evaluateX(x) {
        //Relativ %
        var isRelative = isNaN(x);
        var calledX = x;
        if (isRelative) {
            x = parseFloat(x) / 100 * this.clientWidth;
        }
        //Bei Aligning start, kanns passieren, dass Text über Rand ragt. (>clientWidth)
        //Bei Aligning end, kanns passieren, dass Text (<clientWidth)
        //Middle?
        if (this.horizontalAlign === "start" && (Number(x) + Number(this.textWidth)) > this.clientWidth) {
            var result = this.clientWidth - this.textWidth;
            if (!isRelative) {
                return result;
            } else if (result < 0) {
                return calledX; //Mozilla: Länge ist breiter als das Stammelement.
            } else {
                return (100 - (this.textWidth / this.clientWidth * 100)) + "%";
            }
        } else if (this.horizontalAlign === "end" && (Number(x) - this.textWidth) < 0) {
            return this.textWidth;
        }
        return calledX;
    }

    evaluateY(y) {
        //Relativ %
        var isRelative = isNaN(y);
        var calledY = y;
        if (isRelative) {
            y = parseFloat(y) / 100 * this.clientHeight;
        }
        //Anker vom Text oben: Text kann Bereich unten verlassen (>clientHeight)
        //Anker vom Text unten: Text kann Bereich oben verlassen (<0)
        //Text Top muss größer als Null sein, da sonst der Bereich abgeschnitten wird. Text Top wird darüber abgefangen.
        var isMiddle = this.text.getAttributeNS(null, "dominant-baseline") == "middle";
        if (this.textTop < 0 && !isMiddle) {
            /*
                Chrome: Zieht Element zu nah nach oben (oberer Offset von Glyphen wird weggelassen)
                Ab einem fixen Schwellenwert, wird das Alignment nach unten verschoben.
            */
            var offsetPercent = Math.floor(Math.abs(this.textTop / this.clientHeight) * 100);
            if (offsetPercent > CONST_TEXT_TOP_THRESHOLD) {
                if(isRelative) {
                    calledY = parseFloat(calledY) + offsetPercent + "%";
                } else {
                    calledY *= offsetPercent / 100;
                }
            }
        } else if (this.verticalAlign === "hanging" && (Number(y) + Number(this.textHeight)) > this.clientHeight) {
            var result = Math.abs(this.clientHeight - this.textHeight);
            if (!isRelative) {
                return result;
            } else {
                return (result / this.clientHeight * 100) + "%";
            }
        } else if (this.verticalAlign === "baseline" && (Number(y) - Number(this.textHeight)) < 0) {
            return this.textHeight;
        }

        return calledY;
    }

    move(x, y) {
        //Speichern der Wunschvariable und tatsächlichen Variable, falls sich sich alignment ändert.
        this.calledX = x;
        this.x = this.evaluateX(x);
        if (this.svg_container == null) {
            this.text.setAttribute("x", this.x);
        } else {
            this.svg_container.setAttribute("x", this.x);
        }

        //this.y = y;
        this.calledY = y;
        this.y = this.evaluateY(y);
        if (this.svg_container == null) {
            this.text.setAttribute("y", this.y);
        } else {
            this.svg_container.setAttribute("y", this.y);
        }

        return this;
    }

    resetWidthAndHeight() {
        this.remove();
        this.setWidthAndHeight(this.calledWidth, this.calledHeight);
        this.move(this.calledX, this.calledY);
    }

    //Beim Setzen des Textes achten, ob Breite erhalten bleibt??
    setText(newText) {
        var oldLength = this.text.textContent.length;
        this.text.textContent = newText;
        //Box muss neu erstellt werden, wenn die Textgröße die Alte übersteigt.
        if (this.textSizeSetting == "widthandheight" && this.text.textContent.length > oldLength) {
            this.resetWidthAndHeight();
        }
        return this;
    }

    //Löschen der derzeitigen Konfiguration
    alignVertical(writingMode) {
        if(this.textSizeSetting == "widthandheight") {
            this.remove();
            //Löschen von vorhandenen Einstellungen, die das Alignment verhindern.
            this.text.removeAttribute("alignment-baseline");
            this.text.removeAttribute("dominant-baseline");
            this.removeClass("text-anchor");
            if(writingMode == null) {
                writingMode = "tb";
            }
            this.text.setAttributeNS(null, "writing-mode", writingMode);
            this.setWidthAndHeight(this.calledWidth, this.calledHeight);
            //Um die Hälfte der Breite hineinverschieben. Width And Height setzt x auf 0.
            this.text.setAttributeNS(null, "x", "8.5");
            this.move(this.calledX, this.calledY);
        } else {
            this.text.setAttributeNS(null, "writing-mode", writingMode);
        }
    }

    alignHorizontal() {
        if(this.textSizeSetting == "widthandheight") {
            this.text.setAttributeNS(null, "x", 0);
            this.text.removeAttribute("writing-mode");
            this.alignBottom();
            this.resetWidthAndHeight();
        }
    }

    setFontSize(val) {
        this.text.style.fontSize = val + "px";
        //Nach Änderung des Textes kann dieser eine andere Größe haben
        this.move(this.calledX, this.calledY);
    }

    setLetterSpacing(val) {
        this.text.setAttribute("textLength", val);
    }

    //Hilfsfunktion, um den gesetzten Text zu reseten
    resetSize() {
        this.setFontSize("16");
        if (this.text.hasAttribute("textLength")) {
            this.text.removeAttribute("textLength");
        }
    }

    //Setzen der Textbreite
    setWidth(width) {
        //Prozentual
        if (isNaN(width)) {
            this.widthPercentage = width;
            width = this.clientWidth * parseFloat(width) / 100;
        }
        this.resetSize();
        this.setFontSize(this.fontSize * width / this.textWidth);
        this.textSizeSetting = "width";
        return this;
    }

    //Setzen der Texthöhe
    setHeight(height) {
        //Prozentual
        if (isNaN(height)) {
            this.heightPercentage = height;
            height = this.clientHeight * parseFloat(height) / 100;
        }
        this.resetSize();
        this.setFontSize(this.fontSize * height / this.textHeight);
        if (this.textHeight > height) {
            var offsetHeight = this.textHeight - this.fontSize;
            height -= offsetHeight;
            this.resetSize();
            this.setFontSize(this.fontSize * height / this.textHeight);
        }
        this.textSizeSetting = "height";
        return this;
    }

    //Vorgeben der Texthöhe.
    //Ist die entstandene Breite geringer als gefordert, werden die Pixel aufgefüllt.
    setHeightFillWidth(width, height) {
        this.setHeight(height);
        //Prozentual
        if (isNaN(width)) {
            this.widthPercentage = width;
            width = this.clientWidth * parseFloat(width) / 100;
        }

        //Prüfung ob größerer Bereich nötig ist Text gestreckt werden muss
        var padWidth = width - this.textWidth;
        if (padWidth > 0) {
            this.setLetterSpacing(width);
        }
        this.textSizeSetting = "heightfillwidth"
        return this;
    }

    //Vorgeben der Textbreite mit Berücksichtigung der Höhe
    //Siehe setHeightFillWidth
    setWidthRestrictedByHeight(width, height) {
        this.setWidth(width);
        //Prozentual, % Wert muss übergeben werden
        if (isNaN(height)) {
            this.heightPercentage = height;
            height = this.clientHeight * parseFloat(height) / 100;
        }
        if (this.textHeight > height) {
            this.setHeightFillWidth(width, height);
        }
        this.textSizeSetting = "widthrestrictedbyheight";
        return this;
    }

    setWidthAndHeight(width, height) {
        this.resetSize();
        if (this.svg_container == null) {
            if (this.textWidth == 0) {
                //Damit die viewBox ermittelt werden kann, muss zuvor, dass Element geadded werden.
                this.parent.appendChild(this.text);
            }
            var boxSize = "0 0 " + this.textWidth + " " + this.textHeight + "";
            this.svg_container = this.parent.appendChild(createSVG(boxSize, "none"));
            if (this.parent.contains(this.text)) {
                this.parent.removeChild(this.text);
            }
            this.text.setAttribute("x", 0);
            this.text.setAttribute("y", 0);
            this.svg_container.appendChild(this.text);
        }
        this.svg_container.setAttribute("width", width);
        this.svg_container.setAttribute("height", height);
        //da ansonsten keine Information über die letzte Länge und Breite besteht
        this.calledHeight = height;
        this.calledWidth = width;
        this.textSizeSetting = "widthandheight";
        return this;
    }

    //Alignment Hanging (wie Box), Middle (Mitte des Elements), BaseLine (standard)
    //anchor start, middle, end
    changeAlignment(alignment, anchor) {
        this.verticalAlign = alignment;
        this.horizontalAlign = anchor;
        this.text.setAttribute("alignment-baseline", alignment);
        //Kompatibilitaet
        this.text.setAttribute("dominant-baseline", alignment);
        this.text.setAttribute("style", "text-anchor:" + anchor + ";");
        this.update();
    }

    update() {
        //alignment wird vom Browser nicht übernommen. (Kind muss entfernt und neu hinzugefügt werden).
        var tParent = this.text.parentNode;
        tParent.removeChild(this.text);
        this.text = tParent.appendChild(this.text);

        /*
            Beim Änderng der Alignments (vertical, horizontal) wird erst nach dem Update die Verschiebung berücksichtigt
            Problem mit Textheight: Wenn bottom, dann ist y vorbefüllt. Muss durch erneuten Move refresht werden.
        */
        this.move(this.calledX, this.calledY);
    }

    //Text in der Mitte
    alignMiddleMiddle() {
        this.updateTextElement("50%", "50%", "middle", "middle");
        return this;
    }

    //Text in der Mitte oben
    alignLineMiddleTop() {
        this.updateTextElement("50%", this.y, "baseline", "middle");
        return this;
    }

    //Text in der Mitte unten
    alignLineMiddleBottom() {
        this.updateTextElement("50%", this.y, "hanging", "middle");
        return this;
    }

    //Helperfunktion fuer alignments
    updateTextElement(x, y, alignment, anchor) {
        this.move(x, y);
        this.changeAlignment(alignment, anchor);
    }

    //Text oben
    alignTop() {
        this.changeAlignment("baseline", this.horizontalAlign);
        return this;
    }

    //Text unten
    alignBottom() {
        this.changeAlignment("hanging", this.horizontalAlign);
        return this;
    }

    //0 Punkt ist am Textende
    anchorEnd() {
        this.changeAlignment(this.verticalAlign, "end");
        return this;
    }

    //Standard 0 Punkt am Textbeginn
    anchorDefault() {
        this.changeAlignment(this.verticalAlign, "start");
        return this;
    }

    addClass(name) {
        this.text.classList.add(name);
        return this;
    }

    removeClass(name) {
        this.text.classList.remove(name);
        return this;
    }

    containsClass(name) {
        return this.text.classList.contains(name);
    }

    remove() {
        if (this.svg_container != null) {
            this.parent.removeChild(this.text.parentNode);
            //damit neu erstellt werden kann
            this.svg_container = null;
        } else {
            this.parent.removeChild(this.text);
        }
    }

    get clientWidth() {
        return getClientWidth(this.parent);
    }

    get clientHeight() {
        return getClientHeight(this.parent);
    }

    get textX() {
        //Firefox kann keine getBBox
        return this.text.getBoundingClientRect().x;
    }

    get textY() {
        return this.text.getBoundingClientRect().y;
    }

    //getBBox gibt die unskalierte Form zurück. getBoundingClientRect berücksichtigt die Transformation
    get textWidth() {
        if (this.svg_container == null) {
            return this.text.getBoundingClientRect().width;
        } else {
            var width = this.text.getBoundingClientRect().width;
            if (this.textLeft < 0) {
                return width + this.textLeft;
            } else {
                return width;
            }
        }
    }

    get textWidthAttribute() {
        if(this.svg_container == null) {
            return this.text.getAttributeNS(null, "width");
        } else {
            return this.svg_container.getAttributeNS(null, "width");
        }
    }

    get textHeight() {
        if (this.svg_container == null) {
            return this.text.getBoundingClientRect().height;
        } else {
            var height = this.text.getBoundingClientRect().height;
            if (this.textTop < 0) {
                return height + this.textTop;
            } else {
                return height;
            }
        }
    }

    get attributeX() {
        if(this.svg_container == null) {
            return this.text.getAttributeNS(null, "x");
        } else {
            return this.svg_container.getAttributeNS(null, "x");
        }
    }

    get attributeY() {
        if(this.svg_container == null) {
            return this.text.getAttributeNS(null, "y");
        } else {
            return this.svg_container.getAttributeNS(null, "y");
        }
    }

    get textContent() {
        return this.text.textContent;
    }

    get textTop() {
        return this.text.getBoundingClientRect().top;
    }

    get textLeft() {
        return this.text.getBoundingClientRect().left;
    }

    get fontSize() {
        return parseFloat(window.getComputedStyle(this.text, null).fontSize);
    }

    //Debugging-Zwecke. Benötigt um Methoden außerhalb aufzurufen.
    get htmlElement() {
        return this.text;
    }

    get isVertical() {
        return this.text.hasAttribute("writing-mode");
    }
}