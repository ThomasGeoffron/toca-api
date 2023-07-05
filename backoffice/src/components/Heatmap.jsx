import React, { useEffect, useState } from "react";

import { findAll as findAllMouseMouvement } from "../api/events/mouse-mouvements";

import h337 from "heatmapjs/heatmap.js";

export const Heatmap = () => {
  const [_config, setConfig] = useState(null);
  const [_isLoaded, setLoaded] = useState(false);
  const [_mouseMouvementEvent, setMouseMouvementEvent] = useState({});

  const divRef = React.useRef(null);

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
            ({ x, y }) => x === pos.x && y === pos.y
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
      setMouseMouvementEvent(dataPoints);
    });
  }, []);

  useEffect(() => {
    console.log(document.querySelector(".heatmapContainer"));
    if (!divRef.current) return;
    setConfig({
      container: document.querySelector(".heatmapContainer"),
      backgroundColor: "black",
      radius: 10,
      maxOpacity: 1,
      minOpacity: 0,
      blur: 0.75,
    });
  }, [divRef]);

  useEffect(() => {
    console.log(_mouseMouvementEvent);

    if (!_isLoaded && _mouseMouvementEvent.data) {
      const heatmapInstance = h337.create({
        container: document.querySelector(".heatmapContainer"),
      });
      heatmapInstance.setData(_mouseMouvementEvent);
      heatmapInstance.repaint();
      setLoaded(true);
    }
  }, [_mouseMouvementEvent]);

  return (
    <div>
      <div
        className="heatmapContainer"
        style={{ width: 300, height: 300 }}
        ref={divRef}
      ></div>
    </div>
  );
};
