import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import AsyncSelect from 'react-select/async';

interface Option {
  label: string;
  value: string;
}

interface SingleSelectComponentProps {
  value: Option | null;
  setValue: (value: Option | null) => void;
  loadOptions: (inputValue: string, callback: (options: Option[]) => void) => void;
  label: string;
  placeholder?: string;
  defaultOptions: Option[];
}

const SingleSelectComponent: React.FC<SingleSelectComponentProps> = ({ value, setValue, loadOptions, label, placeholder, defaultOptions }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        isClearable
      />
    </FormControl>
  );
};

export default SingleSelectComponent;
