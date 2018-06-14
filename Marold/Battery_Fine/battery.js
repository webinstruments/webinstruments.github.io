function draw_battery(element, size, value) {
    console.log('draw_battery(' + element + ',' + size + ',' + value + ')');

    let canvas = document.getElementById(element);
    let ctx = canvas.getContext('2d');
    let viertel = size / 2 / 4;
    console.log(viertel);
    let length = size - size / 10;
    let percent = length/100;
    let color;

    canvas.width = size;
    canvas.height = size / 2;

    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = color;
    //ctx.fillRect(size / 100 * 5, viertel, length, 2 * viertel);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(size / 100 * 5 + 2, viertel + 2, length / 5, 2 * viertel - 2);
    ctx.strokeRect(size / 100 * 5 + 2 + length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    ctx.strokeRect(size / 100 * 5 + 2 + 2 * length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    ctx.strokeRect(size / 100 * 5 + 2 + 3 * length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    ctx.strokeRect(size / 100 * 5 + 2 + 4 * length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    ctx.strokeRect(size / 100 * 5 + 2 + 4 * length / 5 + length / 5, size / 4 - 15, 10, 30);

    if (value <= 20) {
        console.log('bis 20');
        color = 'red';
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2, viertel + 2, value*percent, 2 * viertel - 2);
        //zwanzig();
        //kontakt();
    }
    else if (value > 20 && value <= 40) {
        console.log('20-40');
        color = 'yellow';
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2, viertel + 2, value*percent, 2 * viertel - 2);
        //zwanzig();
        //vierzig();
        //kontakt();
    }
    else if (value > 40 && value <= 60) {
        console.log('40-60');
        color = 'yellow';
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2, viertel + 2, value*percent, 2 * viertel - 2);
        /*zwanzig();
        vierzig();
        sechzig();*/
        //kontakt();
    }
    else if (value > 60 && value <= 80) {
        console.log('60-80');
        color = 'green';
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2, viertel + 2, value*percent, 2 * viertel - 2);
        /*
        zwanzig();
        vierzig();
        sechzig();
        achtzig();*/
        //kontakt();
    }
    else {
        console.log('80-100');
        color = 'green';
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2, viertel + 2, value*percent, 2 * viertel - 2);
        /*zwanzig();
        vierzig();
        sechzig();
        achtzig();
        hundert();
        kontakt();*/
    }
/*
    function zwanzig() {
        console.log('zwanzig');
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2, viertel + 2, length / 5, 2 * viertel - 2);
    }

    function vierzig() {
        //ctx.strokeStyle = 'black';
        console.log('vierzig');
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2 + length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    }

    function sechzig() {
        //ctx.strokeStyle = 'black';
        console.log('sechzig');
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2 + 2 * length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    }

    function achtzig() {
        //ctx.strokeStyle = 'black';
        console.log('achtizg');
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2 + 3 * length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    }

    function hundert() {
        //ctx.strokeStyle = 'black';
        console.log('hundert');
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2 + 4 * length / 5, viertel + 2, length / 5, 2 * viertel - 2);
    }
    function kontakt() {
        //ctx.strokeStyle = 'black';
        
        ctx.fillStyle = color;
        ctx.fillRect(size / 100 * 5 + 2 + 4 * length / 5 + length / 5, size / 4 - 15, size/100*2, size/100*2);
    }
    */
    //ctx.strokeRect(size/100 * 5+2, viertel+2, length/5, 2*viertel-2);
    //console.log('length: '+length);
    //console.log('height: '+2*viertel)
}