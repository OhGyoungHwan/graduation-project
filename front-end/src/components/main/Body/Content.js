import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Sl1 from './img/sl1.jpg';
import Sl2 from './img/sl2.jpg';
import Sl3 from './img/sl3.jpg';
import './content.css';
import 'bootstrap/dist/css/bootstrap.css';
import jquery from 'jquery';
import $ from 'jquery';
import { SiAudiomack } from 'react-icons/si';
import { BsMic, BsFilePlus } from 'react-icons/bs';
import { HiOutlinePhoneMissedCall, HiRefresh } from 'react-icons/hi';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Carousel,
  Button,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import {
  Box,
  makeStyles,
  useTheme,
  useMediaQuery,
  TextareaAutosize,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import ReactPlayer from 'react-player';

import Header from '../../header/Header';

function btn_subject_ck(value) {
  console.log(value);
  document.getElementById('dialog-page').style.visibility = 'visible';
  document.getElementById('main-page').remove();
}

function btn_list_ck() {
  if (document.getElementById('list-area').style.visibility == 'visible') {
    document.getElementById('list-area').style.height = '0px';
    document.getElementById('list-area').style.visibility = 'hidden';
    document.getElementById('list-area').className = '';
  } else {
    document.getElementById('list-area').style.visibility = 'visible';
    document.getElementById('list-area').className = 'col-8 h-100';
  }
}

function ToggleButtonExample() {
  const [radioValue, setRadioValue] = useState('0');

  const radios = [
    { name: '주제1', value: '1' },
    { name: '주제2', value: '2' },
    { name: '주제3', value: '3' },
    { name: '주제4', value: '3' },
  ];
  return (
    <ButtonGroup className='mb-2 w-100'>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type='radio'
          variant='secondary'
          name='radio'
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
          onClick={(e) => btn_subject_ck(e.currentTarget.value)}
          className='w-25'>
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

function btn_record_refresh() {
  const $record = document.querySelector('#list-record');
  $record.innerHTML = '';
}

function MainContent() {
  return (
    <Container className='mt-5 bg-light' id='main-page'>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img className='d-block w-100' src={Sl1} alt='First slide' />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={Sl2} alt='Second slide' />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={Sl3} alt='Third slide' />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className='mt-2'>
        <ButtonGroup className='mb-2'>
          <ToggleButtonExample />
        </ButtonGroup>
      </Row>
    </Container>
  );
}

function MainDialog() {
  return (
    <Container id='dialog-page' className='bg-light'>
      <Row id='dialog'>
        <Col id='speaking-area' className='h-100 m-auto'>
          <Row className='h-75'>
            <Col id='dialog-view' className='text-wrap bg-primary'>
              <Row className='wrap h-100'>
                <Col className='col-12 h-50'>
                  <span className='final' id='final_span'></span>
                  <span className='interim' id='interim_span'></span>
                </Col>
                <Col className='col-12 h-25'>
                  <Button id='btn-mic' className='off'>
                    <BsMic />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='h-25'>
            <Col
              className='btn-group bg-primary'
              role='group'
              aria-label='Basic example'>
              <Button type='button' value='button1' id='btn-tts'>
                <SiAudiomack />
              </Button>
              <Button
                type='button'
                value='button2'
                onClick={btn_record_refresh}>
                <HiRefresh />
              </Button>
              <Button type='button' value='button3' onClick={btn_list_ck}>
                <BsFilePlus />
              </Button>
              <Button
                type='button'
                value='button4'
                onClick={() => window.location.reload(false)}>
                <HiOutlinePhoneMissedCall />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row id='list-area'>
            <Col id='list-record' className='bg-warning bg-gradient'></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    margin: theme.spacing(0),
  },
}));

const sessionName = Math.random().toString(36).substr(2, 11);

function MainPage() {
  const theme = useTheme();
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState('');
  const [requestFailed, setRequestFailed] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const requestBLob = async (conversation) => {
    URL.revokeObjectURL(voiceBlob);
    setVoiceBlob('');
    setPlaying(false);
    setLoading(true);

    try {
      const response = await axios.post('/api/caii_en/request/conversation', {
        session_name: sessionName,
        conversation: conversation,
      });

      const data = response.data.buffer.data;
      const blob = new Blob([new Uint8Array(data)], { type: 'audio/wav' });

      const url = URL.createObjectURL(blob);

      setVoiceBlob(url);

      return url;
    } catch (e) {
      setRequestFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const requestCallbot = async (conversation) => {
    if (playing) {
      setPlaying(false);
      return;
    }

    const data = await requestBLob(conversation);

    if (data) setPlaying(true);
  };

  $(function () {
    if (typeof webkitSpeechRecognition !== 'function') {
      alert('크롬에서만 동작 합니다.');
      return false;
    }

    const FIRST_CHAR = /\S/;
    const TWO_LINE = /\n\n/g;
    const ONE_LINE = /\n/g;

    const recognition = new window.webkitSpeechRecognition();
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
    const $final_span = document.querySelector('#final_span');
    const $interim_span = document.querySelector('#interim_span');
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
      console.log('playing', playing);
      let interimTranscript = '';
      if (typeof event.results == 'undefined') {
        recognition.onend = null;
        recognition.stop();
        return;
      }

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript = transcript;
          $record.innerHTML += '<div>You : ' + finalTranscript + '</div>';
        } else {
          interimTranscript = transcript;
        }
      }

      finalTranscript = capitalize(finalTranscript);
      $final_span.innerHTML = linebreak(finalTranscript);
      $interim_span.innerHTML = linebreak(interimTranscript);
      console.log('finalTranscript', finalTranscript);
      console.log('interimTranscript', interimTranscript);
      fireCommand(finalTranscript);

      if (finalTranscript) {
        requestCallbot(finalTranscript);
        recognition.onend = null;
        recognition.stop();
        return;
      }
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
      } else if (string.endsWith('Bye')) {
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
      $final_span.innerHTML = '';
      $interim_span.innerHTML = '';
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
      u.rate = 0.7;
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
        const text = $final_span.innerText || defaultMsg;
        textToSpeech(text);
      });

      $btnMic.addEventListener('click', start);
    }

    initialize();
  });

  return (
    <Box>
      <div className='MainPage'>
        <MainContent />
        <MainDialog />
      </div>

      <ReactPlayer
        style={{ display: 'none' }}
        url={voiceBlob}
        playing={playing}
        onEnded={() => setPlaying(false)}
        controls={false}
      />

      <Snackbar
        open={requestFailed}
        autoHideDuration={3000}
        onClose={() => setRequestFailed(false)}>
        <Alert severity='error' variant='filled'>
          통신이 원활하지 않습니다.
        </Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
}

// ========================================

export default MainPage;
