import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';

import { faPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuthSync } from '../../../utils/withAuthSync';
import { compose } from 'redux';
import LecturersHomePage from "../../../components/lecturers/LecturersHomePage"
import { withIndicators } from '../../hocs/withIndicators';

const NewLecturersHomePage = withIndicators(LecturersHomePage);

const Lecturers: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Manage Lecturers</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersCog} /> Lecturers
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="#" className="button">
                      <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section pt-1">

          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="lecturers" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuthSync)(Lecturers);
