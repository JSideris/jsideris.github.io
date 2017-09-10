
function dotcssLogo(targetSelector){
	return new InteractiveEmblem(targetSelector, 2, {
		draw: function(emblem, dot, dotcss){
			if(!dot.cubeface){
				dot.createWidget("cubeface", function(value, axis, r, w){
					return dot.div(value).style(dotcss.position("absolute").backgroundColor("#44AA77").fontSize(w).lineHeight(w).width(w).height(w).transform(" rotate" + axis + "(" + r + "deg) translate3d(0, 0, " + w / 2 + "px)"))
				});
				dot.createWidget("cube", function(value, width){
					return dot.div(
						dot.cubeface(value, "Z", 0, width)
						.cubeface(value, "Y", 90, width)
						.cubeface(value, "Y", -90, width)
						.cubeface(value, "Y", 180, width)
						.cubeface(value, "X", 90, width)
						//.cubeface(value, "X", -90, width)
					).style(dotcss.transformStyle("preserve-3d").display("inline-block").width(width).height(width).transform("perspective(15cm) rotateX(0deg) rotateY(0deg)"));
				});
			}
			emblem.hasPlayed = false;
			dotcss(emblem.outerNode).backgroundColor("#55BB88");
			var ret = dot.div(
				dot.div(function(){
					var ret2 = dot.div("&lt;style&gt;").style(dotcss.position("relative").leftP(6.7).heightP(100).lineHeightP(400).display("inline-block").verticalAlign("middle").color("#444444").fontSize(emblem.innerNode.offsetHeight * 0.2689 * 0.5))
					emblem.lt = ret2.getLast();
					ret2.div()
						.style(dotcss.position("relative").display("inline-block").topP(60).lineHeightP(12.5).heightP(100).widthP(1.7).verticalAlign("middle")
						.backgroundImage("./images/bigdot.png").backgroundSize("contain").backgroundRepeat("no-repeat").opacity(0)
						.color("white").textAlign("center").fontFamily("Impact, Charcoal, sans-serif").fontWeight("normal"));
					emblem.css = ret2.getLast();
					ret2.div(function(){
						var ret3 = dot.cube("C", 100)
						emblem.c = ret3.getLast();
						ret3.cube("S", 100)
						emblem.s1 = ret3.getLast();
						ret3.cube("S", 100)
						emblem.s2 = ret3.getLast();
						return ret3;
					}).style(dotcss.heightP(100).lineHeightP(200).marginRight(5).marginLeftP(5).display("inline-block").verticalAlign("middle"))
					.div("&lt;/style&gt;").style(dotcss.heightP(100).lineHeightP(400).display("inline-block").verticalAlign("middle").color("#444444").fontSize(emblem.innerNode.offsetHeight * 0.2689 * 0.5));
					emblem.gt = ret2.getLast();
					/*.wait(1000, function(){
						return dot.$hide(500);
					});*/

					return ret2;
				}).style(dotcss.display("table-cell").verticalAlign("middle").heightP(100))
			).style(dotcss.display("table").widthP(100).marginTopP(3.75).marginBottomP(3.75).heightP(55).fontSize(emblem.innerNode.offsetHeight * 0.2689).whiteSpace("nowrap").fontFamily("\"Arial\", Gadget, sans-serif").color("black").fontWeight(900));
			emblem.mainLogo = ret.getLast();
			ret.div(dot.div("The most <strong>powerful</strong> style builder on the <i>web</i>.").style(dotcss.display("table-cell").verticalAlign("middle")))
				.style(dotcss.display("table").heightP(25).widthP(100).opacity(0.1).fontSize(emblem.innerNode.offsetHeight * 0.07563).color("#EEEEEE").fontFamily("\"Arial\", Gadget, sans-serif"));
			emblem.slogan = ret.getLast();
			return ret;
		},
		play: function(emblem, dot, dotcss){
			if(emblem.hasPlayed) return;
			emblem.hasPlayed = true;

			dot.wait(1000, function(){
				dotcss(emblem.lt).hide({duration: 500, hideStyle: "shrink"});
				dotcss(emblem.gt).hide({duration: 500, hideStyle: "shrink"});
			})
			.wait(1500, function(){
				dotcss(emblem.css).opacity.animate(1, 300, "ease", function(){
					dot.wait(500, function(){
						dotcss(emblem.css).lineHeight.animate("200%", 500, "ease");
						dotcss(emblem.css).width.animate("27%", 500, "ease");
						dotcss(emblem.css).top.animate(0, 500, "ease");
						dotcss(emblem.css).marginTop.animate(0, 500, "ease");
							dot.wait(500, function(){
								dot(emblem.css).span("DOT").$hide().$fadeIn();
								emblem.animate = true;
								emblem.rot = 0;
								dotcss(emblem.c.childNodes[4]).backgroundColor.animate([200, 50, 50], 200);
								dotcss(emblem.s1.childNodes[4]).backgroundColor.animate([50, 200, 50], 200);
								dotcss(emblem.s2.childNodes[4]).backgroundColor.animate([50, 50, 200], 200);
								dotcssLogo.animation(emblem, dot, dotcss, 1500);
							})
					})
				})
			})
			.wait(4500, function(){
				dotcss(emblem.slogan).opacity.animate(1, 500, "ease");
			});
		},
		skip: function(emblem, dot, dotcss){

		},
		resize: function(emblem, dot, dotcss){
			if(!emblem.c) return;
			dotcss(emblem.mainLogo).fontSize(emblem.innerNode.offsetHeight * 0.2689);
			dotcss(emblem.gt).fontSize(emblem.innerNode.offsetHeight * 0.2689 * 0.5);
			dotcss(emblem.lt).fontSize(emblem.innerNode.offsetHeight * 0.2689 * 0.5);
			dotcss(emblem.slogan).fontSize(emblem.innerNode.offsetHeight * 0.07563);

			var cssSize = emblem.innerNode.offsetHeight * 0.15;
			var cssMargins = cssSize * 0.4;
			dotcss(emblem.c).height(cssSize).width(cssSize).marginRight(cssMargins);
			dotcss(emblem.s1).height(cssSize).width(cssSize).marginRight(cssMargins);
			dotcss(emblem.s2).height(cssSize).width(cssSize);

			dotcss(emblem.c.childNodes[0]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateZ(0deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.c.childNodes[1]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.c.childNodes[2]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(-90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.c.childNodes[3]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(180deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.c.childNodes[4]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateX(90deg) translate3d(0, 0, " + cssSize / 2 + "px)");

			dotcss(emblem.s1.childNodes[0]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateZ(0deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s1.childNodes[1]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s1.childNodes[2]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(-90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s1.childNodes[3]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(180deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s1.childNodes[4]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateX(90deg) translate3d(0, 0, " + cssSize / 2 + "px)");

			dotcss(emblem.s2.childNodes[0]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateZ(0deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s2.childNodes[1]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s2.childNodes[2]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(-90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s2.childNodes[3]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateY(180deg) translate3d(0, 0, " + cssSize / 2 + "px)");
			dotcss(emblem.s2.childNodes[4]).fontSize(cssSize).lineHeight(cssSize).height(cssSize).width(cssSize).transform(" rotateX(90deg) translate3d(0, 0, " + cssSize / 2 + "px)");
		}
	});
}

dotcssLogo.animation = function(e, dot, dotcss, speed){
	if(!e.playing && e.animate){ //lock
		e.playing = true;

		/*var a = Math.random();
		var b = Math.random();
		var c = Math.random();
		var l = Math.sqrt(a*a+b*b+c*c);
		a = Math.round(1000 * a/l) / 1000;
		b = Math.round(1000 * b/l) / 1000;
		c = Math.round(1000 * c/l) / 1000;
		var A = Math.round(Math.random() * 360 -180);*/
		
		e.rot+=10;
		var ambient = 50;
		var rot = e.rot;
		//dotcss(e.c).transform.animate("rotate3d(" + a + "," + b + "," + c + ", " + A + "deg)", speed, "ease");
		dotcss(e.c).transform.animate("perspective(15cm) rotateX(-15deg) rotateY(" + rot + "deg)", speed, "ease");
		dotcss(e.s1).transform.animate("perspective(15cm) rotateX(-15deg) rotateY(" + rot + "deg)", speed, "ease");
		dotcss(e.s2).transform.animate("perspective(15cm) rotateX(-15deg) rotateY(" + rot + "deg)", speed, "ease");
		dotcss(e.c.childNodes[0]).backgroundColor.animate([ambient + (255-ambient) * (1+0.5*Math.sin(rot * 3.14159 / 180)), ambient, ambient], speed);
		dotcss(e.c.childNodes[1]).backgroundColor.animate([ambient + (255-ambient) * (1+0.5*Math.sin((rot+90) * 3.14159 / 180)), ambient, ambient], speed);
		dotcss(e.c.childNodes[2]).backgroundColor.animate([ambient + (255-ambient) * (1+0.5*Math.sin((rot-90) * 3.14159 / 180)), ambient, ambient], speed);
		dotcss(e.c.childNodes[3]).backgroundColor.animate([ambient + (255-ambient) * (1+0.5*Math.sin((rot+180) * 3.14159 / 180)), ambient, ambient], speed);
		
		dotcss(e.s1.childNodes[0]).backgroundColor.animate([ambient, ambient + (255-ambient) * (1+0.5*Math.sin(rot * 3.14159 / 180)), ambient], speed);
		dotcss(e.s1.childNodes[1]).backgroundColor.animate([ambient, ambient + (255-ambient) * (1+0.5*Math.sin((rot+90) * 3.14159 / 180)), ambient], speed);
		dotcss(e.s1.childNodes[2]).backgroundColor.animate([ambient, ambient + (255-ambient) * (1+0.5*Math.sin((rot-90) * 3.14159 / 180)), ambient], speed);
		dotcss(e.s1.childNodes[3]).backgroundColor.animate([ambient, ambient + (255-ambient) * (1+0.5*Math.sin((rot+180) * 3.14159 / 180)), ambient], speed);
		
		dotcss(e.s2.childNodes[0]).backgroundColor.animate([ambient, ambient, ambient + (255-ambient) * (1+0.5*Math.sin(rot * 3.14159 / 180))], speed);
		dotcss(e.s2.childNodes[1]).backgroundColor.animate([ambient, ambient, ambient + (255-ambient) * (1+0.5*Math.sin((rot+90) * 3.14159 / 180))], speed);
		dotcss(e.s2.childNodes[2]).backgroundColor.animate([ambient, ambient, ambient + (255-ambient) * (1+0.5*Math.sin((rot-90) * 3.14159 / 180))], speed);
		dotcss(e.s2.childNodes[3]).backgroundColor.animate([ambient, ambient, ambient + (255-ambient) * (1+0.5*Math.sin((rot+180) * 3.14159 / 180))], speed);

		setTimeout(function(){
			e.playing = false;
			dotcssLogo.animation(e, dot, dotcss, 200);
		},speed);
	}
}