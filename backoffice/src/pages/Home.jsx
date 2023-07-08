import React, { useEffect, useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { getCurrentUser } from '../api/auth/auth';

function Home() {
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
    <>
      <h1 className="mb-10"> Bienvenue <strong>{_user.company}</strong> !</h1>
      <div className="flex grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <Label className="text-sm font-medium text-gray-700 mb-3">
            Application ID:
          </Label>
          <TextInput
            readOnly
            className=" p-1 border border-green-300 rounded-md bg-green-100 text-green-800 disabled:opacity-20 "
            value={_user.id}
          />
        </div>
        <div className="flex flex-col">
          <Label className="text-sm font-medium text-gray-700 mb-3">
            Application Secret:
          </Label>
          <TextInput
            readOnly
            className="p-1 border border-cyan-300 rounded-md bg-cyan-100 text-cyan-800 disabled:opacity-20 "
            value={_user.appSecret}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
