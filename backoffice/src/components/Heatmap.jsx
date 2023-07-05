import React, { useEffect, useRef, useState } from 'react';

import Heatmap from 'heatmap.js';
import { findAll as findAllMouseMouvement } from '../api/events/mouse-mouvements';

export default function HeatmapChart() {
  const [_mouseMouvementEvent, setMouseMouvementEvent] = useState({});
  const divRef = useRef(null);

  useEffect(() => {
    findAllMouseMouvement().then(({ data }) => {
      const positions = data
        .map((movement) => ({
          url: movement.url,
          x: Math.round(Math.ceil(movement.position.x) * 10) / 10,
          y: Math.round(Math.ceil(movement.position.y) * 10) / 10,
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
        backgroundColor: 'white',
        radius: 20,
        maxOpacity: 1,
        minOpacity: 0,
        blur: 0.75,
      });
      heatmapInstance.setData(dataPoints);
    });
  }, []);

  return (
    <div ref={divRef} style={{ width: 300, height: 600 }} />
  );
}
