import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

export const useAutocomplete = (items: Array<string>, id: string, onChange?: (value: string) => void) => {
  const [currentFocus, setCurrentFocus] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const onValueChange = ({ currentTarget: { parentNode, value } }: ChangeEvent<HTMLInputElement>) => {
    closeAllLists();

    if (!value) {
      return;
    }
    setCurrentFocus(-1);

    const listWrapper = document.createElement('DIV');
    listWrapper.setAttribute('id', `${id}autocomplete-list`);
    listWrapper.setAttribute('class', 'autocomplete-items');
    parentNode?.appendChild(listWrapper);

    items.forEach(item => {
      if (item.slice(0, value.length).toUpperCase() == value.toUpperCase()) {
        const el = document.createElement('DIV');

        el.innerHTML = `<strong>${item.slice(0, value.length)}</strong>`;
        el.innerHTML += item.slice(value.length);
        el.innerHTML += `<input type='hidden' value='${item}' />`;

        el.addEventListener('click', () => {
          const inputEl = el.lastElementChild as HTMLInputElement | null;
          if (inputRef.current && inputEl) {
            inputRef.current.value = inputEl.value;
            onChange?.(inputEl.value);
          }
          closeAllLists();
        });
        listWrapper.appendChild(el);
      }
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    let x: HTMLElement | HTMLCollectionOf<HTMLElement> | null = document.getElementById(`${id}autocomplete-list`);

    if (x) {
      x = x.getElementsByTagName('div');
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      addActive(x, currentFocus + (e.key === 'ArrowUp' ? -1 : 1));
    } else if (e.key == 'Enter') {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) (x as any)[currentFocus].click();
      }
    }
  };

  const addActive = (x: HTMLCollectionOf<HTMLElement> | null, focus: number) => {
    if (!x) return false;
    removeActive(x);

    let tempCurrentFocus = focus;

    if (focus >= x.length) {
      tempCurrentFocus = 0;
    }
    if (focus < 0) {
      tempCurrentFocus = x.length - 1;
    }

    x[tempCurrentFocus].classList.add('autocomplete-active');

    setCurrentFocus(tempCurrentFocus);
  };

  const removeActive = (x: HTMLCollectionOf<HTMLElement>) => {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  };

  const closeAllLists = (el?: EventTarget | null) => {
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
      if (el != x[i] && el != inputRef.current) {
        x[i].parentNode?.removeChild(x[i]);
      }
    }
  };

  const onDocumentClick = (e: MouseEvent) => {
    closeAllLists(e.target);
  };

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  return {
    onValueChange,
    onKeyDown,
    inputRef
  };
};
