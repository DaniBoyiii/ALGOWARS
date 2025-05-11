import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Editor from "./pages/editor/Editor";
import Problem from "./pages/problems/Problem";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import AddProblem from "./pages/addProblem/AddProblemForm"; // Import AddProblem component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  { path: "/problem", element: <Problem /> },
  {
    path: "/problem/:id",
    element: <Editor />,
  },
  // Add the route for Add Problem
  {
    path: "/add-problem",
    element: <AddProblem />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
