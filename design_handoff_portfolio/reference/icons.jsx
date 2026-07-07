/* icons.jsx — chunky rounded line-icon set, shared to window */
const Icon = ({ name, size = 22, stroke = 2.4, style, className }) => {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round",
    strokeLinejoin: "round", style, className, "aria-hidden": true
  };
  switch (name) {
    case "arrow": return (<svg {...p}><path d="M5 12h13" /><path d="M13 6l6 6-6 6" /></svg>);
    case "arrow-up-right": return (<svg {...p}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>);
    case "bolt": return (<svg {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" /></svg>);
    case "shield": return (<svg {...p}><path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" /><path d="M9.5 12l1.8 1.8L15 10" /></svg>);
    case "target": return (<svg {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>);
    case "gamepad": return (<svg {...p}><path d="M7 9h10a4 4 0 0 1 4 4l-.6 4.2A2.2 2.2 0 0 1 16 18l-1.4-1.6h-5.2L8 18a2.2 2.2 0 0 1-3.8-.8L3 13a4 4 0 0 1 4-4z" /><path d="M8 12v2M7 13h2M15.5 12.5h.01M17.5 14.5h.01" /></svg>);
    case "clock": return (<svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>);
    case "mail": return (<svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="3" /><path d="M4 7.5l8 5 8-5" /></svg>);
    case "pin": return (<svg {...p}><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>);
    case "chat": return (<svg {...p}><path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 16.5H9l-4 3.5v-3.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></svg>);
    case "cube": return (<svg {...p}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>);
    case "layers": return (<svg {...p}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>);
    case "gauge": return (<svg {...p}><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l4-5" /><circle cx="12" cy="18" r="1.4" /></svg>);
    case "spark": return (<svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8.5l1.4 2.1L15.5 12l-2.1 1.4L12 15.5l-1.4-2.1L8.5 12l2.1-1.4L12 8.5z" /></svg>);
    case "check": return (<svg {...p}><path d="M5 12.5l4.5 4.5L19 7" /></svg>);
    case "star": return (<svg {...p} fill="currentColor" stroke="none"><path d="M12 3.2l2.5 5.3 5.8.7-4.3 4 1.1 5.8L12 16.9 6.9 19l1.1-5.8-4.3-4 5.8-.7L12 3.2z" /></svg>);
    case "github": return (<svg {...p}><path d="M9 19c-4 1.2-4-2-5.5-2.5M15 21v-3.5c0-1 .2-1.5-.5-2.2 2.3-.25 4.7-1.1 4.7-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.25-3 1a10.4 10.4 0 0 0-5.4 0c-2.1-1.25-3-1-3-1a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4.3 7.8c0 3.9 2.4 4.75 4.7 5-.7.7-.7 1.4-.5 2.2V21" /></svg>);
    case "x": return (<svg {...p}><path d="M4 4l16 16M20 4L4 20" /></svg>);
    case "play": return (<svg {...p}><path d="M8 5.5l11 6.5-11 6.5v-13z" /></svg>);
    case "upwork": return (<svg {...p}><path d="M3.5 8v4.2a3 3 0 0 0 6 0V8" /><path d="M9.5 12.2c1.6-.3 2.9-2 3.4-4.2.7 1.9 1.7 3.3 3.1 4.1" /><circle cx="17" cy="13" r="3.3" /></svg>);
    case "fiverr": return (<svg {...p}><path d="M15 4h-1.5A4.5 4.5 0 0 0 9 8.5V20" /><path d="M5.5 11H15" /><path d="M15 11v9" /></svg>);
    case "youtube": return (<svg {...p}><rect x="2.5" y="6" width="19" height="12.5" rx="3.5" /><path d="M10 9.5l4.5 2.75L10 15v-5.5z" /></svg>);
    case "users": return (<svg {...p}><circle cx="9" cy="9" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 6.2a3.2 3.2 0 0 1 0 6.1M17 19a5.5 5.5 0 0 0-2.5-4.6" /></svg>);
    case "rocket": return (<svg {...p}><path d="M12 3c3.5 1 6 4.5 6 9l-3 3H9l-3-3c0-4.5 2.5-8 6-9z" /><circle cx="12" cy="9" r="1.6" /><path d="M9 15l-2 4M15 15l2 4" /></svg>);
    default: return null;
  }
};
window.Icon = Icon;
