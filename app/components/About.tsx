'use client'

import { personalInfo } from '../data'

export default function About() {
  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed">
        {personalInfo.about} Currently taking companies from zero to one.
      </p>
    </div>
  )
}
