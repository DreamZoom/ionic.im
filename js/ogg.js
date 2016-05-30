document.addEventListener("plusready",function(){
	
	document.addEventListener("click",function(){
		var player = plus.audio.createPlayer('/system/media/audio/ui/Effect_Tick.ogg');
		player.play();
		
	});

});