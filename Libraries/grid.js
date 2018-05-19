class Grid {
    constructor(parent, lines, lineClass) {
        this.parent = parent;
        this.lines = [];
        this.svg_grid = parent.appendChild(createSVG(null, null));
        this.class = lineClass;
        var percent = 100 / lines;
        for(var i = 0; i < lines - 1; ++i) {
            var position = (percent * (i + 1));
            var positionHalf = percent / 2 + position;
            //1 Schritte
            this.lines.push(new Line(this.svg_grid, position + "%").addClass(lineClass));
            //0.5 Schritte
            this.lines.push(new Line(this.svg_grid, positionHalf + "%").addClass(lineClass).addClass("half"));
        }
    }

    onResize() {
        for(var i in this.lines) {
            this.lines[i].onResize();
        }
    }
}