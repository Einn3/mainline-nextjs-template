"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentProps } from "react";

type ProgressiveImageProps = ComponentProps<typeof Image>;

export function ProgressiveImage(props: ProgressiveImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isFill = Boolean(props.fill);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      queueMicrotask(() => setIsLoaded(true));
    }
  }, []);

  return (
    <span
      className={isFill ? "absolute inset-0" : "relative inline-flex"}
      aria-busy={!isLoaded}
    >
      <Image
        {...props}
        ref={imageRef}
        onLoad={(event) => {
          setIsLoaded(true);
          props.onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          props.onError?.(event);
        }}
        className={[
          props.className,
          "transition-opacity duration-300 motion-reduce:transition-none",
          isLoaded ? "opacity-100" : "opacity-0",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {!isLoaded && (
        <span
          aria-hidden="true"
          className="skeleton-shimmer pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        />
      )}
    </span>
  );
}
