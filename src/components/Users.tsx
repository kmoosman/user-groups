import { useGetApiUsers, useGetApiUsersId } from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";


export function UsersList(){
    const { data: users } = useGetApiUsers();
    const { data: user } = useGetApiUsersId();

  // const { data: id } = useGetAPIGrupsIdHook();

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    console.log("Good job you clicked the button")
  };

return (
    <section tw="bg-mono-100 dark:bg-mono-700 w-1/3 flex float-left rounded-md ml-4 ">
        <div tw="grid max-w-4xl gap-8 p-8 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
        <h2 tw="col-span-1 sm:col-span-1 md:col-span-1 text-2xl font-bold">Users</h2>
            {users?.users.map((user) => (
            <div tw="shadow-md bg-white rounded-md text-mono-800 p-8 flex flex-col items-center gap-2 text-lg">
                <UserIcon tw="w-8 h-8" />
                {user.name}
            </div>
            ))}
            <button onClick={buttonHandler} tw="place-self-center shadow-md bg-white rounded-full text-center  text-mono-800 h-8 w-8">+</button>
        </div>
    </section>
);
};

