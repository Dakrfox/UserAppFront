import "../styles/globals.css";
/**
 * Renders the root layout of the application.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered.
 * @return {React.ReactElement} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
