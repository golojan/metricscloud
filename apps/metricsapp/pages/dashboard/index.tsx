import { NextPage } from 'next';
import React, { useEffect } from 'react';
import AppDrawer from '../../serverlets/AppDrawer';
import AdminLayout from '../../components/AdminLayout';

import {
  faAddressBook,
  faArrowsSpin,
  faBookReader,
  faRainbow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';

import Link from 'next/link';
import AppHeader from '../../serverlets/AppHeader';
import Copyright from '../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { authSchoolId } from '@metricsai/metrics-hocs';
import SchoolRanking from '../../components/SchoolRanking';
import { SchoolStats } from '@metricsai/metrics-interfaces';
import {
  loadSchoolsStats,
  loadLecturersStats,
  loadStudentsStats,
} from '@metricsai/metrics-utils';

import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';

const Dashboard: NextPage = () => {
  const schoolId = authSchoolId();
  const dispatch = useDispatch<Dispatch>();
  const [ranking, setRanking] = React.useState<SchoolStats>(null);
  useEffect(() => {
    loadSchoolsStats(schoolId).then((stats) => {
      dispatch.settings.setRank(stats);
    });
    loadLecturersStats(schoolId).then((stats) => {
      dispatch.lecturers.setStatistics(stats);
    });
    loadStudentsStats(schoolId).then((stats) => {
      dispatch.students.setStatistics(stats);
    });
  }, [
    schoolId,
    setRanking,
    dispatch.settings,
    dispatch.lecturers,
    dispatch.students,
  ]);

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="wallet-footer flex w-full border-t-0 border-0">
                  <div className="item">
                    <div>
                      <span className="h1">{0}</span>
                      <strong>Citations</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{0}</span>
                      <strong>H-Index</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{0}</span>
                      <strong>i10-H-Index</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{0}</span>
                      <strong>Total</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wallet-footer">
                <div className="item">
                  <div>
                    <Link href="/dashboard/reports" className="button mb-1">
                      <FontAwesomeIcon icon={faBookReader} size={'4x'} />
                    </Link>
                    <strong>Reports & Metrics</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <Link href="/dashboard" className="button mb-1">
                      <FontAwesomeIcon icon={faRainbow} size={'4x'} />
                    </Link>
                    <strong>AI Metrics</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <Link href="/dashboard" className="button mb-1">
                      <FontAwesomeIcon icon={faAddressBook} size={'4x'} />
                    </Link>
                    <strong>Verifications</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <Link href="/dashboard" className="button mb-1">
                      <FontAwesomeIcon icon={faArrowsSpin} size={'4x'} />
                    </Link>
                    <strong>API & Settings</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SchoolRanking schoolId={schoolId} />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Dashboard);
