

function MinimaLogo(targetSelector){
	return new InteractiveEmblem(targetSelector, 1, {
		draw: function(emblem, dot, dotcss){
			dotcss(emblem.outerNode).backgroundColor("#f36523");
			return dot.div().style(dotcss.position("relative").widthP(75).heightP(75).topP(12.5).leftP(12.5).backgroundImage("./images/logoassets/minima.png").backgroundSize("cover"))
		},
		play: function(emblem, dot, dotcss){
			emblem.animate = true;
			MinimaLogo.animation({emblem: emblem, element: emblem.innerNode, bottlewords: [],  playing: false}, dot, dotcss);
		},
		skip: function(emblem, dot, dotcss){
			emblem.animate = false;
		},
		resize: function(emblem, dot, dotcss){
			//In this case I don't really think I need this, but it will be a problem in other logos.
		}
	});
}

//MinimaLogo.allEmbelms = [];

MinimaLogo.animation = function(e, dot, dotcss){
	if(!e.playing && e.emblem.animate){ //lock
		e.playing = true;

		if(e.lastWidth && e.lastWidth != e.emblem.outerNode.offsetWidth){
			e.emblem.resize();
		}
		e.lastWidth = e.emblem.outerNode.offsetWidth;

		var mul = e.element.offsetWidth / 485.3;
		var oLeft = 335;
		var oTop = 100;

		for (var k = e.bottlewords.length - 1; k >= 0; k--){
			var m = e.bottlewords[k];
			if(!m.element) continue;
			m.x += m.xs;
			m.y += m.ys;
			m.ys += 3;
			m.r += m.rs;
			m.life--;
			if(m.life > 0){
				dotcss(m.element).left.animate(m.x * mul, 200);
				dotcss(m.element).top.animate(m.y * mul, 200);
				dotcss(m.element).opacity.animate(1 - (1 - m.life * 0.05) * (1 - m.life * 0.05), 200);
				//dotcss(m.element).transform.animate("rotate(" + m.r + "rad)", 200); //This is dumb.
			}
			else{
				e.bottlewords.splice(k, 1);
				e.element.removeChild(m.element);
			}
		}
		if(Math.random() > .2){
			var newM = dot(e.element).p("m").class("minimalogo-m").style(dotcss.position("absolute").top(oTop * mul).left(oLeft * mul).color("white").fontSize(1 + Math.max(0, Math.round((15 + (Math.random() - 0.5) * 20) * mul))).fontFamily("\"Helvetica Neue\", Helvetica, Arial, sans-serif").opacity(0));
			e.bottlewords.push({element: newM.getLast(), x: oLeft, y: oTop, xs: (Math.random() - 0.4) * 20, ys: -Math.random() * 20, r: 0, rs: (Math.random() - 0.5) * 2, life: 20});
		}

		setTimeout(function(){
			e.playing = false;
			MinimaLogo.animation(e, dot, dotcss);
		},200);
	}
	else{
		if(!e.emblem.animate){
			for (var k = e.bottlewords.length - 1; k >= 0; k--){
				var m = e.bottlewords[k];
				e.bottlewords.splice(k, 1);
				e.element.removeChild(m.element);
			}
		}
	}
};