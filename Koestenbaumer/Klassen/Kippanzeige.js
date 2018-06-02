// Klasse zum Zeichnen der Kippanzeige

// Parameter
//	col1 - Farbe des Hintergrundes z.B.: "#00FF00"
//	col2 - Farbe der Beschriftung z.B.: "#0000FF"	
//	col3 - Farbe der Umrandung z.B.: "#0000FF"
//	myValue - Startwert der Kippanzeige  z.B.: "A" 		|| Wenn nicht gesetzt ist der Startwert ""

// Einbindung Bsp:
//
// 	
//	


class KippAnzeige extends HTMLElement {

  
  constructor() {
	super();

	//Erstellen von Canvasobjekt
    	this.canvas = document.createElement("canvas"); 

	//Default Höhe und Breite für Canvas-Element	
	this.canvas.height = 500;
	this.canvas.width = 252;

	// Klassen und Style hinzufügen
	//canvas.setAttribute('class', 'wi');
	this.canvas.style = "border:1px solid #000000";
	this.canvas.classList.add("wi");
	//this.setAttribute('class',  this.attributes.class.value);

	//Parameter "MYVALUE" übergeben? sonst Defaultwert
	if(paramExist(this,"myvalue")){
		this.defaultVal=this.attributes.myvalue.value;
	}else{
		this.defaultVal=" ";
	}

	//Canvas der Kippanzeige übergeben
    	this.appendChild(this.canvas);
		
	}

//Variablen, die bei Änderung überwacht werden
 static get observedAttributes() {
    return ['myvalue'];
  }
//Methode wird aufgerufen, wenn sich eine Überwachende Variable ändert
attributeChangedCallback(name, oldValue, newValue) {
	if(oldValue==null) oldValue = " ";
	if(oldValue!=newValue){

	
		var ctx = this.canvas.getContext("2d");

		ctx.beginPath();
		ctx.fillStyle=getCol(this,1,"#999999");
		ctx.clearRect(this.canvas.width/4+1,1,this.canvas.width/2-2,this.canvas.height-1)
		ctx.lineWidth=15;
		ctx.strokeStyle=getCol(this,3,"#000000");
		roundRect(ctx, this.canvas.width*1/9,this.canvas.height-this.canvas.height*7/8,this.canvas.width*7/9,this.canvas.height*6/8,50);
		ctx.fillStyle=getCol(this,1,"#999999");
		roundRect(ctx, this.canvas.width*1/9+6,this.canvas.height-this.canvas.height*7/8+6,this.canvas.width*7/9-12,this.canvas.height*6/8-12,40,true,false);
		

		//DefaultWert schreiben --> Leer
		ctx.font = "Bold 250px Calibri";
		ctx.fillStyle=getCol(this,2,"#FFFFFF");
		//var outText =oldValue;
		//if(outText==undefined) outText = " ";
		//ctx.fillText(outText, this.canvas.width*1/2-ctx.measureText(outText).width/2, this.canvas.height/2+82);
		
		//Zeichnen der Scharniere
		
		ctx.lineWidth=4;
		roundRect(ctx, this.canvas.width*1/9+this.canvas.width*1/24-2,this.canvas.height/2-this.canvas.height*1/16,this.canvas.width*1/12,this.canvas.height*1/8,10);
		roundRect(ctx, this.canvas.width*8/9-this.canvas.width*1/12-8,this.canvas.height/2-this.canvas.height*1/16,this.canvas.width*1/12,this.canvas.height*1/8,10);
 		ctx.fillStyle = "#B5B5B5";
		roundRect(ctx, this.canvas.width*1/9+this.canvas.width*1/24-1,this.canvas.height/2-this.canvas.height*1/16+1,this.canvas.width*1/12-2,this.canvas.height*1/8-2,10,true,false);
		roundRect(ctx, this.canvas.width*8/9-this.canvas.width*1/12-7,this.canvas.height/2-this.canvas.height*1/16+1,this.canvas.width*1/12-2,this.canvas.height*1/8-2,10,true,false);
		
		ctx.beginPath();	
		ctx.lineWidth=8;
		ctx.moveTo(this.canvas.width*1/9+this.canvas.width*3/24, this.canvas.height/2);
		ctx.lineTo(this.canvas.width*8/9-this.canvas.width*3/24+1,this.canvas.height/2);
		ctx.stroke();		
		var that = this;
		//setTimeout(function(){that.flip(1,newValue,0);},1);
			
			
		 
		

		//ctx.lineWidth=10;
		//ctx.fillStyle=getCol(this,2,"#000000");
		


		//ctx.lineWidth=5;
		
		//var numLines = 20;
      

     		//Schreiben der Zeichen
		ctx.font = "Bold 250px Calibri";
		ctx.fillStyle=getCol(this,2,"#FFFFFF");
		var outText =newValue;
		ctx.fillText(newValue, this.canvas.width*1/2-ctx.measureText(newValue).width/2, this.canvas.height/2+82);
	
		ctx.beginPath();	
		ctx.lineWidth=8;
		ctx.moveTo(this.canvas.width*1/9+this.canvas.width*3/24, this.canvas.height/2);
		ctx.lineTo(this.canvas.width*8/9-this.canvas.width*3/24+1,this.canvas.height/2);
		ctx.stroke();
      

	}	

}

flip(i,newValue,offset){
	var ctx = this.canvas.getContext("2d");
 	ctx.fillStyle=getCol(this,1,"#000000");
	if(i<=this.canvas.height*2/8-4){

		ctx.fillRect(this.canvas.width*1/9+this.canvas.width*3/24,this.canvas.height*2/8+parseInt(i)+parseInt(offset),this.canvas.width*5/8-this.canvas.width*1/12-3,5);
		i=i+4;
		var that = this;
		setTimeout(function(){that.flip(i,newValue,offset);},10);
	}else{

		//Schreiben der Zeichen
		ctx.font = "Bold 250px Calibri";
		ctx.fillStyle=getCol(this,2,"#FFFFFF");
		var outText =newValue;
		ctx.fillText(newValue, this.canvas.width*1/2-ctx.measureText(newValue).width/2, this.canvas.height/2+82);
	
		ctx.beginPath();	
		ctx.lineWidth=8;
		ctx.moveTo(this.canvas.width*1/9+this.canvas.width*3/24, this.canvas.height/2);
		ctx.lineTo(this.canvas.width*8/9-this.canvas.width*3/24+1,this.canvas.height/2);
		ctx.stroke();
		if(offset==0){
			var that = this;
			setTimeout(function(){that.flip(1,newValue,that.canvas.height*1/4+3);},10);
		}
	}

}


	
}



customElements.define("c-kanzeige", KippAnzeige);