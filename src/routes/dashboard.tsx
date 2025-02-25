import { lazy } from "react";

const DashboardPage = lazy(() => import("pages/dashboard/admin/dashboard"));
const BurtgelPage = lazy(() => import("pages/dashboard/financiar/burtgel"));
const MedeelelPage = lazy(() => import("pages/dashboard/financiar/lavlah"));
const TailanPage = lazy(() => import("pages/dashboard/financiar/tailan"));

export const dashboardRoutes = [
  {
    key: "dashboard",
    path: "dashboard",
    element: <DashboardPage />,
  },
  {
    key: "burtgel",
    path: "burtgel",
    element: <BurtgelPage />,
  },
  {
    key: "lavlah",
    path: "lavlah",
    element: <MedeelelPage />,
  },
  {
    key: "tailan",
    path: "tailan",
    element: <TailanPage />,
  },
];
