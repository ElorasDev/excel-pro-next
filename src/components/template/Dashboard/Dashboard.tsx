"use client";

import { useEffect } from "react";
import Cookie from "js-cookie";
import { useMenuStore } from "@/stores/dashboardStore";
import Matches from "@/components/organisms/Dashboard/Matchs/Matchs";
import Overview from "@/components/organisms/Dashboard/Overview/Overview";
import Messages from "@/components/organisms/Dashboard/Messages/Messages";
import Gallery from "@/components/organisms/Dashboard/Gallery/Gallery";
import { useRouter } from "next/navigation";
import Payment from "@/components/organisms/Dashboard/Payment/Payment";

const Dashboard = () => {
  const { activeMenuId } = useMenuStore();
  const savedToken = Cookie.get("auth_token");
  const router = useRouter();

  useEffect(() => {
    if (!savedToken) {
      router.push("/");
    }
  }, [router, savedToken]);

  return (
    <section>
      {activeMenuId === 0 ? (
        <Overview />
      ) : activeMenuId === 2 ? (
        <Matches />
      ) : activeMenuId === 3 ? (
        <Messages />
      ) : activeMenuId === 4 ? (
        <Gallery />
      ) : activeMenuId === 5 ? (
        <Payment />
      ) : (
        ""
      )}
    </section>
  );
};

export default Dashboard;
