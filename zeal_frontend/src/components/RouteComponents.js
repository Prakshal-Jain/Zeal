import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Sidebar from "./Sidebar";

export const RouteWithSidebar = ({
  component: Component,
  componentProps,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Sidebar />
          <main className="content">
            {/* <Navbar /> */}
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};
