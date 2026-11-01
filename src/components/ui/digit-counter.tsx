"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/context/language-context";

interface DigitCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function DigitCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 800,
  className = "",
}: DigitCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { locale } = useLanguage();

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = value;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, locale]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toString();

  return (
    <span className={`inline-flex items-baseline tabular-nums font-mono ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span>{formatted}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
