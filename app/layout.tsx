import "./globals.css";

export const metadata = {
  title: "Character Explorer",
  description: "Rick and Morty Character Explorer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
