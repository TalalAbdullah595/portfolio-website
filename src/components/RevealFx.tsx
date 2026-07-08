"use client";

import { useEffect } from "react";
import { startReveals } from "@/lib/reveal";

/* Drop once per page to arm the scroll-reveal animations for its .reveal elements */
export default function RevealFx() {
  useEffect(() => startReveals(), []);
  return null;
}
