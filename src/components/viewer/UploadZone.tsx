import { useCallback, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function UploadZone({ onFileSelect, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const emailFile = files.find((file) =>
        file.name.endsWith('.msg') || file.name.endsWith('.eml')
      );

      if (emailFile) {
        onFileSelect(emailFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && (file.name.endsWith('.msg') || file.name.endsWith('.eml'))) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return (
    <Card
      className={cn(
        'border-2 border-dashed transition-colors duration-200',
        isDragging && 'border-primary bg-primary/5',
        isLoading && 'opacity-50 pointer-events-none'
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center py-16 px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {isLoading ? (
            <>
              <FileText className="h-16 w-16 text-muted-foreground animate-pulse" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Processing email file...</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we parse the email
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  Drop your email file here
                </h3>
                <p className="text-sm text-muted-foreground">
                  or click to browse your files
                </p>
              </div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Select File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".msg,.eml"
                className="sr-only"
                onChange={handleFileInput}
              />
              <p className="text-xs text-muted-foreground">
                Supports .msg and .eml files
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
