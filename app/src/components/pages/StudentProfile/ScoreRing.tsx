interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
  children?: React.ReactNode;
}

const ScoreRing = ({
  score,
  size = 64,
  strokeWidth = 4,
  className = '',
  showText = true,
  children,
}: ScoreRingProps) => {
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#3B82F6' : '#EF4444';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Circular ring with children inside */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="absolute top-0 left-0 transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        {/* Render avatar or any children inside the ring */}
        <div className="relative z-10 flex items-center justify-center">{children}</div>
      </div>

      {/* Score text under the ring */}
      {showText && <span className="mt-2 text-sm font-bold text-gray-900">{score}%</span>}
    </div>
  );
};

export default ScoreRing;
