# rt-autocomplete
react autocomplete component, react dropdown component

# How to use ?

## React Autocomplete

### Simple use
```javascript
import React, { useState } from 'react';
import { AutoComplete }  from 'rt-autocomplete';

function App() {
    const [list, setList] = useState([])

    const onkeypress = (query) => {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
            .then(result => {
                const filteredList = result.filter((item) => item.email.includes(query.toLowerCase())).map((item) => ({label: item.id, value: item.email}))
                setList(filteredList)
            })
    }
    
    return (
        <div className="your-classname">
            <h1>Auto complete</h1>
            <AutoComplete 
                onkeypress = {onkeypress}
                listItems = { list }
                maxItem={15}
                showDropdownIcon = {true}
            />
        </div>
    );
}
```


### With Debounce 
```javascript
import React, { useState } from 'react';
import { AutoComplete }  from 'rt-autocomplete';

function App() {
    const [list, setList] = useState([])

    const onkeypress = (query) => {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
            .then(result => {
                const filteredList = result.filter((item) => item.email.includes(query.toLowerCase())).map((item) => ({label: item.id, value: item.email}))
                setList(filteredList)
            })
    }

    function debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }

  const bebouncedonKeyPress = debounce(onkeypress, 200)

  return (
    <div className="your-classname">
        <h1>Auto complete</h1>
        <AutoComplete 
          onkeypress = {bebouncedonKeyPress}
          listItems = { list }
          maxItem={15}
          showDropdownIcon = {true}
        />
    </div>
  );
}

export default App;
```

### props

```javascript
type OptionValue = string | number;

interface Props<T extends OptionValue> {
    onkeypress: (query: string, delay?: number) => void;
    onblur?: (query: string) => void;
    onfocus?: () => void;
    listItems: Option<T>[];
    defaultValue?: string,
    maxItem?: number,
    showDropdownIcon?: boolean
    CustomDropdownIcon?: React.ReactElement;
}
```

### porps, props type and description

```

| props              | type          | description                             |
| ------------------ |:-------------:| ---------------------------------------:|
| onkeypress         | function      | query: string, delay: number (optional) |
| onblur             | function      | optional, (query: string)               |
| onfocus            | function      | optional,                               |
| listItems          | Array[]       | { value: string | number, id: string }  |
| defaultValue       | string        | optional, default value to pre-populate |
| maxItem            | number        | optional, show **more items link** if no| 
|                    |               | of items are large                      |
| showDropdownIcon   | boolean       | optional, show/hide icon                |
| CustomDropdownIcon | ReactElement  | optional,                               |

```
