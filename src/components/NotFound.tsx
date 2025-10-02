import { useEffect } from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    //return 404 status code for prerender
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                MSG & EML Viewer
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center" role="main">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleGoHome} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Looking for the email viewer?{' '}
              <a 
                href="/" 
                className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
              >
                Upload your MSG or EML file here
              </a>
            </p>
          </div>
        </div>
      </main>

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
