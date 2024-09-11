import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { MultiSelect } from 'react-multi-select-component';

type MultiSelectComponentProps = {
  value: any[];
  setValue: (value: any[]) => void;
  options: { label: string; value: string }[];
  label: string;
};

const MultiSelectComponent = ({ value, setValue, options, label }: MultiSelectComponentProps) => {
  return (
	<FormControl flex="1">
	  <FormLabel>{label}</FormLabel>
	  <MultiSelect
		options={options}
		value={value}
		onChange={setValue}
		labelledBy={`Selecione ${label.toLowerCase()}`}
		overrideStrings={{
		  selectSomeItems: "Selecione...",
		  allItemsAreSelected: "Todos os itens estão selecionados",
		  selectAll: "Selecionar todos",
		  search: "Pesquisar",
		}}
	  />
	</FormControl>
  );
};

export default MultiSelectComponent;
