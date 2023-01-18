import React, { useEffect } from 'react';
import FooterBar from './FooterBar';
import SocialMenu from './SocialMenu';
import TopBar from './TopBar';
import RightColumn from './RightColumn';
import { hasAuth } from '@metricsai/metrics-hocs';
import RightPageColumn from './RightPageColumn';
import FixedPageMenu from './Menus/FixedPageMenu';
import FixedSecureMenu from './Menus/FixedSecureMenu';
import MobileSecureMenu from './Menus/MobileSecureMenu';
import MobilePageMenu from './Menus/MobilePageMenu';

// Props interface for the Layout component
interface Props {
  children: React.ReactNode;
}

// Layout component that takes in the children prop
function PublicLayout({ children }: Props) {
  const auth = hasAuth();

  // Return JSX that represents the layout of a page
  return (
    <>
      {/* TopBar component */}
      <TopBar />
      {/* SocialMenu component */}
      <SocialMenu />
      {/* Section with the children prop surrounded by a menu and column component */}
      <div className="py-4">
        <div className="container">
          <div className="row position-relative">
            {children}
            {/* Render the appropriate menu component based on whether the user is authenticated or not */}
            <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
              {auth ? <FixedSecureMenu /> : <FixedPageMenu />}
              {auth ? <MobileSecureMenu /> : <MobilePageMenu />}
            </aside>
            {/* Render the appropriate column component based on whether the user is authenticated or not */}
            <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
              {auth ? <RightColumn /> : <RightPageColumn />}
            </aside>
          </div>
        </div>
      </div>
      {/* FooterBar component */}
      <div className="py-3 bg-white footer-copyright">
        <FooterBar />
      </div>
    </>
  );
}

export default PublicLayout;
