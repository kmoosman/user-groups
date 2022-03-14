import { useDeleteApiGroupsIdUser, usePutApiGroupsIdUser, useGetApiGroups} from "../service/default";
import { UsersIcon} from "@heroicons/react/outline";

import { useQueryClient } from 'react-query';
import {useDrop} from "react-dnd";
import { groups } from "../pages/api/groups/index";
import Group from './Group';



export function GroupList({allGroups, setGroups}){


  const passUpCallGroups = (data) => {
      setGroups(data)
    }

  const queryClient = useQueryClient();
    

  const { mutateAsync: removeUserFromGroup, isSuccess } = useDeleteApiGroupsIdUser({
    mutation: {
        onSuccess: (data) => {
            queryClient.invalidateQueries('/api/groups')
        }
    }
  });



  const removeUser = async (event: React.MouseEvent<HTMLButtonElement>, user: string, groupId: string) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    //remove the user 
    removeUserFromGroup({id: groupId, user: user})

    //get the index & remove the user from AllGroups to set state 
    console.log(allGroups)
    const indexOfMember = allGroups?.groups.filter((group) => group.uuid === groupId)[0].members.indexOf(user);
    indexOfMember != -1 ? allGroups?.groups.groups.filter((group) => group.uuid === groupId)[0].members.splice(indexOfMember, 1) : null 

    //set state
    // setGroups(allGroups)    
  };

  

  return (
        <section tw="bg-mono-50 dark:bg-mono-700 w-1/3 flex float-right rounded-md mr-20" >
          <div tw="grid max-w-4xl gap-8 p-8 sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
            <h2 tw="sm:col-span-1 md:col-span-1 text-2xl font-bold">Groups</h2>
              { allGroups?.groups.map((group) => {
                          return  <Group group={group} allGroups={allGroups} key={group.uuid}/>
}) }
          </div>
        </section>
  );
};

