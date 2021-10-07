import React, { useRef, useState, useEffect } from "react";
import "./autocomplete.css";

export type Option = {
  id: string;
  value: string;
  img?: string;
  secondaryValue?: string;
};

interface Props {
  onkeypress: (query: string, delay?: number) => void;
  onblur?: (query: string) => void;
  onfocus?: () => void;
  onclickmore?: (query: string) => void;
  onSelect: (item: Option) => void;
  renderCustomListItem?: (porps: any) => React.ReactElement;
  listItems: Option[];
  defaultValue?: string;
  maxItem?: number;
  showDropdownIcon?: boolean;
  CustomDropdownIcon?: React.ReactElement;
}

export const AutoComplete = ({
  onkeypress,
  onblur,
  onfocus,
  onclickmore,
  onSelect,
  listItems,
  renderCustomListItem,
  defaultValue = "",
  maxItem,
  showDropdownIcon = false,
  CustomDropdownIcon,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLInputElement>(null);

  const onInputFocus = () => {
    setIsActive(true);
    onfocus && onfocus();
  };

  const onDropdownIconClick = () => {
    onInputFocus();
    inputRef.current?.focus();
  };

  const onInputBlur = () => {
    onblur && onblur(inputValue);
  };

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onkeypress(e.target.value);
  };

  const onItemSelect = (item: Option): void => {
    if (item.value) {
      setInputValue(item.value);
      onSelect(item);
    }
    setIsActive(false);
  };

  const clickAnywhere = (e: any) => {
    if (wrapperRef.current && !wrapperRef.current!.contains(e.target)) {
      setIsActive(false);
    }
  };

  const onClickMoreLink = () => {
    onclickmore
      ? onclickmore(inputValue)
      : console.warn(
          'Please provide "onclickmore" function as props to <AutoComplete /> component'
        );
    setInputValue("");
    setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener("click", clickAnywhere);

    return () => {
      document.removeEventListener("click", clickAnywhere);
    };
  }, []);

  const listItemsToDisplay = listItems.slice(
    0,
    maxItem ? maxItem : listItems.length - 1
  );
  const remainingItems: number = maxItem ? listItems.length - maxItem : 0;

  return (
    <div ref={wrapperRef} className="ddCoContainer">
      <div className="inputContainer">
        <input
          ref={inputRef}
          className="autocompleteinput"
          onChange={onchange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          value={inputValue}
        />
        {showDropdownIcon && !CustomDropdownIcon ? (
          <DefaultDropdownIcon onDropdownIconClick={onDropdownIconClick} />
        ) : (
          <span className="dropdown-icon" onClick={onDropdownIconClick}>
            {CustomDropdownIcon}
          </span>
        )}
      </div>
      {isActive && listItemsToDisplay.length > 0 && (
        <div className="listContainer">
          {listItemsToDisplay.map((item) => (
            <div onClick={() => onItemSelect(item)} key={item.id}>
              {renderCustomListItem ? (
                renderCustomListItem({ ...item })
              ) : (
                <ListItem item={item} key={item.id}/>
              )}
            </div>
          ))}
          {remainingItems > 0 && listItemsToDisplay.length > 0 && (
            <div className="more-item-text">
              <span className="more-link" onClick={onClickMoreLink}>
                {remainingItems} more items &raquo;
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface DropdownProps {
  onDropdownIconClick: () => void;
}
const DefaultDropdownIcon = ({ onDropdownIconClick }: DropdownProps) => (
  // <svg
  //   className="dropdown-icon"
  //   onClick={onDropdownIconClick}
  //   width="24"
  //   height="24"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <g id="Layer_1">
  //     <title>Layer 1</title>
  //     <path
  //       stroke="#999"
  //       id="svg_1"
  //       d="m6.58168,17.67989l6.17256,-11.14143l6.17256,11.14143l-12.34513,0l0.00001,0z"
  //       fill="#999"
  //     />
  //   </g>
  // </svg>
  <svg width="14" height="14" className="dropdown-icon" onClick={onDropdownIconClick} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5C2.03205 2.37257 3.12053 3.78587 3.69238 4.63548C4.4536 5.76644 5.21603 6.8726 6.05073 7.9458C6.31895 8.29064 6.68764 8.75848 6.84991 9.16415C6.9114 9.31786 7.01696 9.49045 7.10847 9.63425C7.24992 9.85653 7.14166 9.73379 7.23383 9.61858C7.56337 9.20667 8.17604 7.91652 8.5 7.5C9.5 6.21429 9.60181 5.78776 10.266 4.52578C10.422 4.22931 10.6229 3.94183 10.7831 3.64434C10.9823 3.27435 11.139 2.88391 11.3433 2.51609C11.6171 2.02323 11.7668 1.47536 12.0837 1" stroke="#545252" strokeWidth="2" strokeLinecap="round"/>
  </svg>

);

const ListItem: React.FC<{ item: Option }> = ({ item }) => (
  <div className="listitem">{item.value}</div>
);
