// Klasse zum Zeichnen des Tachos

// Parameter
//	col1 - Farbe der Tachoscheibe z.B.: "#00FF00"
//	col2 - Farbe der Beschriftung z.B.: "#0000FF"	
//	col3 - Farbe der Zone z.B.: "#0000FF"
//	col4 - Farbe des Zeigers z.B.: "#FF00FF"
//	myValue - Startwert des Tachos  z.B.: "50" 		|| Wenn nicht gesetzt ist der Startwert "to"/2
//	to   	- Parameter, bis wohin der Tacho anzeigt	|| Wenn der Parameter nicht gesetzt, ist der Wert "100"
//	fromZone- Parameter, von wo farbige Zone beginnt	|| Wenn Parameter nicht gesetzt, ist der Wert "0"
//	toZone  - Parameter, bis wohin farbe Zone geht		|| Wenn der Parameter nicht gesetzt, ist der Wert "0" --> Zone wird nicht angezeigt

// Einbindung Bsp:
//
// 	<c-tacho  id="tacho"></c-tacho>
//	<c-tacho  id="tacho" myValue="20" to=100 fromZone=15 toZone=30 col1="#999999" col2="#00FFFF" col3="#FF0000" col4="#F2F540" ></c-tacho>

class Tacho extends HTMLElement {
  constructor() {
	super();

   	//Erstellen von Canvasobjekt
    	this.canvas = document.createElement("canvas"); 

	//Default Höhe und Breite für Canvas-Element
	this.canvas.height = 500;
	this.canvas.width = 500;

	// Klassen und Style hinzufügen
	this.canvas.classList.add("wi");
	//this.canvas.style = "border:1px solid #000000";

	//Setzen der Werte

	//Parameter "FROM" übergeben? sonst Defaultwert
	if(paramExist(this,"from")){
		this.fromVal=this.attributes.from.value;
	}else{
		this.fromVal=0;
	}

	//Parameter "TO" übergeben? sonst Defaultwert
	if(paramExist(this,"to")){
		this.toVal=this.attributes.to.value;
	}else{
		this.toVal=100;
	}

	//Parameter "FROMZONE" übergeben? sonst Defaultwert
	if(paramExist(this,"fromZone")){
		this.fromZone=this.attributes.fromZone.value;
	}else{
		this.fromZone=0;
	}

	//Parameter "TOZONE" übergeben? sonst Defaultwert
	if(paramExist(this,"toZone")){
		this.toZone=this.attributes.toZone.value;
	}else{
		this.toZone=0;
	}

	//Parameter "MYVALUE" übergeben? sonst Defaultwert
	if(paramExist(this,"myvalue")){
		this.defaultVal=this.attributes.myvalue.value;
	}else{
		this.defaultVal=this.toVal/2;
	}

	//Canvas dem Tacho übergeben
    	this.appendChild(this.canvas);
	
 	//Defaultzeichnung für Tacho zeichnen
	this.setStart();

	//Defaultwert setzen
	this.setValue(this.defaultVal);
	this.setLines();	
	
}

//Variablen, die bei Änderung überwacht werden
 static get observedAttributes() {
    return ['myvalue'];
  }

//Methode wird aufgerufen, wenn sich eine Überwachende Variable ändert
 attributeChangedCallback(name, oldValue, newValue) {
	
	//var fromVal =  this.attributes.from.value;
	var ctx = this.canvas.getContext("2d");
	this.setStart();
	
	this.setValue(newValue);
	this.setLines();	
}
	
	setStart(){

		//Beginn des inneren Kreises
		var arcBegin = Math.PI*7/8;

		//Ende des Inneren Kreises
		var arcEnd = Math.PI*2+Math.PI/8;
	
		//Context in Variable speichern
		var ctx = this.canvas.getContext("2d");

		//Farbe der Tachoscheibe
		ctx.fillStyle=getCol(this,1,"#999999");

		//Tachokreis zeichnen
		ctx.beginPath();
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height/2,0,2*Math.PI); //Kreis
		ctx.fill();

		//Wenn Zone vorhanden, dann Zeichnen
		if(this.toZone>0){
			this.setZone(); //TODO farbe
		}

		//Zeichnen der  inneren Umrisse
		ctx.beginPath();
		ctx.lineWidth=10;
		ctx.moveTo(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8);		//Anzeige		
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*3/8,arcBegin,arcEnd); // Anzeige
		ctx.lineTo(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8);		//Anzeige
		ctx.stroke();
		ctx.beginPath();
	}

	setLines(){
		//Context in Variable speichern
		var ctx = this.canvas.getContext("2d");

		//Schriftart setzen
		ctx.font = "bold 26px Comic Sans MS";
		ctx.textAlign = "center";

		//Zeichnen der Beschriftung der oberen Hälfte
		ctx.fillStyle=getCol(this,2,"#0000FF");

		//offset - Verschiebung um den inneren Kreis
		var offSet = 100;
		var anzTxt = 8;
		for (var i = 1; i <= anzTxt+1; i++) { 
		ctx.beginPath();
			//Ausrechnen von y-Koordinate aufgrund gegebenen x-Koordinate und Radius
			var y = parseInt(this.canvas.width-(Math.sqrt((this.canvas.width/2-offSet)*(this.canvas.width/2-offSet)-((this.canvas.width/2-offSet)*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI))*((this.canvas.width/2-offSet)*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)))));
			//ctx.arc(parseInt(this.canvas.width/2*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)+this.canvas.width/2),y-this.canvas.width/2,5,0,2*Math.PI)
			//ctx.fill();
			
			var outText = parseInt(i*this.toVal/10);
			ctx.fillText(outText,parseInt(this.canvas.width/2+((this.canvas.width/2-offSet)*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI))),y-this.canvas.height/2);

		}
		
		// Zeichnen der Beschriftung der unteren Hälfte (2Stück)
		var anzTxt = 9;
		for (var i = 0; i <= anzTxt+1; i++) { 
			//nur Punkte bei Beginn und Ende des Tachos berücksichtigen
			if(i==2 || i ==9){
				ctx.beginPath();

				//Ausrechnen von y-Koordinate aufgrund gegebenen x-Koordinate und Radius
				var y = 2*this.canvas.height-parseInt(this.canvas.width-(Math.sqrt((this.canvas.width/2-offSet)*(this.canvas.width/2-offSet)-((this.canvas.width/2-offSet)*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI))*((this.canvas.width/2-offSet)*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)))));
				//ctx.arc(parseInt(this.canvas.width/2*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI)+this.canvas.width/2),y-this.canvas.width/2,5,0,2*Math.PI)
				//ctx.fill();
				
				//Wenn erster oder letzer Wert, dann schreibe diese Werte
				var outText = ""
				if(i==2){
					outText = this.fromVal;
				}else{
					outText = this.toVal;
				}
				
				// delta - Verschiebung der zwei Werte nach oben (erster und letzer Wert)
				var delta = -10;
				
				ctx.fillText(outText,parseInt(this.canvas.width/2+((this.canvas.width/2-offSet)*Math.cos(((anzTxt-1)+i)/anzTxt*Math.PI))),y-this.canvas.height/2+delta);
			}	
		}
		
	}

	//Zone aufgrund der Parameter farblich hervorheben	
	setZone(){
		//Context in Variable speichern
		var ctx = this.canvas.getContext("2d");

		//Farbe der Zone setzen
		ctx.fillStyle=getCol(this,3,"#FF0000");

		//Zone zeichnen
		ctx.beginPath();
		ctx.moveTo(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8)
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*3/8,(Math.PI*7/8+1.25*Math.PI*((this.fromZone/this.toVal))),(Math.PI*7/8+1.25*Math.PI*((this.toZone/this.toVal)))); //Zonel
		ctx.fill();
	}
	
	//Methode zum setzen des Zeigers
	setValue(newValue){
		//Context in Variable speichern
		var ctx = this.canvas.getContext("2d");

		//Zeiger zeichnen
		ctx.beginPath();
		ctx.fillStyle=getCol(this,4,"#000000");
		ctx.moveTo(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8)
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*3/8,(Math.PI*7/8+1.25*Math.PI*((newValue/this.toVal)-1/64)),(Math.PI*7/8+1.25*Math.PI*((newValue/this.toVal)+1/64))); //Nadel
		//ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*3/8,(Math.PI*7/8+1.25*Math.PI*(parseInt((newValue-this.fromVal)/(parseInt(this.toVal)-parseInt(newValue))-1/64))),(Math.PI*7/8+1.25*Math.PI*(((parseInt((newValue-this.fromVal)/(parseInt(this.toVal)-parseInt(newValue))-1/64))))+1/64)); //Nadel
		ctx.fill();

		//Mittelpunkt über den Zeiger in die Mitte zeichnen
		ctx.beginPath();
		ctx.fillStyle="#000000"
		ctx.arc(this.canvas.width/2,this.canvas.height-this.canvas.height*4/8,this.canvas.height*1/32,0,2*Math.PI);
		ctx.fill();
	}

 }
 
//HTML-Tag erstellen
 customElements.define("c-tacho", Tacho);