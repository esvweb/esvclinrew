import '../globals.css'

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  )
}
