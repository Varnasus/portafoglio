export function TopoBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Mesh gradient light pools */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 40% at 15% 10%, rgba(192, 150, 58, 0.04) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 50% at 85% 85%, rgba(107, 125, 141, 0.03) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 30% at 50% 50%, rgba(192, 150, 58, 0.015) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Topographic contour lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.025 }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Contour paths — loosely inspired by KC terrain */}
        <path
          d="M-50 320 C200 280, 400 350, 600 310 S900 260, 1100 300 S1350 340, 1500 290"
          stroke="hsl(40, 54%, 49%)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M-50 420 C250 380, 450 440, 700 400 S1000 360, 1200 410 S1400 450, 1500 390"
          stroke="hsl(200, 15%, 49%)"
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        <path
          d="M-50 520 C180 490, 380 540, 580 500 S850 470, 1050 520 S1300 550, 1500 500"
          stroke="hsl(40, 54%, 49%)"
          strokeWidth="0.6"
          strokeOpacity="0.25"
        />
        <path
          d="M-50 200 C300 170, 500 230, 750 190 S1050 160, 1250 210 S1420 240, 1500 180"
          stroke="hsl(200, 15%, 49%)"
          strokeWidth="0.7"
          strokeOpacity="0.2"
        />
        <path
          d="M-50 650 C200 620, 420 680, 650 640 S920 610, 1150 660 S1380 690, 1500 640"
          stroke="hsl(40, 54%, 49%)"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        <path
          d="M-50 750 C280 730, 500 770, 720 740 S980 710, 1200 750 S1400 780, 1500 740"
          stroke="hsl(200, 15%, 49%)"
          strokeWidth="0.6"
          strokeOpacity="0.15"
        />

        {/* Intersection markers */}
        <circle cx="600" cy="310" r="2" fill="hsl(40, 54%, 49%)" fillOpacity="0.3" />
        <circle cx="1100" cy="300" r="2" fill="hsl(40, 54%, 49%)" fillOpacity="0.25" />
        <circle cx="700" cy="400" r="1.5" fill="hsl(200, 15%, 49%)" fillOpacity="0.2" />
        <circle cx="580" cy="500" r="2" fill="hsl(40, 54%, 49%)" fillOpacity="0.2" />
        <circle cx="750" cy="190" r="1.5" fill="hsl(200, 15%, 49%)" fillOpacity="0.15" />

        {/* Elevation markers — port number Easter eggs */}
        <text
          x="605"
          y="305"
          fontSize="8"
          fontFamily="monospace"
          fill="hsl(40, 54%, 49%)"
          fillOpacity="0.15"
        >
          EL. 3000
        </text>
        <text
          x="1105"
          y="295"
          fontSize="8"
          fontFamily="monospace"
          fill="hsl(200, 15%, 49%)"
          fillOpacity="0.12"
        >
          EL. 8080
        </text>
        <text
          x="585"
          y="495"
          fontSize="8"
          fontFamily="monospace"
          fill="hsl(40, 54%, 49%)"
          fillOpacity="0.1"
        >
          EL. 443
        </text>
        <text
          x="210"
          y="415"
          fontSize="8"
          fontFamily="monospace"
          fill="hsl(200, 15%, 49%)"
          fillOpacity="0.1"
        >
          EL. 1337
        </text>
        <text
          x="920"
          y="645"
          fontSize="7"
          fontFamily="monospace"
          fill="hsl(40, 54%, 49%)"
          fillOpacity="0.08"
        >
          39.0997°N
        </text>
        <text
          x="920"
          y="655"
          fontSize="7"
          fontFamily="monospace"
          fill="hsl(40, 54%, 49%)"
          fillOpacity="0.08"
        >
          94.5786°W
        </text>
      </svg>
    </div>
  )
}
