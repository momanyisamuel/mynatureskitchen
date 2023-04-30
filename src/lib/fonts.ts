import { JetBrains_Mono as FontMono, Atkinson_Hyperlegible as FontSans, Roboto_Serif as FontSerif } from "@next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400"
})

export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
