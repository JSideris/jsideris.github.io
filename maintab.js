var sequencrheaderblink = true;
var mainTab = 

/*dot.displayBox(
	dot.fadedImageBackground("images/joshpresenting.jpg", 200, 225, 255, 0.7, "center", 
		dot.img().src("images/phashtaglogo.png").height(150)
		.br()
		.p("Social media monitoring for the visual web").style("margin-top: -20px; font-size: 20px; font-weight: bold; font-family: \"Arial Black\", Gadget, sans-serif;")
		.br()
		.img().src("images/next36logo.png").height(150)
	),
	dot.h2("Logo/Food Recognition")
	.p("Phashtag was a venture originating from The Next 36 program at UofT. We used convolutional neural networks capable of identifying logos to explore a never-before-tapped dimension of social media analytics: images.")
	.p("Upon graduating from the program, we raised about $100,000 in seed funding, but ultimately opted to pivot our technology to a new business model that seemed that seemed more commercializable. In 2015 I filed a provisional patent application for Point-of-sale Electronic Produce Identification (PEPI) - a hand-held \"barcode\" scanner capable of identifying produce at the checkout counter without the use of barcodes.")
	.a("Learn more.").class("learnmore").href("https://www.youtube.com/watch?v=snUFqVx9QJs").target("_blank")
)*/

dot.displayBox(
	dot.fadedImageBackground("images/steganodata.png", 0, 0, 0, 0.7, "left",
	dot.img().src("images/ladonlabslogo.png").height(150)
		.br()
		.div("Solutions for advanced productivity.").style("font-size: 30px; color: white; width: 300px; margin-top: 50px; font-weight: bold;")
	),
	dot.h2("Process Automation")
	.p("Ladon Labs maintains a portfolio of intelligent tools for increasing productivity or reducing fraud. We also offer competitive prices on automation consulting, startup consulting, web app development, and UX design.")
	.p("Check out our new website.")
	.a("ladonlabs.com").class("learnmore").href("http://ladonlabs.com").target("_blank")
)

.displayBox(
	dot.fadedImageBackground("images/trophy.jpg", 255, 200, 200, 0.7, "left", 
		dot.img().src("images/tbdlogo.png").height(150)
		.div("Enabling the Disabled").style("display: inline-block; font-family:Georgia, serif; font-style: italic; font-size: 22px; line-height: 150px; vertical-align: top; margin-left: 20px; color: #70a0b2;")
		.br().clear("all")
		.p("An award-winning tool that enabled disabled individuals to have complete control over a computer using only their eyes.").style("text-align: left; width: 300px; font-size: 20px; font-weight: bold; font-family: \"Arial Black\", Gadget, sans-serif;")
	), 
	dot.img().src("images/sillyjosh.jpg").style("margin-left: -10px; margin-top: -10px; width: 300px;")
	.br()
	.h2("Eye-Tracking HID")
	.p("Used a two-camera setup with eye-tracking technology to control a computer. This capstone project was awarded the first-place 2013 Comdev award at York University.")
	.a("Learn more.").class("learnmore").href("https://tbdgroup.github.io/").target("_blank")
)

.displayBox(
	dot.div(
		//.div("A human-friendly way to build highly-dynamic web pages in pure JavaScript.").id("dothtmlslogan").$css("opacity", "0.1")
	).id("dothtmllogopreview").style(dotcss.widthP(100).heightP(100)),
	
	dot.h2("HTML Page Builder")
	.p("DOThtml is my answer to dynamic HTML page construction. It's more human-friendly than HTML or other page building / UI frameworks, 100% client-side with no compiler needed, and integrates with JQuery to provide tons of dynamic event listeners and display helpers. You can even use it to create widgets, like all the interactive info boxes on this page.")
	.p("Here is another example of a super-dynamic website I built using DOThtml, demonstrating just how powerful it is: <a href=\"https://jsideris.github.io/AdvancedKspMissionCalculator/\" target=\"_blank\">Advanced KSP Mission Calculator</a>.")
	.a("Learn more.").class("learnmore").href("https://dothtml.org").target("_blank"),
	function(){
		dothtmllogoinstance.play();
	}
)

.displayBox(
	dot.div(
		//.div("A human-friendly way to build highly-dynamic web pages in pure JavaScript.").id("dothtmlslogan").$css("opacity", "0.1")
	).id("dotcsslogopreview").style(dotcss.widthP(100).heightP(100)),
	
	dot.h2("Powerful JavaScript CSS Building")
	.p("DOTcss is a CSS counterpart for DOThtml. However, it's a stand alone library with no dependencies.")
	.p("It's designed to be the most powerful JavaScript-based style manipulator.")
	.a("Learn more.").class("learnmore").href("https://dotcss.org").target("_blank"),
	function(){
		dotcsslogoinstance.play();
	}
)

.displayBox(
	dot.div(
		dot.img().src("images/SequencrLogo.png")
		.div("Sequencr.js").id("sequencrname")
		.br().clear("all")
		.div(
			dot.span("&nbsp;").id("sequencrheadertext")
			.span("&brvbar;").id("sequencrheadercursorchar")
		).id("sequencrtextholder")
	).id("sequencrpreview"),

	dot
	.h2("A Powerful Promise/Sleep Framework")
	.p("Sequencr.js allows you to chain functions together and allows asynchronous promise-or-timeout based looping. It doubles as a complete EcmaScript 6 promise framework and makes async programming much easier.")
	.a("Learn more.").class("learnmore").href("https://jsideris.github.io/Sequencr.js/").target("_blank")
, function(){
	var headertext = "Chain functions together, or execute loops, punctuated by timeouts or promises.";
	setTimeout(function(){
		Sequencr.for(0, headertext.length, function(i){
			$("#sequencrheadertext").append(headertext[i]);
		}, function(){return 10 + Math.pow(Math.random(), 2) * 130}, function(){
			setTimeout(function(){
				sequencrheaderblink = false;
			}, 5000)
		});
	}, 750);
})
.h(function(){
	Sequencr.do(function(){
	if(sequencrheaderblink){
		$("#sequencrheadercursorchar").toggle();
	}
	else{
		$("#sequencrheadercursorchar").hide();
	}
		return sequencrheaderblink;
	}, 250);
})
/*.displayBox(
	dot.fadedImageBackground("images/camerasolving.jpg", 0, 100, 0, 0.7, "left",
		dot.img().src("images/glyph3.png").style("height: 150px;")
		.div("Robust Marker-Based Camera Solving with Automatic Calibration").style("display: inline-block; width: 500px; vertical-align: top; margin-left: 20px; font-size: 28px; font-family: \"Arial Black\", Gadget, sans-serif; color: white;")
		.br().clear("all")
		.br()
		.span("Undergraduate Thesis").style("color: cyan; font-size: 22px; font-family: \"Arial Black\", Gadget, sans-serif; font-style: italic;")
	),
	dot.img().src("images/camerasolvingexample.png").style("margin-left: -10px; margin-top: -10px; width: 300px;")
	.h2("Camera Solving")
	.p("A common task in cinematography is to mix CGI into live-action shots. In order to do this effectively, the exact position of the camera must be known at all times. One way to accomplish this is using sophisitaced sets with perfectly-calibrated glyphs on the ceiling. This thesis, along with a rudamentary functional prototype, explored the possibility of building an uncalibrated set anywhere (even outdoors), then dynamically building a map during shooting.")
	.a("Learn more.").class("learnmore").href("documents/RobustMarker.pdf").target("_blank")
)*/

/*.displayBox(
	dot.table(
		dot.iterate(27, function(y){
			return dot.tr(
				dot.iterate(39, function(x){
					return dot.td().id("rwcell-" + x + "-" + y).class("rwboardtile " + ((x + y) % 2 == 0 ? "rwblacktile" : "rwwhitetile"))
				})
			).id("rwrow-" + y)
		})
	).id("rwgameboard"), 
	dot.img().src("images/killerrobotexport.jpg").style("margin-left: -10px; margin-top: -10px; width: 290px;")
	.h2("Robot Fighting Club")
	.p("I started a robot fighting club at YorkU in 2010. We hosted various programming/electronic/soldering workshops, competitions, robot battles, etc. Our ultimate goal was to build a 120&nbsp;lb <a href=\"http://robogames.net/index.php\" target=\"_blank\">Robogames</a> robot (shown above), but sadly we were unable to raise the money (I'm still going to do it one day anyway). In 2013 we branched the club into Canada's first <a href=\"http://robogals.org/\" target=\"_blank\">Robogals</a> chapter.")
	//.a("Learn more.").class("learnmore").href("").target("_blank") //The site has sadly been taken down.
	, function(){beginGame(39, 27);}
)*/
.div(
	dot.div(
		dot
		.p("Need help building a landing page, website, MVP or interactive logo? Or, need consulting with your technical startup or business plan? Drop me an email. I've helped <b>dozens</b> of startups <i>plan, focus, and execute</i>. While you're here, don't forget to check out my YouTube vlog and other social media!").style("background-color: rgba(0, 0, 0, 0.7); padding: 20px;")
		.a(dot.img().src("images/githubcat.png").img().src("images/githublogo.png")).href("https://github.com/JSideris").target("_blank").class("smlink")
		.a(dot.img().src("images/youtubesubscribe.png")).href("https://www.youtube.com/c/JoshSideris").target("_blank").class("smlink")
		.a(dot.img().src("images/blogger.png")).href("http://bitlords.blogspot.ca/").target("_blank").class("smlink")
		.a(dot.img().src("images/linkedinconnect.png")).href("https://www.linkedin.com/in/jsideris").target("_blank").class("smlink")
		.a(dot.img().src("images/twitterfollow.png")).href("https://twitter.com/joshsideris").target("_blank").class("smlink")
		//.a(function(){dot.img().src("http://stackoverflow.com/users/flair/720238.png")}).href("http://stackoverflow.com/users/720238/jsideris").target("_blank").class("smlink")
		.br()
		.p(dot.a("Check out my resume.").href("https://resume.jsideris.com").target("_blank").class("learnmore"))
		.p("Joshua Sideris<br />CEO, Ladon Labs<br />jsideris@jsideris.com | Toronto").style("background-color: rgba(0, 0, 0, 0.7); padding: 20px; font-family: \"Arial Black\", Gadget, sans-serif;")
	).style("padding: 20px;")
	
).class("widgetContainer").style("background-color: #822; background-image: url(\"images/redbg.jpg\"); background-size: cover; font-family: \"Arial\", Gadget, sans-serif; font-size: 22px; color: #FFF; text-align: left; height: 800px;")
.h(function(){})
//.div(function(){}).class("widgetContainer").style("background-color: black;");

/*.displayBox(function(){

}, function(){
	
})*/
//)