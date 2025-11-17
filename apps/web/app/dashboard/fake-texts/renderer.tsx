import React from "react";

const Renderer = () => {
  return (
    <div className="px-8 h-full w-full max-h-full flex flex-col gap-4 items-center">
      <div className="aspect-9/16 border-2 rounded-3xl w-full max-w-80"></div>
      <p>The above duration is preview only.</p>
    </div>
  );
};

export default Renderer;
