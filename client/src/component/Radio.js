import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPosition(props) {
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
    props.setMode(event.target.value)
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
        <FormControlLabel
          value="wait"
          control={<Radio color="primary" />}
          label="미채결"
          labelPlacement="end"
        />
        <FormControlLabel
          value="done"
          control={<Radio color="primary" />}
          label="채결"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
}