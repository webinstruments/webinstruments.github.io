/*
    Matthias Marold
    FH Kärnten
    Projekt 1: Webinstruments
    Instrument: Toggle Switch

*/

function draw_switch(element, sizeInPixel, state, color) {
    console.log('draw_switch(' + element + ',' + sizeInPixel + ',' + state + ',' + color + ')');

    let canvas = document.getElementById(element);
    let ctx = canvas.getContext('2d');

    canvas.width = sizeInPixel;
    canvas.height = sizeInPixel;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let x = document.getElementById(element).width / 2;
    let y = document.getElementById(element).width / 2;
    let size = document.getElementById(element).width / 4;
    let side = 0;
    let a = Math.sqrt(3) / 2 * size;
    let sign = 1;

    if (state == true)
        sign = 1;
    else
        sign = -1;

    console.log('x:' + x);
    console.log('y:' + y);
    console.log('size:' + size);
    console.log('a:' + a);

    canvas.addEventListener('click', function (e) {

        if (e.offsetX > 0 && e.offsetY > 0) {
            console.log("Hit: " + canvas.id + " Fillstyle: " + ctx.fillStyle);

            if (state === false) {
                state = true;
                draw_switch(element, sizeInPixel, state, color);
            }
            else {
                state = false;
                draw_switch(element, sizeInPixel, state, color);
            }
        }
    }, false);

    // BEGIN HEXAGON
    ctx.beginPath();
    ctx.fillStyle = "#616161";
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 5;
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (side; side < 7; side++) {
        ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }
    ctx.fill();
    ctx.closePath();
    // END HEXAGON
    // BEGIN BORDER CIRCLE
    ctx.beginPath();
    ctx.arc(x, y, a, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
    // END BORDER CIRCLE

    // BEGIN INNER CIRCLE
    ctx.beginPath();
    ctx.arc(x, y, a / 2, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
    // END INNER CIRCLE

    // BEGIN HOLE CIRCLE
    ctx.beginPath();
    ctx.arc(x, y, a / 4, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    // END HOLE CIRCLE

    // BEGIN RIGHT LINE
    ctx.beginPath();
    ctx.translate(x + a / 4, y);
    console.log(x+a/4+":"+y);
    ctx.moveTo(0, 0);
    ctx.lineTo(a / 4, sign * (y / 1.8));
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    // END RIGHT LINE

    // BEGIN LEFT LINE
    ctx.beginPath();
    ctx.translate(x - a / 4, y);
    console.log(x-a/4+":"+y);
    ctx.moveTo(0, 0);
    ctx.lineTo(-a / 4, sign * (y / 1.8));
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // BEGIN Circle
    if (state === false) {
        ctx.fillStyle = "#ed290b";
        //ctx.fillText("OFF",a/4,sign*(y/1.8+y/2.86));
    }
    else {
        ctx.fillStyle = "#15c90c";
        //ctx.fillText("ON",a/4,sign*(y/1.8+y/2.86));
    }
    ctx.beginPath();
    ctx.arc(a / 4, sign * (y / 1.8), a / 2, 0, 2 * Math.PI, true);
    ctx.fill();
    // END Circle
}

function toggle(element) {
    console.log("... Start toggle() ...");
    console.log(element.id);
    let size = document.getElementById(element).width;

    if (state === false)
        state = true;
    else
        state = false;

    draw_switch(element, sizeInPixel, state, color)

    console.log("... End toggle() ...");
}