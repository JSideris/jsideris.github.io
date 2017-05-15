
var researchTab = dot.div(
	dot.h1("Publications")
	.paper("Using Robotics and 3D Printing to Introduce Youth to Computer Science and Electromechanical Engineering", 2017, "https://doi.org/10.1145/3027063.3053346", "images/3dhand.jpg", 
		"Describes the implementation of a hands-on, collaborative group learning experience designed to introduce high school students to electromechanical engineering and computer science education, exploring topics such as robotics, 3D modelling, printing and assembly, and cumulating in the fabrication of a functional 3D printed robotic hand, which was designed and customized by the participants.",
		"Photo was taken of the final assembly with youth-made fingers attached.")
	.h1("White Papers")
	.paper("Robust Marker-Based Camera Solving with Automatic Calibration", 2014, "documents/RobustMarker.pdf", "images/camerasolvingexample.png",//"images/glyph3.png", 
		"A common task in cinematography is to mix CGI into live-action shots. In order to do this effectively, the exact position of the camera must be known at all times. One way to accomplish this is using sophisticated sets with perfectly-calibrated glyphs on the ceiling. This paper, along with a rudamentary functional prototype, explored the possibility of building an uncalibrated set anywhere (even outdoors), then dynamically building a map during shooting.")
	.paper("Eye-Tracking Computer Human Interface Device for Disabled Individuals", 2013, "https://tbdgroup.github.io/tbd_eyetracker_system.pdf", "images/sillyjosh.jpg", 
		"A modified Starburst algorithm was used to track pupil orientation, and after a brief calibration process, pupil-to-screen mapping via a 2-camera system allowed for precise mouse control. This fully-functioning prototype was built for only a few hundred dollars, whereas other commercial solutions are priced anywhere from $5000 to $30000.",
		"Photo is of me wearing the fully-functional prototype.")
	.paper("Selective Moving Object Removal for Video", 2012, null, "images/invisiblepeople.jpg",
		"Using a combination of pixel subtraction, edge detection, and gradient direction, it was possible to detect, localize, and remove moving objects from video while handling a wealth of special cases. Applications include removing vehicles from scenes of traffic, and removing instructors from video lectures, especially where the instructor's body or hand is blocking the chalkboard/whiteboard. <i>Note: This study was originally carried out and submitted as an undergraduate white paper in 2012. I am currently re-writing it with some upgraded methodologies. Feel free to contact me for more information.</i>",
		"Photo depicts software removing me from a live scene. However, it is still possible to see part of my red scarf due to low contrast confusing the algorithm.")
).class("research-tab-body");