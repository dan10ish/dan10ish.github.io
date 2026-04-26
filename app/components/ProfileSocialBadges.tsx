'use client';

import Link from 'next/link';
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  SnapchatIcon,
  ThreadsIcon,
  XIcon,
} from './BrandIcons';
import { personalInfo } from '../data';

const badgeClass =
  'group inline-flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition-colors bg-background text-foreground hover:bg-accent';

const iconClass =
  'shrink-0 text-muted-foreground transition-colors group-hover:text-foreground';

export function ProfileSocialBadges() {
  const { x, linkedin, instagram, threads, snapchat } = personalInfo.socials;

  const items = [
    {
      key: 'x',
      href: `https://x.com/${x}`,
      label: `X profile of ${x}`,
      icon: <XIcon size={20} className={iconClass} />,
      handle: x,
    },
    {
      key: 'linkedin',
      href: `https://www.linkedin.com/in/${linkedin}`,
      label: `LinkedIn profile of ${linkedin}`,
      icon: <LinkedinIcon size={20} className={iconClass} />,
      handle: linkedin,
    },
    {
      key: 'instagram',
      href: `https://instagram.com/${instagram}`,
      label: `Instagram profile of ${instagram}`,
      icon: <InstagramIcon size={20} className={iconClass} />,
      handle: instagram,
    },
    {
      key: 'threads',
      href: `https://www.threads.net/@${threads}`,
      label: `Threads profile of ${threads}`,
      icon: <ThreadsIcon size={20} className={iconClass} />,
      handle: threads,
    },
    {
      key: 'snapchat',
      href: `https://www.snapchat.com/add/${snapchat}`,
      label: `Snapchat profile of ${snapchat}`,
      icon: <SnapchatIcon size={20} className={iconClass} />,
      handle: snapchat,
    },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ key, href, label, icon, handle }) => (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={badgeClass}
          aria-label={label}
        >
          {icon}
          <span>{handle}</span>
        </Link>
      ))}
    </div>
  );
}

export function GitHubProfileBadge() {
  const github = personalInfo.socials.github;
  return (
    <Link
      href={`https://github.com/${github}`}
      target="_blank"
      rel="noopener noreferrer"
      className={badgeClass}
      aria-label={`GitHub profile of ${github}`}
    >
      <GithubIcon size={20} className={iconClass} />
      <span>{github}</span>
    </Link>
  );
}
