import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { MsgData } from '@/types/msg';
import { formatFileSize } from './file-utils';

export async function generateEmailPDF(data: MsgData, contentElement: HTMLElement) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Subject line - large and bold
  pdf.setFontSize(16);
  pdf.setTextColor(0);
  pdf.setFont(undefined, 'bold');
  const subjectLines = pdf.splitTextToSize(data.subject, pageWidth - 2 * margin);
  pdf.text(subjectLines, margin, yPosition);
  yPosition += subjectLines.length * 7 + 8;

  // Email metadata in table-like format
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');

  // From field
  pdf.setFont(undefined, 'bold');
  pdf.text('From:', margin, yPosition);
  pdf.setFont(undefined, 'normal');
  const fromLines = pdf.splitTextToSize(data.from, pageWidth - 2 * margin - 25);
  pdf.text(fromLines, margin + 25, yPosition);
  yPosition += Math.max(fromLines.length * 5, 5) + 3;

  // To field
  if (data.to.length > 0) {
    pdf.setFont(undefined, 'bold');
    pdf.text('To:', margin, yPosition);
    pdf.setFont(undefined, 'normal');
    const toText = data.to.join('; ');
    const toLines = pdf.splitTextToSize(toText, pageWidth - 2 * margin - 25);
    pdf.text(toLines, margin + 25, yPosition);
    yPosition += Math.max(toLines.length * 5, 5) + 3;
  }

  // CC field
  if (data.cc.length > 0) {
    pdf.setFont(undefined, 'bold');
    pdf.text('Cc:', margin, yPosition);
    pdf.setFont(undefined, 'normal');
    const ccText = data.cc.join('; ');
    const ccLines = pdf.splitTextToSize(ccText, pageWidth - 2 * margin - 25);
    pdf.text(ccLines, margin + 25, yPosition);
    yPosition += Math.max(ccLines.length * 5, 5) + 3;
  }

  // Date field
  if (data.date) {
    pdf.setFont(undefined, 'bold');
    pdf.text('Sent:', margin, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(format(data.date, 'EEEE, MMMM d, yyyy h:mm a'), margin + 25, yPosition);
    yPosition += 8;
  }

  // Attachments section (if any)
  if (data.attachments.length > 0) {
    pdf.setFont(undefined, 'bold');
    pdf.text('Attachments:', margin, yPosition);
    yPosition += 5;
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(9);

    data.attachments.forEach((attachment, index) => {
      const attachText = `${index + 1}. ${attachment.fileName} (${formatFileSize(attachment.size)})`;
      const attachLines = pdf.splitTextToSize(attachText, pageWidth - 2 * margin - 5);
      pdf.text(attachLines, margin + 5, yPosition);
      yPosition += attachLines.length * 4 + 2;
    });

    yPosition += 5;
    pdf.setFontSize(10);
  }

  // Separator line
  pdf.setDrawColor(220);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  // Message body
  const bodyText = data.bodyText || 'No message content';
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(10);

  const bodyLines = pdf.splitTextToSize(bodyText, pageWidth - 2 * margin);

  for (const line of bodyLines) {
    if (yPosition > pageHeight - margin - 10) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.text(line, margin, yPosition);
    yPosition += 5;
  }

  const filename = `${data.subject.replace(/[^a-z0-9]/gi, '_').substring(0, 50)}_${format(new Date(), 'yyyyMMdd')}.pdf`;
  pdf.save(filename);
}
