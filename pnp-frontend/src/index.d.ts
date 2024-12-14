declare module '*.jpg';
declare module '*.png';
declare module '@sanity/block-content-to-react';
declare module '@sanity/block-content-to-markdown';
declare module '@react-pdf/pdfkit';
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
