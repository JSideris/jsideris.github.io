
function jsiderisLogo(targetSelector){
	return new InteractiveEmblem(targetSelector, 2, {
		draw: function(emblem, dot, dotcss){
			if(!dot.diamond) dot.createWidget("diamond", function(){
				return dot.span("&diams;").style(dotcss.marginLeftP(0.26).marginRightP(0.26).color(255, 192, 0));
			});
			dotcss(emblem.outerNode).backgroundColor("#0C0C0C").fontFamily("Impact, Charcoal, sans-serif");

			var ret = dot.div("J").style(dotcss.position("absolute").topP(5).rightP(100).heightP(40).color(0, 112, 192).opacity(0).fontSize(500)); 
			emblem.j = ret.getLast();
			
			ret.div("S").style(dotcss.position("absolute").topP(5).leftP(100).heightP(40).marginRight("auto").color(0, 112, 192).opacity(0).fontSize(500)); 
			emblem.s = ret.getLast();

			ret.div("ideris").style(dotcss.position("absolute").overflow("hidden").topP(8).leftP(65).fontSize(250).widthP(0).color(50, 162, 242).textAlign("left"));
			emblem.ideris = ret.getLast();

			ret.div(
				dot.br().clear("all")
				.span("Entrepreneur").style(dotcss.marginLeft(5).marginRight(5))
				.diamond()
				.span("Full&nbsp;Stack&nbsp;Developer").style(dotcss.marginLeft(5).marginRight(5))
				.diamond()
				.span("IT").style(dotcss.marginLeft(5).marginRight(5))
				.diamond()
				.span("UX").style(dotcss.marginLeft(5).marginRight(5))
				.diamond()
				.span("Automation").style(dotcss.marginLeft(5).marginRight(5))
				.diamond()
				.span("Robotics").style(dotcss.marginLeft(5).marginRight(5))
				.diamond()
				.span("Economics").style(dotcss.marginLeft(5).marginRight(5))
			).style(dotcss.position("absolute").bottomP(15).widthP(100).textAlign("center").fontSize(48).opacity(0).color(0, 112, 192));
			emblem.tags = ret.getLast();

			return ret;
		},
		play: function(emblem, dot, dotcss){
			dot.wait(1000, function(){ //Do I really need this?
				dotcss(emblem.j).right.animate("50%", 500).opacity.animate(1, 500);
				dotcss(emblem.s).left.animate("50%", 500).opacity.animate(1, 500, function(){
					dot.wait(750, function(){
						dotcss(emblem.j).right.animate("67.5%", 300);
						dotcss(emblem.s).left.animate("32.5%", 300);
						dotcss(emblem.ideris).left.animate("47.5%", 300).width.animate("52.5%", 300, function(){
							dot.wait(200, function(){
								dotcss(emblem.tags).opacity.animate(1, 300);
							});
						});
					});
				});
			})
		},
		skip: function(emblem, dot, dotcss){
			
		},
		resize: function(emblem, dot, dotcss){
			dotcss(emblem.j).fontSize(emblem.innerNode.offsetHeight * 0.525);
			dotcss(emblem.s).fontSize(emblem.innerNode.offsetHeight * 0.525);
			dotcss(emblem.ideris).fontSize(emblem.innerNode.offsetHeight * 0.525 * 0.5);
			dotcss(emblem.tags).fontSize(emblem.innerNode.offsetHeight * 0.05);
		}
	});
}