import React from 'react';
import {
  faArrowLeft,
  faHome,
  faListUl,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppSidebar from './AppSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { authlogout } from '../utils/withAuthSync';
import Loading from '../components/Loading';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';

const AppHeader: React.FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>();

  const { school, menuOpened, windows, busy, user } = useSelector(
    (state: RootState) => state.settings
  );
  const { name, shortname } = school;
  const { size } = windows;
  return (
    <>
      <AppSidebar />
      <div className="appHeader bg-primary text-light relative">
        <div className="left">
          <a
            href="#"
            className="headerButton"
            onClick={() => dispatch.settings.toggleMenu(!menuOpened)}
          >
            <FontAwesomeIcon icon={faListUl} size={'2x'} />
          </a>
        </div>
        <div className="pageTitle">
          {size == 'sm' || size == 'xs' ? (
            <h2 className="text-white mt-2">{`${shortname}`}</h2>
          ) : (
            <h2 className="text-white mt-2">{`${name} (${shortname})`}</h2>
          )}
        </div>
        <div className="right">
          <a href={'/dashboard/reports'} className="headerButton">
            <FontAwesomeIcon icon={faHome} />
          </a>
          <a href="#" className="headerButton">
            <Image
              width={25}
              height={25}
              src={user.picture}
              className="imaged w32"
              alt="profile"
            />
          </a>
          {busy ? (
            <Loading />
          ) : (
            <a
              href="#"
              className="headerButton text-white"
              onClick={authlogout} >
              <FontAwesomeIcon icon={faUserLock} />
              <span className="badge badge-black bg-black p-1">
                {windows.size}
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default AppHeader;
