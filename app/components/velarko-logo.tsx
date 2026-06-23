export default function VelarkoLogo({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 350 350"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 8, display: "block" }}
    >
      <defs>
        <radialGradient id="vk-bgGrad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#ffd215" />
          <stop offset="100%" stopColor="#fff172" />
        </radialGradient>

        <filter id="vk-blur28" x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="linearRGB">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id="vk-blur42" x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="linearRGB">
          <feGaussianBlur stdDeviation="42" />
        </filter>
        <filter id="vk-blur49" x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="linearRGB">
          <feGaussianBlur stdDeviation="49" />
        </filter>
        <filter id="vk-blur56" x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="linearRGB">
          <feGaussianBlur stdDeviation="56" />
        </filter>

        {/* Mask composites final pixel output → crisp logo edges even with blurred children */}
        <mask id="vk-mask" maskUnits="userSpaceOnUse">
          <rect width="350" height="350" fill="black" />
          <path fill="white" d="M28.4607 119.836L28.4607 81.3358L28.4607 46.1848C28.4607 41.3672 29.7049 36.6313 32.0727 32.4357C41.664 15.4411 65.2698 13.2412 77.8362 28.1708L157.623 122.962C162.175 128.37 164.671 135.212 164.671 142.281L164.671 206.964C164.671 225.656 147.763 239.797 129.365 236.491L109.524 232.925C105.523 232.207 101.711 230.682 98.3176 228.445L35.9607 187.336C31.2751 184.212 28.4607 178.953 28.4607 173.322L28.4607 172.836L28.4607 153.336V119.836Z" />
          <path fill="white" d="M70.9043 288.588C59.1886 276.872 59.1886 257.877 70.9043 246.162L92.3358 224.73L93.3547 223.681C99.0036 217.867 106.765 214.586 114.872 214.586L123.191 214.586L132.739 214.586C137.711 214.586 142.05 211.213 143.278 206.395C146.436 193.995 164.691 196.284 164.691 209.08L164.691 229.586L164.691 267.375L164.691 301.874C164.691 308.187 162.699 314.339 158.999 319.455L155.61 324.141C144.788 339.104 123.146 340.83 110.089 327.773L70.9043 288.588Z" />
          <path fill="white" d="M321.539 119.836L321.539 81.3358L321.539 46.1848C321.539 41.3672 320.295 36.6313 317.927 32.4357C308.336 15.4411 284.73 13.2412 272.164 28.1708L192.377 122.962C187.825 128.37 185.329 135.212 185.329 142.281L185.329 206.964C185.329 225.656 202.237 239.797 220.635 236.491L240.476 232.925C244.477 232.207 248.289 230.682 251.682 228.445L314.039 187.336C318.725 184.212 321.539 178.953 321.539 173.322L321.539 172.836L321.539 153.336V119.836Z" />
          <path fill="white" d="M279.096 288.588C290.811 276.872 290.811 257.877 279.096 246.162L257.664 224.73L256.645 223.681C250.996 217.867 243.235 214.586 235.128 214.586L226.809 214.586L217.261 214.586C212.289 214.586 207.95 211.213 206.722 206.395C203.564 193.995 185.309 196.284 185.309 209.08L185.309 229.586L185.309 267.375L185.309 301.874C185.309 308.187 187.301 314.339 191.001 319.455L194.39 324.141C205.212 339.104 226.854 340.83 239.911 327.773L279.096 288.588Z" />
        </mask>

        <style>{`
          @keyframes vk-blob1  { 0%,100% { transform: translate(0px,-127px)   scale(1);    } 33% { transform: translate(20px,-107px)  scale(1.15); } 66% { transform: translate(-15px,-140px) scale(0.9);  } }
          @keyframes vk-blob2  { 0%,100% { transform: translate(236px,25px)   scale(1);    } 33% { transform: translate(220px,40px)   scale(1.2);  } 66% { transform: translate(250px,10px)   scale(0.85); } }
          @keyframes vk-blob3  { 0%,100% { transform: translate(-31px,-38px)  scale(1);    } 50% { transform: translate(-10px,-55px)  scale(1.25); } }
          @keyframes vk-blob4  { 0%,100% { transform: translate(205px,-38px)  scale(1);    } 50% { transform: translate(220px,-20px)  scale(1.2);  } }
          @keyframes vk-blob5  { 0%,100% { transform: translate(31px,-13px)   scale(1);    } 40% { transform: translate(50px,5px)     scale(1.3);  } 80% { transform: translate(15px,-25px) scale(0.85); } }
          @keyframes vk-blob6  { 0%,100% { transform: translate(144px,51px)   scale(1);    } 40% { transform: translate(160px,35px)   scale(1.2);  } 80% { transform: translate(130px,65px)  scale(0.9);  } }
          @keyframes vk-blob7  { 0%,100% { transform: translate(21px,89px)    scale(1);    } 50% { transform: translate(40px,70px)    scale(1.15); } }
          @keyframes vk-blob8  { 0%,100% { transform: translate(72px,-13px)   scale(1);    } 50% { transform: translate(55px,5px)     scale(1.2);  } }
          @keyframes vk-blob9  { 0%,100% { transform: translate(51px,-38px)   scale(1);    } 33% { transform: translate(68px,-20px)   scale(1.1);  } 66% { transform: translate(38px,-50px)  scale(0.9);  } }
          @keyframes vk-blob10 { 0%,100% { transform: translate(164px,51px)   scale(1);    } 33% { transform: translate(148px,68px)   scale(1.15); } 66% { transform: translate(178px,38px)   scale(0.9);  } }
          @keyframes vk-blob11 { 0%,100% { transform: translate(10px,13px)    scale(1);    } 50% { transform: translate(28px,-5px)    scale(1.2);  } }
          @keyframes vk-blob12 { 0%,100% { transform: translate(134px,13px)   scale(1);    } 50% { transform: translate(118px,30px)   scale(1.15); } }
          .vk-b1  { animation: vk-blob1   6s   ease-in-out infinite; }
          .vk-b2  { animation: vk-blob2   7s   ease-in-out infinite; }
          .vk-b3  { animation: vk-blob3   5s   ease-in-out infinite; }
          .vk-b4  { animation: vk-blob4   8s   ease-in-out infinite; }
          .vk-b5  { animation: vk-blob5   6.5s ease-in-out infinite; }
          .vk-b6  { animation: vk-blob6   7.5s ease-in-out infinite; }
          .vk-b7  { animation: vk-blob7   5.5s ease-in-out infinite; }
          .vk-b8  { animation: vk-blob8   9s   ease-in-out infinite; }
          .vk-b9  { animation: vk-blob9   6s   ease-in-out infinite 1s; }
          .vk-b10 { animation: vk-blob10  7s   ease-in-out infinite 0.5s; }
          .vk-b11 { animation: vk-blob11  5s   ease-in-out infinite 1.5s; }
          .vk-b12 { animation: vk-blob12  8s   ease-in-out infinite 0.8s; }
        `}</style>
      </defs>

      <g mask="url(#vk-mask)">
        <rect width="100%" height="100%" fill="url(#vk-bgGrad)" />
        <circle className="vk-b1"  cx="70" cy="70" r="70" fill="rgba(255,232,26,0.7)" filter="url(#vk-blur28)" />
        <circle className="vk-b2"  cx="70" cy="70" r="70" fill="rgba(255,163,26,0.7)" filter="url(#vk-blur42)" />
        <circle className="vk-b3"  cx="70" cy="70" r="70" fill="#1a23ff"               filter="url(#vk-blur49)" />
        <circle className="vk-b4"  cx="70" cy="70" r="70" fill="#1a23ff"               filter="url(#vk-blur49)" />
        <circle className="vk-b5"  cx="70" cy="70" r="70" fill="#e21bda"               filter="url(#vk-blur56)" />
        <circle className="vk-b6"  cx="70" cy="70" r="70" fill="#e21bda"               filter="url(#vk-blur56)" />
        <circle className="vk-b7"  cx="70" cy="70" r="70" fill="rgba(255,163,26,0.7)" filter="url(#vk-blur42)" />
        <circle className="vk-b8"  cx="70" cy="70" r="70" fill="rgba(255,163,26,0.7)" filter="url(#vk-blur42)" />
        <circle className="vk-b9"  cx="70" cy="70" r="70" fill="rgba(255,232,26,0.7)" filter="url(#vk-blur28)" />
        <circle className="vk-b10" cx="70" cy="70" r="70" fill="rgba(255,232,26,0.7)" filter="url(#vk-blur28)" />
        <circle className="vk-b11" cx="70" cy="70" r="70" fill="rgba(255,163,26,0.7)" filter="url(#vk-blur42)" />
        <circle className="vk-b12" cx="70" cy="70" r="70" fill="rgba(255,163,26,0.7)" filter="url(#vk-blur49)" />
      </g>
    </svg>
  );
}
