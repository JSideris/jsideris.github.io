var currentVidIndex = 0;
var currentVidArray = [];
function playVideo(array, index){
	blockStop = true;
	setTimeout(function(){blockStop = false}, 50);
	currentVidArray = array;
	currentVidIndex = index;
	$("#video-player")[0].src = "https://www.youtube.com/embed/" + array[index] ;//+ "?autoplay=1";
	$("#absolute-video-player-container").fadeIn();
}
var blockStop = false;
function stopVideo(){
	if(blockStop) return;
	currentVidArray = 0;
	$("#absolute-video-player-container").fadeOut(function(){
		$("#video-player")[0].src = "";
	});
}
function prevVid(){currentVidIndex = Math.max(0, currentVidIndex - 1); playVideo(currentVidArray, currentVidIndex);}
function nextVid(){currentVidIndex = Math.min(currentVidArray.length - 1, currentVidIndex + 1); playVideo(currentVidArray, currentVidIndex);}

var videosTab = dot
.tabs([
	//dot.videoCategory("All", ["g8tLWgQX5EA", "prb96hcnzSA", ]),
	dot.videoCategory("Engineering", ["EDZF383Et9Y", "ThlURknWfRI", "qHcAXqsbH7g", "mmaNxsrwG8Y", "vuokupujbsE", "BOtMQ_L7mLc", "sIaNER9noY0", "4y2kPmxW-xk", "xbJ0dT-VZIQ", "NNGiKx-lMeo"], playVideo),
	dot.videoCategory("Economics", ["ThlURknWfRI", "voRAwyJ-9Pc", "N9T2jeADOUs"], playVideo),
	dot.videoCategory("2D Game Physics", ["7QzW_ZRP7rg", "JOzoMkOmRrE", "gfDzM4JENgg", "Te_TBymgW4k"], playVideo),
	dot.videoCategory("Futurology", ["ThlURknWfRI", "g8tLWgQX5EA", "wPIlrTOoR84"], playVideo),
	dot.videoCategory("Puzzles", ["Q9qY9wZsq_M", "sIaNER9noY0", "7jpO6YrgUKU"], playVideo),
	dot.videoCategory("Projects", ["5MTvWtpMeXk", "MkkU73hpoGI", "prb96hcnzSA"], playVideo)
], "video-tabs")

.div(
	//TODO: just changed width and height from dot.iframe.width(420).height(315)
	dot
	.div(dot.span("<")).id("prev-video").onclick(prevVid)
	.div(dot.span(">")).id("next-video").onclick(nextVid)
	.iframe().id("video-player").attr("allowfullscreen")//.width(640).height(390)
).id("absolute-video-player-container").onclick(stopVideo).style("display: none;");