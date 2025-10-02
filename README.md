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

---

**Made with ❤️**