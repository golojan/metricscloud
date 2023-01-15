import { useAtom } from 'jotai';
import React, { useState } from 'react';

const mailtest = () => {
  const [mailout, setMailout] = useState({});

  const senOutMail = () => {
    fetch('/api/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toEmail: 'agu.chux@yahoo.com',
        toName: 'Agu Chux',
        subject: 'Testing Email',
        htmlBody: 'We are testing emails and other stuffs...',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMailout(res.message);
      });
  };

  return (
    <>
      <div className="text-center justify-items-center w-full my-10">
        <button onClick={senOutMail}>Mail Out Test</button>
        <p>{JSON.stringify(mailout)}</p>
      </div>
    </>
  );
};

export default mailtest;
