import React from 'react';
import { useSelector } from 'react-redux';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AccountIcon from '@material-ui/icons/AccountCircle';

import FeedbackDialog from './FeedbackDialog';
import MenuListComposition from './MenuListComposition';
import AccountManagementMenu from './AccountManagementMenu';
import LeftDrawer from './LeftDrawer';

import { onClickExternLink } from '../../functions/util';

import './Header.css';

import imgLogo from '../../images/Caii_logo.png';
import * as root from '../../rootValue';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'sticky',
    top: 0,
    zIndex: '1000',
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: '#0000008A',
  },
  AppBarStyle: {
    background: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
  },
  imgLogo: {
    width: 63.75,
    height: 28.125,
    alt: 'Caii',
  },
  imgLogoMob: {
    width: 55.25,
    height: 24.375,
    alt: 'Caii',
  },
  newsButton: {
    '&:hover': {
      background: '#e3f2fd',
    },
    background: '#fff',
    color: root.PrimaryColor,
    border: '1px solid #d4d4d4',
    marginRight: '20px',
  },
  loginButton: {
    '&:hover': {
      background: root.HoberColor,
    },
    background: root.PrimaryColor,
    color: '#fff',
  },
  summaryTypo: {
    color: '#0000008A',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    minWidth: '142px',
  },
  list: {
    width: 280,
  },
  fullList: {
    width: 'auto',
  },
  listText: {
    fontFamily: 'NotoSansKR-Regular',
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(5),
    fontSize: 13,
  },
}));

function Header(props) {
  const theme = useTheme();
  const classes = useStyles();

  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const xsm = useMediaQuery(theme.breakpoints.up('xsm'));
  const isLoggedIn = useSelector((state) => state.authentication.status.isLoggedIn);

  const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);

  function openFeedbackDialog() {
    setFeedbackDialogOpen(true);
  }

  const Logo = (
    <a href='/' className={classes.link}>
      <img src={imgLogo} alt='Caii' className={matches ? classes.imgLogo : classes.imgLogoMob} />
      <Typography className={classes.summaryTypo} style={matches ? { fontSize: '28px', marginLeft: '10px' } : { fontSize: '24px', marginLeft: '8px' }}>
        영어 콜봇
      </Typography>
    </a>
  );

  const loginButton = (
    <Button
      className={classes.loginButton}
      onClick={onClickExternLink('https://sumai.co.kr/login?url=' + window.location.href)}
      style={matches ? { padding: '7.5px 15px' } : { padding: '5px', minWidth: '80px' }}>
      <AccountIcon style={{ marginRight: '5px' }} />
      로그인
    </Button>
  );

  const loginLayout = (
    <Box display='flex' flexDirection='row' style={{ marginLeft: 'auto', color: 'rgba(0, 0, 0, 0.87)' }}>
      <Box p={0}>
        <AccountManagementMenu props={props} />
      </Box>
    </Box>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static' elevation={0} className={classes.AppBarStyle} style={matches ? { padding: '10px 0px' } : { minWidth: '250px' }}>
        <Toolbar variant='dense' style={matches ? {} : { padding: '0px 10px 0px 20px', flex: 1 }}>
          <LeftDrawer classes={classes} openFeedbackDialog={openFeedbackDialog} />

          {Logo}

          <div style={{ flexGrow: 1 }} />

          {xsm ? <MenuListComposition /> : undefined}

          {isLoggedIn ? loginLayout : loginButton}
        </Toolbar>
      </AppBar>

      <FeedbackDialog open={feedbackDialogOpen} setOpen={setFeedbackDialogOpen} />
    </div>
  );
}

export default Header;
