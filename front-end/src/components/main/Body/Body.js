import Box from '@material-ui/core/Box';
import { React, useState } from 'react';

import { makeStyles, useTheme, useMediaQuery, Button } from '@material-ui/core';

import { onClickLink } from '../../../functions/util';
import * as root from '../../../rootValue';

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
}));

function Body() {
  const theme = useTheme();
  const classes = useStyles();

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box className={classes.root}>
      <Button className={classes.button} onClick={onClickLink('/call')}>
        통화
      </Button>
    </Box>
  );
}

export default Body;
