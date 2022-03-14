import { useGetApiUsers, useGetApiUsersId, useGetApiGroups } from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";
import { useState } from 'react';
import {useDrag} from "react-dnd";
import User from './User';
import axios from 'axios';



export function Users({allUsers, allGroups, setUsers}){

// form input values
const [values, setValue] = useState({
        id: "",
        user: ""
})

// State to manage if the add user card is visable or not
const [isAddNewUserEnabled, setIsAddNewUserEnabled] = useState(false)

const addUserClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setIsAddNewUserEnabled(true);

};


// Todo: Move this or refactor it for more efficient rerendering
const handlerUserNameChange = (event) => {
    let name = event.target.value
    setValue({id: name.toLowerCase().replace(" ",""), user: name});
}

//Submit the form & update state
const handleSubmit = (event ) => {
    event.preventDefault();

    // Hide the new user form again
    setIsAddNewUserEnabled(false);

    // Post to users to add a new user 
    const userName = event.target[0].value
    let usersINfo = allUsers
    userName ? axios.post(`http://localhost:3000/api/users/${userName}`)
    .then(res => {    
        setUsers(res.data)
    }) : null
}

return (
    <section tw="bg-mono-100 dark:bg-mono-700 w-1/3 flex float-left rounded-md ml-20" key={allUsers}>
        <div tw="grid max-w-4xl gap-8 p-8 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
        <h2 tw="col-span-1 sm:col-span-1 md:col-span-1 text-2xl font-bold">Users</h2>
            {allUsers?.userData?.users.map((user) => (
                <User user={user} allGroups={allGroups} key={user.allGroups}/>
            ))}
            <button onClick={addUserClicked} tw="place-self-center shadow-md bg-white rounded-full text-center  text-mono-800 h-8 w-8">+</button>
            { isAddNewUserEnabled ? <div tw="shadow-md bg-white rounded-md text-mono-800 p-8 flex flex-col items-center gap-2 text-lg ">
                <UserIcon tw="w-8 h-8" />
                <form tw="flex flex-col items-center" onSubmit={handleSubmit}>
                    <input tw="mt-2 text-center" type="text" placeholder="Enter New User" value={values.user} onChange={handlerUserNameChange} />
                    <br/>
                    <input type="submit"  tw="place-self-center shadow-md dark:bg-mono-700 rounded-md text-center text-white h-10 w-full "/>
                </form>
            </div> : null }
            
        </div>
    </section>
);
};

