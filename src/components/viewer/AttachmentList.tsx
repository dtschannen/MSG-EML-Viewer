import {
  File,
  FileText,
  Image,
  Music,
  Video,
  Archive,
  Sheet,
  Download,
  Eye,
  Package,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MsgAttachment } from '@/types/msg';
import {
  formatFileSize,
  getFileIcon,
  downloadAttachment,
  downloadAllAttachments,
  canPreview,
} from '@/lib/file-utils';

interface AttachmentListProps {
  attachments: MsgAttachment[];
  onPreview: (attachment: MsgAttachment) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  file: File,
  'file-text': FileText,
  image: Image,
  music: Music,
  video: Video,
  archive: Archive,
  sheet: Sheet,
};

export function AttachmentList({ attachments, onPreview }: AttachmentListProps) {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Attachments ({attachments.length})
          </CardTitle>
          {attachments.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadAllAttachments(attachments)}
              className="gap-2"
            >
              <Download className="h-3 w-3" />
              Download All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {attachments.map((attachment, idx) => {
              const IconComponent = iconMap[getFileIcon(attachment.fileName)];
              const previewable = canPreview(attachment.fileName);

              return (
                <div key={idx}>
                  {idx > 0 && <Separator className="my-2" />}
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {attachment.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {previewable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onPreview(attachment)}
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadAttachment(attachment)}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
