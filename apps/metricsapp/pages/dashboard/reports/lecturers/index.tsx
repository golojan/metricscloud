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
  SchoolSettingsType,
} from '@metricsai/metrics-interfaces';

import { authSchoolId } from '@metricsai/metrics-hocs';
import {
  getSchoolSettings,
  citationByWeight,
  hindexByWeight,
  i10indexByWeight,
  totalRanking,
  getPosition
} from '@metricsai/metrics-utils';

import useSWR from 'swr';
import AppDashBoardTopMenuScores from '../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../serverlets/AppDashboardTopMenu';
import { useAtom } from 'jotai';
import {
  schoolSettingsAtom,
} from '@metricsai/metrics-store';
import AuthUserTable from '../../../../components/DataTables/AuthUserTable';
import { Settings } from '@material-ui/icons';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const ReportLecturers: NextPage = () => {

  const schoolId = authSchoolId();
  const [working, setWorking] = useState<boolean>(false);

  const [list, setList] = useState<AuthUserInfo[]>([]);
  const [schoolSettings, setSchoolSettings] = useAtom(schoolSettingsAtom);

  const [byWeigth, setByWeigth] = useState<boolean>(false);


  // use SWR to fetch data from the API
  const { data: lecturers, isLoading } = useSWR<{ status: boolean, data: AuthUserInfo[] }>(
    `/api/lecturers/${schoolId}/ranking`,
    async () => fetch(`/api/lecturers/${schoolId}/ranking`).then((res) => res.json()),
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
      setWorking(false);
      const result = lecturers.data?.sort((a, b) => b.total - a.total).map((lecturer, index) => {
        const citation = citationByWeight(lecturer.citationsPerCapita, lecturers.data, byWeigth ? settings.citationsWeight : 100).weigth;
        const hindex = hindexByWeight(lecturer.hindexPerCapita, lecturers.data, byWeigth ? settings.i10hindexWeight : 100).weigth;
        const i10index = i10indexByWeight(lecturer.i10hindexPerCapita, lecturers.data, byWeigth ? settings.i10hindexWeight : 100).weigth;
        const total = totalRanking(citation, hindex, i10index);
        return {
          ...lecturer,
          citationPerCapita: lecturer.citationsPerCapita,
          hindexPerCapita: lecturer.hindexPerCapita,
          i10hindexPerCapita: lecturer.i10hindexPerCapita,
          citationByWeight: citation,
          hindexByWeight: hindex,
          i10indexByWeight: i10index,
          total: total,
          position: getPosition(index),
        }
      });
      setList(result);
      setSchoolSettings(settings);
      setWorking(false);
    }
  }, [lecturers, busy, byWeigth]);


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
                          <div className="text-lg h4">Rank By Weighting</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="rankByWeightingSwitch"
                              checked={byWeigth}
                              onChange={() =>
                                setByWeigth(!byWeigth)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rankByWeightingSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <hr />
                  <ul className="listview image-listview text border-0 no-line">
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Female</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              disabled={true}
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
                              disabled={true}
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
                              disabled={true}
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
                              disabled={true}
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
                {JSON.stringify(list)}
                {/* <AuthUserTable title='Lecturers: Google Scholar Metrics' data={list ? list : []} loading={busy} /> */}
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
