import { Link, Outlet } from "react-router";
import { Header } from "~/components/Header";

export default function Facultades() {
  return (
    <>
      <Header title="Facultades" to="/facultades" />
      <Outlet />
    </>
  );
}
