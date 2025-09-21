import React, { useState } from 'react';

const Toast = ({ message }: { message: string }) => {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
      {message}
      <button className="ml-4 text-white" onClick={() => setShow(false)}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
