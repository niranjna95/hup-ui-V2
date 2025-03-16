import CommonProps from "@/models/CommonProps";
import { NextPage } from "next";
import styles from "./index.module.css";
import { signOut } from "next-auth/react";

interface LogoutProps extends CommonProps {}

const Logout: NextPage<LogoutProps> = (props) => {
  async function logout() {
    await signOut({ callbackUrl: "/account/login" });
  }

  return (
    <>
      <span onClick={logout}>
        {props.children ? (
          props.children
        ) : (
          <button className="btn btn-primary">Logout</button>
        )}
      </span>
    </>
  );
};

export default Logout;
