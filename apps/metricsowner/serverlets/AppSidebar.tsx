import React, { useEffect } from 'react';
import {
  faBriefcase,
  faClose,
  faDashboard,
  faDatabase,
  faGear,
  faHome,
  faSave,
  faSchool,
  faSchoolCircleCheck,
  faUserGear,
  faUsersBetweenLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';

function AppSidebarAdmin() {
  const { user, menuOpened } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.settings.toggleMenu(false);
  }, [dispatch.settings]);
  return (
    <>
      <Modal
        show={menuOpened}
        className="fade panelbox panelbox-left"
        closeButton
        onHide={() => dispatch.settings.toggleMenu(false)}
        onBackdropClick={() => dispatch.settings.toggleMenu(false)}
        onClose={() => dispatch.settings.toggleMenu(false)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body p-0">
              {/* profile box */}
              <div className="profileBox pt-2 pb-2">
                <div className="image-wrapper">
                  <Image
                    src="/avatars/avatar.png"
                    alt="image"
                    className="imaged  w36"
                    width={36}
                    height={36}
                  />
                </div>
                <div className="in">
                  <strong>{`${user.firstname} ${user.lastname}`}</strong>
                  <div className="text-muted">Metrics AI {user.role}</div>
                </div>
                <Link
                  href="#"
                  className="btn btn-link btn-icon sidebar-close"
                  onClick={() => dispatch.settings.toggleMenu(!menuOpened)}
                >
                  <FontAwesomeIcon className="" icon={faClose} size={'2x'} />
                </Link>
              </div>
              {/* action group */}
              <div className="action-group">
                <Link href="/my/faculties" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <FontAwesomeIcon icon={faSchool} />
                    </div>
                    Faculties
                  </div>
                </Link>
                <Link href="/my/departments" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <FontAwesomeIcon icon={faSchoolCircleCheck} />
                    </div>
                    Departments
                  </div>
                </Link>
                <Link href="/my/lecturers" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <FontAwesomeIcon icon={faUserGear} />
                    </div>
                    Lecturers
                  </div>
                </Link>
                <Link href="/my/students" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <FontAwesomeIcon icon={faUsersBetweenLines} />
                    </div>
                    Students
                  </div>
                </Link>
              </div>
              {/* * action group */}

              {/* menu */}
              <div className="listview-title mt-1">Menu</div>
              <ul className="listview flush transparent no-line image-listview">
                <li>
                  <Link href="/my" className="item">
                    <div className="icon-box bg-primary">
                      <FontAwesomeIcon icon={faDashboard} />
                    </div>
                    <div className="in">Dashboard</div>
                  </Link>
                </li>
              </ul>
              {/* * menu */}

              {/* others */}
              <div className="listview-title mt-1">Others</div>
              <ul className="listview flush transparent no-line image-listview">
                <li>
                  <Link href="/my/schools" className="item">
                    <div className="icon-box bg-primary">
                      <FontAwesomeIcon icon={faGear} />
                    </div>
                    <div className="in">Schools & Domains</div>
                  </Link>
                </li>

                <li>
                  <Link href="/my/settings" className="item">
                    <div className="icon-box bg-primary">
                      <FontAwesomeIcon icon={faGear} />
                    </div>
                    <div className="in">Settings</div>
                  </Link>
                </li>
              </ul>
              {/* * others */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AppSidebarAdmin;
