'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import data from '../data.json'

export default function Home() {

  return (
    <div className="!flex !flex-col !justify-between !overflow-hidden">
      <div className="!flex-1 !overflow-auto">
        <div className="!mb-8">
          <p className="!mb-1">{data.personal.name}</p>
          <p>
            {data.personal.title.map((item, index) => (
              <span key={index}>
                {item} {index < data.personal.title.length - 1 ? '• ' : ''}
              </span>
            ))}
          </p>
        </div>

        <div className="!mb-8">
          {data.social.map((social, index) => (
            <div key={index} className="!mb-1">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:!opacity-70 !transition-opacity !inline-flex !items-center"
              >
                {social.name}
                <ArrowUpRight 
                  size={16} 
                  className="social-link-icon"
                />
              </a>
            </div>
          ))}
        </div>

        <div className="!mb-8">
          <Link
            href="/finds"
            className="text-sm! hover:!opacity-70 !transition-opacity !inline-flex !items-center !bg-[#00000025] ring-1 ring-[#ffffff20] !rounded-lg !px-2 !py-1 !ml-0.5"
          >
            FINDS
          </Link>
        </div>
      </div>
    </div>
  );
}