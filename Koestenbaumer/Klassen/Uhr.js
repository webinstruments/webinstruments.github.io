//Klasse zum Zeichnen der Uhr

//Parameter
//	
//	col1 - Farbe des Hintergrundes z.B.: "#FF00FF"
//	col2 - Farbe der Beschriftung (Zahlen) z.B.: "#FF00FF"
//	col3 - Farbe der Umrandungen (Äußerer Kreis, innerer Kreis, Mittelpunkt) z.B.: "#FF00FF"
//	col4 - Farbe der Zeiger z.B.: "#FF00FF"
//	sec  - Wert für den Sekundenzeiger
//	min  - Wert für den Minutenzeiger
//	hour - Wert für den Stundenzeiger

// Einbindung Bsp:
//
//	<c-uhr id="myUhr"></c-uhr>
//	<c-uhr id="myUhr" col1="#000000" col2="#FF0000" col3="#0000FF" col4="#FF0000" ></c-uhr>


class Uhr extends HTMLElement {

  constructor() {
	super();

	//Canvas-element erstellen
	this.canvas = document.createElement("canvas"); 

	//Default Höhe und Breite für Canvas-Element
	this.canvas.height = 500;
	this.canvas.width = 500;

	// Klassen und Style hinzufügen
	this.canvas.classList.add("wi");
	//this.canvas.style = "border:1px solid #000000";
	
	//Deklarieren der Variablen
	var defaultSec = 0 ;
	var defaultMin = 0;
	var defaultHour = 0;
		var ctx = this.canvas.getContext("2d");
	ctx.scale(0.97,0.97);
	ctx.translate(8,8);

	//Dem Uhr Element das Canvas Element hinzufügen
    	this.appendChild(this.canvas);
 	
	//Init-Methode
	this.setStart();
	this.setLines();
	//Alle Variablen der Uhr setzen
	this.setValue("sec",this.defaultSec);
	this.setValue("min",this.defaultMin);
	this.setValue("hour",this.defaultHour);


}

// Variablen, welche auf Änderungen beobachtet werden
 static get observedAttributes() {
    return ['sec', 'min','hour'];
  }
  
// Methode wird aufgerufen, wenn Änderungn an Variable erkannt wird
 attributeChangedCallback(name, oldValue, newValue) {
	//Context zum Zeichen im Canvas Objekt
	var ctx = this.canvas.getContext("2d");
	// Canvas Objekt löschen und auf Anfangsstatus setzen
	this.setStart();
	//Neuen Wert aufgrund geänderten Variable stetzen
	switch(name){
	//Sekunden
	case "sec" :
		this.defaultSec = newValue;
		break;
	//Minuten
	case "min":
		this.defaultMin = newValue;
		break;
	//Stunden
	case "hour":
		//Stundenzeiger zusätzliche Drehung hinzufügen
		this.defaultHour = parseInt((newValue%12)*5)+this.defaultMin/60*5;
		break;
	
	default:
	
		break;
	
	}
	
	//Beschriftung der Uhr hinzufügen
	this.setLines();	
	
	//Alle Variablen der Uhr setzen
	this.setValue("sec",this.defaultSec);
	this.setValue("min",this.defaultMin);
	this.setValue("hour",this.defaultHour);
	
}
	
	//Initialiserung der Uhr
	setStart(){
		//Drehung für Kreis definieren
		var arcBegin = 0;
		var arcEnd = Math.PI*2;
		//toVal --> Wert bis zu dem die Uhr geht (Sekunden und Minuten | Stunde wird berechnet)
		var toVal =  60;
		//Context zum Zeichen im Canvas Objekt
		var ctx = this.canvas.getContext("2d");
		
		//Zeichnen des großen Kreises im Hintergrund
		ctx.fillStyle=getCol(this,1,"#999999"); // Farbe aus Parameter,  sonst default #999999
		ctx.beginPath();
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height/2,0,2*Math.PI); //Kreis
		ctx.fill();
		//Zeichnen der Umrandung der Uhr
		ctx.strokeStyle=getCol(this,3,"#FFFFFF");
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height/2,arcBegin,arcEnd);
		ctx.stroke();
		//Zeichnen des inneren Kreises der Uhr
		ctx.beginPath();
		ctx.lineWidth=10;
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*5/16,arcBegin,arcEnd); // Anzeige
		ctx.stroke();
		ctx.beginPath();
	}

	//Beschriftung der Uhr
	setLines(){

			//toVal --> Wert bis zu dem die Uhr geht (Sekunden und Minuten | Stunde wird berechnet)
			var toVal =  60;
			//Context zum Zeichnen im Canvasobjekt
			var ctx = this.canvas.getContext("2d");
			
			ctx.beginPath();
			ctx.fillStyle=getCol(this,2,"#FFFFFF");
			
			//Schriftart setzen
			ctx.font = "bold 60px Comic Sans MS";
			ctx.textAlign = "center";
			
			//Zeichnen der Zahlen 9 bis 3
			var anzTxt = 6;
			for (var i = 1; i <= anzTxt+1; i++) { 
				var y = parseInt(this.canvas.width-this.canvas.width/11-(Math.sqrt(this.canvas.width*13/32*this.canvas.width*13/32-(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI))*(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)))));
				if((i+8)%12==0){
					ctx.fillText(12,parseInt(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)+this.canvas.width/2),y-this.canvas.width*13/32+20);
				}else{
					ctx.fillText((i+8)%12,parseInt(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)+this.canvas.width/2),y-this.canvas.width*13/32+20);
				}
			}
			
			//Zeichnen der Zahlen 8 bis 4
			var anzTxt = 6;
			ctx.fillStyle=getCol(this,2,"#FFFFFF");
			for (var i = 2; i <= anzTxt; i++) { 
				var y = -parseInt(this.canvas.width-this.canvas.width*9/32-(Math.sqrt(this.canvas.width*13/32*this.canvas.width*13/32-(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI))*(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)))));
				var txtVal = (12-i-2)%12;
				ctx.fillText(txtVal,parseInt(this.canvas.width*13/32*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)+this.canvas.width/2),(y+3*this.canvas.width*13/32)+20)//,5,0,2*Math.PI);

			}
			
	}

	
	// Setzen und Zeichnen der Zeiger/Zahlen
	setValue(type, newValue){
		if(this.canvas!=null){
			//Context zum Zeichnen im Canvasobjekt
			var ctx = this.canvas.getContext("2d");
			//toVal --> Wert bis zu dem die Uhr geht (Sekunden und Minuten | Stunde wird berechnet)
			var toVal =  60;
			//Beginn: Zeichnen der Zeiger
			ctx.beginPath();
			ctx.fillStyle=getCol(this,4,"#FFFFFF");
			ctx.moveTo(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8)
			switch(type){
			//Sekundenzeiger
			case "sec":
				ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*15/32,(2*Math.PI*((newValue/toVal)-1/256))+Math.PI*3/2,(2*Math.PI*((newValue/toVal)+1/256))+Math.PI*3/2); //Nadel
				break;
			//Minutenzeiger
			case "min":
				ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*2/8,(2*Math.PI*((newValue/toVal)-1/100))+Math.PI*3/2,(2*Math.PI*((newValue/toVal)+1/100))+Math.PI*3/2); //Nadel
				break;
			//Stundenzeiger
			case "hour":
				ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*3/8,(2*Math.PI*((newValue/toVal)-1/100))+Math.PI*3/2,(2*Math.PI*((newValue/toVal)+1/100))+Math.PI*3/2); //Nadel
				break;
			default:
			
				break;
			}
			
			ctx.fill();
			//Zeichnen des inneren gefüllten Kreises (Mittelpunkt)
			ctx.beginPath();
			ctx.fillStyle=getCol(this,3,"#FFFFFF");
			ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*1/32,0,2*Math.PI);
			ctx.fill();
		}
	}

 }
 
//HTML Tag erstellen
customElements.define("c-uhr", Uhr);