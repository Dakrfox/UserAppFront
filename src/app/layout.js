import '../styles/globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Click Me</button>

          {children}
      </body>
    </html>
  );
}
