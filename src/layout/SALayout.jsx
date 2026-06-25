import { Outlet } from "react-router-dom";
import SAHeader from "../shared/components/header/SAHeader";

export const SALayout = () => (
  <>
    <SAHeader />
    <main className="page-content-wrapper">
      <Outlet />
    </main>
  </>
);
