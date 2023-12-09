// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { theme } from "@/theme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";
// export const metadata = {
//   title: "EZTOEIC",
//   description: "I code it",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>EZTOEIC</title>
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            <Header />
            {children}
            <Footer />
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
