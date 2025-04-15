"use client";

import { useMenuStore } from "@/stores/dashboardStore";
import Matches from "@/components/organisms/Dashboard/Matchs/Matchs";
import Overview from "@/components/organisms/Dashboard/Overview/Overview";

const Dashboard = () => {

    const { activeMenuId } = useMenuStore();

  return (
    <section>
        {
            activeMenuId === 0 ? 
            <Overview />
            :
            activeMenuId === 2 ? 
            <Matches />
            : 
            ""
        }
    </section>
  )
}

export default Dashboard