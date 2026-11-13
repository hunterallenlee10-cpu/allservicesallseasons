import { business } from "@/lib/business";

// A simple outlined sketch of the towns around Lancaster. Not a map embed:
// he has no storefront. Positions are approximate and it says so.
// x and y are rough miles east and south of Lancaster.
const PLACES: Record<string, { x: number; y: number; anchor?: "start" | "end" | "middle"; dx?: number; dy?: number }> = {
  Lancaster: { x: 0, y: 0, anchor: "start", dx: 12, dy: 5 },
  Lititz: { x: 0, y: -8, anchor: "middle", dy: -11 },
  "Mount Joy": { x: -12, y: -5, anchor: "middle", dy: -11 },
  Columbia: { x: -11, y: 1.6, anchor: "end", dx: -9, dy: 5 },
  Manheim: { x: -4.5, y: -10, anchor: "middle", dy: -11 },
  Mountville: { x: -6.5, y: 0.6, anchor: "middle", dy: 20 },
  Landisville: { x: -6.5, y: -3.2, anchor: "middle", dy: -11 },
  "East Petersburg": { x: -1.6, y: -4.2, anchor: "start", dx: 9, dy: 4 },
  Millersville: { x: -3.6, y: 3.6, anchor: "end", dx: -9, dy: 5 },
  "Willow Street": { x: 0.6, y: 5.6, anchor: "middle", dy: 21 },
  Strasburg: { x: 7, y: 5, anchor: "middle", dy: -11 },
  Ephrata: { x: 5.5, y: -12, anchor: "middle", dy: -11 },
  Marietta: { x: -14.5, y: -1.4, anchor: "middle", dy: -11 },
  Quarryville: { x: 3.6, y: 13, anchor: "middle", dy: 20 },
};

const SCALE = 14;
const ORIGIN = { x: 268, y: 214 };

export function ServiceAreaSketch({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 440 440"
        role="img"
        aria-label={`Sketch of the service area around Lancaster, PA: ${business.towns.join(", ")}.`}
        className="h-auto w-full"
      >
        {/* Rings at roughly 5, 10 and 15 miles */}
        {[5, 10, 15].map((miles) => (
          <circle
            key={miles}
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r={miles * SCALE}
            fill="none"
            className="stroke-muted/40"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        ))}
        {business.towns.map((town) => {
          const p = PLACES[town];
          if (!p) return null;
          const cx = ORIGIN.x + p.x * SCALE;
          const cy = ORIGIN.y + p.y * SCALE;
          const home = town === "Lancaster";
          return (
            <g key={town}>
              {home ? (
                <rect x={cx - 7} y={cy - 7} width="14" height="14" rx="3" className="fill-lime" />
              ) : (
                <rect
                  x={cx - 4.5}
                  y={cy - 4.5}
                  width="9"
                  height="9"
                  rx="2"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="1.5"
                />
              )}
              <text
                x={cx + (p.dx ?? 0)}
                y={cy + (p.dy ?? 0)}
                textAnchor={p.anchor ?? "start"}
                className={home ? "fill-paper" : "fill-muted"}
                style={{ fontSize: home ? 16 : 13.5, fontWeight: home ? 600 : 500 }}
              >
                {town}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="label-caps mt-2 text-muted">Rough sketch, not to scale</figcaption>
    </figure>
  );
}
