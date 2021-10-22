/*!
 *
 * WebRTC Lab
 * @author dodortus (codejs.co.kr / dodortus@gmail.com)
 *
 */
$(function () {
  if (typeof webkitSpeechRecognition !== 'function') {
    alert('크롬에서만 동작 합니다.');
    return false;
  }

  const FIRST_CHAR = /\S/;
  const TWO_LINE = /\n\n/g;
  const ONE_LINE = /\n/g;

  const recognition = new webkitSpeechRecognition();
  const language = 'en-US';
  const $audio = document.querySelector('#audio');
  const $btnMic = document.querySelector('#btn-mic');
  const $resultWrap = document.querySelector('#result');
  const $iconMusic = document.querySelector('#icon-music');
  const $btnSub1 = document.querySelector('#sub1');
  const $btnSub2 = document.querySelector('#sub2');
  const $btnSub3 = document.querySelector('#sub3');
  const $btnSub4 = document.querySelector('#sub4');
  const $record = document.querySelector('#list-record');

  let isRecognizing = false;
  let ignoreEndProcess = false;
  let finalTranscript = '';

  recognition.continuous = true;
  recognition.interimResults = true;

  /**
   * 음성 인식 시작 처리
   */
  recognition.onstart = function () {
    console.log('onstart', arguments);
    isRecognizing = true;
    $btnMic.className = 'btn on btn-primary';
  };

  /**
   * 음성 인식 종료 처리
   */
  recognition.onend = function () {
    console.log('onend', arguments);
    isRecognizing = false;

    if (ignoreEndProcess) {
      return false;
    }

    // DO end process
    $btnMic.className = 'btn off btn-primary';
    if (!finalTranscript) {
      console.log('empty finalTranscript');
      return false;
    }
  };

  /**
   * 음성 인식 결과 처리
   */
  recognition.onresult = function (event) {
    console.log('onresult', event);

    let interimTranscript = '';
    if (typeof event.results === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript = transcript;
        $record.innerHTML += '<div>You : '+finalTranscript+'</div>';
      } else {
        interimTranscript = transcript;
      }
    }

    finalTranscript = capitalize(finalTranscript);
    final_span.innerHTML = linebreak(finalTranscript);
    interim_span.innerHTML = linebreak(interimTranscript);
    console.log('finalTranscript', finalTranscript);
    console.log('interimTranscript', interimTranscript);
    fireCommand(finalTranscript);
  };

  /**
   * 음성 인식 에러 처리
   */
  recognition.onerror = function (event) {
    console.log('onerror', event);

    if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
      ignoreEndProcess = true;
    }

    $btnMic.className = 'btn off btn-primary';
  };

  /**
   * 명령어 처리
   * @param string
   */
  function fireCommand(string) {
    if (string.endsWith('레드')) {
      $resultWrap.className = 'red';
    } else if (string.endsWith('Bye')){
            window.location.reload();
    }
  }

  /**
   * 개행 처리
   * @param {string} s
   */
  function linebreak(s) {
    return s.replace(TWO_LINE, '<p></p>').replace(ONE_LINE, '<br>');
  }

  /**
   * 첫문자를 대문자로 변환
   * @param {string} s
   */
  function capitalize(s) {
    return s.replace(FIRST_CHAR, function (m) {
      return m.toUpperCase();
    });
  }

  /**
   * 음성 인식 트리거
   */
  function start() {
    if (isRecognizing) {
      recognition.stop();
      return;
    }
    recognition.lang = language;
    recognition.start();
    ignoreEndProcess = false;

    finalTranscript = '';
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
  }

  /**
   * 문자를 음성으로 읽어 줍니다.
   * 지원: 크롬, 사파리, 오페라, 엣지
   */
  function textToSpeech(text) {
    console.log('textToSpeech', arguments);

    // speechSynthesis options
    const u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';
    u.rate = 1;
    // u.onend = function(event) {
    //   log('Finished in ' + event.elapsedTime + ' seconds.');
    // };
    speechSynthesis.speak(u);

    // simple version
    //speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  /**
   * 초기 바인딩
   */
  function initialize() {
    const $btnTTS = document.querySelector('#btn-tts');
    const defaultMsg = '전 음성 인식된 글자를 읽습니다.';

    $btnTTS.addEventListener('click', () => {
      const text = final_span.innerText || defaultMsg;
      textToSpeech(text);
    });

    $btnMic.addEventListener('click', start);
    $btnSub1.addEventListener('click', start);
    $btnSub2.addEventListener('click', start);
    $btnSub3.addEventListener('click', start);
    $btnSub4.addEventListener('click', start);
  }

  initialize();
});
