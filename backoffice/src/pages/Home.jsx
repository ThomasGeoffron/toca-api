import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/auth/auth';
import { Label, TextInput } from 'flowbite-react';

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
      <h1> Bienvenue ! {_user.company} </h1>
      <div className="flex grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <Label htmlFor="userId" className="text-sm font-medium text-gray-700">
            AppId:
          </Label>
          <TextInput
            id="userId"
            disabled
            className=" py-2 px-4 border border-green-300 rounded-md bg-green-100 text-green-800 disabled:opacity-20 "
            value={_user.id}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="userId" className="text-sm font-medium text-gray-700">
            AppSecret:
          </Label>
          <TextInput
            id="userId"
            disabled
            className="py-2 px-4 border border-cyan-300 rounded-md bg-cyan-100 text-cyan-800 disabled:opacity-20 "
            value={_user.appSecret}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
