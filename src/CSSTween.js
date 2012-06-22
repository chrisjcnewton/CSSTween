/**
 * CSS TWEEN
 * A JavaScript library for Tweening DOM Objects using CSS transitions
 * 
 * @author Chris Newton - Twitter (@chrisjcnewton)
 * @constructor
 */	
 
 
var CSSTween = function(target, duration, vars){
	
	// var cssParams = "";
	// var cssParams = {};
	var cssParams = [], easeProp = "";
	var x,y, scaleX, scaleY,rotation, cssTransitions, cssTransforms;
	var callBackFunction = undefined;
	var calculatedTransforms, currentMatrix, currentMatrixArray, currentScale, currentAngle, currentX, currentY;
		
	var onTransitionEnd = function(event) {
  		target.removeEventListener("webkitTransitionEnd", onTransitionEnd, false);
		target.removeEventListener("MSTransitionEnd", onTransitionEnd, false);
	  	target.removeEventListener("oTransitionEnd", onTransitionEnd, false);
	  	target.removeEventListener("transitionend", onTransitionEnd, false);
	  	
		callBackFunction.call();
	}
	
	if (typeof target !== 'object'){
		throw new Error("First Parameter (target) should be a DOM Object: for CSSTween(taget, duration, vars);");
	}

	for (var i in vars){
		switch(i){
			case "ease":
				easeProp = vars[i];
				break;
			case "onComplete":
				callBackFunction = vars[i];
				break;
			case "left":
			case "x":
				x = vars[i];
				break;
			case "top":
			case "y":
				y = vars[i];
				break;
			case "rotation":
				rotation = vars[i];
				break;
			case "scaleX":
				scaleX = vars[i];
				break;
			case "scaleY":
				scaleY = vars[i];
				break;
			default:
				//cssParams += i +":"+ vars[i]+";";
				cssParams.push([i,vars[i]]);
				// cssParams[i] = vars[i];
				break;	
		}
	}
	console.log(cssParams);
	
	if (easeProp === "") easeProp = "ease-out";
	
	
	if(callBackFunction != undefined){
	  	target.addEventListener("webkitTransitionEnd", onTransitionEnd, false);
	  	target.addEventListener("MSTransitionEnd", onTransitionEnd, false);
	  	target.addEventListener("oTransitionEnd", onTransitionEnd, false);
	  	target.addEventListener("transitionend", onTransitionEnd, false);
  	}  
  	

	

	
	/*
	*											---	2D Matrices ---
	* 
	*	scale(a)	scaleX(x)	scaleY(y)	translateX(x)	translateY(y)	translate(x,y)		rotate(0)
	* 
	* 	| a 0 0 |	| x 0 0 | 	| 1 0 0 |	| 1 0 x | 		| 1 0 0 |		| 1 0 x |		| cos0 -sin0 	0 |
	* 	| 0 a 0 |	| 0 1 0 | 	| 0 y 0 |	| 0 1 0 | 		| 0 1 y |		| 0 1 y |		| sin0 	cos0 	0 |
	* 	| 0 0 1 |	| 0 0 1 | 	| 0 0 1 |	| 0 0 1 | 		| 0 0 1 |		| 0 0 1 |		| 0 	0 		1 |
	* 
	* 
	* 	matrix(1,2,3,4,5,6) = 	| 1 3 5 |
	* 							| 2 4 6 |
	* 							| 0 0 1 |
	* 
	*/
	
	 currentMatrix = window.getComputedStyle(target, null).getPropertyValue("-webkit-transform");
	//currentMatrix = window.getComputedStyle(target, null).getPropertyValue("-moz-transform");
	currentMatrixArray = matrixToArray(currentMatrix);
console.log(currentMatrixArray);	
	currentScale = Math.sqrt(currentMatrixArray[0]*currentMatrixArray[0] + currentMatrixArray[1]*currentMatrixArray[1]);
	currentAngle = Math.round(Math.atan2(currentMatrixArray[1], currentMatrixArray[0]) * (180/Math.PI));
	currentX = currentMatrixArray[4];
	currentY = currentMatrixArray[5];
	
	function matrixToArray(matrix) {
    	return matrix.substr(7, matrix.length - 8).split(', ');
	}
	
	console.log("scale = "+currentScale);
	console.log("angle = "+ currentAngle);
	console.log("x = "+currentX+"   y = "+currentY);
	
	//var currentTransforms = target.style['-webkit-transform'];
	
	calculatedTransforms = x===undefined? "translateX("+currentX+"px) ":"translateX("+x+"px) ";
	calculatedTransforms += y===undefined? "translateY("+currentY+"px) ":"translateY("+y+"px) ";
	calculatedTransforms += rotation===undefined? "rotateY("+currentAngle+"deg) ": "rotateY("+rotation+"deg) ";
	calculatedTransforms += scaleX===undefined? "scaleX("+currentScale+") ":"scaleX("+scaleX+") ";
	calculatedTransforms += scaleY===undefined? "scaleY("+currentScale+") ":"scaleY("+scaleY+") ";
	console.log(">>>>>>>  "+calculatedTransforms);
	
	target.style.setProperty("-webkit-transition", "all "+duration+"s "+easeProp);
	target.style.setProperty("-webkit-transform",calculatedTransforms);
	
	for(var j = 0; j < cssParams.length; j++){	
		target.style[cssParams[j][0]] = cssParams[j][1];
	}
	
	//console.log("''''''''''''''''''''''''''''"+window.getComputedStyle(target).webkitTransform());
	
};

// Static Method
CSSTween.to = function(target, duration, vars) {
	return new CSSTween(target, duration, vars);
};