var displayBoxLeft = false;
dot.createWidget("displayBox", function(previewBuilder, descriptionBuilder, onScrollTo){
	displayBoxLeft = !displayBoxLeft;
	var box = dot.div(
		dot.canvas().class("gearsbg " + (displayBoxLeft ? "rightgearbg": "leftgearbg"))
		.div(
			dot.if(displayBoxLeft, function(){
				return dot
				.div(descriptionBuilder).class("description")
				.div(previewBuilder).class("preview")
			})
			.else(function(){
				return dot
				.div(previewBuilder).class("preview")
				.div(descriptionBuilder).class("description")
			})
		).class("widgetSlider " + (displayBoxLeft ? "leftSlider": "rightSlider"))
	).class("widgetContainer");
	
	//var ce = box._ce;
	var ce = $(box.lastNode);
	//console.log(box);
	//console.log(ce);
	var triggered = false;
	
	if(onScrollTo){
		$(window).scroll(function(data){
			if(!triggered && $(window).scrollTop() + $(window).height() > ce.offset().top + ce.height() ){
				//console.log(onScrollTo);
				onScrollTo();
				triggered = true;
			}
		});
	}
	
	return box;
});

dot.createWidget("fadedImageBackground", function(imageSrc, r, g, b, a, textAlign, contentBuilder){
	return dot.div().style("background-image: url(\"" + imageSrc + "\"); background-size: cover; background-position: center; width: 100%; height: 100%;")
	.div().style("position: absolute; top: 0px; width: 100%; height: 100%; background-color: rgba(" + r + ", " + g + ", " + b + ", " + a + ");")
	.div(contentBuilder).style("position: absolute; width: 100%; top: 20px; left: 20px; vertical-align: top; text-align: " + textAlign + ";")
});

dot.createWidget("videoCategory", function(name, videoIds, playVideoCallback){
	var vidGrid = [];
	var vidRow = [];
	for(var i = 0; i < videoIds.length; i++){
		vidRow.push(videoIds[i]);
		if((i+1) % 3 == 0) {
			vidGrid.push(vidRow); 
			vidRow = [];
		}
	}
	//This is a buffer to add to the bottom of the grid
	//so that the page doesn't appear ugly on large screens.
	if(vidRow != []) vidGrid.push(vidRow);
	return dot.tab(name, dot.each(vidGrid, function(row){
		return dot.div(
			dot.each(row, function(element){
				return dot.div(
					dot.img().src("https://img.youtube.com/vi/" + element + "/0.jpg").style("width: 100%;cursor:pointer;")
					.onclick(function(){
						playVideoCallback(videoIds, videoIds.indexOf(element));
					})
				).class("col-md-4").style("width: 33%;");
			})
		).class("row").style("width: 100%;");
	}));
});