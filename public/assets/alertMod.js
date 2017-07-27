window.alert = function(msg, time) {
  var id, closeId, alertBox, alertClose;

  var classNameIn = "animated fadeInRight alertBox";
  var classNameOut = "animated fadeOutRight alertBox";
  //Generate random id

  id = "alert_" + Math.floor(Math.random() * 999999);
  closeId = "alert_close_id_" + Math.floor(Math.random() * 999999);

  //Alert Box
  alertBox = document.createElement("div");
  document.body.appendChild(alertBox);
  alertBox.id = id;
  alertBox.innerHTML = msg;
  alertBox.tagName = "alert";
  alertBox.className = classNameIn;

  //Alert close
  alertClose = document.createElement("div");
  alertClose.id = closeId;
  alertClose.className = "alertClose";

  //Set  visible
  alertBox.appendChild(alertClose);
  alertBox.style.visibility = "visible";
  alertClose.style.visibility = "visible";

  function closeAlertBox(e) {
    console.log("Đóng thông báo " + id);
    alertBox = document.getElementById(id);
    alertClose = document.getElementById(closeId);
    alertBox.className = classNameOut;
    setTimeout(function() {
      alertBox.remove();
      alertClose.remove();
    }, 700);
  }

  //Auto close
  var timeClose = time || 5;
  var TimeCloseInterval = setInterval(function() {
    alertClose.className = "animated flipInX alertClose";
    alertClose.innerHTML =
      "⌛️ đóng sau <b class='animated infinite flipInX ' style='color:blue'>" +
      timeClose +
      "</b> giây";
    timeClose--;
  }, 1000);

  var AutoClose = setTimeout(function() {
    console.log("Đóng thông báo " + id);
    alertBox = document.getElementById(id);
    alertClose = document.getElementById(closeId);
    alertClose.innerHTML = "Tự động đóng sau 5 giây";

    alertClose.remove();
    alertBox.className = classNameOut;
    setTimeout(function() {
      alertBox.remove();
      clearInterval(TimeCloseInterval);
    }, 700);
  }, timeClose * 1000 + 500);

  //Cance auto close
  function cancelAutoClose(params) {
    clearTimeout(AutoClose);
    clearInterval(TimeCloseInterval);
    alertClose.innerHTML = "❌ Đóng thông báo";
  }
  //Handler close
  alertClose.onmouseover = closeAlertBox;
  alertBox.onmouseover = cancelAutoClose;
};

// Style
var styleNode = document.createElement("style");
styleNode.type = "text/css";
// browser detection (based on prototype.js)
var style = ``;
if (!!(window.attachEvent && !window.opera)) {
  styleNode.styleSheet.cssText = style;
} else {
  var styleText = document.createTextNode(style);
  styleNode.appendChild(styleText);
}
document.getElementsByTagName("head")[0].appendChild(styleNode);
