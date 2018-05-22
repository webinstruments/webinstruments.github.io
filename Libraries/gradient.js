var SVG_GRADIENT_LINEARGRADIENT_ID = "lg";
var SVG_GRADIENT_PATTERN_ID = "p";
class Gradient {
    constructor(parent) {
        this.parent = parent;
        this.def = this.parent.appendChild(createElement("defs"));
        this.children = [];
    }

    /*Übergabestruktur: offset, class, offset, class ... */
    addLinearGradient(x1, x2, y1, y2, ...args) {
        var id = this.id(SVG_GRADIENT_LINEARGRADIENT_ID);
        var lg = new LinearGradient(this.def, id, x1, x2, y1, y2);
        for(var i = 0; i < args.length; i+=2) {
            lg.addStop(args[i], args[i + 1]);
        }
        this.children.push(lg);
        return id;
    }

    addPattern(width, height, patternUnits) {
        var id = this.id(SVG_GRADIENT_PATTERN_ID);
        var p = new Pattern(this.def, id, width, height, patternUnits);
        this.children.push(p);
        return id;
    }

    /* args = pId, x, y, width, height, id */
    addPatternRects(pId, x, y, width, height, fillId, ...args) {
        var element = this.elementById(pId);
        for(var i = 1; i < arguments.length; i+=5) {
            element.addRect(arguments[i], arguments[i + 1],
                arguments[i + 2], arguments[i + 3], arguments[i + 4]);
        }
    }

    elementById(id) {
        return this.children.find(ele => ele.id == id);
    } 

    id(id) {
        var newId = id + "0";
        for (var i = 1; document.getElementById(newId) != null; ++i) {
            newId = id + i;
        }
        return newId;
    }
}

class LinearGradient {
    constructor(parent, id, x1, x2, y1, y2) {
        this.parent = parent;
        this.id = id;
        this.gradient = this.parent.appendChild(createLinearGradient(id, x1, x2, y1, y2));
        this.children = [];
    }

    addStop(offset, className) {
        var stop = this.gradient.appendChild(createElement("stop"));
        stop.setAttributeNS(null, "offset", offset);
        stop.setAttributeNS(null, "class", className);
        this.children.push(stop);
    }
}

var SVG_PATTERN_PU_USERSPACE = "userSpaceOnUse";
var SVG_PATTERN_PU_BOUNDBOX = "objectBoundingBox";
class Pattern {
    //patternUnits: objectBoundingBox, userSpaceOnUse
    constructor(parent, id, width, height, patternUnits) {
        this.parent = parent;
        this.id = id;
        this.pattern = parent.appendChild(createElement("pattern"));
        this.pattern.setAttributeNS(null, "id", id);
        this.pattern.setAttributeNS(null, "width", width);
        this.pattern.setAttributeNS(null, "height", height);
        //standardmäßig: objectBoundingBox
        if(patternUnits != null) {
            this.pattern.setAttributeNS(null, "patternUnits", patternUnits);
        }
        this.children = [];
    }

    addRect(x, y, width, height, fillId) {
        var rect = this.pattern.appendChild(createRect(x, y, width, height));
        rect.setAttributeNS(null, "style", "fill:url(#" + fillId + ")");
        this.children.push(rect);
    }
}