import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box, useMediaQuery, IconButton, Drawer, List, Typography, Divider, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

import './Header.css';
import { onClickLink } from '../../functions/util';
import imgLogo from '../../images/Caii_logo.png';
import MenuListComposition from './MenuListComposition';

function LeftDrawer(props) {
  const theme = useTheme();

  const { classes, openFeedbackDialog } = props;

  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const xsm = useMediaQuery(theme.breakpoints.up('xsm'));

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return ['left'].map((anchor) => (
    <React.Fragment key={anchor}>
      <IconButton onClick={toggleDrawer(anchor, true)} edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
        <MenuIcon />
      </IconButton>

      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        <Box
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role='presentation'
          style={matches ? {} : { width: '250px' }}>
          <ListItem>
            <a href='/' style={{ marginTop: 5, marginLeft: 5 }} className={classes.link}>
              <img src={imgLogo} alt='Caii' className={classes.imgLogo} />

              <Typography className={classes.summaryTypo} style={{ fontSize: '28px', marginLeft: '10px' }}>
                영어 콜봇
              </Typography>
            </a>

            <Box style={{ position: 'absolute', top: 10, right: 0 }}>{xsm ? undefined : <MenuListComposition />}</Box>
          </ListItem>

          <List>
            <ListItem button onClick={onClickLink('terms')}>
              <ListItemText disableTypography primary='이용약관' className={classes.listText} />
            </ListItem>
            <ListItem button onClick={onClickLink('privacy')}>
              <ListItemText disableTypography primary='개인정보처리방침' className={classes.listText} />
            </ListItem>
            <ListItem button onClick={onClickLink('notices')}>
              <ListItemText disableTypography primary='공지사항' className={classes.listText} />
            </ListItem>

            <Divider />

            <ListItem button onClick={() => openFeedbackDialog()}>
              <ListItemText disableTypography primary='의견 보내기' className={classes.listText} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  ));
}

export default LeftDrawer;
