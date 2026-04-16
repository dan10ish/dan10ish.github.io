'use client';

import { useEffect, useState } from 'react';
import { Loader2, Globe } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
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
import { Button } from '@/components/ui/button';

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(!!videoSrc);
      setHasError(false);
    }
  }, [isOpen, videoSrc]);

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{projectName}</DialogTitle>
        </DialogHeader>
        <DialogPanel>
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
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
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
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
