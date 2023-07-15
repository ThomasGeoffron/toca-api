import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { TbAlarm, TbAlarmPlus, TbAlarmMinus } from 'react-icons/tb';
import { findAllSessions } from '../../api/events/sessions';

function Counter({
  name, count, Icon, color,
}) {
  return (
    <Card className="flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <Icon size="50" color={color} />
      </div>
      <span>{name}</span>
      <h2 className="text-4xl ">~{count} sec.</h2>
    </Card>
  );
}

export default function TrackingEvents() {
  const [_sessionMin, setSessionMin] = useState(0);
  const [_sessionAvg, setSessionAvg] = useState(0);
  const [_sessionMax, setSessionMax] = useState(0);

  const fromSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}min. ${remainingSeconds}` : `${remainingSeconds}s`;
  };

  useEffect(() => {
    findAllSessions().then(({ data: sessions }) => {
      const durations = sessions.map(
        (session) => (new Date(session.endedAt) - new Date(session.startsAt)) / 1000,
      );

      setSessionMin(fromSecondsToMinutes(Math.min(...durations).toFixed(0)));
      setSessionMax(fromSecondsToMinutes(Math.max(...durations).toFixed(0)));
      setSessionAvg(fromSecondsToMinutes(
        (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0),
      ));
    });
  }, []);

  return (
    <div className="flex justify-center items-center gap-20">
      <Counter name="Session min." count={_sessionMin} Icon={TbAlarmMinus} color="red" />
      <Counter name="Temps de session moyen" count={_sessionAvg} Icon={TbAlarm} color="green" />
      <Counter name="Session max." count={_sessionMax} Icon={TbAlarmPlus} color="orange" />
    </div>
  );
}
