// The three file-access options as simple window sketches (ported from the
// iterations page they first lived on): the part each option adds is drawn in
// AskSia's blue with a dashed outline, and each sketch fades into the panel.

const BLUE = "#4E4DF4";
const SOFT = "rgba(78, 77, 244, 0.07)";
const PANEL = "#F5F6F7";
const LINE = "#E4E4EA";
const BAR = "#ECECF1";

const Window = ({ id, children, label }: { id: string; children: React.ReactNode; label: string }) => (
  <svg viewBox="0 0 320 190" className="w-full max-w-[420px] h-auto block" role="img" aria-label={label}>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="55%" stopColor={PANEL} stopOpacity="0" />
        <stop offset="100%" stopColor={PANEL} />
      </linearGradient>
    </defs>
    <rect x="10" y="6" width="300" height="190" rx="10" fill="#fff" stroke={LINE} />
    <circle cx="24" cy="20" r="3" fill="#ff5f57" />
    <circle cx="34" cy="20" r="3" fill="#febc2e" />
    <circle cx="44" cy="20" r="3" fill="#28c840" />
    <line x1="62" y1="6" x2="62" y2="196" stroke={LINE} />
    {children}
    <rect x="0" y="6" width="320" height="190" fill={`url(#${id})`} />
  </svg>
);

// the document's lines of text, starting at a given height
const Lines = ({ y }: { y: number }) => (
  <>
    {[200, 210, 190, 205, 150].map((w, i) => (
      <rect key={i} x="82" y={y + i * 16} width={w} height="6" rx="3" fill={BAR} />
    ))}
  </>
);

const dashed = { fill: SOFT, stroke: BLUE, strokeWidth: 1.3, strokeDasharray: "4 3" };

export const DropdownSketch = () => (
  <Window id="sketch-dropdown" label="Sketch: a file button at the top left opens a short dropdown list over the document">
    <Lines y={66} />
    <rect x="72" y="28" width="70" height="18" rx="9" {...dashed} />
    <rect x="72" y="52" width="92" height="76" rx="6" fill="#fff" />
    <rect x="72" y="52" width="92" height="76" rx="6" {...dashed} />
  </Window>
);

export const DrawerSketch = () => (
  <Window id="sketch-drawer" label="Sketch: a file panel slides in from the left and covers part of the document">
    <Lines y={40} />
    <rect x="70" y="30" width="96" height="150" rx="6" fill="#fff" />
    <rect x="70" y="30" width="96" height="150" rx="6" {...dashed} />
  </Window>
);

export const TabsSketch = () => (
  <Window id="sketch-tabs" label="Sketch: a row of tabs along the top, with the last tabs squeezed narrow">
    <g {...dashed}>
      <rect x="72" y="30" width="58" height="18" rx="4" />
      <rect x="134" y="30" width="58" height="18" rx="4" />
      <rect x="196" y="30" width="46" height="18" rx="4" />
      <rect x="246" y="30" width="30" height="18" rx="4" />
      <rect x="280" y="30" width="20" height="18" rx="4" />
    </g>
    <Lines y={66} />
  </Window>
);
