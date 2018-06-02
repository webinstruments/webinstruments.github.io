//Klasse zum Zeichnen des Balkens

//Parameter
//
//	col1 	- Farbe des Füllung z.B.: "#FF00FF"
//	col2 	- Farbe der Beschriftung (Zahlen) z.B.: "#FF00FF"
//	col3 	- Farbe der Umrisse/Linien z.B.: "#FF00FF"
//	from 	- Parameter, von wo der Balken anzeigen beginnt || Wenn Parameter nicht gesetzt, ist der Wert "0"
//	to   	- Parameter, bis wohin der Balken anzeigt	|| Wenn der Parameter nicht gesetzt, ist der Wert "100"
//	myValue - Startwert des Balkens 			|| Wenn Parameter nicht gesetzt, ist der Wert "to"/2

//Einbindung Bsp.:
//
//	<c-balken id="meinBalken"></c-balken>
//	<c-balken myValue=100 id="meinBalken" from=50 to=150 col1="#000000" col2="#FF0000" col3="#0000FF"></c-balken>

'strict';
class Balken extends HTMLElement {

  constructor() {
	super();
		//Erstellen von Canvasobjekt
    		this.canvas = document.createElement("canvas"); 

		//Default Höhe und Breite für Canvas-Element
		//Canvas den Balken übergeben
		this.appendChild(this.canvas);

		
		
		//this.canvas.width = this.parentElement.clientWidth;
		this.canvas.width = 500;
		this.canvas.height = 500;
		this.drawHeight = 500;
		this.drawWidth = 500;
		
		// Klassen und Style hinzufügen
		//canvas.setAttribute('class', 'wi');
		this.canvas.style = "border:1px solid #000000";
		//this.setAttribute('class',  this.attributes.class.value);
		
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
		
		//Parameter "MYVALUE" übergeben? sonst Defaultwert
		if(paramExist(this,"myvalue")){
			this.defaultVal=this.attributes.myvalue.value;
		}else{
			this.defaultVal=this.toVal/2;
		}
		
		
		
		
		
		//Klassen und Style hinzufügen
		this.canvas.classList.add("wi");
		
		//Context in Variable speichern
		var ctx = this.canvas.getContext("2d");
		
		//Defaultzeichnung für Balken zeichnen (Umriss)
		//ctx.strokeStyle=this.canvas.style;
		ctx.lineWidth=10;
		ctx.strokeRect(this.drawWidth/4,this.drawHeight-this.drawHeight*3/4,this.drawWidth/2,this.drawHeight*3/4);
		ctx.fillStyle=getCol(this,1,"#FFFFFF");
		ctx.fillRect(this.drawWidth/4+parseInt(ctx.lineWidth)/2,this.drawHeight-parseInt((this.defaultVal-this.fromVal)/(parseInt(this.toVal)-parseInt(this.fromVal))*this.drawHeight*3/4),this.drawWidth/2-parseInt(ctx.lineWidth),parseInt((this.defaultVal-this.fromVal)/(parseInt(this.toVal)-parseInt(this.fromVal))*this.drawHeight*3/4));
		//ctx.scale(this.canvas.width/this.drawWidth,this.canvas.height/this.drawHeight);
	}
	//Variablen, die bei Änderung überwacht werden
	static get observedAttributes() {
		return ['clientWidth', 'myvalue'];
	}
	
	//Methode wird aufgerufen, wenn sich eine Überwachende Variable ändert
	attributeChangedCallback(name, oldValue, newValue) {
		
		//Context in Variable speichern
		var ctx = this.canvas.getContext("2d");
		
		//this.canvas.setAttribute('class', 'wi co');
		
		//Balken Umrandung zeichnen
		//Farbe Umrandung
		ctx.strokeStyle=getCol(this,3,"#000000");
		ctx.beginPath();
		ctx.clearRect(this.drawWidth/4+1,1,this.drawWidth/2-2,this.drawHeight-1)
		ctx.lineWidth=15;
		ctx.strokeRect(this.drawWidth/4,this.drawHeight-this.drawHeight*3/4,this.drawWidth/2,this.drawHeight*3/4);
		//Farbe Füllung
		ctx.fillStyle=getCol(this,1,"#FF0033");
		ctx.fillRect(this.drawWidth/4+parseInt(ctx.lineWidth)/2,this.drawHeight-parseInt((newValue-this.fromVal)/(parseInt(this.toVal)-parseInt(this.fromVal))*this.drawHeight*3/4),this.drawWidth/2-parseInt(ctx.lineWidth),parseInt((newValue-this.fromVal)/(parseInt(this.toVal)-parseInt(this.fromVal))*this.drawHeight*3/4));
		ctx.lineWidth=10;
		
		//Dicke Linien und Beschriftung zeichnen
		for (var i = 0; i < 5; i++) { 
			//Farbe Beschriftung
			ctx.fillStyle=getCol(this,2,"#000000");
			ctx.beginPath();
			ctx.moveTo(this.drawWidth/4,this.drawHeight-this.drawHeight*3/4*(i/4)); // 1/2
			ctx.lineTo(this.drawWidth*3/8,this.drawHeight-this.drawHeight*3/4*(i/4));
			ctx.stroke();
			ctx.font=this.drawHeight/10+"px Arial" 
			if(i!=0){
				var outText = parseInt((this.toVal-this.fromVal)*i/4+parseInt(this.fromVal));
				var sizeText = parseInt(ctx.measureText(outText).width);
				ctx.fillText(outText,this.drawWidth/4-sizeText-this.drawWidth/32,this.drawHeight-this.drawHeight*3/4*(i/4)+this.drawHeight/30);
			}else{
			var sizeText = parseInt(ctx.measureText(this.fromVal).width);
			ctx.fillText(this.fromVal,this.drawWidth/4-sizeText-this.drawWidth/32,this.drawHeight);
			}
		}

		//Zwischenlinien zeichnen
		ctx.lineWidth=5;
		var numLines = 20;
		for (var i = 1; i <= numLines; i++) { 
			ctx.beginPath();
			ctx.moveTo(this.drawWidth/4,this.drawHeight-this.drawHeight*3/4*(i/(numLines))); // 1/2
			ctx.lineTo(this.drawWidth*5/16,this.drawHeight-this.drawHeight*3/4*(i/(numLines)));
			ctx.stroke();
		}
	}

	
}


 //HTML Tag erstellen
customElements.define("c-balken", Balken);