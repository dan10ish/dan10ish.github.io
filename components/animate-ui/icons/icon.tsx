'use client';

import * as React from 'react';

export type IconProps<T extends string = string> = {
  size?: number;
  animation?: T;
  [key: string]: unknown;
};

export function useAnimateIconContext() {
  return { controls: 'animate' as const };
}

export function getVariants(
  animations: Record<string, Record<string, any>>,
  animation = 'default'
): Record<string, any> {
  return animations[animation] ?? animations['default'] ?? {};
}

export function IconWrapper<P extends IconProps>({
  icon: Icon,
  ...props
}: P & { icon: React.ComponentType<Omit<P, 'icon'>> }) {
  return <Icon {...(props as Omit<P, 'icon'>)} />;
}
