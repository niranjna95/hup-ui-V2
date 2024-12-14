import CommonProps from "@/models/CommonProps";
import { NextPage } from "next";
import styles from "./index.module.css";

import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCompass,
  faSave,
  faUser,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import { faBookBookmark, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logout from "../Logout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Console } from "console";

interface AdminLeftMenuProps extends CommonProps {}

const AdminLeftMenu: NextPage<AdminLeftMenuProps> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { pathname: currentPath } = router;

  function activateLink(pageLink: string) {
    pageLink = pageLink || "";
    if (currentPath.toLowerCase() == pageLink.toLowerCase()) return "active";
    return "";
  }

  return (
    <>
      <div id="SideBar" className={"sidebar_wrap"}>
        <div className="site_logo">
          <img
            src={`${process.env.NEXT_PUBLIC_CDN_PATH}/images/happy-utsav-palace.png`}
            alt="HUP"
            title="HUP"
            className="img-fluid"
            width={50}
            height={50}
          />
          <strong>{session?.user.fullName}</strong>
        </div>
        <div className="sidebar_nav">
          <Navbar variant="light">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link
                  className={`nav-item nav-link ${activateLink(
                    "/admin/dashboard"
                  )}`}
                  href="/admin/dashboard"
                >
                  <FontAwesomeIcon icon={faCompass} size="1x" />{" "}
                  <span className="nav_text">Dashboard</span>
                </Link>
                <Link
                  className={`nav-item nav-link ${activateLink(
                    "/user/user-list"
                  )}`}
                  href="/user/user-list"
                >
                  <FontAwesomeIcon icon={faCalendar} size="1x" />{" "}
                  <span className="nav_text">Booking</span>
                </Link>
                {/* <Link className={"nav-item nav-link"} href="/classes">
                  <FontAwesomeIcon icon={faBookBookmark} size="1x" />{" "}
                  <span className="nav_text">Classes</span>
                </Link>
                <Link className={"nav-item nav-link"} href="/students">
                  <FontAwesomeIcon icon={faUserCheck} size="1x" />
                  <span className="nav_text"> Students</span>
                </Link> */}
                <Logout>
                  <span
                    className={"nav-item nav-link"}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faSave} size="1x" />{" "}
                    <span className="nav_text">Logout</span>
                  </span>
                </Logout>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default AdminLeftMenu;
