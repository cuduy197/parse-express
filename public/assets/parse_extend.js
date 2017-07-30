function speak(text) {
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
speak("Have a good day!");

/* var audio = new Audio(
  "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=Bla%20bla%20&tl=vi-VN"
);
audio.play();
 

function ispeak(text) {
  diachi =
    "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=Bla%20bla&tl=vi-VN";
  document.getElementById("AudopScr").src = diachi;
  document.getElementById("myAudio").load();
  setTimeout(function(argument) {
    var vid = document.getElementById("myAudio");
    vid.play();
  }, 500);
}
 */
