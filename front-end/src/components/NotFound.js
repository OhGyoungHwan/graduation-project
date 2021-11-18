import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import imgLogo from '../images/Caii_logo.png';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '300px',
    [theme.breakpoints.up(450)]: {
      margin: '10% auto 0',
      paddingRight: '128px',
      paddingBottom: '128px',
      // background: `url(https://www.sumai.co.kr/images/logo192.png) 100% 5px no-repeat`,
      backgroundSize: '128px',
    },
    [theme.breakpoints.down(450)]: {
      margin: '30px 10px 0',
    },
  },
  imgLogo: {
    width: 63.75,
    height: 28.125,
  },
  context: {
    fontFamily: 'NotoSansKR-Regular',
    color: '#424242',
    fontSize: '14px',
    minWidth: '200px',
  },
}));

const Header = (props) => {
  const { classes } = props;

  return (
    <a href='/' style={{ paddingBottom: '16px', textDecoration: 'none' }}>
      <Box display='flex' alignItems='center'>
        <img className={classes.imgLogo} alt='Caii' src={imgLogo} />

        <Typography style={{ fontSize: '28px', margin: '0px 10px', color: '#0000008A', minWidth: '111px' }}>영어 콜봇</Typography>
      </Box>
    </a>
  );
};

export default function NotFound() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header classes={classes} />
      <Box component='p'>
        <Typography className={classes.context}>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</Typography>
      </Box>
    </Box>
  );
}
