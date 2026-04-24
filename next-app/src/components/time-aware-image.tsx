"use client";

import { useEffect, useState } from "react";

interface TimeAwareImageProps {
  daySrc: string;
  nightSrc: string;
  alt: string;
  className?: string;
}

export function TimeAwareImage({ daySrc, nightSrc, alt, className }: TimeAwareImageProps) {
  const [isDay, setIsDay] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    // Day: 8:00 AM (8) to 7:00 PM (19)
    setIsDay(hour >= 8 && hour < 19);
  }, []);

  // Prevent hydration mismatch by rendering day image initially
  if (!mounted) {
    return (
      <img
        src={daySrc}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <img
      src={isDay ? daySrc : nightSrc}
      alt={alt}
      className={className}
    />
  );
}
