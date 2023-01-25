import { perc } from '@metricsai/metrics-utils';
import { GSIRanking, AuthUserInfo } from '@metricsai/metrics-interfaces';

const CALCULATE_SCHOLAR_METRICS_BY_WEIGHT = false;


export const minFirstPublicationYear = (arr: Array<GSIRanking>): number => {
  return Number(arr.reduce((acc, obj) => Math.min(acc, Number(obj.firstPublicationYear)), 0));
};

export const maxFirstPublicationYear = (arr: Array<GSIRanking>): number => {
  return Number(arr.reduce((acc, obj) => Math.max(acc, Number(obj.firstPublicationYear)), 0));
};

export const citationByWeight = (
  citations: number,
  totalPublications: number,
  lecturers: Array<AuthUserInfo>,
  citationWeight: number,
) => {
  if (citations === 0 || totalPublications === 0 || citationWeight === 0) {
    return {
      Weight: 0,
      rWeight: 0,
    };
  } else {
    const citationsPC = citations / totalPublications;

    // citationWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? citationWeight : 100;

    const maxCitations = addCitations(lecturers);
    const totalCitations = Math.max(...lecturers.map((o) => o.citations));
    const rHweight = maxCitations / totalPublications;

    // const rWeight = (Weight / rHweight) * citationWeight;
    // get the PCC of the highest person
    // const highestTotalPublications = Math.max(...lecturers.map((o) => o.totalPublications));
    // const highestCitations = Math.max(...lecturers.map((o) => o.citations));
    // const rHweight = highestCitations / highestTotalPublications;
    // // this rHWeight eqivalent and now equals to citationWeight in reference
    // // and will be used to compute the wieght of other citations and totalPublications
    // const Weight = citations / totalPublications;
    // citationWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? citationWeight : 100;
    // const rWeight = (Weight / rHweight) * citationWeight;

    return {
      Weight: 0,
      rWeight: 0,
    };
  }
};

export const hindexByWeight = (
  hindex: number,
  firstPublicationYear: number,
  lecturers: Array<AuthUserInfo>,
  hindexWeight: number,
) => {
  if (hindex === 0 || firstPublicationYear === 0 || hindexWeight === 0) {
    return {
      Weight: 0,
      rWeight: 0,
    };
  } else {
    const maxHindex = addHindex(lecturers);
    const totalPublications = Math.max(...lecturers.map((o) => o.totalPublications));
    const rHweight = maxHindex / totalPublications;

    const Weight = hindex / totalPublications;
    hindexWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? hindexWeight : 100;

    const rWeight = (Weight / rHweight) * hindexWeight;

    // // current year
    // const year: number = new Date().getFullYear();
    // // diff in first pub year for leading user
    // const highestFirstPublicationYear = Math.min(...lecturers.map((o) => o.firstPublicationYear));
    // const rHyearDiff: number = Number(year) - Number(highestFirstPublicationYear);
    // // diff in first pub year for this user
    // const yearDiff: number = Number(year) - Number(firstPublicationYear);
    // // weight for the leading user
    // const highestHindex = Math.max(...lecturers.map((o) => Number(o.hindex)));
    // const rHweight = highestHindex / rHyearDiff;
    // // weight for this user
    // const Weight = hindex / yearDiff;

    // hindexWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? hindexWeight : 100;
    // const rWeight = Weight / rHweight;
    return {
      Weight: Weight.toFixed(1),
      rWeight: rWeight.toFixed(1),
    };
  }
};

export const i10indexByWeight = (
  i10index: number,
  firstPublicationYear: number,
  lecturers: Array<AuthUserInfo>,
  i10indexWeight: number,
) => {
  if (i10index === 0 || firstPublicationYear === 0 || i10indexWeight === 0) {
    return {
      Weight: 0,
      rWeight: 0,
    };
  } else {
    const maxI10index = addI10index(lecturers);
    const totalPublications = Math.max(...lecturers.map((o) => o.totalPublications));
    const rHweight = maxI10index / totalPublications;

    const Weight = i10index / totalPublications;
    i10indexWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? i10indexWeight : 100;

    const rWeight = (Weight / rHweight) * i10indexWeight;

    // // current year
    // const year: number = new Date().getFullYear();
    // // diff in first pub year for leading user
    // const highestFirstPublicationYear = Math.min(...lecturers.map((o) => o.firstPublicationYear));
    // const rHyearDiff: number = year - highestFirstPublicationYear;
    // // diff in first pub year for this user
    // const yearDiff: number = year - firstPublicationYear;
    // // weight for the leading user
    // const highestI10index = Math.max(...lecturers.map((o) => o.i10hindex));
    // const rHweight = highestI10index / rHyearDiff;
    // // weight for this user
    // const Weight = i10index / yearDiff;

    // i10indexWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? i10indexWeight : 100;
    // const rWeight = (Weight / rHweight) * i10indexWeight;
    return {
      Weight: Weight.toFixed(1),
      rWeight: rWeight.toFixed(1),
    };
  }
};

export const addCitations = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.citations), 0);
};
export const addHindex = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.hindex), 0);
};
export const addI10index = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.i10hindex), 0);
};
export const addGooglePresence = (arr: Array<GSIRanking>): number => {
  const total = arr?.reduce((acc, obj) => Number(acc) + Number(obj.googlePresence), 0);
  const percT = perc(total, arr?.length);
  return Number(percT);
};
export const addTotal = (arr: Array<GSIRanking>): number => {
  const cit = arr?.reduce((acc, obj) => Number(acc) + Number(obj.citations), 0);
  const hin = arr?.reduce((acc, obj) => Number(acc) + Number(obj.hindex), 0);
  const i10 = arr?.reduce((acc, obj) => Number(acc) + Number(obj.i10hindex), 0);
  const total = ((cit + hin + i10) / 3).toFixed(0);
  return Number(total);
};

export const addTotalPublications = (arr: Array<GSIRanking>): number => {
  return arr?.reduce((acc, obj) => Number(acc) + Number(obj.totalPublications), 0);
};

export const totalRanking = (citation: number, hindex: number, i10index: number): number => {
  if (citation === 0 || hindex === 0 || i10index === 0) {
    return 0.0;
  } else {
    const total = (citation + hindex + i10index) / 3;
    return Number(total.toFixed(0));
  }
};
