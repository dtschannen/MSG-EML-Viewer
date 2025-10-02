import { useState, useCallback } from 'react';
import MsgReader from '@kenjiuno/msgreader';
import { MsgData, ParsedMsg, MsgAttachment } from '@/types/msg';
import PostalMime from 'postal-mime';

interface UseMsgParserReturn {
  parsedMsg: ParsedMsg | null;
  isLoading: boolean;
  error: string | null;
  parseFile: (file: File) => Promise<void>;
  clearMsg: () => void;
}

export function useMsgParser(): UseMsgParserReturn {
  const [parsedMsg, setParsedMsg] = useState<ParsedMsg | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractEmail = useCallback((recipient: any): string => {
    if (!recipient) return '';

    if (recipient.email && recipient.email.includes('@')) {
      return recipient.email;
    }

    if (recipient.smtpAddress && recipient.smtpAddress.includes('@')) {
      return recipient.smtpAddress;
    }

    const name = recipient.name || '';
    const emailMatch = name.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) {
      return emailMatch[1];
    }

    return recipient.name || recipient.email || '';
  }, []);

  const parseFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const isEml = file.name.toLowerCase().endsWith('.eml');

      if (isEml) {
        await parseEmlFile(file);
      } else {
        await parseMsgFile(file);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to parse email file';
      setError(errorMessage);
      console.error('Email parsing error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [extractEmail]);

  const parseEmlFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const parser = new PostalMime();
    const result = await parser.parse(uint8Array);

    const attachments: MsgAttachment[] = [];
    if (result.attachments && result.attachments.length > 0) {
      for (const att of result.attachments) {
        if (att.content) {
          const content = att.content instanceof ArrayBuffer
            ? att.content
            : (att.content.buffer || att.content);

          attachments.push({
            fileName: att.filename || 'unnamed',
            content: content,
            mimeType: att.mimeType || 'application/octet-stream',
            size: content.byteLength,
          });
        }
      }
    }

    const fromAddress = result.from?.address || '';
    const fromName = result.from?.name || '';
    const fromDisplay = fromName && fromAddress
      ? `${fromName} <${fromAddress}>`
      : fromAddress || fromName || 'Unknown Sender';

    const toRecipients = result.to?.map((r) =>
      r.name && r.address ? `${r.name} <${r.address}>` : r.address || r.name
    ) || [];

    const ccRecipients = result.cc?.map((r) =>
      r.name && r.address ? `${r.name} <${r.address}>` : r.address || r.name
    ) || [];

    const bccRecipients = result.bcc?.map((r) =>
      r.name && r.address ? `${r.name} <${r.address}>` : r.address || r.name
    ) || [];

    const msgData: MsgData = {
      from: fromDisplay,
      to: toRecipients,
      cc: ccRecipients,
      bcc: bccRecipients,
      subject: result.subject || '(No Subject)',
      date: result.date ? new Date(result.date) : null,
      bodyHTML: result.html || result.text || '',
      bodyText: result.text || '',
      attachments,
      headers: result.headers || {},
    };

    setParsedMsg({
      data: msgData,
      fileName: file.name,
    });
  };

  const parseMsgFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const msgReader = new MsgReader(arrayBuffer);
    const fileData = msgReader.getFileData();

      const attachments: MsgAttachment[] = [];
      if (fileData.attachments && fileData.attachments.length > 0) {
        for (const att of fileData.attachments) {
          try {
            const attachmentData = msgReader.getAttachment(att);
            if (attachmentData && attachmentData.content) {
              const content = attachmentData.content instanceof ArrayBuffer
                ? attachmentData.content
                : (attachmentData.content.buffer || attachmentData.content);

              attachments.push({
                fileName: attachmentData.fileName || att.fileName || 'unnamed',
                content: content,
                mimeType: att.attachMimeTag || 'application/octet-stream',
                size: content.byteLength,
              });
            }
          } catch (attErr) {
            console.warn('Failed to extract attachment:', att.fileName, attErr);
          }
        }
      }

      let senderEmail = fileData.senderEmail || fileData.senderSmtpAddress || '';
      const senderName = fileData.senderName || '';

      // Handle Exchange DN format - try to extract email from name field
      if (!senderEmail.includes('@') && senderName) {
        const emailMatch = senderName.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
        if (emailMatch) {
          senderEmail = emailMatch[1];
        }
      }

      // If we still don't have a valid email and have a DN, just use the sender name
      const fromDisplay = senderEmail.includes('@')
        ? (senderName && senderName !== senderEmail ? `${senderName} <${senderEmail}>` : senderEmail)
        : senderName || senderEmail || 'Unknown Sender';

      const toRecipients: string[] = [];
      const ccRecipients: string[] = [];
      const bccRecipients: string[] = [];

      if (Array.isArray(fileData.recipients)) {
        for (const recipient of fileData.recipients) {
          const email = extractEmail(recipient);
          if (email) {
            const recipientType = recipient.recipientType || 1;
            if (recipientType === 1) {
              toRecipients.push(email);
            } else if (recipientType === 2) {
              ccRecipients.push(email);
            } else if (recipientType === 3) {
              bccRecipients.push(email);
            } else {
              toRecipients.push(email);
            }
          }
        }
      }

      const msgData: MsgData = {
        from: fromDisplay,
        to: toRecipients,
        cc: ccRecipients,
        bcc: bccRecipients,
        subject: fileData.subject || '(No Subject)',
        date: fileData.creationTime ? new Date(fileData.creationTime) : null,
        bodyHTML: fileData.bodyHtml || fileData.body || '',
        bodyText: fileData.body || '',
        attachments,
        headers: fileData.headers || {},
      };

      setParsedMsg({
        data: msgData,
        fileName: file.name,
      });
  };

  const clearMsg = useCallback(() => {
    setParsedMsg(null);
    setError(null);
  }, []);

  return {
    parsedMsg,
    isLoading,
    error,
    parseFile,
    clearMsg,
  };
}
