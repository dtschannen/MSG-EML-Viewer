import { FileText, Download, Eye, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MsgAttachment } from '@/types/msg';
import { formatFileSize, downloadAttachment, canPreview } from '@/lib/file-utils';

interface EmailBodyProps {
  bodyHTML: string;
  bodyText: string;
  attachments?: MsgAttachment[];
  onPreviewAttachment?: (attachment: MsgAttachment) => void;
}

export function EmailBody({ bodyHTML, bodyText, attachments = [], onPreviewAttachment }: EmailBodyProps) {
  const hasText = Boolean(bodyText);

  if (!hasText) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No email content available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Email Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        {attachments.length > 0 && (
          <div className="mb-6 pb-4 border-b">
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment, idx) => {
                const isPreviewable = canPreview(attachment.fileName);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-muted/50 hover:bg-muted rounded-md px-3 py-2 border border-border/50 transition-colors"
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {attachment.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {isPreviewable && onPreviewAttachment && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onPreviewAttachment(attachment)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadAttachment(attachment)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <ScrollArea className="h-[500px] rounded-md border p-4">
          <pre className="whitespace-pre-wrap text-sm">{bodyText}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
