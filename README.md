# rt-autocomplete
react autocomplete component, react dropdown component. It is built using React and TypeScript. It has ability to provide custom listItem component as props which
makes it highly flexible and usable.

# How to use ?
please follow the doc.

## React Autocomplete
![autoComplete1](https://user-images.githubusercontent.com/13742861/135275135-1516d8c6-3e23-4760-9c5a-64c15562dba1.gif)

![autoComplete2](https://user-images.githubusercontent.com/13742861/135278539-9af381e8-b83f-40ec-8d26-f10c855f1b3f.gif)

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

  const debouncedOnKeyPress = debounce(onkeypress, 200)

  return (
    <div className="your-classname">
        <h1>Auto complete</h1>
        <AutoComplete 
          onkeypress = {debouncedOnKeyPress}
          listItems = { list }
          maxItem={15}
          showDropdownIcon = {true}
        />
    </div>
  );
}

export default App;
```

### props and types

```Typescript
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
```

### list of porps

```

| props                | type          | description                               |
| -------------------- |:-------------:| -----------------------------------------:|
| onkeypress           | function      | (query: string, delay?: number) => void;  |
| onblur               | function      | [optional], (query: string) => void;      |
| onfocus              | function      | [optional], () => void;                   |
| onclickmore          | function      | [optional], (query: string) => void;      |
| onSelect             | function      | (item: Option) => void;                   |
| renderCustomListItem | function      | [optional], (porp: Option)=> ReactElement |
| listItems            | Array[Option] | Array of Option type                      |
| defaultValue         | string        | [optional], default value for initial load|
| maxItem              | number        | [optional], show "more items link" if no  | 
|                      |               | of items are large                        |
| showDropdownIcon     | boolean       | [optional], show/hide icon                |
| CustomDropdownIcon   | ReactElement  | [optional],                               |

```


### React + Typescript example

```tsx
import React, { useState } from 'react';
import { AutoComplete, Option }  from 'rt-autocomplete'; // Option is type of List Item

const CustomListItem = (props: Option) => {
    return (
        <div className="">
            {props.value}
        </div>
    )        
}

const CustomListItemWithImage = (props: Option) => {
    return (
        <div className="listitem">
            <div style={{display: 'grid', gridTemplateColumns: '50px auto', gridTemplateRows: 35}}>
                <div><img src={props.img} alt="" style={{borderRadius: '50%', height: 40}}/></div>
                <div>
                    <div style={{fontSize: 14}}>{props.value}</div>
                    <div style={{fontSize: 12, color: '#777'}}>{props.secondaryValue}</div>
                </div>
            </div>
        </div>
    )        
}

export default function App() {
    const [list, setList] = useState<Option[]>([])
    const [userList, setUserList] = useState<Option[]>([])

    const userImg =[
        "https://randomuser.me/api/portraits/thumb/men/46.jpg",
        "https://randomuser.me/api/portraits/thumb/women/28.jpg",
        "https://randomuser.me/api/portraits/thumb/men/4.jpg",
        "https://randomuser.me/api/portraits/thumb/men/93.jpg",
        "https://randomuser.me/api/portraits/thumb/women/66.jpg",
        "https://randomuser.me/api/portraits/thumb/men/90.jpg",
        "https://randomuser.me/api/portraits/thumb/women/43.jpg",
        "https://randomuser.me/api/portraits/thumb/men/92.jpg",
        "https://randomuser.me/api/portraits/thumb/men/32.jpg",
        "https://randomuser.me/api/portraits/thumb/women/58.jpg"
    ]

    const onkeypress = (query: string) => {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
            .then(result => {
                const filteredList = result.filter((item: any) => item.email.includes(query.toLowerCase())).map((item: any) => ({id: item.id, value: item.email}))
                setList(filteredList)
            })
    }

    const onchange = (query: string) => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
            .then(result => {
                const filteredUserList: Option[] = result.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase())).map((item: any) => ({id: item.id, value: item.name, img: userImg[Math.floor(Math.random()*10)], secondaryValue: item.email }))
                setUserList(filteredUserList)
            })
    }

    const onSelect = (item: Option) => {
        console.log(item.id, item.value)
    }

    
    
    return (
        <div className="your-classname">
            <div className="container">
                <h3>Auto complete</h3>
                <AutoComplete 
                    onkeypress = {onkeypress}
                    listItems = { list }
                    maxItem={15}
                    showDropdownIcon = {true}
                    onSelect={onSelect}
                />
            </div>

            <div className="container">
                <h3>Auto complete with CustomListItem</h3>
                <AutoComplete 
                    onkeypress = {onkeypress}
                    listItems = { list }
                    maxItem={15}
                    showDropdownIcon = {true}
                    renderCustomListItem={CustomListItem}
                    onSelect={onSelect}
                />
            </div>

            <div className="container">
                <h3>Auto complete with CustomListItem(image + text)</h3>
                <AutoComplete 
                    onkeypress = {onchange}
                    listItems = { userList }
                    maxItem={15}
                    showDropdownIcon = {true}
                    renderCustomListItem={CustomListItemWithImage}
                    onSelect={onSelect}
                />
            </div>
        </div>
    );
}

```
