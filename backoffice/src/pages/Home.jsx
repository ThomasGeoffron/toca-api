import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth/auth";

import { Heatmap } from "../components/Heatmap";
import { TrackingEvents } from "../components/TrackingEvents";
const Home = () => {
  const [_user, setUser] = useState({});

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Welcome Home ! {_user.company}</h1>
      <div>
        <p> Your appId : {_user.id}</p>
        <p> Your appSecret : {_user.appSecret} </p>
      </div>
      <Heatmap />

      <TrackingEvents />
    </React.Fragment>
  );
};

export default Home;
