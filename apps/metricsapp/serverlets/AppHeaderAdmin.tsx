import React from 'react';
import {
  faArrowLeft,
  faHome,
  faListUl,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppSidebarAdmin from './AppSidebarAdmin';
import Link from 'next/link';
import Image from 'next/image';
import { authlogout } from '../utils/withAuthSync';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';

interface AppHeaderProps {
  isroot: boolean;
}

function AppHeaderAdmin({ isroot }: AppHeaderProps) {
  const dispatch = useDispatch<Dispatch>();

  const { school, menuOpened, windows } = useSelector(
    (state: RootState) => state.settings
  );
  const { name, shortname } = school;
  return (
    <>
      <AppSidebarAdmin />
      <div className="appHeader bg-primary text-light relative">
        {isroot ? (
          <>
            <div className="left">
              <a
                href="#"
                className="headerButton"
                onClick={() => dispatch.settings.toggleMenu(!menuOpened)}
              >
                <FontAwesomeIcon icon={faListUl} size={'2x'} />
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="left">
              <Link href="#" legacyBehavior>
                <a className="headerButton">
                  <FontAwesomeIcon icon={faArrowLeft} size={'2x'} />
                </a>
              </Link>
            </div>
          </>
        )}
        <div className="pageTitle">
          <h2 className="text-white mt-2">Metrics AI Admin</h2>
        </div>
        <div className="right">
          <a href={'/admin'} className="headerButton">
            <FontAwesomeIcon icon={faHome} />
          </a>
          <a href="#" className="headerButton">
            <Image
              width={32}
              height={32}
              src="/avatars/avatar.png"
              className="imaged w32"
              alt=""
            />
          </a>
          <a href="#" className="headerButton text-white" onClick={authlogout}>
            <FontAwesomeIcon icon={faUserLock} />
            <span className="badge badge-black bg-black p-1">
              {windows.size}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export default AppHeaderAdmin;
