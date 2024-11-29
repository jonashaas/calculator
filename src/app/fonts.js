import localFont from "next/font/local";

// export const bricolage_grotesque = localFont({
//   src: [
//     {
//       path: '../../public/fonts/BricolageGrotesque-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//       display: 'swap'
//     },
//     {
//       path: '../../public/fonts/BricolageGrotesque-ExtraBold.ttf',
//       weight: '800',
//       style: 'normal',
//       display: 'swap'
//     }
//   ],
// });

// export const rubik_mono_one = localFont({
//   src: '../../public/fonts/RubikMonoOne-Regular.ttf',
//   display: 'swap',
// })

export const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});