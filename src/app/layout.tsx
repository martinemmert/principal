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
    <html>
      <body className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        {children}
      </body>
    </html>
  );
}
