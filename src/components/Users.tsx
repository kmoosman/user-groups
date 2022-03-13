import { useGetApiUsers, useGetApiUsersId, useGetApiGroups } from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";
import { useState } from 'react';
import { groups } from "../pages/api/groups";


export function UsersList({allUsers, allGroups, addUser}){
    // const { data: users } = useGetApiUsers();
    
    // const { data: groups, refetch } = useGetApiGroups();
    const { data: user } = useGetApiUsersId();
    // let addNewUserEnabled = false

    const [values, setValue] = useState({
        id: "",
        user: ""
    })


    const [addNewUserEnabled, setAddNewUserEnabled] = useState(false)

const addUserClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setAddNewUserEnabled(true);
};

const handlerUserNameChange = (event) => {
    setValue({...values, user: event.target.value});

}

const handleSubmit = (event) => {
    event.preventDefault();
    setAddNewUserEnabled(false);
    addUser(values.user)
    //Need to use the hook to add a new user here but am unable to determine how to get orval to rebuild the default.ts file with the hooks
}

return (
    <section tw="bg-mono-100 dark:bg-mono-700 w-1/3 flex float-left rounded-md ml-4 ">
        <div tw="grid max-w-4xl gap-8 p-8 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
        <h2 tw="col-span-1 sm:col-span-1 md:col-span-1 text-2xl font-bold">Users</h2>
            {allUsers?.users.map((user) => (
            <div tw="shadow-md bg-white rounded-md text-mono-800 p-8 flex flex-col items-center gap-2 text-lg">
                <UserIcon tw="w-8 h-8" />
                {user.name}
                <div tw="flex-row">
                    {allGroups?.data.groups.map((group) => {
                        if (group.members.includes(user.uuid)) {
                            return <span tw="flex-row float-left shadow-md text-center text-xs dark:bg-purple-400 rounded-md text-white h-6 p-1 m-2 w-20" >{group.name}</span>
                        }
                    })}
                </div>
            </div>
            ))}
            <button onClick={addUserClicked} tw="place-self-center shadow-md bg-white rounded-full text-center  text-mono-800 h-8 w-8">+</button>
            { addNewUserEnabled ? <div tw="shadow-md bg-white rounded-md text-mono-800 p-8 flex flex-col items-center gap-2 text-lg ">
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

