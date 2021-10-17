import Box from '@material-ui/core/Box';
import { React, useState, useEffect } from 'react';
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  TextareaAutosize,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import ReactPlayer from 'react-player';

import Header from '../header/Header';
import * as root from '../../rootValue';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      margin: '100px auto 50px',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '50px',
    },
    minWidth: '250px',
    maxWidth: '1000px',
  },
  button: {
    '&:hover': {
      background: root.HoberColor,
    },
    background: root.PrimaryColor,
    color: '#fff',
  },
  textArea: {
    background: '#ffffff',
    width: '300px',
    height: '100%',
    display: 'flex',
    lineHeight: '35px',
    minHeight: theme.spacing(20),
    outline: 'none',
    resize: 'none',
    fontSize: '22px',
    fontFamily: 'NotoSansKR-Regular',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    margin: theme.spacing(0),
  },
}));

const sessionName = Math.random().toString(36).substr(2, 11);

function Body() {
  const theme = useTheme();
  const classes = useStyles();
  const [conversation, setConversation] = useState();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState('');
  const [requestFailed, setRequestFailed] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const requestBLob = async () => {
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

  const requestCallbot = async (e) => {
    if (playing) {
      setPlaying(false);
      return;
    }

    const data = await requestBLob();

    if (data) setPlaying(true);
  };

  return (
    <Box>
      <Header />

      <TextareaAutosize
        className={classes.textArea}
        onChange={(e) => setConversation(e.target.value)}
        spellCheck='false'
      />

      <Button className={classes.button} onClick={requestCallbot}>
        전송
      </Button>

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

export default Body;
