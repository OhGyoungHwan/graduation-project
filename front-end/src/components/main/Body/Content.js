import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  Card,
  Button,
  ButtonGroup,
  ToggleButton,
  Toast,
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
  Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { MessageLeft, MessageRight } from "./ConversationHistoy";

import Header from '../../header/Header';
import travel from '../../../sound/travel.wav'
import food from '../../../sound/food.wav'
import music from '../../../sound/music.wav'
import sports from '../../../sound/sports.wav'

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
    document.getElementById('list-area').className = 'col-8 h-100 w-100 m-0';
  }
}

function btn_before_ck() {
  if (document.getElementById('beforerow').style.display == 'none') {
    document.getElementById('card_btn_row').remove();
    document.getElementById('subject_btn_row').remove();
    document.getElementById('beforerow').style.display = 'flex';
  }
}

function ToggleButtonExample(props) {
  const radios = [
    { name: '여행', value: 'Where can I take a taxi downtown?' },
    { name: '음식', value: 'Are you ready to order?' },
    { name: '음악', value: 'What are you listening to?' },
    { name: '스포츠', value: 'Do you go in for any sports?' },
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
          checked={props.radioValue === radio.value}
          onChange={(e) => props.setRadioValue(e.currentTarget.value)}
          onClick={(e) => {btn_subject_ck(e.currentTarget.value); props.setSubject(radio.name); props.setRadioValue(radio.value)}}
          className='w-25 fs-3'>
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

function MainContent(props) {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <Container className='mt-5 bg-light' id='main-page'>
      <Row id="card_btn_row">
        <Col>
          <Card border="success" className="bg-success text-white">
              <Card.Img src={Sl1} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title className="fs-3">Caii 영어 콜봇</Card.Title>
                <Card.Text className="fs-6">
                  <br/>인공지능과 영어회화를 통해 실력을 기르는<br/><br/> Caii 영어 콜봇 서비스 입니다.<br/><br/>
                  그럼 먼저 주제를 선택해봅시다.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
        </Col>
      </Row>
      <Row className='mt-2' id='subject_btn_row'>
        <ButtonGroup className='mb-2'>
          <ToggleButtonExample setSubject={props.setSubject} radioValue={props.radioValue} setRadioValue={props.setRadioValue}/>
        </ButtonGroup>
        <Button onClick={() => {
          props.currentId === undefined ? window.location.assign('https://sumai.co.kr/login?url=' + window.location.href) : btn_before_ck(); 
          props.requestPrevConvHistory()
        }} 
        variant="outline-light" className="bg-secondary">이전대화 목록</Button>
      </Row>
      <Row id="beforerow" style={{display:'none'}}>
          {props.prevConvHistory.slice(0).reverse().map((convHistory, idx) => (
          <Col md={4} className="mb-2">
            <Button onClick={toggleShowA} className="mb-2" style={{display: 'none'}}>
              Toggle Toast <strong>with</strong> Animation
            </Button>
            <Toast show={showA} onClose={toggleShowA}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{props.prevConvHistory.length - idx}번째 대화기록</strong>
              </Toast.Header>
              <Toast.Body className="overflow-scroll" style={{height: '20vw'}}>
                {convHistory.map((conv, idx) => (
                  conv['speaker'] === 'USER' 
                  ? <MessageRight key={idx} message={conv['conversation']} />
                  : <MessageLeft key={idx} message={conv['conversation']} />
                ))}
              </Toast.Body>
            </Toast>
          </Col>
          ))}
      </Row>
    </Container>
  );
}

function MainDialog(props) {
  const conversationArray = props.conversationArray;

  return (
    <Container id='dialog-page' className='bg-light mt-3'>
      <Row id='dialog'>
        <Col id='speaking-area' className='h-100 m-auto'>
          <Row className='h-75'>
            <Col id='dialog-view' className='text-wrap bg-primary'>
              <Row className='wrap h-100'>
                <Col className='col-12 h-50'>
                  <span className='final' id='final_span'></span>
                  <span className='interim' id='interim_span'></span>
                </Col>
                <Col className='col-12 h-25 text-center'>
                  <Button id='btn-mic' className='off'>
                    <BsMic size="24"/>
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
        <Col className="p-0">
          <Row id='list-area' className="w-100 m-0">
            <Col id='list-record' className='bg-warning bg-gradient overflow-scroll' style={{padding: '10px', height: '30vw', margin: 0}}>
              {conversationArray.map((conversation, idx) => (
                conversation['User'] !== undefined 
                ? <MessageRight key={idx} message={conversation['User']} />
                : <MessageLeft key={idx} message={conversation['Bot']} />
              ))}
            </Col>
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
  paper: {
    width: "80vw",
    height: "80vh",
    maxWidth: "500px",
    maxHeight: "700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative"
  },
  paper2: {
    width: "80vw",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative"
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  messagesBody: {
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )"
  },
}));

const sessionName = Math.random().toString(36).substr(2, 11);

function MainPage() {
  const theme = useTheme();
  const classes = useStyles();
  const [subject, setSubject] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState('');
  const [requestFailed, setRequestFailed] = useState(false);
  const [conversationArray, setConversationArray] = useState([]);
  const [prevConvHistory, setPrevConvHistory] = useState([]);
  const currentId = useSelector((store) => store.authentication.status.currentId);

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const requestBLob = async (conversation) => {
    URL.revokeObjectURL(voiceBlob);
    setVoiceBlob('');
    setPlaying(false);
    setLoading(true);

    let converationArrayAdd = conversationArray;
    converationArrayAdd.push({User: conversation});

    try {
      const response = await axios.post('/api/caii_en/request/conversation', {
        subject: subject,
        session_name: sessionName,
        conversation: conversation,
        numConv: conversationArray.length,
      });

      const responseBlob = response.data.blob.buffer.data;
      const blob = new Blob([new Uint8Array(responseBlob)], {
        type: 'audio/wav',
      });

      const url = URL.createObjectURL(blob);

      setVoiceBlob(url);

      const responseAIConversation = response.data.AIConversation;
      converationArrayAdd.push({Bot: responseAIConversation});
      setConversationArray(converationArrayAdd);

      return url;
    } catch (e) {
      setRequestFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const requestPrevConvHistory = async () => {
    setLoading(true);

    try {
      const response = await axios.post('/api/caii_en/request/prevConvHistory');
      const resPrevConvHistory = response.data.prev_conv_history;
      setPrevConvHistory(resPrevConvHistory);
      return resPrevConvHistory;
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

    $('#list-record').scrollTop($('#list-record').prop('scrollHeight'));

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
          // $record.innerHTML += '<div>You : ' + finalTranscript + '</div>';
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

  useEffect(() => {
    if (subject !== '' && radioValue !== '') {
      let AIFirstSound;
      if (subject === '여행') AIFirstSound = travel;
      else if (subject === '음식') AIFirstSound = food;
      else if (subject === '음악') AIFirstSound = music;
      else if (subject === '스포츠') AIFirstSound = sports;
      setVoiceBlob(AIFirstSound);
      setPlaying(true)

      const conversationArrayAdd = conversationArray
      conversationArrayAdd.push({Bot: radioValue})
    }
  }, [subject, radioValue])

  return (
    <Box>
      <div className='MainPage'>
        <MainContent setSubject={setSubject} radioValue={radioValue} setRadioValue={setRadioValue} 
        currentId={currentId} requestPrevConvHistory={requestPrevConvHistory} prevConvHistory={prevConvHistory}/>
        <MainDialog conversationArray={conversationArray}/>
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
