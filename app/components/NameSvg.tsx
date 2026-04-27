'use client';

import { motion } from 'motion/react';

export default function NameSvg() {
  return (
    <motion.svg
      width="95"
      height="45"
      viewBox="0 0 111 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible -mx-[5px] text-foreground"
      style={{ transformOrigin: 'center' }}
      aria-label="Danish"
    >
      <motion.path
        d="M23.6658 19.5568C24.184 18.3907 23.7076 16.8809 23.6658 18.6784C23.6143 20.8899 23.9127 23.2085 23.6383 25.4035C23.4632 26.8046 21.1091 20.9763 20.8934 20.545C19.4973 17.7527 11.743 11.8525 15.7604 9.07119C23.2034 3.91831 35.9047 3.41693 44.3624 5.5577C47.3218 6.30674 51.4936 7.83684 53.0364 10.773C55.0268 14.5612 50.8297 18.4111 48.0955 20.243C36.8401 27.7842 22.558 31.2353 10.0784 36.1635C7.07567 37.3493 4.1614 38.5262 1.02019 39.2653C0.82501 39.3112 2.1014 39.3202 2.4201 39.3202"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M64.4263 16.6339C63.5779 13.1557 60.7209 13.3335 58.7303 16.281C56.2311 19.9818 60.731 23.8048 63.4433 20.4144C64.3358 19.2988 64.2834 14.046 64.4515 16.7347C64.6565 20.0151 67.8321 24.0413 70.6767 20.1623C71.5016 19.0374 71.7571 14.7004 71.332 16.029C71.1337 16.6487 71.8339 20.2254 71.9369 20.1371C73.0086 19.2185 74.565 13.0333 77.0783 14.29C78.3705 14.936 79.0368 19.2757 79.3971 20.7168"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.path
        d="M82.5726 14.8192C82.5726 13.3223 82.7558 15.8654 82.8247 16.1801C83.1276 17.5649 83.4193 18.9774 83.9336 20.2631"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.2 }}
      />
      <motion.path
        d="M84.3873 7.56058C83.5393 6.71263 83.0281 6.05144 83.9336 7.56058"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.4 }}
      />
      <motion.path
        d="M91.9923 13.1211C91.9923 11.922 91.0266 11.6815 90.0769 12.4154C87.059 14.7474 88.1454 16.693 91.2614 18.061C93.68 19.1228 94.9167 19.8991 91.7655 21.2618C88.1505 22.825 87.0855 22.3312 88.8001 20.6166"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 1.8 }}
      />
      <motion.path
        d="M98.1349 1C97.0711 4.44473 96.6171 9.76923 97.38 13.2566C97.5036 13.8217 98.3063 21.7286 99.6349 21C100.481 20.5359 106.046 10.6826 106.68 14.0631C107.137 16.5018 106.893 20.357 109.427 21.6241"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 2.2 }}
      />
    </motion.svg>
  );
}
