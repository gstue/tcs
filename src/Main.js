import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import DropDown from './DropDown.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
    width: '75ch',
    color:'#3f51b5',
    border:'1px solid #000',
    backgroundColor:'#eee'
  }
  
}));


const Main = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('');


  const Dropdown = ({ children, isOpen, target, onClose }) => (
    <div css={{ position: 'fixed' }}>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
    </div>
  );

  const Menu = props => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
      <div
        css={{
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
          marginTop: 8,
          position: 'absolute',
          zIndex: 2,
        }}
        {...props}
      />
    );
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  };

  const handleNew = (e) => {
    setValue(e)
    toggleOpen()
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    toggleOpen()
  }

  const classes = useStyles();
  return (
    <Container fixed>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Button
          endIcon={ !isOpen?<ArrowDropDownIcon />:<ArrowRightIcon/>}
            color="primary"
            className={classes.textField}
            onClick={toggleOpen}
            isSelected={isOpen}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowDropDownIcon />
                </InputAdornment>
              ),
            }}
          >
            {value ? `${value}` : 'Select a location'}
          </Button>
          <Dropdown
            isOpen={isOpen}
            onClose={toggleOpen}
          >
            <DropDown handleNew={handleNew} handleChange={handleChange} />
          </Dropdown>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;