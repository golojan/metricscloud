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
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import { loadLecturersRanking, noAction } from '@metricsai/metrics-utils';

const Lecturers: NextPage = () => {
  const schoolId = authSchoolId();
  const [busy, setBusy] = useState(false);
  const [lecturers, setLecturers] = useState<AuthUserInfo[]>([]);
  useEffect(() => {
    const loadRanking = async () => {
      setBusy(true);
      await loadLecturersRanking(schoolId).then((res) => {
        setLecturers(res);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setBusy(false);
      });
    }
    loadRanking();
  }, [schoolId])
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
                <AuthLecturersTable title='Manage Lecturers' data={busy ? [] : lecturers} loading={busy} />
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
