import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import OwnerLayout from '../../../../components/OwnerLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';
import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';
import { NextPage } from 'next';
import { withLogon } from '../../../../utils/withLogon';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@metricsai/metrics-store';
import { DataLists, SchoolInfo } from '@metricsai/metrics-interfaces';
import { useRouter } from 'next/router';
import { getDataLists, getSchoolInfoById } from '@metricsai/metrics-utils';
import { SchoolsMenu } from '../../../../components/MyMenu';
import useSWR from 'swr';

const EditSchool: NextPage = () => {
  const [selectedIndicators] = useState<string[]>([]);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<Dispatch>();
  const [school, setSchool] = useState<SchoolInfo>({
    shortname: '',
    domain: '',
    name: '',
    indicators: selectedIndicators,
  });

  useEffect(() => {
    getSchoolInfoById(id as string)
      .then((thisSchool) => {
        setSchool(thisSchool);
      })
      .catch();
  }, [id]);

  const editSchool = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    const response = await fetch(`/api/schools/${id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(school),
    });
    const _data = await response.json();
    dispatch.settings.setBusy(false);
  };

  const indicatorRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSWR<DataLists>('/api/list', getDataLists);

  const selectIndicator = async (e: any) => {
    const thisCheckBox = indicatorRef.current;
    // set busy
    dispatch.settings.setBusy(true);
    // get value of the checked checkbox
    const _value = e.target.value;
    // get the checked state of the checkbox
    const _isChecked = e.target.checked;
    // check if value is in selectedIndicators
    const _valueExists = selectedIndicators.includes(_value);
    // if checked, add to selectedIndicators
    if (_isChecked) {
      // checked state is true
      if (_valueExists) {
        // do nothing
      } else {
        // add to selectedIndicators
        selectedIndicators.push(_value);
      }
    } else {
      // checked state is false
      if (_valueExists) {
        // remove from selectedIndicators
        const _index = selectedIndicators.indexOf(_value);
        selectedIndicators.splice(_index, 1);
      }
    }
    setSchool({
      ...school,
      indicators: selectedIndicators,
    });
    dispatch.settings.setBusy(false);
  };

  return (
    <OwnerLayout>
      <AppHeader isroot={false} />
      <div id="appCapsule">
        <div className="section wallet-card-section pt-1">
          <div className="wallet-card">
            <div className="balance">
              <div className="left">
                <div className="title">Schools & Domains</div>
                <h1 className="total h1">
                  <span className="text-primary">{data?.schools?.length}</span>{' '}
                  Schools
                </h1>
              </div>
              <div className="right flex">
                <Link href={'/my/schools/add'} className="button">
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section pt-1">
          <div className="row mt-2">
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
              <div className="stat-box">
                <SchoolsMenu />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
              <div className="row">
                <form onSubmit={editSchool} className="stat-box">
                  <div className="row form-group">
                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <label>Short Name</label>
                      <input
                        type={'text'}
                        className="form-control"
                        placeholder={'shortname:(ESUT)'}
                        value={`${school.shortname}`}
                        onChange={(e) =>
                          setSchool({
                            ...school,
                            shortname: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <label>Unique Domain</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={'domain.metrics.ng'}
                        value={`${school.domain}`}
                        onChange={(e) =>
                          setSchool({ ...school, domain: e.target.value })
                        }
                      />
                    </div>

                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={'Full Name'}
                        value={`${school.name}`}
                        onChange={(e) =>
                          setSchool({ ...school, name: e.target.value })
                        }
                      />
                    </div>

                    <span className="mb-1 mt-6 h5">Attach Indicators:</span>
                    <hr className="mb-2 mt-0 border" />
                    <div className="row">
                      <ul className="listview image-listview text mb-2 inset">
                        {data?.indicators?.map(
                          (indicator: any, idx: number) => (
                            <li key={idx}>
                              <div className="item">
                                <div className="in">
                                  <div>{indicator.indicator}</div>
                                  <div className="form-check form-switch ms-2 flex-col">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name={`input_${indicator._id}`}
                                      checked={school?.indicators?.includes(
                                        `${indicator._id}`
                                      )}
                                      value={indicator._id}
                                      id={`input_${indicator._id}`}
                                      onChange={selectIndicator}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`input_${indicator._id}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="my-2 col-12">
                      <button type="submit" className="btn btn-primary">
                        Edit School
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
      <AppDrawer onchat={false} menuitem="dashboard" />
    </OwnerLayout>
  );
};

export default withLogon(EditSchool);
