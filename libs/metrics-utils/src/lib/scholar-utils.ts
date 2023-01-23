
const CALCULATE_SCHOLAR_METRICS_BY_WEIGHT = false;

export const citationByWeight = (
  citations: number,
  totalPublications: number,
  highestCitations: number,
  highestTotalPublications: number,
  citationWeight: number
) => {
  if (
    citations === 0 ||
    totalPublications === 0 ||
    highestCitations === 0 ||
    highestTotalPublications === 0 ||
    citationWeight === 0
  ) {
    return {
      Weight: 0,
      rWeight: 0,
    };
  } else {
    // get the PCC of the highest person
    const rHweight = highestCitations / highestTotalPublications;
    // this rHWeight eqivalent and now equals to citationWeight in reference
    // and will be used to compute the wieght of other citations and totalPublications
    const Weight = citations / totalPublications;
    citationWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? citationWeight:100;
    const rWeight = (Weight/ rHweight) * citationWeight ;
    return {
      Weight: Weight,
      rWeight: rWeight,
    };
  }
};

export const hindexByWeight = (
  hindex: number,
  firstPublicationYear: number,
  highestHindex: number,
  highestFirstPublicationYear: number,
  hindexWeight: number
) => {
  if (
    hindex === 0 ||
    firstPublicationYear === 0 ||
    highestHindex === 0 ||
    highestFirstPublicationYear === 0 ||
    hindexWeight === 0
  ) {
    return {
      Weight: 0,
      rWeight: 0,
    };
  } else {
    const year: number = new Date().getFullYear();
    const rHyearDiff: number = year - highestFirstPublicationYear;
    const yearDiff: number = year - firstPublicationYear;
    const rHweight = highestHindex / rHyearDiff;
    const Weight = hindex / yearDiff;

    hindexWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? hindexWeight:100;
    const rWeight = (Weight /rHweight) * hindexWeight;
    return {
      Weight: Weight,
      rWeight: rWeight,
    };
  }
};

export const i10indexByWeight = (
  i10index: number,
  firstPublicationYear: number,
  highestI10index: number,
  highestFirstPublicationYear: number,
  i10indexWeight: number
) => {
  if (
    i10index === 0 ||
    firstPublicationYear === 0 ||
    highestI10index === 0 ||
    highestFirstPublicationYear === 0 ||
    i10indexWeight === 0
  ) {
    return {
      Weight: 0,
      rWeight: 0,
    };
  } else {
    // current year
    const year: number = new Date().getFullYear();
    // diff in first pub year for leading user
    const rHyearDiff: number = year - highestFirstPublicationYear;
    // diff in first pub year for this user
    const yearDiff: number = year - firstPublicationYear;
    // weight for the leading user
    const rHweight = highestI10index / rHyearDiff;
    // weight for this user
    const Weight = i10index / yearDiff;

    i10indexWeight = CALCULATE_SCHOLAR_METRICS_BY_WEIGHT ? i10indexWeight:100;
    const rWeight = (Weight / rHweight) * i10indexWeight;
    return {
      Weight: Weight,
      rWeight: rWeight,

    };
  }
};
