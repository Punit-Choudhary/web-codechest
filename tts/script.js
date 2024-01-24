const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

voices();
function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}
synth.addEventListener("voiceschanged", voices);

function tts(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (textarea.value !== "") {
    if (!synth.speaking) {
      // Only speak if not already speaking
      tts(textarea.value);
    }

    if (textarea.value.length > 80) {
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert to Speech";
        }
      }, 500);

      // Implement resume
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause";
      } else {
        // Implement pause
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume";
      }
    } else {
      speechBtn.innerText = "Convert to Speech";
    }
  }
});
