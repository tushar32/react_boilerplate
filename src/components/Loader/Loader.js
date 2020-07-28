import React from "react";
import ContentLoader  from "react-content-loader";

export default (props) => (
    <ContentLoader 
    speed={3}
    width={2000}
    height={800}
    viewBox="0 0 2000 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="473" y="54" rx="3" ry="3" width="88" height="15" /> 
    <rect x="473" y="98" rx="3" ry="3" width="52" height="18" /> 
    <rect x="473" y="148" rx="3" ry="3" width="410" height="21" /> 
    <rect x="469" y="193" rx="3" ry="3" width="380" height="17" /> 
    <rect x="469" y="235" rx="3" ry="3" width="178" height="18" /> 
    <circle cx="229" cy="160" r="153" />
  </ContentLoader>
);
