import { format } from 'date-fns';
import { Mail, User, Calendar, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MsgData } from '@/types/msg';
import { useState } from 'react';

interface EmailHeaderProps {
  data: MsgData;
}

export function EmailHeader({ data }: EmailHeaderProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {data.subject}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="h-4 w-4 mt-1 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">From</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground break-all">
                  {data.from}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => copyToClipboard(data.from, 'from')}
                >
                  {copiedField === 'from' ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {data.to.length > 0 && (
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">To</p>
                <div className="space-y-1 mt-1">
                  {data.to.map((recipient, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground break-all">
                        {recipient}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => copyToClipboard(recipient, `to-${idx}`)}
                      >
                        {copiedField === `to-${idx}` ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.cc.length > 0 && (
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">CC</p>
                <div className="space-y-1 mt-1">
                  {data.cc.map((recipient, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground break-all">
                        {recipient}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => copyToClipboard(recipient, `cc-${idx}`)}
                      >
                        {copiedField === `cc-${idx}` ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.date && (
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(data.date, 'PPpp')}
                </p>
              </div>
            </div>
          )}
        </div>

        {data.attachments.length > 0 && (
          <>
            <Separator />
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {data.attachments.length}{' '}
                {data.attachments.length === 1 ? 'Attachment' : 'Attachments'}
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
