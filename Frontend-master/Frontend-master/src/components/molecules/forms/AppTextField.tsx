import React, { FC } from 'react';
import { TextField } from '@mui/material';

// Define the props explicitly, avoiding potential issues with TextFieldProps
interface AppTextFieldProps {
  label?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean; // Optional customization for fullWidth behavior
  InputLabelProps?: object; // To handle label properties like `shrink: true`
}

const AppTextField: FC<AppTextFieldProps> = ({
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      fullWidth={fullWidth}
      {...props} // Spread additional props
    />
  );
};

export default AppTextField;
