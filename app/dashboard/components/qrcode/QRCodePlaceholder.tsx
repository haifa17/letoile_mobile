"use client";

export function QRCodePlaceholder() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative QR pattern background */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full opacity-20"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="200" height="200" fill="white" />
        {/* Position markers */}
        {[
          { x: 10, y: 10 },
          { x: 140, y: 10 },
          { x: 10, y: 140 },
        ].map(({ x, y }, i) => (
          <g key={i}>
            <rect x={x} y={y} width="50" height="50" fill="currentColor" />
            <rect x={x + 5} y={y + 5} width="40" height="40" fill="white" />
            <rect
              x={x + 12}
              y={y + 12}
              width="26"
              height="26"
              fill="currentColor"
            />
          </g>
        ))}
      </svg>

      {/* Loading spinner overlay */}
      {/* <LoadingSpinner /> */}
    </div>
  );
}
