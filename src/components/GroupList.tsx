import { useDeleteApiGroupsIdUser, usePutApiGroupsIdUser} from "../service/default";
import { UsersIcon} from "@heroicons/react/outline";
import React, { useState, useEffect } from 'react';
import {useDrop} from "react-dnd";
import { groups } from "../pages/api/groups/index";


export function GroupList({allGroups, setGroups}){

//Drag & Drop
const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: "user",
    drop: (item) => addUserToGroup(item, allGroups),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop()
    })
}));

// Hard coded & only works for the admin group (dropping anywhere in the groupslist) - need to find a different solution to allow dopping in each group
const addUserToGroup = (item) => {
  let groupId = 'admin'
  let newGroups = groups
    addUserToGroupHook({id: groupId, user: item.id})
    allGroups?.data?.groups[0].members.push(item.id);

}
  const { mutateAsync: removeUserFromGroup, isSuccess } = useDeleteApiGroupsIdUser();
  const { mutateAsync: addUserToGroupHook } = usePutApiGroupsIdUser();
  

  const removeUser = async (event: React.MouseEvent<HTMLButtonElement>, user: string, groupId: string) => {
    event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        //remove the user 
        removeUserFromGroup({id: groupId, user: user})

        //get the index & remove the user from AllGroups to set state 
        const indexOfMember = allGroups.data.groups.filter((group) => group.uuid === groupId)[0].members.indexOf(user);
        indexOfMember != -1 ? allGroups.data.groups.filter((group) => group.uuid === groupId)[0].members.splice(indexOfMember, 1) : null 

        //set state
        setGroups(allGroups)    
  };

  return (
        <section tw="bg-mono-50 dark:bg-mono-700 w-1/3 flex float-right rounded-md mr-20" ref={drop}>
          <div tw="grid max-w-4xl gap-8 p-8 sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
            <h2 tw="sm:col-span-1 md:col-span-1 text-2xl font-bold">Groups</h2>
              { allGroups?.data?.groups.map((group) => {
                          return  <article tw="shadow-md bg-white rounded-md text-mono-800 p-4 flex flex-col items-center gap-1" key={group.uuid}> 
                              <UsersIcon tw="w-16 h-16 p-0.5 border-4 border-mono-400 rounded-full my-4" />
                              <header tw="text-lg font-bold">{group.name}</header>
                              <div tw="text-sm text-mono-500 w-full text-center">{group.desc}
                              <h2 tw="sm:col-span-1 md:col-span-1 text-xl text-left font-bold mt-2">Users:</h2>
                              <div>{group.members.map((member) => {
                                return <div tw="flex place-content-between" key={member}>
                                          <span tw="place-self-center ml-2 text-base font-bold"> {member.charAt(0).toUpperCase() + member.slice(1)} </span>
                                          <button onClick={(event)=> removeUser(event, member,group.uuid)} tw="place-self-center shadow-md bg-red-300 rounded-md text-center text-sm text-mono-800 p-2 mt-4">Remove</button>
                                      </div> 
                              })}</div>
                              </div>
                            </article>
}) }
          </div>
        </section>
  );
};

