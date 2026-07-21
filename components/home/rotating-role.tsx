"use client";

import { useEffect, useState } from "react";

const ROTATING_WORDS = ["intelligent infra", "backend systems", "developer tools"];

/** Cycles through the words after "Building" every 2s with a cross-fade. */
export function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((current) => (current + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {ROTATING_WORDS[index]}
    </span>
  );
}
