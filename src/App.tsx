import { useState, useRef, useEffect } from 'react';
import { Mail, RotateCcw, HelpCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UploadZone } from '@/components/viewer/UploadZone';
import { EmailHeader } from '@/components/viewer/EmailHeader';
import { EmailBody } from '@/components/viewer/EmailBody';
import { AttachmentPreview } from '@/components/viewer/AttachmentPreview';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMsgParser } from '@/hooks/useMsgParser';
import { MsgAttachment } from '@/types/msg';
import { generateEmailPDF } from '@/lib/pdf-generator';

function App() {
  const { parsedMsg, isLoading, error, parseFile, clearMsg } = useMsgParser();
  const [previewAttachment, setPreviewAttachment] =
    useState<MsgAttachment | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const emailContentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!parsedMsg || !emailContentRef.current) return;

    setIsGeneratingPDF(true);
    try {
      await generateEmailPDF(parsedMsg.data, emailContentRef.current);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is MSG & EML Viewer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "MSG & EML Viewer is a web-based tool that allows you to view MSG and EML email files directly in your browser without needing Microsoft Outlook or any other email client installed."
          }
        },
        {
          "@type": "Question",
          "name": "How does MSG & EML Viewer work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply drag and drop or select your .msg or .eml file, and the viewer will parse and display the complete email content and any attachments. All processing happens locally in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data safe when using MSG & EML Viewer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! All data is processed locally in your browser. Your files are never uploaded to any server, and nothing is stored anywhere. Your privacy is completely protected."
          }
        },
        {
          "@type": "Question",
          "name": "What file formats are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The viewer supports .msg files (Microsoft Outlook format) and .eml files (standard email format)."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download attachments from email files?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can preview and download any attachments included in the email file."
          }
        },
        {
          "@type": "Question",
          "name": "Can I export the email as PDF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Once you've loaded an email, you can download it as a PDF by clicking the 'Download PDF' button in the header. The PDF will include all email details, content, and a list of attachments."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2" role="img" aria-label="Email icon">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  MSG & EML Viewer
                </h1>
                <p className="text-sm text-muted-foreground">
                  View email files in your browser
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {parsedMsg && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearMsg}
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Load New File
                  </Button>
                </>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open FAQ">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" role="dialog" aria-labelledby="faq-title">
                  <DialogHeader>
                    <DialogTitle id="faq-title">Frequently Asked Questions</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-2">What is MSG & EML Viewer?</h3>
                      <p className="text-muted-foreground">
                        MSG & EML Viewer is a web-based tool that allows you to view MSG and EML email files directly in your browser without needing Microsoft Outlook or any other email client installed.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">How does it work?</h3>
                      <p className="text-muted-foreground">
                        Simply drag and drop or select your .msg or .eml file, and the viewer will parse and display the complete email content and any attachments.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Is my data safe?</h3>
                      <p className="text-muted-foreground">
                        <strong>Absolutely!</strong> All data is processed locally in your browser. Your files are never uploaded to any server, and nothing is stored anywhere. Your privacy is completely protected.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">What file formats are supported?</h3>
                      <p className="text-muted-foreground">
                        The viewer supports .msg files (Microsoft Outlook format) and .eml files (standard email format).
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Can I download attachments?</h3>
                      <p className="text-muted-foreground">
                        Yes! You can preview and download any attachments included in the email file.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Can I export the email as PDF?</h3>
                      <p className="text-muted-foreground">
                        Yes! Once you've loaded an email, you can download it as a PDF by clicking the "Download PDF" button in the header. The PDF will include all email details, content, and a list of attachments.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1" role="main">
        {error && (
          <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-4" role="alert" aria-live="assertive">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
        )}

        {!parsedMsg ? (
          <div className="max-w-2xl mx-auto">
            <UploadZone onFileSelect={parseFile} isLoading={isLoading} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6" ref={emailContentRef}>
            <EmailHeader data={parsedMsg.data} />

            <Separator />

            <EmailBody
              bodyHTML={parsedMsg.data.bodyHTML}
              bodyText={parsedMsg.data.bodyText}
              attachments={parsedMsg.data.attachments}
              onPreviewAttachment={setPreviewAttachment}
            />
          </div>
        )}
      </main>

      <AttachmentPreview
        attachment={previewAttachment}
        isOpen={Boolean(previewAttachment)}
        onClose={() => setPreviewAttachment(null)}
      />

      <footer className="border-t bg-white/80 backdrop-blur-sm mt-auto" role="contentinfo">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            MSG & EML Viewer - Client-side email file viewer |{' '}
            <a 
              href="https://github.com/dtschannen/MSG-EML-Viewer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
