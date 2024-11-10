import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      datalist: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    }
  }
}

type AutocompleteSelectProps = {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  label: string;
  placeholder: string;
};

const AutocompleteSelect = ({ value, setValue, options, label, placeholder }: AutocompleteSelectProps) => {
  return (
    <FormControl flex="1">
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        list="autocomplete-list"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <datalist id="autocomplete-list">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </FormControl>
  );
};

export default AutocompleteSelect;
