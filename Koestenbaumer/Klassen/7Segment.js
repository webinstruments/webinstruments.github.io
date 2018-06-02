// Klasse zum Zeichnen der 7-Segment-Anzeige

// Parameter
//	col1 - Farbe des Hintergundes z.B.: "#00FF00"
//	col1 - Farbe der Segmente z.B.: "#0000FF"	
//	myValue - Startwert der 7-Segment-Anzeige z.B.: "7" || Wenn nicht gesetzt ist der Startwert "8"


// Einbindung Bsp:
//
// 	<c-anzeige id="mySegment"></c-anzeige>
//	<c-anzeige id="mySegment" col1="#FFFFFF" col2="#00FFFF"></c-anzeige>


//	---11111---
//	---2---3---
//	---2---3---
//	---2---3---
//	---44444---
//	---5---6---
//	---5---6---
//	---5---6---
//	---77777---
//
//	1 - Oberes Segment	
//	2 - Links-oben Segment
//	3 - Rechts-oben Segment
//	4 - Mittleres Segemnt
//	5 - Links-unten Segment
//	6 - Rechts-unten Segment
//	7 - Unteres Segment


class Anzeige extends HTMLElement {

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

	//Context zum Zeichen im Canvas Objekt
     	var ctx = this.canvas.getContext("2d");

	//löschen der Zeichenfläche
 	ctx.strokeRect(this.canvas.width,this.canvas.height-this.canvas.height,this.canvas.width,this.canvas.height);
	ctx.fillStyle="#000000";
	ctx.fillRect(this.canvas.width,this.canvas.height,this.canvas.width,this.canvas.height);
	ctx.fillStyle="#00FF00";

	//Default Zeichnung ausführen --> Alle Segmente ein
	
	this.drawUp();
	this.drawLeftUp();
	this.drawRightUp();
	this.drawMid();
	this.drawLeftBottom();
	this.drawRightBottom();
	this.drawBottom();

//Dem 7-Segment-Anzeige Element das Canvas Element hinzufügen
    	this.appendChild(this.canvas);
}

// Variablen, welche auf Änderungen beobachtet werden
 static get observedAttributes() {
    return ['sa','myvalue'];
  }

// Methode wird aufgerufen, wenn Änderungn an Variable erkannt wird
 attributeChangedCallback(name, oldValue, newValue) {

	this.drawClean();
	var ctx = this.canvas.getContext("2d");
	switch(parseInt(newValue)){
	case 0:
		//Gibt "0" aus
		this.drawUp();
		this.drawLeftUp();
		this.drawLeftBottom();
		this.drawBottom();
		this.drawRightUp();
		this.drawRightBottom();
	break;

	case 1:
		//Gibt "1" aus
		this.drawRightUp();
		this.drawRightBottom();
	break;

	case 2:
		//Gibt "2" aus
		this.drawUp();
		this.drawRightUp();
		this.drawMid();
		this.drawLeftBottom();
		this.drawBottom();
	break;

	case 3:
		//Gibt "3" aus
		this.drawUp();
		this.drawRightUp();
		this.drawMid();
		this.drawRightBottom();
		this.drawBottom();	
	break;

	case 4:
		//Gibt "4" aus
		this.drawRightUp();
		this.drawMid();
		this.drawLeftUp();
		this.drawRightBottom();
	break;

	case 5:
		//Gibt "5" aus
		this.drawUp();
		this.drawLeftUp();
		this.drawMid();
		this.drawRightBottom();
		this.drawBottom();
	break;

	case 6:
		//Gibt "6" aus
		this.drawUp();
		this.drawLeftUp();
		this.drawMid();
		this.drawRightBottom();
		this.drawBottom();
		this.drawLeftBottom();
	break;

	case 7:
		//Gibt "7" aus
		this.drawUp();	
		this.drawRightUp();
		this.drawRightBottom();
	break;

	case 8:
		//Gibt "8" aus
		this.drawUp();
		this.drawLeftUp();
		this.drawLeftBottom();
		this.drawMid();
		this.drawBottom();
		this.drawRightUp();
		this.drawRightBottom();
	break;

	case 9:
		//Gibt "9" aus
		this.drawUp();
		this.drawLeftUp();
		this.drawRightUp();
		this.drawMid();
		this.drawRightBottom();
	break;


	default:

	
	}
	
}
	drawClean(){
		//Löschen der Zeichenfläche

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");
		//Hintergrundfarbe von Parameter "col1"
		ctx.fillStyle= getCol(this,1,"#000000"); // "#000000";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	drawUp(){
		//Oberes Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");
		
		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3+this.canvas.width/36,this.canvas.height*3/18,this.canvas.width/6*2,this.canvas.height/18);//oben
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width/36+this.canvas.width*1/108,this.canvas.height*3/18+this.canvas.height/96,this.canvas.width/6*2-this.canvas.width*2/108,this.canvas.height/18-this.canvas.height*2/96);//oben
	}
	drawMid(){
		//Mittleres Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");

		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3+this.canvas.width/36,this.canvas.height*34/72,this.canvas.width/6*2,this.canvas.height/18); //mitte
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width/36+this.canvas.width*1/108,this.canvas.height*34/72+this.canvas.height/96,this.canvas.width/6*2-this.canvas.width*2/108,this.canvas.height/18-this.canvas.height*2/96); //mitte
	}
	drawBottom(){
		//Unteres Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");

		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3+this.canvas.width/36,this.canvas.height*56/72,this.canvas.width/6*2,this.canvas.height/18); //unten
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width/36+this.canvas.width*1/108,this.canvas.height*56/72+this.canvas.height/96,this.canvas.width/6*2-this.canvas.width*2/108,this.canvas.height/18-this.canvas.height*2/96); //unten
	}
	drawLeftUp(){
		//Links-oben Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");

		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3,this.canvas.height*4/18,this.canvas.width/18,this.canvas.height*18/72); //links oben
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width*1/108,this.canvas.height*4/18+this.canvas.height/64,this.canvas.width/18-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //links oben
	}
	drawRightUp(){
		//Rechts-oben Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");

		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width*2/3,this.canvas.height*4/18,this.canvas.width/18,this.canvas.height*18/72); //rechts oben
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*2/3+this.canvas.width*1/108,this.canvas.height*4/18+this.canvas.height/64,this.canvas.width/18-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //rechts oben klein
	}
	drawLeftBottom(){
		//Links-unten Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");

		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width/3,this.canvas.height*38/72,this.canvas.width/18,this.canvas.height*18/72); //links unten
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width/3+this.canvas.width*1/108,this.canvas.height*38/72+this.canvas.height/64,this.canvas.width/18-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //links unten
	}
	drawRightBottom(){
		//Rechts-unten Segment

		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");

		//Hintergrundfarbe von Parameter "col2"
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(this.canvas.width*2/3,this.canvas.height*38/72,this.canvas.width/18,this.canvas.height*18/72); //rechts unten
		
		//innere Teil des Segments aufgrund Farbe dunkler gestalten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(this.canvas.width*2/3+this.canvas.width*1/108,this.canvas.height*38/72+this.canvas.height/64,this.canvas.width/18-this.canvas.width*2/108,this.canvas.height*18/72-this.canvas.height*2/64); //rechts unten klein
	}




}

//HTML-Tag erstellen
customElements.define("c-anzeige", Anzeige);