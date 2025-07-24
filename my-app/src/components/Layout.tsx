import { Outlet } from "react-router-dom";
import { Navbar } from "./NavBar";

export const Layout = ()=>{
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>2025</footer>
    </>
  );
}