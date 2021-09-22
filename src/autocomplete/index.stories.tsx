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
                CustomDropdownIcon={<span>^</span>}
            />
        }
    )
    .add("With view more data",
        () => {
            const list = [
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
            const onkeypress = (query: string) => {
                const filteredList = list.filter((item: any) => item.value.toLowerCase().includes(query.toLowerCase())).map((item: any) => ({label: item.label, value: item.value}))
                console.log(filteredList)
            }
            return <AutoComplete  
                listItems={list}
                onkeypress={onkeypress}
                showDropdownIcon = {true}
                maxItem={10}
            />
        }
    );