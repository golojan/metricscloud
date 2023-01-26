import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';

import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';

import {
  AuthUserInfo,
  GSIRanking,
  GSRanking,
  SchoolSettingsType,
} from '@metricsai/metrics-interfaces';

import { authSchoolId } from '@metricsai/metrics-hocs';
import {
  getSchoolSettings,
  loadLecturers,
  loadLecturersStats,
  citationByWeight,
  hindexByWeight,
  i10indexByWeight,
  totalRanking
} from '@metricsai/metrics-utils';

import useSWR from 'swr';
import AppDashBoardTopMenuScores from '../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../serverlets/AppDashboardTopMenu';
import { useAtom } from 'jotai';
import {
  schoolSettingsAtom,
  statistLecturersAtom,
} from '@metricsai/metrics-store';
import AuthUserTable from '../../../../components/DataTables/AuthUserTable';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const ReportLecturers: NextPage = () => {

  const schoolId = authSchoolId();
  const [working, setWorking] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const [list, setList] = useState<AuthUserInfo[]>([]);
  const [listScholar, setListScholar] = useState<AuthUserInfo[]>([]);

  const [schoolSettings, setSchoolSettings] = useAtom(schoolSettingsAtom);
  const [statistLecturers, setStatistLecturers] = useAtom(statistLecturersAtom);

  // use SWR to fetch data from the API
  const { data: lecturers, isLoading } = useSWR<AuthUserInfo[]>(
    `/api/lecturers/${schoolId}/ranking`,
    async () => await loadLecturers(schoolId)
  );

  const {
    data: settings,
    isLoading: isLoadingSettings,
    isValidating: isValidatingSettings,
  } = useSWR<SchoolSettingsType>(
    `/api/schools/${schoolId}/settings`,
    async () => await getSchoolSettings(schoolId),
    {
      revalidateOnFocus: true,
    }
  );

  const busy = working || isLoadingSettings ||
    isValidatingSettings || isLoading;  

  const [filter, setFilter] = useState<lFilters>({
    male: false,
    female: false,
    withPhd: false,
    isProfessor: false,
  });

  useEffect(() => {
    if (lecturers && !busy) {
      setList(lecturers);
      setSchoolSettings(settings);
      if (list) {
        setWorking(true);
        setListScholar(lecturers.map((user) => ({
          firstname: user.firstname,
          lastname: user.lastname,
          citations: citationByWeight(
            user.citationsPerCapita,
            lecturers,
            settings.citationsWeight
          ).weigth,
          hindex: hindexByWeight(
            user.hindexPerCapita,
            lecturers,
            settings.hindexWeight
          ).weigth,
          i10hindex: i10indexByWeight(
            user.i10hindexPerCapita,
            lecturers,
            settings.i10hindexWeight
          ).weigth,
          total: totalRanking(
            Number(citationByWeight(
              user.citationsPerCapita,
              lecturers,
              settings.citationsWeight
            ).weigth),
            Number(hindexByWeight(
              user.hindexPerCapita,
              lecturers,
              settings.hindexWeight
            ).weigth),
            Number(i10indexByWeight(
              user.i10hindexPerCapita,
              lecturers,
              settings.i10hindexWeight
            ).weigth)
          )
        })));
        setWorking(false);
      }
    }
  }, [lecturers, busy]);


  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopMenuScores />
              <AppDashboardTopMenu />
            </div>
          </div>
          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-3">
                <div className="card-box border-0">
                  <ul className="listview image-listview text border-0  no-line">
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Female</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="femaleSwitch"
                              checked={filter.female}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  female: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="femaleSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Males</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="maleSwitch"
                              checked={filter.male}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  male: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="maleSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  
                  <ul className="listview image-listview text no-line">
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Professors</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="professorSwitch"
                              checked={filter.isProfessor}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  isProfessor: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="professorSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">PHD Holders</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="withPhdSwitch"
                              checked={filter.withPhd}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  withPhd: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="withPhdSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-9 min-h-screen`}>
                <AuthUserTable title='Lecturers: Google Scholar Metrics' data={listScholar ? listScholar : []} loading={busy} />
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

export default compose(withAuth)(ReportLecturers);
