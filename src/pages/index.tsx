import { type NextPage } from "next";
import { NextPageWithLayout } from './_app';
import Head from "next/head";
import Link from "next/link";
import Calendar from "../components/Calendar"
import { api } from "@/utils/api";
import NewCalendar from "@/components/NewCalendar/NewCalendar";

const Home: NextPageWithLayout = () => {
  return (
     <>
       <main className="">
         <NewCalendar />
       </main>
     </>
   );
};

export default Home;
