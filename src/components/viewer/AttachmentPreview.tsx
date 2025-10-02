import { useMemo, useState } from 'react';
import { Download, AlertCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MsgAttachment } from '@/types/msg';
import { downloadAttachment, formatFileSize } from '@/lib/file-utils';

interface AttachmentPreviewProps {
  attachment: MsgAttachment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AttachmentPreview({
  attachment,
  isOpen,
  onClose,
}: AttachmentPreviewProps) {
  const [imageError, setImageError] = useState(false);

  const previewContent = useMemo(() => {
    if (!attachment) return null;

    const ext = attachment.fileName.split('.').pop()?.toLowerCase();
    const blob = new Blob([attachment.content], { type: attachment.mimeType });
    const url = URL.createObjectURL(blob);

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext || '')) {
      return (
        <div className="flex items-center justify-center min-h-[400px] bg-muted/20 rounded-lg">
          {imageError ? (
            <div className="text-center space-y-2">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">
                Failed to load image
              </p>
            </div>
          ) : (
            <img
              src={url}
              alt={attachment.fileName}
              className="max-w-full max-h-[70vh] object-contain"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      );
    }

    if (ext === 'pdf') {
      return (
        <iframe
          src={url}
          className="w-full h-[70vh] rounded-lg border"
          title={attachment.fileName}
        />
      );
    }

    if (
      ['txt', 'json', 'xml', 'html', 'css', 'js', 'ts', 'md'].includes(
        ext || ''
      )
    ) {
      const reader = new FileReader();
      reader.readAsText(blob);

      return (
        <ScrollArea className="h-[70vh] rounded-lg border">
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
            {new TextDecoder().decode(attachment.content)}
          </pre>
        </ScrollArea>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">Preview not available</p>
          <p className="text-xs text-muted-foreground">
            This file type cannot be previewed in the browser
          </p>
        </div>
        <Button
          onClick={() => attachment && downloadAttachment(attachment)}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download File
        </Button>
      </div>
    );
  }, [attachment, imageError]);

  if (!attachment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="truncate">
                {attachment.fileName}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {formatFileSize(attachment.size)}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => downloadAttachment(attachment)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4">{previewContent}</div>
      </DialogContent>
    </Dialog>
  );
}
