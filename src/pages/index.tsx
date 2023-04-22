import { type NextPage } from "next";
import { NextPageWithLayout } from './_app';
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import NewCalendar from "@/components/AvailableClasses/AvailableClasses";

const Home: NextPageWithLayout = () => {
  return (
     <>
       <main className="">
         <h1>Homepage</h1>
       </main>
     </>
   );
};

export default Home;
