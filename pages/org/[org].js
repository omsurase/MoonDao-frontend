import React from "react";
import { useRouter } from "next/router";
import OrgContainer2 from "@/components/org2/OrgContainer2";

const OrgPage = () => {
  const router = useRouter();
  const orgName = router.query.org;
  return (
    <div>
      <div className="drawer text-white">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* <OrgContainer orgName={orgName} /> */}
          <OrgContainer2 orgName={orgName} />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrgPage;
