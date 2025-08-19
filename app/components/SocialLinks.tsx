'use client';

import { Github, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const XIcon = memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 256 256"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
  </svg>
));

XIcon.displayName = 'XIcon';

const LinkedInIcon = memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 30 30"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"/>
  </svg>
));

LinkedInIcon.displayName = 'LinkedInIcon';

interface SocialLinksProps {
  github?: string;
  email?: string;
  x?: string;
  instagram?: string;
  linkedin?: string;
}

export default function SocialLinks({ github, email, x, instagram, linkedin }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-2 !-mt-1">
      {github && (
        <Link href={`https://github.com/${github}`} target="_blank" className="flex items-center justify-center" aria-label={`GitHub profile of ${github}`}>
          <Github size={20} />
        </Link>
      )}
      {email && (
        <Link href={`mailto:${email}`} className="flex items-center justify-center" aria-label={`Send email to ${email}`}>
          <Mail size={20} />
        </Link>
      )}
      {linkedin && (
        <Link href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" className="flex items-center justify-center" aria-label={`LinkedIn profile of ${linkedin}`}>
          <LinkedInIcon />
        </Link>
      )}
      {x && (
        <Link href={`https://x.com/${x}`} target="_blank" className="flex items-center justify-center" aria-label={`X (Twitter) profile of ${x}`}>
          <XIcon />
        </Link>
      )}
      {instagram && (
        <Link href={`https://instagram.com/${instagram}`} target="_blank" className="flex items-center justify-center" aria-label={`Instagram profile of ${instagram}`}>
          <Instagram size={20} />
        </Link>
      )}
    </div>
  );
} 