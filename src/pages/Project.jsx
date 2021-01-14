import React, { useState, useEffect } from "react";

function Project({ location }) {
  // Get data from API with fetch()
//   const location = useLocation();
  const [appState, setAppState] = useState({
  
  });


  useEffect(() => {
      
  }, []);

  return (
    <div>{location.pathname}</div>
  );
}

export default Project;
