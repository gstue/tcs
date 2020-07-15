
import React, { useState, useEffect } from 'react';

import axios from "axios";

import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '65ch',
  },
  underline: {
    margin: 0,
    width: '45ch',
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    },
    '&:hover:not($disabled):before': {
      backgroundColor: 'grey',
      height: 2,
    },
  }
}));

export default function DropDown(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [more, setMore] = useState(false);

  const { handleChange, handleNew } = props
  const classes = useStyles();
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div style={{ border: '2px solid #eee' }}>
      <TextField
        label="Search country"
        className={classes.textField}
        variant="filled"
        onChange={e => {
          setMore(false)
          setSearch(e.target.value)
        }}
        onBlur={() => {
          setMore(false)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div className="App" style={{ height: '300px', overflow: 'scroll' }}>
        {!more && filteredCountries.slice(0, 5).map((country, idx) => (
          <TextField  InputProps={{ classes: { underline: classes.underline } }} key={idx} value={country.name} onClick={handleChange} />
        ))}

        <div>
          {!more && filteredCountries.length - 5 > 0 && <Button onClick={() => { setMore(true) }}
            variant="contained"
            style={{ marginTop: '80px' }}
            color="primary">{filteredCountries.length - 5} more</Button>}
        </div>

        {more && filteredCountries.map((country, idx) => (
          <TextField InputProps={{ classes }} key={idx} value={country.name} onClick={handleChange} />
        ))}

        {filteredCountries.length < 1 &&
          <ListItem >
            <span>"{search}' not found </span><Button style={{ marginLeft: '30px', backgroundColor: '#eee' }} onClick={(e) => {
              handleNew(search)
            }} value={search} variant="contained">{`Add & Select`}</Button>
          </ListItem>
        }
      </div>
    </div>
  );
}
