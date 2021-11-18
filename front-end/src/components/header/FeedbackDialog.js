import React from 'react';
import { useDispatch } from 'react-redux';

import { useTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import axios from 'axios';

import { sendAct } from '../../reducers/clientInfo';
import * as root from '../../rootValue';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    margin: '0 auto',
  },
  content: {
    display: 'flex',
    padding: '10px 15px',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0.25),
    color: 'white',
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function useFeedbackDialog(props) {
  const { open, setOpen } = props;
  const theme = useTheme();
  const classes = useStyles();

  const [message, setMessage] = React.useState('');

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const [sendEmailButton, setSendEmailButton] = React.useState(true);
  const [sendEmailStatus, setSendEmailStatus] = React.useState(null);

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const dispatch = useDispatch();

  const showCanvas = () => {};

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
  function sendEmail(e) {
    setSendEmailButton(false);
    e.preventDefault();

    axios.post('/api/Email/sendEmail', { message: message }).then(
      (res) => {
        // email을 추가하려면 {massage: message, email: 변수}
        setSendEmailStatus(res.status);
        dispatch(sendAct('send feedback is success'));
        setSnackbarOpen(true);
      },
      (res) => {
        setSendEmailButton(true);
        setSendEmailStatus(res.status);
        dispatch(sendAct('send feedback is fail'));
        setSnackbarOpen(true);
      },
    );
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
    setMessage('');
    setSendEmailButton(true);
  };

  return (
    <Box>
      <Dialog
        id='feedback'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullScreen={!matches}
        style={matches ? { width: '460px' } : {}}
        className={classes.root}>
        <DialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          style={{
            backgroundColor: root.PrimaryColor,
            color: 'white',
            padding: '10px 15px',
          }}>
          의견 보내기
        </DialogTitle>
        <Box className={classes.content} style={matches ? { minHeight: '200px', maxHeight: '250px' } : { height: '100%' }}>
          <TextareaAutosize
            className={classes.textInput}
            maxLength='5000'
            autoFocus={true}
            onChange={handleMessage}
            placeholder='의견을 보내고 싶으신가요? 보내 주신 의견은 소중하게 활용되지만, 민감한 정보는 공유하지 말아 주세요. 궁금하신 점이 있나요? 지원팀에 문의해 보세요.'
            style={{
              boxSizing: 'border-box',
              flexGrow: 1,
              width: '100%',
              height: 'auto',
              resize: 'none',
              border: 'none',
              outline: 'none',
              font: '400 16px NotoSansKR-Regular',
            }}
          />
        </Box>
        <Box style={{ display: 'block', background: 'WhiteSmoke', padding: '0' }}>
          <Box style={{ display: 'flex' }}>
            <img id='screenshotPreview' src='' alt='' style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={showCanvas} />
          </Box>
        </Box>
        <small
          style={{
            borderTop: '1px solid rgb(224, 224, 224)',
            color: 'rgb(168, 168, 168)',
            backgroundColor: 'rgb(250, 250, 250)',
            font: '12px NotoSansKR-Regular',
            padding: '15px 15px',
          }}>
          일부 계정 및 시스템 정보가 Caii에 전송될 수 있습니다. 제공해 주신 정보는 개인정보처리방침 및 서비스 약관에 따라 기술 문제를 해결하고 서비스를 개선하는
          데 사용됩니다.
        </small>
        <DialogActions
          style={{
            borderTop: '1px solid rgb(224, 224, 224)',
            backgroundColor: 'rgb(250, 250, 250)',
            padding: '5px 15px',
          }}>
          <Button id='sendEmailButton' autoFocus color='primary' style={{ font: '16px NotoSansKR-Regular' }} onClick={sendEmail} disabled={!sendEmailButton}>
            보내기
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar autoHideDuration={3000} open={snackbarOpen} onClose={handleCloseSnackbar}>
        {(sendEmailStatus === 200 && <Alert severity={'success'}>소중한 의견 감사합니다.</Alert>) || (
          <Alert severity={'error'}>죄송합니다. 의견 보내기 실패했습니다.</Alert>
        )}
      </Snackbar>
    </Box>
  );
}

export default useFeedbackDialog;
