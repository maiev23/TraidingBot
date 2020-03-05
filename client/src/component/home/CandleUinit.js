import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [min, setMin] = React.useState(1);

  const handleChange = event => {
    setMin(event.target.value);
    props.event(event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">캔들</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={min}
          onChange={handleChange}
        >
          <MenuItem value={1}>1분</MenuItem>
          <MenuItem value={3}>3분</MenuItem>
          <MenuItem value={5}>5분</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}