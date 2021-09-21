import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { AutoComplete } from ".";

storiesOf("AutoComplete", module)
    .add("With static data",
        () => {
            const list = [
                {id: '1', value: 'One'},
                {id: '2', value: 'Two'},
                {id: '3', value: 'Three'},
                {id: '4', value: 'Four'},
                {id: '5', value: 'Five'},
                {id: '6', value: 'Six'}
            ]
            const onkeypress = (query: string) => {
                const filteredList = list.filter((item: any) => item.value.toLowerCase().includes(query.toLowerCase())).map((item: any) => ({label: item.label, value: item.value}))
                console.log(filteredList)
            }
            return <AutoComplete  
                listItems={list}
                onkeypress={onkeypress}
                showDropdownIcon = {true}
            />
        }
    )
    // .add("with async data ",
    //     () => {
        
    //     const [list, setList] = useState([]);
    //     const onkeypress = (query: string, delay?: number) => {
    //         console.log('query ', query)
    //         fetch('https://jsonplaceholder.typicode.com/comments')
    //           .then(res => res.json())
    //             .then(result => {
    //               const filteredList = result.filter((item: any) => item.email.includes(query.toLowerCase())).map((item: any) => ({label: item.id, value: item.email}))
    //               console.log(filteredList)
        
    //               setList(filteredList)
    //             })
    //     } 
    //         return <AutoComplete  
    //             listItems={[]}
    //             onkeypress={()=>{}}
    //         />
    //     }
    // )