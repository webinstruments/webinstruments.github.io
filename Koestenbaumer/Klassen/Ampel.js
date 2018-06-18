//Klasse zum Zeichnen der Ampel

//Parameter
//
// myValue - Startwert der Ampel z.B.: "r" --> rot, "o" --> orange, "g" --> grün
//

// Einbindung Bsp:
//
//	<c-ampel id="myAmpel" ></c-ampel>
//	<c-ampel id="myAmpel" myValue="g" ></c-ampel>


class Ampel extends HTMLElement {
  constructor() {
	super();
	this.canvas = document.createElement("canvas");
	//this.canvas.style = "border:1px solid #000000";
	
	//Default Höhe und Breite für Canvas-Element
	this.canvas.height = 500;
	this.canvas.width = 500;
	
	// Klassen und Style hinzufügen
	this.canvas.classList.add("wi");

	//Defaultwert der Ampel beim initalisieren
	//Parameter "MYVALUE" übergeben? sonst Defaultwert
	if(paramExist(this,"myvalue")){
		this.myValue=this.attributes.myvalue.value;
	}else{
		//defaultwert rot
		this.myValue='r';
	}	
	
	//Dem Ampel Element das Canvas Element hinzufügen
    	this.appendChild(this.canvas);
	
	
	//Contextvariable zum Zeichnen im Canvasobjekt
    	var ctx = this.canvas.getContext("2d");
	
	//Ampel zeichnen
 	ctx.strokeRect(this.canvas.width/3,this.canvas.height-this.canvas.height*7/8,this.canvas.width/3,this.canvas.height*6/8);
	ctx.fillRect(this.canvas.width/3,this.canvas.height-this.canvas.height*7/8,this.canvas.width/3,this.canvas.height*6/8);
	ctx.fillRect(this.canvas.width/2-this.canvas.width/9/2,this.canvas.height-this.canvas.height*1/8,this.canvas.width/9,this.canvas.height*1/8);
	this.setGray();
	
}

// Variablen, welche auf Änderungen beobachtet werden
 static get observedAttributes() {
    return ['clientWidth', 'myvalue'];
  }
// Methode wird aufgerufen, wenn Änderungn an Variable erkannt wird
 attributeChangedCallback(name, oldValue, newValue) {
	//Context zum Zeichen im Canvas Objekt
	var ctx = this.canvas.getContext("2d");
	//Bei jeder Änderung wird die Ampel auf den die Default-Zeichnung gesetzt (alles Leuchten grau)
	this.setGray();

	//Methode zum Setzen der Farbe aufrufen
	this.setColor(newValue);
	
	
}
	//Defaultzeichnung der Ampel (Alle Lichter Grau)
	setGray(){
		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");
		//Graue Farbe setzen
		ctx.fillStyle="#999999";
		//Zeichnen der drei grauen Lichter
		//Licht oben
		ctx.beginPath();
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*6/8,this.canvas.width/10,0,2*Math.PI);
		ctx.fill();
		//Licht mitte
		ctx.beginPath();
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.width/10,0,2*Math.PI);
		ctx.fill();
		//Licht unten
		ctx.beginPath();
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*2/8,this.canvas.width/10,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

	}
	
	//Methode zum Setzen einer Farbe
	setColor(aCol){
		//Deklarieren der Farbe und der Ampelnummer
		var lightCol,nr;
		switch(aCol){
			
			case "r":
				//Rot
				lightCol="#FF0000";
				nr=3;
			break;

			case "o":
				//Orange
				lightCol="#FFFF00";
				nr=2;
			break;

			case "g":
				//Grün
				lightCol="#00FF00";
				nr=1;
			break;
			
			default:
				//Sonst wieder Grau
				this.setGray();
			break;
		}
		//Wenn Switchabfrage erfolgreich
		if(nr!=null){
			//Context zum Zeichen im Canvas Objekt
			var ctx = this.canvas.getContext("2d");
			//Ampellicht setzen
			ctx.fillStyle=lightCol;
			//Ampellicht aufgrund der Variable "nr" zeichnen
			ctx.beginPath();
			ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*2*nr/8,this.canvas.width/10,0,2*Math.PI);
			ctx.fill();
			ctx.stroke();
		}
	}
 }
 //HTML Tag erstellen
 customElements.define("c-ampel", Ampel);