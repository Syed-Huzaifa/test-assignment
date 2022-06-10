import { FC } from 'react';
import { useAutocomplete } from '~/hooks';

interface IAutocompleteProps {
  id: string;
  options: Array<string>;
  onChange?: (value?: string) => void;
  placeholder?: string;
}

export const Autocomplete: FC<IAutocompleteProps> = ({ options: items, onChange, id, placeholder }) => {
  const { inputRef, onValueChange, onKeyDown } = useAutocomplete(items, id, onChange);

  return (
    <div className="autocomplete" style={{ width: 300 }}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
