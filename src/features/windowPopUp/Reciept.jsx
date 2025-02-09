import React, { useEffect } from 'react';
import { useFetcher } from 'react-router-dom'; // Corrected import

const Receipt = ({ onCloseWindow }) => {
  const fetcher = useFetcher();

  useEffect(function () {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  return (
    <>
      {/* Overlay with blur effect */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-stone-800/50 backdrop-blur-sm flex justify-center items-center"
        onClick={onCloseWindow}
      >
        {/* Modal content (not blurred) */}
        <div
          className="bg-white p-[20px] rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <span
            className="absolute top-2.5 right-2.5 cursor-pointer text-[20px]"
            onClick={onCloseWindow}
          >
            &times;
          </span>
          <p>This is a modal window!</p>
        </div>
      </div>
    </>
  );
};

export default Receipt;