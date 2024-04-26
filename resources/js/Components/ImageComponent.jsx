import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";

export default function ImageComponent({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onLoad = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div>
      {!imageLoaded && (
        <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width={"100%"}
          height={"100%"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      {imageLoaded && (
        <img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      )}
    </div>
  );
}
