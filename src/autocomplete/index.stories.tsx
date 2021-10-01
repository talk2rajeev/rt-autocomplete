import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { AutoComplete, Option } from ".";

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
    )
    .add("With fetch api + custom list item",
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
                renderCustomListItem={CustomListItem}
            />
        }
    )
    .add("With fetch api + custom listitem (with image)",
        () => {
            const l = []
            const [originalList, setOriginalList] = useState(l);
            const [list, setList] = useState(l);

            useEffect(() => {
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then(res => res.json())
                        .then(result => {
                            const r = result.map((item: any, i: number) => ({id: item.id, value: item.email, img: userImg[i], secondaryValue: item.email}))
                            setOriginalList(r)
                            setList(r)
                        })
            }, [])

            const onkeypress = (query: string) => {
                const filteredUserList: Option[] = originalList.filter((item: any) => item.value.toLowerCase().includes(query.toLowerCase()))
                setList(filteredUserList)
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
                renderCustomListItem={CustomListItemWithImage}
            />
        }
    );