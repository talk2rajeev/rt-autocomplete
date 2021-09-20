# rt-autocomplete
react autocomplete component, react dropdown component

# How to use ?

## React Autocomplete

### Simple use
```
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
```
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
