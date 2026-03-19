'use client';

import * as React from 'react';

export type IconProps<T extends string = string> = {
  size?: number;
  animation?: T;
  [key: string]: unknown;
};

// Always animates — controls is just the string "animate"
export function useAnimateIconContext() {
  return { controls: 'animate' as const };
}

// Pulls out the right animation variant set (default if none specified)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getVariants(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animations: Record<string, Record<string, any>>,
  animation = 'default'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  return animations[animation] ?? animations['default'] ?? {};
}

// Thin wrapper that just renders the icon directly
export function IconWrapper<P extends IconProps>({
  icon: Icon,
  ...props
}: P & { icon: React.ComponentType<Omit<P, 'icon'>> }) {
  return <Icon {...(props as Omit<P, 'icon'>)} />;
}
