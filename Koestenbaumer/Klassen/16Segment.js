// Klasse zum Zeichnen der 16-Segment-Anzeige

// Parameter
//	col1 - Farbe des Hintergundes z.B.: "#000000"
//	col1 - Farbe der Segmente z.B.: "#00FF00"	
//	myValue - Startwert der 7-Segment-Anzeige z.B.: "7" || Wenn nicht gesetzt ist der Startwert "8"


// Einbindung Bsp:
//
//	<c-banzeige id="my16Segment"></c-banzeige>
// 	<c-banzeige id="my16Segment" myValue="T" col1="#000000" col2="#00FF00"></c-banzeige>

// Übersicht Segmente	
//	
//	---a1a1a1-a2a2a2---
//	---f-h---i---j-b---
//	---f--h--i--j--b---
//	---f---h-i-j---b---
//	---g1g1g1-g2g2g2---
//	---e---k-l-m---c---
//	---e--k--l--m--c---
//	---e-k---l---m-c---
//	---d1d1d1-d2d2d2---


class BAnzeige extends HTMLElement {

  constructor() {
	super();

	//Canvas-element erstellen
    	this.canvas = document.createElement("canvas");

	//Default Höhe und Breite für Canvas-Element
	this.canvas.width  = 500;
	this.canvas.height = 500;

 	// Klassen und Style hinzufügen
	this.canvas.classList.add("wi");
	this.canvas.style = "border:1px solid #000000";

	//Dem 16-Segment-Anzeige Element das Canvas Element hinzufügen
    	this.appendChild(this.canvas);

	//Context zum Zeichen im Canvas Objekt
     	var ctx = this.canvas.getContext("2d");

	//löschen der Zeichenfläche
 	ctx.strokeRect(this.canvas.width,this.canvas.height-this.canvas.height,this.canvas.width,this.canvas.height);
	ctx.fillRect(this.canvas.width,this.canvas.height,this.canvas.width,this.canvas.height);
	ctx.fillStyle="#00FF00";

	//Default Zeichnung ausführen, stellt "8" dar
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	
}
// Variablen, welche auf Änderungen beobachtet werden
 static get observedAttributes() {
    return ['myvalue'];
  }

// Methode wird aufgerufen, wenn Änderungn an Variable erkannt wird
 attributeChangedCallback(name, oldValue, newValue) {

	//Löschen der Zeichnung
	this.drawClean();

	//Context zum Zeichen im Canvas Objekt
	var ctx = this.canvas.getContext("2d");

	//Abfrage des Inputs || Zahlen von 0-9; Buchstaben groß und klein geschrieben; Leerzeichen
	switch(newValue){
	case "0":
		this.drawA1();
		this.drawA2();
		this.drawB();
		this.drawC();
		this.drawD1();
		this.drawD2();
		this.drawF();
		this.drawE();
		this.drawK();
		this.drawJ();
	break;

	case "1":
		this.drawB();
		this.drawC();
	break;

	case "2":
		this.drawA1();
		this.drawA2();
		this.drawB();
		this.drawG1();
		this.drawG2();
		this.drawE();
		this.drawD1();
		this.drawD2();
	break;

	case "3":
		this.drawA1();
		this.drawA2();
		this.drawB();
		this.drawG1();
		this.drawG2();
		this.drawC();
		this.drawD1();
		this.drawD2();
	break;

	case "4":
		this.drawF();
		this.drawB();
		this.drawG1();
		this.drawG2();
		this.drawC();
	break;

	case "5":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawG1();
		this.drawG2();
		this.drawC();
		this.drawD1();
		this.drawD2();
	break;

	case "6":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawG1();
		this.drawG2();
		this.drawC();
		this.drawE();
		this.drawD1();
		this.drawD2();
	break;

	case "7":
		this.drawA1();
		this.drawA2();
		this.drawB();
		this.drawC();
	break;

	case "8":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "9":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawG1();
		this.drawG2();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "a":
	case "A":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
		this.drawB();
		this.drawC();
	break;

	case "b":
	case "B":
		this.drawA1();
		this.drawA2();
		this.drawI();
		this.drawL();
		this.drawG2();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "c":
	case "C":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawD1();
		this.drawD2();
	break;

	case "d":
	case "D":
		this.drawA1();
		this.drawA2();
		this.drawI();
		this.drawL();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "e":
	case "E":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
		this.drawD1();
		this.drawD2();
	break;

	case "f":
	case "F":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
	break;

	case "g":
	case "G":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG2();
		this.drawD1();
		this.drawD2();

		this.drawC();
	break;

	case "h":
	case "H":
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
		this.drawB();
		this.drawC();
	break;

	case "i":
	case "I":
		this.drawA1();
		this.drawA2();
		this.drawI();
		this.drawL();
		this.drawD1();
		this.drawD2();
	break;

	case "j":
	case "J":
		this.drawE();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "k":
	case "K":
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawJ();
		this.drawM();
	break;

	case "l":
	case "L":
		this.drawF();
		this.drawE();
		this.drawD1();
		this.drawD2();
	break;

	case "m":
	case "M":
		this.drawF();
		this.drawE();
		this.drawH();
		this.drawJ();
		this.drawB();
		this.drawC();
	break;

	case "n":
	case "N":
		this.drawF();
		this.drawE();
		this.drawH();
		this.drawM();
		this.drawB();
		this.drawC();
	break;

	case "o":
	case "O":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "p":
	case "P":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawB();
		this.drawG1();
		this.drawG2();
	break;

	case "q":
	case "Q":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
		this.drawM();
	break;

	case "r":
	case "R":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawB();
		this.drawG1();
		this.drawG2();
		this.drawM();
	break;

	case "s":
	case "S":
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawG1();
		this.drawG2();
		this.drawC();
		this.drawD1();
		this.drawD2();
	break;

	case "t":
	case "T":
		this.drawA1();
		this.drawA2();
		this.drawI();
		this.drawL();
	break;

	case "u":
	case "U":
		this.drawF();
		this.drawE();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
	break;

	case "v":
	case "V":
		this.drawF();
		this.drawE();
		this.drawK();
		this.drawJ();
	break;

	case "w":
	case "W":
		this.drawF();
		this.drawE();
		this.drawK();
		this.drawM();
		this.drawB();
		this.drawC();
	break;

	case "x":
	case "X":
		this.drawK();
		this.drawM();
		this.drawH();
		this.drawJ();
	break;

	case "y":
	case "Y":
		this.drawG1();
		this.drawG2();
		this.drawF();
		this.drawL();
		this.drawB();
	break;

	case "z":
	case "Z":
		this.drawA1();
		this.drawA2();
		this.drawJ();
		this.drawK();
		this.drawD1();
		this.drawD2();
	break;
 
	case " ":
	
	break;
	default:
		this.drawA1();
		this.drawA2();
		this.drawF();
		this.drawE();
		this.drawG1();
		this.drawG2();
		this.drawD1();
		this.drawD2();
		this.drawB();
		this.drawC();
		this.drawH();
		this.drawI();
		this.drawJ();
		this.drawK();
		this.drawL();
		this.drawM();
	
	}

	
}
	drawClean(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle= getCol(this,1,"#000000"); // "#000000";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	drawA1(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3,this.canvas.height*3/18,this.canvas.width/6-this.canvas.width/72,this.canvas.height/24);//oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width*1/108,this.canvas.height*3/18+this.canvas.height/96,this.canvas.width/6-this.canvas.width*2/108-this.canvas.width*1/72,this.canvas.height/24-this.canvas.height*2/96);//oben
	}
	drawA2(){
		var ctx = this.canvas.getContext("2d");
		
		ctx.stroke();
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		
		ctx.fillRect(this.canvas.width/2+this.canvas.width/72,this.canvas.height*3/18,this.canvas.width/6-this.canvas.width/72,this.canvas.height/24);//oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*1/2+this.canvas.width/72+this.canvas.width*1/108,this.canvas.height*3/18+this.canvas.height/96,this.canvas.width/6-this.canvas.width*2/108-this.canvas.width*1/72,this.canvas.height/24-this.canvas.height*2/96);//oben
	}
	drawG1(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3,this.canvas.height*36/72-this.canvas.height/48,this.canvas.width/6-this.canvas.width/72,this.canvas.height/24); //mitte
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width*1/108,this.canvas.height*36/72+this.canvas.height/96-this.canvas.height/48,this.canvas.width/6-this.canvas.width*2/108-this.canvas.width*1/72,this.canvas.height/24-this.canvas.height*2/96); //mitte
	}

	drawG2(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/2+this.canvas.width/72,this.canvas.height*36/72-this.canvas.height/48,this.canvas.width/6-this.canvas.width/72,this.canvas.height/24); //mitte
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*1/2+this.canvas.width/72+this.canvas.width*1/108,this.canvas.height*36/72+this.canvas.height/96-this.canvas.height/48,this.canvas.width/6-this.canvas.width*2/108-this.canvas.width*1/72,this.canvas.height/24-this.canvas.height*2/96); //mitte
	}
	drawD1(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3,this.canvas.height*54/72+this.canvas.height/24,this.canvas.width/6-this.canvas.width/72,this.canvas.height/24); //unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width*1/108,this.canvas.height*54/72+this.canvas.height/96+this.canvas.height/24,this.canvas.width/6-this.canvas.width*2/108-this.canvas.width*1/72,this.canvas.height/24-this.canvas.height*2/96); //unten
	}
	drawD2(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/2+this.canvas.width/72,this.canvas.height*54/72+this.canvas.height/24,this.canvas.width/6-this.canvas.width/72,this.canvas.height/24); //unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*1/2+this.canvas.width/72+this.canvas.width*1/108,this.canvas.height*54/72+this.canvas.height/96+this.canvas.height/24,this.canvas.width/6-this.canvas.width*2/108-this.canvas.width*1/72,this.canvas.height/24-this.canvas.height*2/96); //unten
	}
	drawF(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3-this.canvas.width/48-this.canvas.width/48,this.canvas.height*4/18,this.canvas.width/24,this.canvas.height*18/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3-this.canvas.width*2/108-this.canvas.width/72,this.canvas.height*4/18+this.canvas.height/64,this.canvas.width/24-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //links oben
	}
	drawB(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width*2/3-this.canvas.width/48+this.canvas.width/48,this.canvas.height*4/18,this.canvas.width/24,this.canvas.height*18/72); //rechts oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*2/3-this.canvas.width/48+this.canvas.width/48+this.canvas.width*1/108,this.canvas.height*4/18+this.canvas.height/64,this.canvas.width/24-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //rechts oben klein
	}
	drawE(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3-this.canvas.width/48-this.canvas.width/48,this.canvas.height*38/72,this.canvas.width/24,this.canvas.height*18/72); //links unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3-this.canvas.width*2/108-this.canvas.width/72,this.canvas.height*38/72+this.canvas.height/64,this.canvas.width/24-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //links unten
	}
	drawC(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width*2/3-this.canvas.width/48+this.canvas.width/48,this.canvas.height*38/72,this.canvas.width/24,this.canvas.height*18/72); //rechts unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*2/3-this.canvas.width/48+this.canvas.width/48+this.canvas.width*1/108,this.canvas.height*38/72+this.canvas.height/64,this.canvas.width/24-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //rechts unten klein
	}
	drawL(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/2-this.canvas.width/48,this.canvas.height*38/72,this.canvas.width/24,this.canvas.height*18/72); //links unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/2-this.canvas.width*1/90,this.canvas.height*38/72+this.canvas.height/64,this.canvas.width/24-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //links unten
	}
	drawI(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/2-this.canvas.width/48,this.canvas.height*4/18,this.canvas.width/24,this.canvas.height*18/72); //rechts oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/2-this.canvas.width*1/90,this.canvas.height*4/18+this.canvas.height/64,this.canvas.width/24-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //rechts oben klein
	}
	drawH(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(-24*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );	
		ctx.fillRect(this.canvas.width/2-this.canvas.width/28,this.canvas.height*13/72,this.canvas.width/36,this.canvas.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/2-this.canvas.width*2/74,this.canvas.height*13/72+this.canvas.height/64,this.canvas.width/36-this.canvas.width*2/108,this.canvas.height*20/72-this.canvas.height*2/64); //links oben
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(24*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );
}

	drawJ(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(24*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );	
		ctx.fillRect(this.canvas.width/2+this.canvas.width/112,this.canvas.height*13/72,this.canvas.width/36,this.canvas.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/2+this.canvas.width*2/112,this.canvas.height*13/72+this.canvas.height/64,this.canvas.width/36-this.canvas.width*2/108,this.canvas.height*20/72-this.canvas.height*2/64); //links oben
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(-24*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );
}
	drawM(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(156*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );	
		ctx.fillRect(this.canvas.width/2-this.canvas.width/28,this.canvas.height*13/72,this.canvas.width/36,this.canvas.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/2-this.canvas.width*2/74,this.canvas.height*13/72+this.canvas.height/64,this.canvas.width/36-this.canvas.width*2/108,this.canvas.height*20/72-this.canvas.height*2/64); //links oben
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(-156*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );
}

	drawK(){
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(-156*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );	
		ctx.fillRect(this.canvas.width/2+this.canvas.width/112,this.canvas.height*13/72,this.canvas.width/36,this.canvas.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/2+this.canvas.width*2/112,this.canvas.height*13/72+this.canvas.height/64,this.canvas.width/36-this.canvas.width*2/108,this.canvas.height*20/72-this.canvas.height*2/64); //links oben
		ctx.translate( this.canvas.width/2, this.canvas.height/2 );
		ctx.rotate(156*Math.PI/180);
		ctx.translate( -this.canvas.width/2, -this.canvas.height/2 );

	}
}

//HTML-Tag erstellen
customElements.define("c-banzeige", BAnzeige);