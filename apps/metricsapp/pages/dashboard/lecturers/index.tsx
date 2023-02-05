import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';
import { faPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';
import { authSchoolId } from '@metricsai/metrics-hocs';
import AuthLecturersTable from '../../../components/DataTables/AuthLecturersTable';
import useSWR from 'swr';
import { AuthUserInfo, GSIRanking } from '@metricsai/metrics-interfaces';
import parseCookies from 'next-cookies';
import { noAction } from '@metricsai/metrics-utils';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const Lecturers: NextPage = () => {
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const schoolId = authSchoolId();
  const { data: lecturers, error, isLoading, isValidating } = useSWR<{ status: boolean, data: AuthUserInfo[] }>(`${apiUri}lecturers/${schoolId}/ranking`, () => fetch(`${apiUri}lecturers/${schoolId}/ranking`).then((res) => res.json()));
  const loading = isValidating || isLoading || error || !lecturers;
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
                  <Link href="#" className="button" onClick={noAction}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section pt-1">
            <div className="row ">
              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                <AuthLecturersTable title='Manage Lecturers' data={loading ? [] : lecturers.data} loading={loading} />
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="lecturers" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Lecturers);
