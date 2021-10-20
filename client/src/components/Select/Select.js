import * as React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";

export default function SelectAutoWidth({label='',value='',options=[],def='None',selectValue,setValue}) {

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
      <FormControl sx={{ m: 1, minWidth: 80 }} >
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label={label}
        >
          {options.map((e,index)=> {return <MenuItem key={index} value={e.value} selected={e.value===selectValue}>{e.label}</MenuItem> })}
        </Select>
      </FormControl>
  );
}