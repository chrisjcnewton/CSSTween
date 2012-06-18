(function(window){
	window.onload = function () {
		
		var block = document.getElementById("block");
		var car = document.getElementById("car");
		
		CSSTween.to(block,2, {x:300, y:500, scaleX:1.5, scaleY:1.5, rotation:150, 'opacity':0.1, 'background-color':'blue', ease:'ease-in-out', onComplete:callBack});
		
		//block.style.position = "absolute";
		

		function callBack(){
			console.log("Transition End!!!!");
			CSSTween.to(car,2, {y:500, ease:'ease-in-out', onComplete:callBack2});
		}
		
		function callBack2(){
			console.log("Transition 2 End!!!!");
		}

	};
})(window);
