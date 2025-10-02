import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MsgAttachment } from '@/types/msg';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function getFileIcon(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'file-text';
    case 'doc':
    case 'docx':
      return 'file-text';
    case 'xls':
    case 'xlsx':
      return 'sheet';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
      return 'image';
    case 'zip':
    case 'rar':
    case '7z':
      return 'archive';
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'music';
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'video';
    default:
      return 'file';
  }
}

export function downloadAttachment(attachment: MsgAttachment): void {
  const blob = new Blob([attachment.content], { type: attachment.mimeType });
  saveAs(blob, attachment.fileName);
}

export async function downloadAllAttachments(
  attachments: MsgAttachment[]
): Promise<void> {
  if (attachments.length === 0) return;

  if (attachments.length === 1) {
    downloadAttachment(attachments[0]);
    return;
  }

  const zip = new JSZip();
  attachments.forEach((att) => {
    zip.file(att.fileName, att.content);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'attachments.zip');
}

export function canPreview(fileName: string): boolean {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const previewableTypes = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'pdf',
    'txt',
    'json',
    'xml',
    'html',
    'css',
    'js',
    'ts',
    'md',
  ];
  return ext ? previewableTypes.includes(ext) : false;
}
