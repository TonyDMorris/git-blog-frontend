import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: ["I EAT DIFFS.", "THEN BLOG ABOUT IT."],
        autoStart: true,
        loop: true,
        deleteSpeed: 20,
        cursor: "_",
      }}
    />
  );
}

export default Type;
