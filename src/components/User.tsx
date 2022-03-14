import React from 'react'
import {useDrag} from "react-dnd";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";

function User(user, allGroups) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "user",
        item: {id: user.user.uuid, name: user.user.name},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    
    return (
    <div  ref={drag} tw="shadow-md bg-white rounded-md text-mono-800 p-8 flex flex-col items-center gap-2 text-lg" key={user.user.uuid}>
        {isDragging ? <div>You are doing it!</div> : null }
        <UserIcon tw="w-8 h-8" />
        {user.user.name}
            <div tw="flex-row">
                {user.allGroups?.data?.groups.map((group) => {
                    if (group.members.includes(user.user.uuid)) {
                        return <span key={group.members} tw="flex-row float-left shadow-md text-center text-xs dark:bg-purple-400 rounded-md text-white h-6 p-1 m-2 w-20" >{group.name}</span>
                    }
                })}
            </div>
        </div>
    )
}

export default User;