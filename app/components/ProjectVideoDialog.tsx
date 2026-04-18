'use client';

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
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
import { Spinner } from '@/components/ui/spinner';
import { GithubIcon } from './BrandIcons';

const DESCRIPTION =
  'Screen recording preview. Use the links below to open the repo or live demo.';

/** Slightly longer than `DialogPopup` `duration-200` so enter animation can run before video decode/layout. */
const DIALOG_ENTER_MS = 220;

interface ProjectVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc: string | null;
  projectName: string;
  sourceCode?: string;
  liveDemo?: string;
}

export default function ProjectVideoDialog({
  open,
  onOpenChange,
  videoSrc,
  projectName,
  sourceCode,
  liveDemo,
}: ProjectVideoDialogProps) {
  const [deferVideo, setDeferVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!open) {
      setDeferVideo(false);
      return;
    }
    const id = window.setTimeout(() => setDeferVideo(true), DIALOG_ENTER_MS);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (open && videoSrc) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [open, videoSrc]);

  const title = projectName || 'Project';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            {!videoSrc ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                No video available
              </div>
            ) : hasError ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                Video failed to load
              </div>
            ) : (
              <>
                {(!deferVideo || isLoading) && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted text-muted-foreground">
                    <Spinner className="size-8" />
                  </div>
                )}
                {deferVideo && (
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
                )}
              </>
            )}
          </div>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button size="sm" variant="ghost" />}>
            Close
          </DialogClose>
          {sourceCode && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(sourceCode, '_blank', 'noopener,noreferrer')
              }
            >
              <GithubIcon size={12} />
              Source
            </Button>
          )}
          {liveDemo && (
            <Button
              size="sm"
              onClick={() =>
                window.open(liveDemo, '_blank', 'noopener,noreferrer')
              }
            >
              <Globe size={12} />
              Live
            </Button>
          )}
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
