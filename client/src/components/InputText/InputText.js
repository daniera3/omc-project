import React from "react";
import { OutlinedInput, InputAdornment, FormControl, InputLabel } from "@material-ui/core";



const InputText = ({ onChange, label, placeholder, val, position = 'start', type = 'text' ,id,name}) => {


  const handelChange = (e) => {
    onChange(e.target.value);
  }


  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-weight">{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={type}
        value={val}
        onChange={handelChange}
        endAdornment={<InputAdornment position={position}>{placeholder}</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
        label={label}
      />
    </FormControl>
  );
}


export default InputText;




