import { WebWindow } from '@metricsai/metrics-interfaces';

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  let size = 'lg';
  if ((innerWidth as number) >= 1400) {
    // Size is XXL
    size = 'xxl';
  } else if ((innerWidth as number) >= 1200) {
    // Size is XL
    size = 'xl';
  } else if ((innerWidth as number) >= 992) {
    // Size is LG
    size = 'lg';
  } else if ((innerWidth as number) >= 768) {
    // Size is MD
    size = 'md';
  } else if ((innerWidth as number) >= 576) {
    // Size is SM
    size = 'sm';
  } else if ((innerWidth as number) < 576) {
    // Size is xs
    size = 'xs';
  } else {
    // Size is xs
    size = 'xxs';
  }
  return {
    width: width,
    height: height,
    size: size,
  } as WebWindow;
};
