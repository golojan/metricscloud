import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import OwnerLayout from '../../../../components/OwnerLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';
import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';
import { NextPage } from 'next';
import { withLogon } from '../../../../utils/withLogon';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@metricsai/metrics-store';
import { IndicatorInfo } from '@metricsai/metrics-interfaces';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import { getIndicators, getIndicatorInfo } from '@metricsai/metrics-utils';
import { ICriteria } from '@metricsai/metrics-interfaces';
import { IndicatorsMenu } from '../../../../components/MyMenu';

const EditIndicator: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<Dispatch>();
  const [indicator, setIndicator] = useState<IndicatorInfo>({
    shortname: '',
    indicator: '',
    criteria: '',
    weight: 0,
    multiplier: 0,
  });

  const { data, isLoading } = useSWR<IndicatorInfo[]>(
    '/api/indicators/list',
    getIndicators
  );

  useEffect(() => {
    getIndicatorInfo(id as string)
      .then((thisIndicator) => {
        setIndicator(thisIndicator);
      })
      .catch();
  }, [id]);

  const editIndicator = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    const response = await fetch(`/api/indicators/${id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indicator),
    });
    const _data = await response.json();
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
                <div className="title">Rankings and Indicators</div>
                <h1 className="total h1">
                  <span className="text-primary">{data?.length}</span>{' '}
                  Indicators
                </h1>
              </div>
              <div className="right flex">
                <Link href={'/my/indicators/add'} legacyBehavior>
                  <a className="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section pt-1">
          <div className="row mt-2">
            <div className="col-4">
              <div className="stat-box">
                <IndicatorsMenu />
              </div>
            </div>
            <div className="col-8">
              <div className="row">
                <form onSubmit={editIndicator} className="stat-box">
                  <div className="row form-group ">
                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <input
                        type={'text'}
                        className="form-control"
                        placeholder={'Short Name'}
                        value={`${indicator.shortname}`}
                        required={true}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            shortname: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <input
                        type={'text'}
                        className="form-control"
                        placeholder={'Indicator Name'}
                        value={`${indicator.indicator}`}
                        required={true}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            indicator: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <select
                        className="form-control"
                        defaultValue={`${indicator.criteria}`}
                        required={true}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            criteria: e.target.value,
                          })
                        }
                      >
                        <option value={ICriteria.GENERAL}>
                          {ICriteria.GENERAL}
                        </option>
                        <option value={ICriteria.CITATIONS}>
                          {ICriteria.CITATIONS}
                        </option>
                        <option value={ICriteria.INTERNATIONAL_OUTLOOK}>
                          {ICriteria.INTERNATIONAL_OUTLOOK}
                        </option>
                        <option value={ICriteria.RESEARCH}>
                          {ICriteria.RESEARCH}
                        </option>
                        <option value={ICriteria.TEACHING}>
                          {ICriteria.TEACHING}
                        </option>
                        <option value={ICriteria.STUDENTS_EVALUATION}>
                          {ICriteria.STUDENTS_EVALUATION}
                        </option>
                      </select>
                    </div>

                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={'Weight'}
                        required={true}
                        value={indicator.weight}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            weight: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <input
                        type="number"
                        className="form-control"
                        required={true}
                        placeholder={'Mult.'}
                        value={indicator.multiplier}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            multiplier: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="my-2 col-12">
                      <button type="submit" className="btn btn-primary">
                        Create Indicator
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

export default withLogon(EditIndicator);
