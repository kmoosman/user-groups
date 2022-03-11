import { useGetApiGroups} from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";


export function GroupList(){

  const { data: groups } = useGetApiGroups();

  const deleteMary = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    console.log("Oh no! You are going to delete Mary, what'd she do to you?!")
  };

  // const { data: id } = useGetAPIGrupsIdHook();
  return (
        <section tw="bg-mono-50 dark:bg-mono-700 w-1/3 flex float-right rounded-md mr-4">
          <div tw="grid max-w-4xl gap-8 p-8 sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
            <h2 tw="sm:col-span-1 md:col-span-1 text-2xl font-bold">Groups</h2>
            {groups?.groups.map((group) => (
              <article tw="shadow-md bg-white rounded-md text-mono-800 p-4 flex flex-col items-center gap-1">
                <UsersIcon tw="w-16 h-16 p-0.5 border-4 border-mono-400 rounded-full my-4" />
                <header tw="text-lg font-bold">{group.name}</header>
                <div tw="text-sm text-mono-500">{group.desc}</div>
              </article>
            ))}
            <button onClick={deleteMary} tw="place-self-center shadow-md bg-white rounded-md text-center  text-mono-800 p-2">Delete Mary</button>
          </div>
        </section>
  );
};

