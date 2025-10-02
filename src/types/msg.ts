export interface MsgAttachment {
  fileName: string;
  content: ArrayBuffer;
  mimeType: string;
  size: number;
}

export interface MsgData {
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  date: Date | null;
  bodyHTML: string;
  bodyText: string;
  attachments: MsgAttachment[];
  headers: Record<string, string>;
}

export interface ParsedMsg {
  data: MsgData;
  fileName: string;
}
