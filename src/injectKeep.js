var ipcMain = require('electron').ipcMain

var hideIfExists = function (clazz) {
	var element = document.getElementsByClassName(clazz)[0];
	if(element) element.style.display="none";
}
var hideIfIdExists = function (clazz) {
	var element = document.getElementById(clazz);
	if(element) element.style.display="none";
}



window.onload = function() {
	// hideIfExists("gb_Xb")
	hideIfExists("gb_gc")
	hideIfExists("gb_Qb")
	hideIfExists("gb_6b")
	hideIfIdExists("gbm:9")
	hideIfIdExists("gbm:a")
	hideIfIdExists("gbm:b")
	hideIfIdExists("gbm:c")


};

// $(".IZ65Hb-YPqjbf").click() Open new 

//$(".gb_Xb").click() Menu Open