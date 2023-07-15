import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Label, Select } from 'flowbite-react';
import { findAll as findAllTrackEvent } from '../../api/events/tracking';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function TrackingEvents() {
  const [_trackEvents, setTrackEvents] = useState([]);
  const [_tabEvent, setTabEvent] = useState([0, 0, 0, 0, 0]);
  const [_buttonSelected, setButtonSelected] = useState('');
  const [_labelChartButton, setLabelChartButton] = useState('');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  useEffect(() => {
    findAllTrackEvent().then((trackEvents) => {
      setTrackEvents(trackEvents.data);
    });
  }, []);

  const dataChartButton = () => {
    const eventsTypes = Array.from(
      new Set(_trackEvents.map((e) => e.eventType)),
    ).sort((a, b) => (a < b ? -1 : 1));
    if (_buttonSelected === '') {
      const columns = [0, 0, 0, 0, 0, 0];
      _trackEvents.forEach((event) => {
        const index = eventsTypes.findIndex((eventType) => eventType === event.eventType);
        if (index !== -1) {
          columns[index] += 1;
        }
      });

      setLabelChartButton('Evenement sur tous le site');
      setTabEvent(columns);
    } else {
      const columns = [0, 0, 0, 0, 0, 0];
      _trackEvents.forEach((event) => {
        const index = eventsTypes.findIndex(
          (eventType) => eventType === event.eventType && event.name === _buttonSelected,
        );
        if (index !== -1) {
          columns[index] += 1;
        }
      });

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
    (a, b) => (a < b ? -1 : 1),
  );
  const data = {
    labels,
    datasets: [
      {
        label: _labelChartButton,
        data: _tabEvent,
        backgroundColor: '#EE6055',
      },
    ],
  };

  return (
    <>
      <Label
        htmlFor="button"
        value="Choississez un élément pour voir ces métriques"
      />
      <Select
        className="w-1/4  m-auto mt-4"
        onChange={(e) => handleEditChart(e.target.value)}
      >
        <option value="">Tous les éléments</option>
        {Array.from(new Set(_trackEvents.map((e) => e.name))).map((button) => (
          <option value={button} key={button}>
            {button}
          </option>
        ))}
      </Select>
      <div>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
