import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { AutoComplete, Option } from ".";

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
            const onselect = (item: Option) => {
                console.log(item)
            }
            return <AutoComplete  
                listItems={list}
                onkeypress={onkeypress}
                showDropdownIcon = {true}
                CustomDropdownIcon={<span>^</span>}
                onSelect={onselect}
            />
        }
    )
    .add("With view more data",
        () => {
            const l = [
                {id: '1', value: 'One'},
                {id: '2', value: 'Two'},
                {id: '3', value: 'Three'},
                {id: '4', value: 'Four'},
                {id: '5', value: 'Five'},
                {id: '6', value: 'Six'},
                {id: '7', value: 'Seven'},
                {id: '8', value: 'Eight'},
                {id: '9', value: 'Nine'},
                {id: '10', value: 'Ten'},
                {id: '11', value: 'Eleven'},
                {id: '12', value: 'Twelve'},
                {id: '13', value: 'Thirteen'},
                {id: '14', value: 'Fourten'}
            ]
            const [originalList, stOriginalList] = useState(l);
            const [list, setList] = useState(l);


            const onkeypress = (query: string) => {
                const filteredList = originalList.filter((item: any) => item.value.toLowerCase().includes(query.toLowerCase())).map((item: any) => ({id: item.label, value: item.value}))
                setList(filteredList)
            }

            const onclickmore = (query: string) => {
                console.log(query)
            }

            const onselect = (item: Option) => {
                console.log(item)
            }

            return <AutoComplete  
                listItems={list}
                onkeypress={onkeypress}
                showDropdownIcon = {true}
                maxItem={10}
                onclickmore={onclickmore}
                onSelect={onselect}
            />
        }
    )
    .add("With fetch api",
        () => {
            const l = []
            const [originalList, setOriginalList] = useState(l);
            const [list, setList] = useState(l);

            useEffect(() => {
                fetch('https://jsonplaceholder.typicode.com/comments')
                    .then(res => res.json())
                        .then(result => {
                            const r = result.map((item: any) => ({id: item.id, value: item.email}))
                            setOriginalList(r)
                        })
            }, [])


            const onkeypress = (query: string) => {
                const filteredList = originalList.filter((item: any) => item.value.toLowerCase().includes(query.toLowerCase()))
                setList(filteredList)
            }

            const onclickmore = (query: string) => {
                console.log(query)
            }

            const onselect = (item: Option) => {
                console.log(item)
            }

            return <AutoComplete  
                listItems={list}
                onkeypress={onkeypress}
                showDropdownIcon = {true}
                maxItem={15}
                onclickmore={onclickmore}
                onSelect={onselect}
            />
        }
    );