import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "@/styles/Calendar.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
