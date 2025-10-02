# MSG & EML Viewer

A modern, client-side web application for viewing MSG and EML email files directly in your browser. No installation required - your files never leave your device.

![MSG & EML Viewer](https://img.shields.io/badge/MSG%20%26%20EML-Viewer-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)

## ✨ Features

- **🔒 Privacy First**: All processing happens client-side - your files never leave your device
- **📧 MSG Support**: View Microsoft Outlook MSG files without Outlook installed
- **📨 EML Support**: View standard EML email files
- **📎 Attachment Handling**: View, download, and preview email attachments
- **📄 PDF Export**: Export emails as PDF documents
- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **📱 Mobile Friendly**: Works on desktop, tablet, and mobile devices
- **⚡ Fast**: Built with Vite for optimal performance

## 🚀 Live Demo

Visit the live application at: [https://msg-view.com](https://msg-view.com)

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Email Parsing**: 
  - `@kenjiuno/msgreader` for MSG files
  - `postal-mime` for EML files
- **PDF Generation**: jsPDF with html2canvas
- **File Handling**: File-saver, JSZip

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dtschannen/MSG-EML-Viewer.git
   cd MSG-EML-Viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── viewer/             # Email viewer components
│       ├── AttachmentList.tsx
│       ├── AttachmentPreview.tsx
│       ├── EmailBody.tsx
│       ├── EmailHeader.tsx
│       └── UploadZone.tsx
├── hooks/
│   └── useMsgParser.ts     # Custom hook for parsing email files
├── lib/
│   ├── file-utils.ts       # File handling utilities
│   ├── pdf-generator.ts    # PDF generation logic
│   └── utils.ts            # General utilities
├── types/
│   └── msg.ts              # TypeScript type definitions
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 📧 Supported File Types

### MSG Files
- Microsoft Outlook message files (.msg)
- Includes headers, body, and attachments
- Supports HTML and plain text content

### EML Files
- Standard email message files (.eml)
- RFC 2822 compliant
- Supports HTML and plain text content

## 🔒 Privacy & Security

- **Client-side processing**: All file parsing happens in your browser
- **No data transmission**: Files are never uploaded to any server
- **No tracking**: No analytics or tracking scripts
- **Open source**: Full source code is available for review

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [@kenjiuno/msgreader](https://github.com/kenjiuno/msgreader) for MSG file parsing
- [postal-mime](https://github.com/postalsys/postal-mime) for EML file parsing
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/dtschannen/MSG-EML-Viewer/issues) page
2. Create a new issue with detailed information
3. Include file type, browser version, and error messages

---

**Made with ❤️ for the email community**