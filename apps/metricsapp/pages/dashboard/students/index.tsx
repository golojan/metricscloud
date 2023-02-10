import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';
import { faPlus, faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';
import { authSchoolId } from '@metricsai/metrics-hocs';
import AuthStudentsTable from '../../../components/DataTables/AuthStudentsTable';
import useSWR from 'swr';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import { loadStudentsRanking } from '@metricsai/metrics-utils';

const Lecturers: NextPage = () => {
  const schoolId = authSchoolId();
  const [busy, setBusy] = useState(false);
  const [students, setStudents] = useState<AuthUserInfo[]>([]);
  useEffect(() => {
    const loadRanking = async () => {
      setBusy(true);
      await loadStudentsRanking(schoolId).then((res) => {
        setStudents(res);
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
                  <span className="title">Manage Students</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersBetweenLines} /> Students
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
            <div className="row ">
              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                <AuthStudentsTable title='Manage Students' data={busy ? [] : students} loading={busy} />
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="students" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Lecturers);
