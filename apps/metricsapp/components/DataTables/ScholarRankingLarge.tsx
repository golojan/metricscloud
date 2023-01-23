import React from 'react';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import {
  schoolSettingsAtom,
  statistLecturersAtom,
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';
import {
  citationByWeight,
  hindexByWeight,
  i10indexByWeight,
} from '@metricsai/metrics-utils';

type ScholarProps = { lecturer: AuthUserInfo };

const ScholarRankingLarge = ({ lecturer }: ScholarProps) => {
  const [settings] = useAtom(schoolSettingsAtom);
  const [statistics] = useAtom(statistLecturersAtom);

  const CPC = citationByWeight(
    lecturer.citations,
    lecturer.totalPublications,
    statistics.highestCitations,
    statistics.highestTotalPublications,
    settings.citationsWeight
  );

  const HIPC = hindexByWeight(
    lecturer.hindex,
    lecturer.firstPublicationYear,
    statistics.highestHindex,
    statistics.firstPublicationYear,
    settings.hindexWeight
  );

  const I10HIPC = i10indexByWeight(
    lecturer.i10hindex,
    lecturer.firstPublicationYear,
    statistics.highestI10hindex,
    statistics.firstPublicationYear,
    settings.i10hindexWeight
  );

  return (
    <>
      <div className="float-right text-center absolute top-9 right-5 flex">
        <span>
          {`${lecturer.i10hindex} ${lecturer.firstPublicationYear} ${statistics.firstPublicationYear} ${settings.i10hindexWeight}`}
        </span>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {lecturer.googlePresence}
          </strong>
          <br />
          <small>g.scholar</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {CPC.rWeight.toFixed(0)}
          </strong>
          <br />
          <small>citations</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {HIPC.rWeight.toFixed(0)}
          </strong>
          <br />
          <small>h-index</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {I10HIPC.rWeight.toFixed(0)}
          </strong>
          <br />
          <small>i10-h-index</small>
        </h4>
      </div>
    </>
  );
};

export default ScholarRankingLarge;
