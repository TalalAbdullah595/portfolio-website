"use client";

import { useEffect, useState } from "react";
import { Box } from "@/components/Scene";
import Icon from "@/components/Icon";

/* Full-screen fake-compile loader shown while the home page settles in */
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    let p = 0;
    let doneTimer = 0;
    const id = window.setInterval(() => {
      p += Math.random() * 16 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        doneTimer = window.setTimeout(() => {
          setDone(true);
          document.body.classList.remove("no-scroll");
        }, 480);
      }
      setPct(Math.round(p));
    }, 130);
    return () => {
      clearInterval(id);
      clearTimeout(doneTimer);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={"loader" + (done ? " done" : "")}>
      <div className="loader-inner">
        <div className="loader-cube">
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <Box w={58} h={58} d={58} c="var(--primary)" fr={13} glyph={<Icon name="cube" size={26} />} glyphKind="ic" />
          </div>
        </div>
        <div className="loader-bar"><i style={{ width: pct + "%" }}></i></div>
        <div className="loader-label">Compiling systems… <b>{pct}%</b></div>
      </div>
    </div>
  );
}
