var SVGNS = "http://www.w3.org/2000/svg";

//clear all elements by string
function clearElements(cont_id) {
    var child = document.getElementById(cont_id).firstChild;
    if (child === null)
        return;
    else {
        document.getElementById(cont_id).removeChild(child);
        clearElements(cont_id);
    }
}

//clear all elements by htmlElement
function clearElementsHTML(ele) {
    var child = ele.firstChild;
    if (child === null)
        return;
    else {
        ele.removeChild(child);
        clearElementsHTML(ele);
    }
}

function createCircle(r, x, y) {
    var cir = document.createElementNS(SVGNS, "circle");
    cir.setAttributeNS(null, "r", r);
    cir.setAttributeNS(null, "class", "circle");
    cir.setAttributeNS(null, "cx", x);
    cir.setAttributeNS(null, "cy", y);

    return cir;
}

function createText(txt, x, y, decimals) {
    var text = document.createElementNS(SVGNS, "text");
    text.setAttributeNS(null, "x", x);
    text.setAttributeNS(null, "y", y);
    text.setAttributeNS(null, "class", "text");
    //text.setAttributeNS(null, "style", "font-size:" + height + ";")
    text.textContent = txt;
    if (isNumeric(txt)) {
        if (isNaN(decimals)) {
            decimals = 0;
        }
        text.textContent = txt.toFixed(decimals);
    }

    return text;
}

function createLine(x1, x2, y1, y2) {
    var line = document.createElementNS(SVGNS, "line");
    line.setAttributeNS(null, "x1", x1);
    line.setAttributeNS(null, "x2", x2);
    line.setAttributeNS(null, "y1", y1);
    line.setAttributeNS(null, "y2", y2);
    line.setAttributeNS(null, "class", "line");

    return line;
}

function drawCoordinateCross(parent) {
    parent.appendChild(createLine("50%", "50%", "0%", "100%"))
    parent.appendChild(createLine("0%", "100%", "50%", "50%"));
}

function createRect(x, y, w, h) {
    var rect = document.createElementNS(SVGNS, "rect");
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    rect.setAttributeNS(null, "width", w);
    rect.setAttributeNS(null, "height", h);
    rect.setAttributeNS(null, "class", "rect");

    return rect;
}

function createGroup() {
    return document.createElementNS(SVGNS, "g");
}

function createSVG(viewBox, preserveAspectRatio) {
    var svg = document.createElementNS(SVGNS, "svg");

    if (viewBox != null) {
        svg.setAttributeNS(null, "viewBox", viewBox);
    }
    //Wird zur Ellipse wenn Verhältnis nicht passt.
    if (preserveAspectRatio != null) {
        svg.setAttributeNS(null, "preserveAspectRatio", preserveAspectRatio);
    }

    return svg;
}

function createElement(element) {
    return document.createElementNS(SVGNS, element);
}

function createLinearGradient(id, x1, x2, y1, y2) {
    var lg = document.createElementNS(SVGNS, "linearGradient");
    lg.setAttributeNS(null, "id", id);
    if (x1 != null && x2 != null && y1 != null && y2 != null) {
        lg.setAttributeNS(null, "x1", x1);
        lg.setAttributeNS(null, "x2", x2);
        lg.setAttributeNS(null, "y1", y1);
        lg.setAttributeNS(null, "y2", y2);
    }

    return lg;
}

function createPoly() {
    var poly = document.createElementNS(SVGNS, "polyline");
    poly.setAttributeNS(null, "points", "");
    poly.setAttributeNS(null, "class", "poly");

    return poly;
}

function createPath() {
    var surf = document.createElementNS(SVGNS, "path");
    surf.setAttributeNS(null, "class", "path");

    return surf;
}

function generateRandom(to) {
    return (Math.floor(Math.random() * to) + 1);
}

function isNumeric(val) {
    return Number(parseFloat(val)) === val;
}

//returns x, y points from a circle with unit length
function circlePointsFromPercent(percent) {
    var x = Math.cos(2 * Math.PI * percent);
    var y = Math.sin(2 * Math.PI * percent);

    return [x, y];
}

function clamp(val, min, max) {
    return val < min ? min : (val > max) ? max : val;
}

/*
    SVG übernimmt nicht die Größe des Stammelements, sondern ist nur so groß wie das Element darin.
    Ermittelung der Containergröße.
*/
function getClientWidth(node, width) {
    if (node != null && node.clientWidth != 0) {
        //relativer Wert
        if (width != null) {                                        // Dirty Hack
            if (isNaN(width)) {                                     // Firefox berücksichtigt die Breite des Elements nicht
                return node.clientWidth * parseFloat(width) / 100;  // und nimmt einfach die gesamte Breite des Parents als
            } else {                                                // Breite des SVGs an
                return width;  //Absoluter Wert                     // Aanalog getClientHeight
            }
        }
        return node.clientWidth;
    } else {
        return this.getClientWidth(node.parentNode, node.getAttribute("width"));
    }
}

function getClientHeight(node, height) {
    if (node != null && node.clientHeight != 0) {
        if (height != null) {
            if (isNaN(height)) {
                return node.clientHeight * parseFloat(height) / 100;
            } else {

                return height;
            }
        }
        return node.clientHeight;
    }
    else {
        return this.getClientHeight(node.parentNode, node.getAttribute("height"));
    }
}