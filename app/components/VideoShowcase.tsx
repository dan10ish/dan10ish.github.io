'use client';

import { useEffect, useState } from 'react';
import { Loader2, Globe } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
} from '@/components/ui/drawer';

interface VideoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string | null;
  projectName: string;
  sourceCode?: string;
  liveDemo?: string;
}

export default function VideoShowcase({
  isOpen,
  onClose,
  videoSrc,
  projectName,
  sourceCode,
  liveDemo,
}: VideoShowcaseProps) {
  const isMobile = useMediaQuery('max-md');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(!!videoSrc);
      setHasError(false);
    }
  }, [isOpen, videoSrc]);

  const title = projectName || 'Project';
  const description = 'Project preview';

  const videoBlock = (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
      {!videoSrc ? (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          No video available
        </div>
      ) : hasError ? (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Video failed to load
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Loader2 className="size-6 animate-spin" />
            </div>
          )}
          <video
            key={videoSrc}
            src={videoSrc}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            onContextMenu={(e) => e.preventDefault()}
            style={{ visibility: isLoading ? 'hidden' : 'visible' }}
          />
        </>
      )}
    </div>
  );

  const actions = (
    <>
      {sourceCode && (
        <Button
          variant="outline"
          onClick={() =>
            window.open(sourceCode, '_blank', 'noopener,noreferrer')
          }
        >
          <GithubIcon size={14} />
          Source
        </Button>
      )}
      {liveDemo && (
        <Button
          onClick={() =>
            window.open(liveDemo, '_blank', 'noopener,noreferrer')
          }
        >
          <Globe size={14} />
          Live
        </Button>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer onOpenChange={(open) => !open && onClose()} open={isOpen}>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerPanel className="grid gap-4" scrollable={false}>
            {videoBlock}
          </DrawerPanel>
          <DrawerFooter>
            <DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
            {actions}
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    );
  }

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-4">{videoBlock}</DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
          {actions}
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
