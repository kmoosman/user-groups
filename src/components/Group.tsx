import React from 'react';
import { useDeleteApiGroupsIdUser, usePutApiGroupsIdUser} from "../service/default";
import { useDrop, useDrag } from "react-dnd";
import { UsersIcon } from "@heroicons/react/outline";
import { useQueryClient } from 'react-query';

function Group(group) {
    const queryClient = useQueryClient();
    //Accepts Drop from users 
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "user",
        drop: (item) => addUserToGroup(item, group),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

     //Allows dragging of a group 
    const [{isDragging}, drag] = useDrag(() => ({
        type: "group",
        item: group,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    // Add a new user to a group
    const addUserToGroup = (item, group) => {
        let groupId = group.group.uuid
        addUserToGroupHook({id: groupId, user: item.id})
    }


    const { mutateAsync: addUserToGroupHook } = usePutApiGroupsIdUser({
        mutation: {
            onSuccess: (data) => {
                queryClient.invalidateQueries('/api/users')
                queryClient.invalidateQueries('/api/groups')
            }
        }
    });

    const { mutateAsync: removeUserFromGroup, isSuccess } = useDeleteApiGroupsIdUser({
        mutation: {
            onSuccess: (data) => {
                queryClient.invalidateQueries('/api/groups')
            }
        }
    });



const removeUser = (event: React.MouseEvent<HTMLButtonElement>, user: string, groupId: string) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    //remove the user 
    removeUserFromGroup({id: groupId, user: user}) 
};
    
    return (
        <div ref={drag}>
            <article tw="shadow-md bg-white rounded-md text-mono-800 p-4 flex flex-col items-center gap-1" key={group.group.uuid} ref={drop}> 
                <UsersIcon tw="w-16 h-16 p-0.5 border-4 border-mono-400 rounded-full my-4" />
                <header tw="text-lg font-bold">{group.group.name}</header>
                <div tw="text-sm text-mono-500 w-full text-center">{group.group.desc}
                <h2 tw="sm:col-span-1 md:col-span-1 text-xl text-left font-bold mt-2">Users:</h2>
                <div id={group.group.uuid}>{group.group.members.map((member) => {
                return <div tw="flex place-content-between" key={member}>
                            <span tw="place-self-center ml-2 text-base font-bold"> {member.charAt(0).toUpperCase() + member.slice(1)} </span>
                            <button onClick={(event)=> removeUser(event, member, group.group.uuid)} tw="place-self-center shadow-md bg-red-300 rounded-md text-center text-sm text-mono-800 p-2 mt-4">Remove</button>
                        </div> 
                })}</div>
                </div>
            </article>
        </div> 
    )
}

export default Group;