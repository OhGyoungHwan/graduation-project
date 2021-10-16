import Box from '@material-ui/core/Box';
import { React, useState } from 'react';

import { makeStyles, useTheme, useMediaQuery, Typography } from '@material-ui/core';

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
}));

function Body() {
  const theme = useTheme();
  const classes = useStyles();

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box className={classes.root}>
      <Typography>메인</Typography>
    </Box>
  );
}

export default Body;
