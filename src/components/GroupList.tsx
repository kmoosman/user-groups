import Group from './Group';

export function GroupList({allGroups}){
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

