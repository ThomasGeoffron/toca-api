import React, { useEffect, useRef, useState } from 'react';

import Heatmap from 'heatmap.js';
import { Label, Select } from 'flowbite-react';
import { findAll as findAllMouseMouvement } from '../../api/events/mouse-mouvements';

export default function HeatmapChart() {
  const [_mouseMouvementEvent, setMouseMouvementEvent] = useState([]);
  const [_buttonSelected, setButtonSelected] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    findAllMouseMouvement().then(({ data }) => {
      setMouseMouvementEvent(data);
      if (_buttonSelected !== '') {
        const positions = data
          .filter((event) => event.url === _buttonSelected)
          .map((movement) => ({
            url: movement.url,
            x: movement.position.x,
            y: movement.position.y,
          }))
          .reduce((acc, pos) => {
            const existingPairIndex = acc.findIndex(
              ({ x, y }) => x === pos.x && y === pos.y,
            );

            if (existingPairIndex === -1) {
              acc.push({ x: pos.x, y: pos.y, value: 1 });
            } else {
              acc[existingPairIndex].value += 1;
            }

            return acc;
          }, []);

        const dataPoints = {
          max: positions.sort((p1, p2) => (p1.value < p2.value ? 1 : -1))[0]
            .value,
          min: positions.sort((p1, p2) => (p1.value < p2.value ? -1 : 1))[0]
            .value,
          data: positions,
        };

        const heatmapInstance = Heatmap.create({
          container: divRef.current,
          backgroundColor: 'black',
          radius: 20,
          maxOpacity: 1,
          minOpacity: 0.06,
          blur: 0.75,
          // gradient: {
          //   ".5": "#60D394",
          //   ".8": "#AAF683",
          //   ".95": "#EE6055",
          // },
        });
        heatmapInstance.setData(dataPoints);
        heatmapInstance.repaint();
      }
    });
  }, [_buttonSelected]);

  const handleEditChart = (button) => {
    setButtonSelected(button);
  };

  return (
    <>
      <Label
        htmlFor="button"
        value="Choississez une url pour voir les heatmaps"
      />
      <Select
        id="button"
        className="w-1/4  m-auto mb-4 "
        onChange={(e) => handleEditChart(e.target.value)}
      >
        <option value="">Select a button</option>
        {Array.from(
          new Set(_mouseMouvementEvent.map((event) => event.url)),
        ).map((button) => (
          <option value={button} key={button}>
            {button}
          </option>
        ))}
      </Select>

      <div className="">
        {_buttonSelected != '' ? (
          <div
            ref={divRef}
            style={{ position: 'relative', width: '100%', height: 600 }}
          />
        ) : (
          <div className="text-center" />
        )}
      </div>
    </>
  );
}
