import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { IndexPage } from "../pages/Index";
import { AppIndexPage } from "../pages/app/Index";
import { AppLoginPage } from "../pages/app/Login";
import { AppSignupPage } from "../pages/app/Signup";
import { AppProjectsPage } from "../pages/app/Projects";
import { AppProjectsCreate } from "../pages/app/ProjectsCreate";
import { AppProjectsSetup } from "../pages/app/ProjectsSetup";
import { Scans } from "../pages/app/Scans";
import { ScanById } from "../pages/app/ScanById";
import { Subscription } from "../pages/app/Subscription";
import { SubscriptionCompleted } from "../pages/app/SubscriptionCompleted";

export const general: RouteObject[] = [
  // ROUTES - START
  {
    path: PATHS.index,
    element: <IndexPage />,
  },
  {
    path: PATHS.app,
    element: <AppIndexPage />,
  },
  {
    path: PATHS.appLogin,
    element: <AppLoginPage />,
  },
  {
    path: PATHS.appSignup,
    element: <AppSignupPage />,
  },
  {
    path: "/app/subscription",
    element: <Subscription />,
  },
  {
    path: "/app/subscription/completed",
    element: <SubscriptionCompleted />,
  },
  {
    path: "/app/projects",
    element: <AppProjectsPage />,
  },
  {
    path: "/app/projects/:projectId/setup",
    element: <AppProjectsSetup />,
  },
  {
    path: "/app/projects/create",
    element: <AppProjectsCreate />,
  },
  {
    path: "/app/scans",
    element: <Scans />,
  },
  {
    path: "/app/scans/:scanId",
    element: <ScanById />,
  },
  // ROUTES - END
];
