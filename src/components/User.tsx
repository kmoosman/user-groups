import React from 'react'
import { useDrag, useDrop  } from "react-dnd";
import { UserIcon } from "@heroicons/react/outline";
import { usePutApiGroupsIdUser} from "../service/default";
import { useQueryClient } from 'react-query';

function User(user) {
    const queryClient = useQueryClient();
    //Allows dragging of a user 
    const [{isDragging}, drag] = useDrag(() => ({
        type: "user",
        item: {id: user.user.uuid, name: user.user.name},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    //Accepts Drop from group
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "group",
        drop: (item) => addGroupToUser(item, user),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

    // Add a new group to a user
    const addGroupToUser = (item, user) => {
        let groupId = item.group.uuid
        addUserToGroupHook({id: groupId, user: user.user.uuid})
    }

    const { mutateAsync: addUserToGroupHook } = usePutApiGroupsIdUser({
        mutation: {
            onSuccess: (data) => {
                console.log("added user")
                console.log(data)
                queryClient.invalidateQueries('/api/users')
                queryClient.invalidateQueries('/api/groups')
            }
        }
    });

    
    return (
        <div ref={drop}> 
            <div  ref={drag} tw="shadow-md bg-white rounded-md text-mono-800 p-8 flex flex-col items-center gap-2 text-lg" key={user.user.uuid}>
                {/* {isDragging ? <div>Add to a group</div> : null } */}
                <UserIcon tw="w-8 h-8" />
                {user.user.name}
                    <div tw="flex-row">
                        {user.allGroups?.groups.map((group) => {
                            if (group.members.includes(user.user.uuid)) {
                                return <span key={group.members} tw="flex-row float-left shadow-md text-center text-xs dark:bg-purple-400 rounded-md text-white h-6 p-1 m-2 w-20" >{group.name}</span>
                            }
                        })}
                    </div>
            </div>
        </div>   
    )
}

export default User;