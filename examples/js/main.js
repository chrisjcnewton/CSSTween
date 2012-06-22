(function(window){
	window.onload = function () {
		
		var block = document.getElementById("block");
		
		//CSSTween.to(block,2, {x:300, y:500, scaleX:1.5, scaleY:1.5, rotation:150, 'opacity':0.1, 'background-color':'blue', ease:'ease-in-out', onComplete:callBack});
		
		
		CSSTween.to(block,2, {x:300, y:500, scaleX:1.5, scaleY:1.5, rotation:180,  'backgroundColor':'blue', ease:'ease-in-out', onComplete:callBack});
		
		function callBack(){
			
			CSSTween.to(block,3, {left:200,y:100, rotation:20, ease:'ease-in-out', onComplete:callBack2});
		}
		
		function callBack2(){
			console.log("Transition 2 End!!!!");
		}

	};
})(window);
