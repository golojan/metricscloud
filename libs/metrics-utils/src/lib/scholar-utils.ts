import { mul, div } from './metrics-utils';

export const citationByWeight = (
  citations: any,
  totalPublications: any,
  maxCitations: any,
  weight: any
) => {
  const _cit: any = div(citations, totalPublications);
  const _div: any = div(_cit, maxCitations);
  const _mul: any = mul(_div, weight);
  return parseInt(_mul);
};

export const hindexByWeight = (
  hindex: any,
  firstPublicationYear: any,
  maxHindex: any,
  weight: any
) => {
  // get current year from Date
  const year: number = new Date().getFullYear();
  const yearDiff: number = year - firstPublicationYear;
  const _hindex: any = div(hindex, yearDiff);
  const _div: any = div(_hindex, maxHindex);
  const _mul: any = mul(_div, weight);
  return parseInt(_mul);
};

export const i10indexByWeight = (
  i10index: any,
  firstPublicationYear: any,
  maxI10index: any,
  weight: any
) => {
  const year: number = new Date().getFullYear();
  const yearDiff: number = year - firstPublicationYear;
  const _i10index: any = div(i10index, yearDiff);
  const _div: any = div(_i10index, maxI10index);
  const _mul: any = mul(_div, weight);
  return parseInt(_mul);
};
