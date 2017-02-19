'use strict';

const hideIfExists = function (clazz) {
    const element = document.getElementsByClassName(clazz)[0];
    if (element) {
        element.style.display = "none";
    }
};

window.onload = function() {
	// hideIfExists("gb_Xb")
    hideIfExists("gb_gc");
    hideIfExists("gb_Qb");
    hideIfExists("gb_5b");
	// hideIfIdExists("gbm:9")
	// hideIfIdExists("gbm:a")
	// hideIfIdExists("gbm:b")
	// hideIfIdExists("gbm:c")

};

// $(".IZ65Hb-YPqjbf").click() Open new

//$(".gb_Xb").click() Menu Open
