import React from 'react';
import {
  faArrowLeft,
  faHome,
  faListUl,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppSidebarAdmin from './AppSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { authlogout } from '../utils/withLogon';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';
import { useRouter } from 'next/router';

interface AppHeaderProps {
  isroot: boolean;
}

function AppHeader({ isroot }: AppHeaderProps) {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();
  const { menuOpened, windows } = useSelector(
    (state: RootState) => state.settings
  );
  return (
    <>
      <AppSidebarAdmin />
      <div className="appHeader bg-primary text-light relative">
        {isroot ? (
          <>
            <div className="left">
              <Link
                href="#"
                className="headerButton"
                onClick={() => dispatch.settings.toggleMenu(!menuOpened)}
              >
                <FontAwesomeIcon icon={faListUl} size={'2x'} />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="left">
              <Link
                className="headerButton"
                href="#"
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faArrowLeft} size={'2x'} />
              </Link>
            </div>
          </>
        )}
        <div className="pageTitle">
          <h2 className="text-white mt-2">Metrics AI Owner</h2>
        </div>
        <div className="right">
          <Link href={'/admin'} className="headerButton">
            <FontAwesomeIcon icon={faHome} />
          </Link>

          <Link href="#" className="headerButton">
            <Image
              width={32}
              height={32}
              src="/avatars/avatar.png"
              className="imaged w32"
              alt=""
            />
          </Link>
          <Link
            href="#"
            className="headerButton text-white"
            onClick={authlogout}
          >
            <FontAwesomeIcon icon={faUserLock} />
            <span className="badge badge-black bg-black p-1">
              {windows.size}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AppHeader;
