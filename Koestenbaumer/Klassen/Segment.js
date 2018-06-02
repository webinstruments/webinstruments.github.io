class BAnzeige extends HTMLElement {

  constructor() {
	super();
    	var canvas = document.createElement("canvas"); 
		canvas.classList.add("wi");
	canvas.style = "border:1px solid #000000";
	canvas.width  = 500;
	canvas.height = 500;
	var defaultVal = this.attributes.open.value ;
    	var myCan = this.appendChild(canvas);
	myCan.id = "myCan";
     	var ctx = myCan.getContext("2d");
 	ctx.strokeRect(myCan.width,myCan.height-myCan.height,myCan.width,myCan.height);
	ctx.fillRect(myCan.width,myCan.height,myCan.width,myCan.height);
	ctx.fillStyle="#00FF00";
	this.drawA1(myCan);
	this.drawF(myCan);
	this.drawB(myCan);
	this.drawG1(myCan);
	this.drawE(myCan);
	this.drawC(myCan);
	
	this.drawD1(myCan);
	
}

 static get observedAttributes() {
    return ['disabled', 'myvalue'];
  }


 attributeChangedCallback(name, oldValue, newValue) {

	var myCan = this.lastChild;
	this.drawClean(myCan);
	var ctx = myCan.getContext("2d");
	//ctx.scale(2,1.2);
	//ctx.translate(-myCan.width/4,-myCan.height/12);
	switch(newValue){
	case "0":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawK(myCan);
		this.drawJ(myCan);
	break;

	case "1":
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "2":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawB(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "3":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawB(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawC(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "4":
		this.drawF(myCan);
		this.drawB(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawC(myCan);
	break;

	case "5":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawC(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "6":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawC(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "7":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "8":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "9":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;
	
	case "A":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "B":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawI(myCan);
		this.drawL(myCan);
		this.drawG2(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "C":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "D":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawI(myCan);
		this.drawL(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "E":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "F":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
	break;

	case "G":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG2(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);

		this.drawC(myCan);
	break;

	case "H":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "i":
	case "I":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawI(myCan);
		this.drawL(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "J":
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "K":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawJ(myCan);
		this.drawM(myCan);
	break;

	case "L":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "M":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawH(myCan);
		this.drawJ(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "N":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawH(myCan);
		this.drawM(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "O":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "P":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawB(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
	break;

	case "Q":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
		this.drawM(myCan);
	break;

	case "R":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawB(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawM(myCan);
	break;

	case "S":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawC(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;

	case "T":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawI(myCan);
		this.drawL(myCan);
	break;

	case "U":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "V":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawK(myCan);
		this.drawJ(myCan);
	break;

	case "W":
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawK(myCan);
		this.drawM(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
	break;

	case "X":
		this.drawK(myCan);
		this.drawM(myCan);
		this.drawH(myCan);
		this.drawJ(myCan);
	break;

	case "Y":
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawF(myCan);
		this.drawL(myCan);
		this.drawB(myCan);
	break;

	case "Z":
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawJ(myCan);
		this.drawK(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
	break;
 
	case " ":
	
	break;
	default:
		this.drawA1(myCan);
		this.drawA2(myCan);
		this.drawF(myCan);
		this.drawE(myCan);
		this.drawG1(myCan);
		this.drawG2(myCan);
		this.drawD1(myCan);
		this.drawD2(myCan);
		this.drawB(myCan);
		this.drawC(myCan);
		this.drawH(myCan);
		this.drawI(myCan);
		this.drawJ(myCan);
		this.drawK(myCan);
		this.drawL(myCan);
		this.drawM(myCan);
	
	}

	
}
	drawClean(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle= getCol(this,1,"#000000"); // "#000000";
		ctx.fillRect(0,0,myCan.width,myCan.height);
	}
	
	drawA1(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/3,myCan.height*3/18,myCan.width/6-myCan.width/72,myCan.height/24);//oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/3+myCan.width*1/108,myCan.height*3/18+myCan.height/96,myCan.width/6-myCan.width*2/108-myCan.width*1/72,myCan.height/24-myCan.height*2/96);//oben
	}
	drawA2(myCan){
		var ctx = myCan.getContext("2d");
		
		ctx.stroke();
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		
		ctx.fillRect(myCan.width/2+myCan.width/72,myCan.height*3/18,myCan.width/6-myCan.width/72,myCan.height/24);//oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width*1/2+myCan.width/72+myCan.width*1/108,myCan.height*3/18+myCan.height/96,myCan.width/6-myCan.width*2/108-myCan.width*1/72,myCan.height/24-myCan.height*2/96);//oben
	}
	drawG1(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/3,myCan.height*36/72-myCan.height/48,myCan.width/6-myCan.width/72,myCan.height/24); //mitte
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/3+myCan.width*1/108,myCan.height*36/72+myCan.height/96-myCan.height/48,myCan.width/6-myCan.width*2/108-myCan.width*1/72,myCan.height/24-myCan.height*2/96); //mitte
	}

	drawG2(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/2+myCan.width/72,myCan.height*36/72-myCan.height/48,myCan.width/6-myCan.width/72,myCan.height/24); //mitte
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width*1/2+myCan.width/72+myCan.width*1/108,myCan.height*36/72+myCan.height/96-myCan.height/48,myCan.width/6-myCan.width*2/108-myCan.width*1/72,myCan.height/24-myCan.height*2/96); //mitte
	}
	drawD1(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/3,myCan.height*54/72+myCan.height/24,myCan.width/6-myCan.width/72,myCan.height/24); //unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/3+myCan.width*1/108,myCan.height*54/72+myCan.height/96+myCan.height/24,myCan.width/6-myCan.width*2/108-myCan.width*1/72,myCan.height/24-myCan.height*2/96); //unten
	}
	drawD2(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/2+myCan.width/72,myCan.height*54/72+myCan.height/24,myCan.width/6-myCan.width/72,myCan.height/24); //unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width*1/2+myCan.width/72+myCan.width*1/108,myCan.height*54/72+myCan.height/96+myCan.height/24,myCan.width/6-myCan.width*2/108-myCan.width*1/72,myCan.height/24-myCan.height*2/96); //unten
	}
	drawF(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/3-myCan.width/48-myCan.width/48,myCan.height*4/18,myCan.width/24,myCan.height*18/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/3-myCan.width*2/108-myCan.width/72,myCan.height*4/18+myCan.height/64,myCan.width/24-myCan.width*2/108,myCan.height*18/72-myCan.height*2/64); //links oben
	}
	drawB(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width*2/3-myCan.width/48+myCan.width/48,myCan.height*4/18,myCan.width/24,myCan.height*18/72); //rechts oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width*2/3-myCan.width/48+myCan.width/48+myCan.width*1/108,myCan.height*4/18+myCan.height/64,myCan.width/24-myCan.width*2/108,myCan.height*18/72-myCan.height*2/64); //rechts oben klein
	}
	drawE(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/3-myCan.width/48-myCan.width/48,myCan.height*38/72,myCan.width/24,myCan.height*18/72); //links unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/3-myCan.width*2/108-myCan.width/72,myCan.height*38/72+myCan.height/64,myCan.width/24-myCan.width*2/108,myCan.height*18/72-myCan.height*2/64); //links unten
	}
	drawC(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width*2/3-myCan.width/48+myCan.width/48,myCan.height*38/72,myCan.width/24,myCan.height*18/72); //rechts unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width*2/3-myCan.width/48+myCan.width/48+myCan.width*1/108,myCan.height*38/72+myCan.height/64,myCan.width/24-myCan.width*2/108,myCan.height*18/72-myCan.height*2/64); //rechts unten klein
	}
	drawL(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/2-myCan.width/48,myCan.height*38/72,myCan.width/24,myCan.height*18/72); //links unten
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/2-myCan.width*1/90,myCan.height*38/72+myCan.height/64,myCan.width/24-myCan.width*2/108,myCan.height*18/72-myCan.height*2/64); //links unten
	}
	drawI(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.fillRect(myCan.width/2-myCan.width/48,myCan.height*4/18,myCan.width/24,myCan.height*18/72); //rechts oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/2-myCan.width*1/90,myCan.height*4/18+myCan.height/64,myCan.width/24-myCan.width*2/108,myCan.height*18/72-myCan.height*2/64); //rechts oben klein
	}
	drawH(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(-24*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );	
		ctx.fillRect(myCan.width/2-myCan.width/28,myCan.height*13/72,myCan.width/36,myCan.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/2-myCan.width*2/74,myCan.height*13/72+myCan.height/64,myCan.width/36-myCan.width*2/108,myCan.height*20/72-myCan.height*2/64); //links oben
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(24*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );
}

	drawJ(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(24*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );	
		ctx.fillRect(myCan.width/2+myCan.width/112,myCan.height*13/72,myCan.width/36,myCan.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/2+myCan.width*2/112,myCan.height*13/72+myCan.height/64,myCan.width/36-myCan.width*2/108,myCan.height*20/72-myCan.height*2/64); //links oben
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(-24*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );
}
	drawM(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(156*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );	
		ctx.fillRect(myCan.width/2-myCan.width/28,myCan.height*13/72,myCan.width/36,myCan.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/2-myCan.width*2/74,myCan.height*13/72+myCan.height/64,myCan.width/36-myCan.width*2/108,myCan.height*20/72-myCan.height*2/64); //links oben
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(-156*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );
}

	drawK(myCan){
		var ctx = myCan.getContext("2d");
		ctx.fillStyle=getCol(this,2,"#00FF00"); //"#00FF00";
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(-156*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );	
		ctx.fillRect(myCan.width/2+myCan.width/112,myCan.height*13/72,myCan.width/36,myCan.height*20/72); //links oben
		var colHex = hexToRgb(getCol(this,2,"#00FF00"));		
		ctx.fillStyle= rgbToHexDark(colHex);
		ctx.fillRect(myCan.width/2+myCan.width*2/112,myCan.height*13/72+myCan.height/64,myCan.width/36-myCan.width*2/108,myCan.height*20/72-myCan.height*2/64); //links oben
		ctx.translate( myCan.width/2, myCan.height/2 );
		ctx.rotate(156*Math.PI/180);
		ctx.translate( -myCan.width/2, -myCan.height/2 );

	}
}

customElements.define("c-banzeige", BAnzeige);