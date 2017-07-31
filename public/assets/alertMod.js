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
var style = `/* Alert  */

.alertBox {
    position: absolute;
    font-family: 'Comfortaa', 'Arial';
    top: 5vh;
    left: 65vw;
    right: 1vw;
    min-width: 12em;
    min-height: 10vh;
    border: solid 5px blanchedalmond;
    border-radius: 15px;
    /* background-color: black; */
    color: black;
    padding: 2.34em 10px 0em 15px;
    visibility: hidden;
    font-weight: bolder;
    transition: all .25s linear .2s;
    z-index: 999999;
    box-shadow: 2px 2px 4px #888888;
    background: #fff;
    background: -webkit-gradient( linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
    background: -webkit-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
    background: -moz-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
    background: -ms-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
    background: -o-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
    background: linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 5px;
    -webkit-background-size: 100% 20px;
    -moz-background-size: 100% 20px;
    -ms-background-size: 100% 20px;
    -o-background-size: 100% 20px;
    background-size: 100% 20px;
}

.alertBox:hover {
    border: solid 5px lightcoral;
    box-shadow: 2px 2px 4px purple;
}

.alertClose {
    font-family: 'Comfortaa', san-serif;
    z-index: 999999;
    /*  font-weight: bolder; */
    position: absolute;
    border-radius: 5px;
    right: 2px;
    top: 0;
    color: #34495e;
    cursor: pointer;
}

.alertClose:hover {
    text-decoration: underline;
}

@media screen and (max-width: 900px) {
    .alertBox {
        top: 2vh;
        left: 5vw;
        right: 5vw;
        padding: 6vh 10px 0em 10px;
        border: dashed 3px white;
        transition: all .25s linear .2s;
    }
}`;
if (!!(window.attachEvent && !window.opera)) {
  styleNode.styleSheet.cssText = style;
} else {
  var styleText = document.createTextNode(style);
  styleNode.appendChild(styleText);
}
document.getElementsByTagName("head")[0].appendChild(styleNode);
