import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShow = ({ children }) => {
  const location = useLocation();
  const [showChildren, setShowChildren] = useState(true);

  useEffect(() => {
    const hidePaths = ['/admin-dashboard', '/seller-dashboard' , "/blocked" , '/success'];
    const isHidden = hidePaths.some(path => location.pathname.startsWith(path));

    setShowChildren(!isHidden);
  }, [location]);

  return <div>{showChildren && children}</div>;
};

export default MaybeShow;
