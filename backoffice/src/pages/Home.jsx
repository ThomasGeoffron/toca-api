import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth/auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { findAll as findAllTrackEvent } from "../api/events/tracking";
import { findAll as findAllMouseMouvement } from "../api/events/mouse-mouvements";
import h337 from "heatmapjs/heatmap.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Home = () => {
  const [_user, setUser] = useState({});
  const [_trackEvents, setTrackEvents] = useState([]);
  const [_tabEvent, setTabEvent] = useState([0, 0, 0, 0, 0]);
  const [_buttonSelected, setButtonSelected] = useState("");
  const [_labelChartButton, setLabelChartButton] = useState("");
  const [_iframe, setIframe] = useState(null);
  const [_mouseMouvementEvent, setMouseMouvementEvent] = useState([]);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  useEffect(() => {
    findAllTrackEvent().then((trackEvents) => {
      setTrackEvents(trackEvents.data);
    });
  }, []);

  useEffect(() => {
    findAllMouseMouvement().then((mouseMouvementEvent) => {
      setMouseMouvementEvent(mouseMouvementEvent.data);
    });
  }, []);

  console.log(_mouseMouvementEvent);
  const dataChartButton = () => {
    const eventsTypes = Array.from(
      new Set(_trackEvents.map((e) => e.eventType))
    ).sort((a, b) => (a < b ? -1 : 1));

    if (_buttonSelected === "") {
      const columns = _trackEvents.reduce(
        (cols, event) => {
          cols[
            eventsTypes.findIndex((eventType) => eventType === event.eventType)
          ] += 1;
          return cols;
        },
        [0, 0, 0, 0, 0, 0]
      );
      setLabelChartButton("Evenement sur tous le site");
      setTabEvent(columns);
    } else {
      const columns = _trackEvents.reduce(
        (cols, event) => {
          cols[
            eventsTypes.findIndex(
              (eventType) =>
                eventType === event.eventType && event.name === _buttonSelected
            )
          ] += 1;
          return cols;
        },
        [0, 0, 0, 0, 0, 0]
      );

      setLabelChartButton(`Evenement sur le bouton ${_buttonSelected}`);
      setTabEvent(columns);
    }
  };

  useEffect(() => {
    dataChartButton();
  }, [_trackEvents, _buttonSelected]);

  const handleEditChart = (button) => {
    setButtonSelected(button);
  };

  const labels = Array.from(new Set(_trackEvents.map((e) => e.eventType))).sort(
    (a, b) => (a < b ? -1 : 1)
  );
  const data = {
    labels,
    datasets: [
      {
        label: _labelChartButton,
        data: _tabEvent,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  // Heatmap configuration

  // create configuration object
  // console.log(document.getElementById("heatmapContainer"));
  // var config = {
  //   container: document.getElementById("heatmapContainer"),
  //   radius: 10,
  //   maxOpacity: 0.5,
  //   minOpacity: 0,
  //   blur: 0.75,
  //   gradient: {
  //     // enter n keys between 0 and 1 here
  //     // for gradient color customization
  //     ".5": "blue",
  //     ".8": "red",
  //     ".95": "white",
  //   },
  // };
  // h337.create(config);

  return (
    <React.Fragment>
      <h1>Welcome Home ! {_user.company}</h1>
      <div>
        <p> Your appId : {_user.id}</p>
        <p> Your appSecret : {_user.appSecret} </p>
      </div>
      <select
        onChange={(e) => {
          handleEditChart(e.target.value);
        }}
      >
        <option value="">Select a button</option>
        {Array.from(new Set(_trackEvents.map((event) => event.name))).map(
          (button) => (
            <option value={button} key={button}>
              {button}
            </option>
          )
        )}
      </select>

      <div>
        <Bar data={data} options={options} />
      </div>

      <div id="heatmapContainer"></div>
    </React.Fragment>
  );
};

export default Home;
