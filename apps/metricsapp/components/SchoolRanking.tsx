import React from 'react';
import { RootState } from '@metricsai/metrics-store';
import { useSelector } from 'react-redux';
import PerCapitaAllCitations from './indicators/Citations/PerCapitaAllCitations';
import PerCapitaHindex from './indicators/Citations/PerCapitaHindex';
import PerCapitaI10Index from './indicators/Citations/PerCapitaI10Index';
import GoogleScholarPresence from './indicators/Citations/GoogleScholarPresence';
import InternationalStaff from './indicators/InternationalOutlook/InternationalStaff';
import InternationalStudents from './indicators/InternationalOutlook/InternationalStudents';
import InternationalColaborations from './indicators/InternationalOutlook/InternationalColaborations';
import GraduateOutput from './indicators/Teaching/GraduateOutput';
import FullProfessors from './indicators/Teaching/FullProfessors';
import PercPHDs from './indicators/Teaching/PercPHDs';
import FullAcreditationStatus from './indicators/Teaching/FullAcreditationStatus';
import TeachStudentRatio from './indicators/Teaching/TeachStudentRatio';
import FemaleStudents from './indicators/Teaching/FemaleStudents';
import ProfessorsAndReader from './indicators/Teaching/ProfessorsAndReader';
import SeniorLecturers from './indicators/Teaching/SeniorLEcturers';
import OtherLecturers from './indicators/Teaching/OtherLecturers';

interface SRProps {
  schoolId: string;
}

const SchoolRanking = (props: SRProps) => {
  // const get the props;
  const { ranking } = useSelector((state: RootState) => state.settings);
  return (
    <>
      <div className="section mb-10">
        <div className="row mt-2">
          <PerCapitaAllCitations ranking={ranking} />
          <PerCapitaHindex ranking={ranking} />
          <PerCapitaI10Index ranking={ranking} />
          <GoogleScholarPresence ranking={ranking} />
          <InternationalStaff />
          <InternationalStudents />
          <InternationalColaborations ranking={ranking} />
          <GraduateOutput />
          <FullProfessors />
          <PercPHDs />
          <FullAcreditationStatus />
          <TeachStudentRatio />
          <FemaleStudents />
          <ProfessorsAndReader />
          <SeniorLecturers />
          <OtherLecturers />
        </div>
      </div>
    </>
  );
};

export default SchoolRanking;
