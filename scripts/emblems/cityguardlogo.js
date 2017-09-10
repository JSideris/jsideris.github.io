
function cityguardLogo(targetSelector){
	return new InteractiveEmblem(targetSelector, 1, {
		draw: function(emblem, dot, dotcss){
			dotcss(emblem.outerNode).backgroundColor("white");
			var n = dot.div().style(dotcss.position("absolute").width(emblem.innerNode.offsetWidth * 0.75).height(emblem.innerNode.offsetHeight * 0.75).topP(12.5).leftP(12.5).backgroundImage("./images/logoassets/cityguardlogoL1.png").backgroundSize("cover"))
			emblem.cityLayer = n.getLast();
			n.div().style(dotcss.position("absolute").width(emblem.innerNode.offsetWidth * 0.75).height(emblem.innerNode.offsetHeight * 0.75).topP(12.5).leftP(12.5).backgroundImage("./images/logoassets/cityguardlogoL2.png").backgroundSize("cover").transform("rotate(90deg)"))
			emblem.cLayer = n.getLast();
			n.div().style(dotcss.position("absolute").width(emblem.innerNode.offsetWidth * 0.75).height(emblem.innerNode.offsetHeight * 0.75).topP(12.5).leftP(12.5).backgroundImage("./images/logoassets/cityguardlogoL3.png").backgroundSize("cover").transform("rotate(-90deg)"))
			emblem.gLayer = n.getLast();
			return n;
		},
		play: function(emblem, dot, dotcss){
			dotcss(emblem.gLayer).transform.animate("rotate(0deg)", 1000, "exponential");
			dotcss(emblem.cLayer).transform.animate("rotate(0deg)", 1000, "exponential");
		},
		skip: function(emblem, dot, dotcss){
			//This won't actually cancel the animation...
			//dotcss(emblem.gLayer).transform("rotate(0deg)");
			//dotcss(emblem.cLayer).transform("rotate(0deg)");
		},
		resize: function(emblem, dot, dotcss){
			dotcss(emblem.cityLayer).width(emblem.innerNode.offsetWidth * 0.75).height(emblem.innerNode.offsetHeight * 0.75);
			dotcss(emblem.cLayer).width(emblem.innerNode.offsetWidth * 0.75).height(emblem.innerNode.offsetHeight * 0.75);
			dotcss(emblem.gLayer).width(emblem.innerNode.offsetWidth * 0.75).height(emblem.innerNode.offsetHeight * 0.75);
		}
	});
}