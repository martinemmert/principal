import "./globals.css";

export const metadata = {
  title: "What the SQL",
  description: "Get your (copied) SQL explained",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
