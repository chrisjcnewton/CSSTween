/**
 * CSS TWEEN
 * A JavaScript library for Tweening DOM Objects using CSS transitions
 * 
 * @author Chris Newton - Twitter (@chrisjcnewton)
 * @constructor
 */	
 
 
var CSSTween = function(target, duration, vars){
	
	var cssParams = "";
	var easeProp = "";
	var x = 0, y = 0, scaleX = 1, scaleY = 1,rotation = 0, cssTransitions, cssTransforms;
	var callBackFunction = undefined;
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
				cssParams += i +":"+ vars[i]+";";
				break;	
		}
	}
	
	if (easeProp === "") easeProp = "ease-out";
	
	
	if(callBackFunction != undefined){
	  	target.addEventListener("webkitTransitionEnd", onTransitionEnd, false);
	  	target.addEventListener("MSTransitionEnd", onTransitionEnd, false);
	  	target.addEventListener("oTransitionEnd", onTransitionEnd, false);
	  	target.addEventListener("transitionend", onTransitionEnd, false);
  	}  
  	

	cssTransitions = "-moz-transition: all "+duration+"s "+easeProp+
					 ";-webkit-transition: all "+duration+"s "+easeProp+
					 ";-ms-transition: all "+duration+"s "+easeProp+
					 ";-o-transition: all "+duration+"s "+easeProp+
					 ";transition: all "+duration+"s "+easeProp+";";
	
	cssTransforms = "-webkit-transform: translate3d("+x+"px,"+y+"px,0px) rotateZ("+rotation+"deg) scale("+scaleX+","+scaleY+");"
				  + "-moz-transform: translate("+x+"px,"+y+"px) rotate("+rotation+"deg) scale("+scaleX+","+scaleY+");;"
				  + "-ms-transform: translate("+x+"px,"+y+"px) rotate("+rotation+"deg) scale("+scaleX+","+scaleY+");;"
				  + "-o-transform: translate("+x+"px,"+y+"px) rotate("+rotation+"deg) scale("+scaleX+","+scaleY+");;"
				  + "transform: translate3d("+x+"px,"+y+"px,0px) rotate("+rotation+"deg) scale("+scaleX+","+scaleY+");;";
				  
	target.setAttribute("style",cssTransitions + cssParams + cssTransforms);	
		
};

// Static Method
CSSTween.to = function(target, duration, vars) {
	return new CSSTween(target, duration, vars);
};