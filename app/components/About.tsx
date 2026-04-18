'use client'

import { Highlighter } from '@/components/ui/highlighter'
import { ProfileSocialBadges } from './ProfileSocialBadges'

export default function About() {
  return (
    <div className="space-y-6">
      <p className="text-sm leading-loose">
        <Highlighter
          action="underline"
          color="#60a5fa"
          strokeWidth={2}
          padding={3}
          animationDuration={700}
          isView
        >
          Mechatronics engineer
        </Highlighter>{' '}
        integrating hardware and software to create applications in{' '}
        <Highlighter
          action="highlight"
          color="#c4b5fd"
          iterations={2}
          padding={2}
          animationDuration={600}
          delay={250}
          isView
        >
          machine learning
        </Highlighter>
        ,{' '}
        <Highlighter
          action="highlight"
          color="#7dd3fc"
          iterations={2}
          padding={2}
          animationDuration={600}
          delay={500}
          isView
        >
          robotics
        </Highlighter>
        , and{' '}
        <Highlighter
          action="highlight"
          color="#86efac"
          iterations={2}
          padding={2}
          animationDuration={600}
          delay={750}
          isView
        >
          finance
        </Highlighter>
        . Currently taking companies from{' '}
        <Highlighter
          action="circle"
          color="#f59e0b"
          strokeWidth={2}
          padding={4}
          iterations={2}
          animationDuration={800}
          delay={1100}
          isView
        >
          zero to one
        </Highlighter>
        .
      </p>
      <ProfileSocialBadges />
    </div>
  )
}
