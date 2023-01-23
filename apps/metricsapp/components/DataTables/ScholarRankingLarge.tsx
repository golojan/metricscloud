import React from 'react';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import {
  schoolSettingsAtom,
  statistLecturersAtom,
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';

const citationByWeight = (c, t, h, w) => {
  const weight = ((c * t) / h) * w;
  const rWeight = (c / h) * w;
  return {
    weight: weight,
    rWeight: rWeight,
  };
};

type ScholarProps = { lecturer: AuthUserInfo };

type CitationType = {
  weight: number;
  rWeight: number;
};

const ScholarRankingLarge = ({ lecturer }: ScholarProps) => {
  const [settings] = useAtom(schoolSettingsAtom);
  const [statistics] = useAtom(statistLecturersAtom);

  const citations = citationByWeight(
    lecturer.citations,
    statistics.totalPublications,
    statistics.highestCitations,
    settings.citationsWeight
  ).rWeight.toFixed(1);

  return (
    <>
      <div className="float-right text-center absolute top-9 right-5 flex">
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {lecturer.googlePresence}
          </strong>
          <br />
          <small>g.scholar</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{lecturer.citations}</strong>
          <br />
          <small>citations</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{lecturer.hindex}</strong>
          <br />
          <small>h-index</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{lecturer.i10hindex}</strong>
          <br />
          <small>i10-h-index</small>
        </h4>
      </div>
    </>
  );
};

export default ScholarRankingLarge;
