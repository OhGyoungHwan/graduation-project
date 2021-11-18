import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { GridList, GridListTile, useMediaQuery, Typography, IconButton, Box, Grow, Button, ClickAwayListener, Popper, Paper } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import CallIcon from '@material-ui/icons/Call';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import { onClickExternLink } from '../../functions/util';
import * as root from '../../rootValue';
import sumaiIcon from './icon/sumai192.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.up('xsm'));

  const menuInfoList = [
    {
      Icon: undefined,
      imageURL: sumaiIcon,
      name: '요약',
      link: 'https://www.sumai.co.kr',
      color: undefined,
    },
    {
      Icon: FeaturedPlayListIcon,
      imageURL: undefined,
      name: '뉴스',
      link: 'https://news.sumai.co.kr',
      color: blue[600],
    },
    {
      Icon: RecordVoiceOverIcon,
      imageURL: undefined,
      name: '보이스',
      link: 'https://voi.sumai.co.kr',
      color: purple[600],
    },
    {
      Icon: CallIcon,
      imageURL: undefined,
      name: '영어 콜봇',
      link: 'https://caii.sumai.co.kr',
      color: green[600],
    },
  ];

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function ServiceIcon(props) {
    const { Icon, imageURL, name, link, color } = props;

    return (
      <Button onClick={onClickExternLink(link)} style={{ width: '100%' }}>
        <Box>
          {Icon !== undefined && <Icon style={{ fontSize: xsm ? '50px' : '40px', color: color }} />}
          {imageURL !== undefined && (
            <img src={imageURL} alt={name} style={{ width: xsm ? '50px' : '40px', objectFit: 'scale-down', objectPosition: 'center' }} />
          )}
          <Typography style={{ fontFamily: 'NotoSansKR-Regular', textAlign: 'center' }}>{name}</Typography>
        </Box>
      </Button>
    );
  }

  return (
    <Box className={classes.root}>
      <Box>
        <IconButton
          style={{ marginRight: '5px' }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}>
          <AppsIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 100, marginLeft: xsm ? '-150px' : undefined }}>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper elevation={3}>
                <ClickAwayListener onClickAway={handleClose}>
                  <GridList cols={xsm ? 3 : 2} style={{ margin: 'auto', width: xsm ? '300px' : '200px' }}>
                    {menuInfoList !== undefined &&
                      menuInfoList.map((menuInfo, idx) => (
                        <GridListTile key={idx} cols={1} style={{ height: 'auto' }}>
                          <ServiceIcon Icon={menuInfo.Icon} imageURL={menuInfo.imageURL} name={menuInfo.name} link={menuInfo.link} color={menuInfo.color} />
                        </GridListTile>
                      ))}
                  </GridList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
}

export default MenuListComposition;
