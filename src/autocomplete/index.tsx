import React, { useRef, useState, useEffect } from 'react'
import './autocomplete.css'; //

/* option value can be of a type string OR number */
type OptionValue = string | number;

type Option<T extends OptionValue> = {
  value: T;
  id: string;
}; 

interface Props<T extends OptionValue> {
    onkeypress: (query: string, delay?: number) => void;
    onblur?: (query: string) => void;
    onfocus?: () => void;
    onclickmore?: (query: string) => void;
    listItems: Option<T>[];
    listItemElement?: React.ReactElement,
    defaultValue?: string,
    maxItem?: number,
    showDropdownIcon?: boolean,
    CustomDropdownIcon?: React.ReactElement,
}

export const AutoComplete = <T extends OptionValue>({
    onkeypress,
    onblur,
    onfocus,
    onclickmore,
    listItems,
    listItemElement,
    defaultValue="",
    maxItem,
    showDropdownIcon=false,
    CustomDropdownIcon
}: Props<T>) => {
    const [isActive, setIsActive] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue)

    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLInputElement>(null)

    
    const onInputFocus = () => {
        setIsActive(true)
        onfocus && onfocus()
    }

    const onDropdownIconClick = () => {
        onInputFocus();
        inputRef.current?.focus();
    }

    const onInputBlur = () => {
        onblur && onblur(inputValue)
    }

    const onchange = (value: string) => {
        setInputValue(value);
        onkeypress(value)
    }

    const onItemSelect = (element: any): void => {
        const dataid = element.target.attributes['data-id']
        const dataval = element.target.attributes['data-val']
        if (dataval) {
            setInputValue(dataval.value)
        } else {
            // props.onMoreClick()
        }
        setIsActive(false)
    }

    const clickAnywhere = (e: any) => {
        if (!wrapperRef.current!.contains(e.target)) {
            setIsActive(false)
        }
    }

    const onClickMoreLink = () => {
        onclickmore ? onclickmore(inputValue) : console.warn('Please provide "onclickmore" function as props to <AutoComplete /> component');
        setInputValue('');
    }

    useEffect(()=>{
        document.addEventListener('click', clickAnywhere)

        return () => {
            document.removeEventListener('click', clickAnywhere);
        }

    }, [])

    const listItemsToDisplay = listItems.slice(0, maxItem ? maxItem : listItems.length-1)
    const remainingItems: number = maxItem ? listItems.length - maxItem : 0

    return (
        <div ref={wrapperRef} className="ddCoContainer">
            <div className="inputContainer">
                <input 
                    ref = {inputRef}
                    className="autocompleteinput"
                    onChange = {(e) => onchange(e.target.value)}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    value={inputValue}
                />
                {
                    showDropdownIcon && !CustomDropdownIcon ? <DefaultDropdownIcon onDropdownIconClick={onDropdownIconClick} />  : <span className="dropdown-icon" onClick={onDropdownIconClick}>{ CustomDropdownIcon }</span>
                }
            </div>
            { isActive && listItemsToDisplay.length > 0 && <div className="listContainer" onClick={(e)=>onItemSelect(e)}>
                {
                    listItemsToDisplay.map(item => <div className="listitem" key={item.id} data-val={item.value} data-id={item.id}>{item.value}</div>)
                }
                {
                    remainingItems > 0 && listItemsToDisplay.length > 0 && <div className="more-item-text"><span className="more-link" onClick={onClickMoreLink}>{remainingItems} more items.</span></div>
                }
            </div> }
        </div>
    )
}

interface DropdownProps {
    onDropdownIconClick: ()=> void;
} 
const DefaultDropdownIcon = ({onDropdownIconClick}:DropdownProps) => <svg className="dropdown-icon" onClick={onDropdownIconClick} width="24.000000000000004" height="24.000000000000004" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_1">
        <title>Layer 1</title>
        <path stroke="#999" id="svg_1" d="m6.58168,17.67989l6.17256,-11.14143l6.17256,11.14143l-12.34513,0l0.00001,0z" fill="#999"/>
    </g>
</svg>


