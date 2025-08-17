import type { ReactNode } from "react";
import { Footer } from "@components/Footer/Footer";
import { Navbar } from "@components/NavBar/NavBar";

export const Layout = ({ children }: { children: ReactNode })=>{
  return (
    <div className="layout">
      <header><Navbar/></header>
      <main>{children}</main>
      <footer><Footer/></footer>
    </div>
  );
}