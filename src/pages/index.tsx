import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { GroupList } from "../components/GroupList";
import { Users } from "../components/Users";
import { useGetApiGroups, useGetApiUsers, useGetApiUsersId
, useGetApiGroupsId } from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { getStaticProps } from "./swagger";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

const Home: NextPage = () => {
  const content = 
  useRef();

  //Groups data fetch & store to state
  const { data, status: groupStatus, refetch } = useGetApiGroups({
    query: {
      onSuccess: (data) => {
        // const [groups, setGroups] = useState(data)
        setGroups({ data });
      }
    }
  });
  


  //Users data fetch & store to state
  const { data: userData, status: userStatus} = useGetApiUsers({
    query: {
      onSuccess: (data) => {
        // const [groups, setGroups] = useState(data)
        setUsers(data);
        console.log(data)
        
      }
    }
  });

  const [users, setUsers] = useState(userData)
  const [groups, setGroups] = useState(data)
  

  return (
    <div tw="dark:bg-mono-900 bg-blue-500 dark:text-white min-h-screen flex flex-col">
      <Head>
        <title>User Groups</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div tw="max-w-2xl mx-auto p-8 flex items-center">
          <Link href="/" passHref={true}>
            <a tw="font-extrabold text-2xl text-white dark:text-yellow-500">User Groups</a>
          </Link>
          <Link href="/swagger" passHref={true}>
            <a tw="ml-auto dark:text-mono-300 text-mono-100 underline">
              api docs
            </a>
          </Link>
        </div>
      </header>

      <main tw="place-content-between" ref={content}>
      <GroupList allGroups={groups} setGroups={setGroups}  />
      <Users allUsers={users} allGroups={groups} setUsers={setUsers}/> 
      </main>

      <Footer />
    </div>
  );
};

export default Home;
