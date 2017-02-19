const hideIfExists = function (clazz) {
  const element = document.getElementsByClassName(clazz)[0];
  if (element) {
    element.style.display = 'none';
  }
};

window.onload = function () {
  hideIfExists('gb_gc');
  hideIfExists('gb_Qb');
  hideIfExists('gb_5b');
};
