import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

interface Option {
  value: string | number | null;
  label: string | number;
}

interface CustomDropdownProps {
  label: string;
  options: Option[];
  value: string | number | null;
  onChange: (newValue: string | number | null) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, options, value, onChange }) => {
  const selectedValue = options.find(option => option.value === value) || null;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label.toString()} // Ensure label is displayed as a string
      value={selectedValue}
      onChange={(event, newValue) => onChange(newValue ? newValue.value : null)}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" InputLabelProps={{
          shrink: true,
          }}/>
      )}
      sx={{ width: 300, marginBottom: 2 }}
    />
  );
};

export default CustomDropdown;
