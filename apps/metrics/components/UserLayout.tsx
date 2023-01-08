import React from "react";
import FooterBar from "./FooterBar";
import SocialMenu from "./SocialMenu";
import TopBar from "./TopBar";

interface Props {
  children: React.ReactNode;
}
function UserLayout({ children }: Props) {
  return (
    <>
      <TopBar />
      <SocialMenu />
      {children}
      <div className="py-3 bg-white footer-copyright">
        <FooterBar />
      </div>
    </>
  );
}

export default UserLayout;
