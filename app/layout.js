import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import PythonWrapper from "../components/PythonWrapper";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "PyLib - Master Python Programming",
  description: "Interactive Python learning platform with examples, challenges, and comprehensive tutorials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased`}
      >
        <AuthProvider>
          <PythonWrapper>
            {children}
          </PythonWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
