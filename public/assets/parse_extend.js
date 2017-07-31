function cloud(cloudName, data) {
  console.log("Khởi động: " + cloudName);
  Parse.Cloud
    .run(cloudName, data)
    .then(result => {
      console.log(result);
    })
    .catch(e => {
      console.error(e.message);
    });
}

/* function speak(text) {
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
speak("Have a good day!");
 */

/* var audio = new Audio(
  "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=Bla%20bla%20bla&tl=vi-VN"
);
audio.play();
 */

/* function ispeak() {
  diachi =
    "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=" +
    text.replace(/ /g, "%20") +
    "&tl=Vi-vn";
  document.getElementById("AudopScr").src = diachi;
  document.getElementById("myAudio").load();
  setTimeout(function(argument) {
    var vid = document.getElementById("myAudio");
    vid.play();
  }, 500);
} */
