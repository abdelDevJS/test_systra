import TextField from "@mui/material/TextField";
import { ChangeEventHandler } from 'react';

interface searchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: number;
}

export default function SquareInput({ onChange, value }: searchInputProps) {
  return (
    
      <TextField value={value} type="number" onChange={onChange} />
    
  );
}
