import { useGetApiGroups, useDeleteApiGroupsIdUser, usePutApiGroupsIdUser} from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";
import { Group } from "../pages/api/groups/index";
import { UseMutationOptions } from "react-query";
import { Z_UNKNOWN } from "zlib";
import React, { useState, useEffect } from 'react';
import { group } from "console";
import {useDrop} from "react-dnd";
import { groups } from "../pages/api/groups/index";
import { useRef } from "react";



export function GroupList({allGroups, setGroups}){

//Drag & Drop

const [board, setBoard] = useState([]);

const [{isOver}, drop] = useDrop(() => ({
    accept: "user",
    drop: (item) => addUserToGroup(item, allGroups),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    })
}));

const addUserToGroup = (item) => {
  console.log("A")
  console.log(allGroups)
  let groupId = '245cf485-50a1-4bd0-92ee-4e6981eeda4e'

  let collectedUser = groups.get(groupId)?.members.add(item.id);
  console.log(collectedUser)
  groups.forEach((group) => {
    console.log(group)
  })
  
  // groups.get('e584cac1-7df1-40ac-a599-03a06eaecffc')?.members.add(item.id);
  let newGroups = groups
    alert('you added ' + item.id)
    console.log(newGroups)
    addUserToGroupHook({id: groupId, user: item.id})
    console.log("Updated All groups should include John")
    console.log(allGroups)
    allGroups?.data?.groups[0].members.push('john');

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
        <section tw="bg-mono-50 dark:bg-mono-700 w-1/3 flex float-right rounded-md mr-4" >
          <div tw="grid max-w-4xl gap-8 p-8 sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
            <h2 tw="sm:col-span-1 md:col-span-1 text-2xl font-bold">Groups</h2>
              { allGroups?.data?.groups.map((group, index) => {
                          return  <article tw="shadow-md bg-white rounded-md text-mono-800 p-4 flex flex-col items-center gap-1" id={group.name} key={group.uuid} ref={drop}> 
                              {group.uuid}
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

