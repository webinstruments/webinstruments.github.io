var CONST_LINE_ALIGNMENT_VERTICAL = "vertical";
var CONST_LINE_ALIGNMENT_HORIZONTAL = "horizontal";
//Hilfsklasse, die die Orientierung erkennt und sich ausrichtet
/*
    Linie, die automatisch die Orientierung erkennt.
*/
class Line {
    constructor(parent, position) {
        this.parent = parent;
        this.value = position != null ? position : 0;
        this.line = this.parent.appendChild(createLine(0, 0, 0, 0));
        if(this.alignment == CONST_LINE_ALIGNMENT_HORIZONTAL) {
            this.verticalAlign();
        } else {
            this.horizontalAlign();
        }
    }

    move(val) {
        this.value = val;
        //Linie von links nach rechts
        this.line.setAttributeNS(null, this.currentAttribute + "1", val);
        this.line.setAttributeNS(null, this.currentAttribute + "2", val);
    }

    onResize() {
        if (this.alignment == CONST_LINE_ALIGNMENT_VERTICAL && getClientHeight(this.parent) > getClientWidth(this.parent)) {
            this.horizontalAlign();
            this.move(this.value);
        } else if(this.alignment == CONST_LINE_ALIGNMENT_HORIZONTAL && getClientHeight(this.parent) <= getClientWidth(this.parent)) {
            this.verticalAlign();
            this.move(this.value);
        }
    }

    horizontalAlign() {
        this.line.setAttributeNS(null, "x1", 0);
        this.line.setAttributeNS(null, "x2", "100%");
        this.currentAttribute = "y";
    }

    verticalAlign() {
        this.line.setAttributeNS(null, "y1", 0);
        this.line.setAttributeNS(null, "y2", "100%");
        this.currentAttribute = "x";
    }

    addClass(val) {
        this.line.classList.add(val);
        return this;
    }

    removeClass(val) {
        this.line.classList.remove(val);
        return this;
    }

    get alignment() {
        if(getClientHeight(this.parent) > getClientWidth(this.parent)) {
            return CONST_LINE_ALIGNMENT_VERTICAL;
        } else {
            return CONST_LINE_ALIGNMENT_HORIZONTAL;
        }
    }
}