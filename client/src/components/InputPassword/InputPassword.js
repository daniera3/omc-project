import React from "react";
import { IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";


const InputPassword = ({ value, onChange, label = 'password', id, name }) => {
  const [showPassword, setShowPassword] = React.useState(false);


  const handelChange = (e) => {
    onChange(e.target.value);
  }


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        onChange={handelChange}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}


export default InputPassword;