import React from "react";
import Link from "next/link";
import {
  faArrowRight,
  faCamera,
  faClose,
  faDashboard,
  faSchool,
  faSchoolCircleCheck,
  faUsersBetweenLines,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AppHeaderProps {
  onchat?: boolean;
  menuitem?: string;
}

function AppDrawerAdmin({ onchat, menuitem = "dashboard" }: AppHeaderProps) {
  return (
    <>
      {onchat ? (
        <div className="chatFooter">
          <form action="#">
            <Link href="#" legacyBehavior>
              <a className="btn btn-icon btn-text-secondary rounded">
                <FontAwesomeIcon icon={faCamera} size={"2x"} />
              </a>
            </Link>

            <div className="form-group basic">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                />
                <i className="clear-input">
                  <FontAwesomeIcon icon={faClose} size={"2x"} />
                </i>
              </div>
            </div>
            <button type="button" className="btn btn-icon btn-primary rounded">
              <FontAwesomeIcon icon={faArrowRight} size={"2x"} />
            </button>
          </form>
        </div>
      ) : (
        <div className="appBottomMenu">
          <Link href="/admin" legacyBehavior>
            <a className="item">
              {menuitem == "dashboard" ? (
                <div className="col">
                  <div className="action-button large text-white">
                    <FontAwesomeIcon icon={faDashboard} size={"3x"} />
                  </div>
                </div>
              ) : (
                <div className="col">
                  <FontAwesomeIcon icon={faDashboard} size={"3x"} />
                  <strong>Dashboard</strong>
                </div>
              )}
            </a>
          </Link>
          <Link href="/admin/faculties" legacyBehavior>
            <a className="item">
              {menuitem == "faculties" ? (
                <div className="col">
                  <div className="action-button large text-white">
                    <FontAwesomeIcon icon={faSchool} size={"3x"} />
                  </div>
                </div>
              ) : (
                <div className="col">
                  <FontAwesomeIcon icon={faSchool} size={"3x"} />
                  <strong>Faculties</strong>
                </div>
              )}
            </a>
          </Link>

          <Link href="/admin/departments" legacyBehavior>
            <a className="item">
              {menuitem == "departments" ? (
                <div className="col">
                  <div className="action-button large text-white">
                    <FontAwesomeIcon icon={faSchoolCircleCheck} size={"3x"} />
                  </div>
                </div>
              ) : (
                <div className="col">
                  <FontAwesomeIcon icon={faSchoolCircleCheck} size={"3x"} />
                  <strong>Departments</strong>
                </div>
              )}
            </a>
          </Link>

          <Link href="/admin/lecturers" legacyBehavior>
            <a className="item">
              {menuitem == "lecturers" ? (
                <div className="col">
                  <div className="action-button large text-white">
                    <FontAwesomeIcon icon={faUsersGear} size={"3x"} />
                  </div>
                </div>
              ) : (
                <div className="col">
                  <FontAwesomeIcon icon={faUsersGear} size={"3x"} />
                  <strong>Lecturers</strong>
                </div>
              )}
            </a>
          </Link>

          <Link href="/admin/students" legacyBehavior>
            <a className="item">
              {menuitem == "students" ? (
                <div className="col">
                  <div className="action-button large text-white">
                    <FontAwesomeIcon icon={faUsersBetweenLines} size={"3x"} />
                  </div>
                </div>
              ) : (
                <div className="col">
                  <FontAwesomeIcon icon={faUsersBetweenLines} size={"3x"} />
                  <strong>Students</strong>
                </div>
              )}
            </a>
          </Link>
        </div>
      )}
    </>
  );
}

export default AppDrawerAdmin;
