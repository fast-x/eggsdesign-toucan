import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

const ToucanLogo = ({ height = 32, width = 153 }: Props) => (
  <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="body">
      <path
        d="M11.5834 21.3335H22.25V21.3335C22.25 27.2245 17.4744 32.0002 11.5834 32.0002V32.0002L11.5834 21.3335Z"
        fill="#3DBEB3"
      />
      <path
        d="M0.916626 10.6665H11.5833V21.3332V21.3332C5.69226 21.3332 0.916626 16.5575 0.916626 10.6665V10.6665Z"
        fill="#798BCC"
      />
      <path
        d="M22.25 21.3335H11.5833V10.6668V10.6668C17.4744 10.6668 22.25 15.4425 22.25 21.3335V21.3335Z"
        fill="#092F45"
      />
    </g>
    <g className="head">
      <path d="M32.9166 10.6665H22.25V-0.000164032H32.9166V10.6665Z" fill="#FFBF01" />
      <path
        d="M43.5834 10.6665H32.9167V-0.000164032V-0.000164032C38.8077 -0.000164032 43.5834 4.77547 43.5834 10.6665V10.6665Z"
        fill="#FE5F55"
      />
      <path
        d="M14.25 5.33317C14.25 3.86041 15.4439 2.6665 16.9167 2.6665V2.6665C18.3894 2.6665 19.5833 3.86041 19.5833 5.33317V5.33317C19.5833 6.80593 18.3894 7.99984 16.9167 7.99984V7.99984C15.4439 7.99984 14.25 6.80593 14.25 5.33317V5.33317Z"
        fill="#092F45"
      />
    </g>
    <g>
      <path
        d="M65.5192 22.563C64.8678 22.9213 63.9559 23.247 63.109 23.247C61.3177 23.247 60.992 21.7488 60.992 19.9574V13.6388H65.5192V10.2841H60.992V5.3335L57.051 6.01747V10.2841H54.25V13.6388H57.051V20.5111C57.051 22.8887 57.5396 24.2241 58.3538 25.1035C59.3635 26.2434 60.8617 26.6668 62.2622 26.6668C63.4999 26.6668 65.817 26.4304 67.1526 25.3177C66.5932 24.6751 66.1335 23.9521 65.7889 23.1729L65.5192 22.563Z"
        fill="#092F45"
      />
      <path
        d="M71.4271 18.2963C71.4271 15.5279 73.4464 13.3783 76.1823 13.3783C78.9182 13.3783 80.9375 15.5279 80.9375 18.2963C80.9375 21.0648 78.9182 23.2144 76.1823 23.2144C73.4464 23.2144 71.4271 21.0648 71.4271 18.2963ZM67.4861 18.2963C67.4861 23.019 71.1991 26.6668 76.1823 26.6668C81.1655 26.6668 84.8785 23.019 84.8785 18.2963C84.8785 13.5737 81.1655 9.92586 76.1823 9.92586C71.1991 9.92586 67.4861 13.5737 67.4861 18.2963Z"
        fill="#092F45"
      />
      <path
        d="M97.8723 24.5498V26.3086H101.781V13.158C101.781 11.5708 100.494 10.2841 98.9069 10.2841H97.8398V21.0974C96.765 22.3025 95.2342 23.1818 93.6708 23.1818C92.9217 23.1818 92.14 22.9864 91.5538 22.3025C91.0652 21.7488 90.8372 20.9019 90.8372 19.4689V13.158C90.8372 11.5708 89.5506 10.2841 87.9634 10.2841H86.8963V20.1203C86.8963 22.4327 87.3522 23.8984 88.3293 24.9732C89.3064 26.048 90.8372 26.6668 92.596 26.6668C94.7456 26.6668 96.4718 25.7549 97.8072 24.5172L97.8723 24.5498Z"
        fill="#092F45"
      />
      <path
        d="M117.477 21.6185C116.207 22.6282 114.481 23.2144 112.787 23.2144C109.725 23.2144 107.576 21.1951 107.576 18.3289C107.576 15.5279 109.628 13.3457 112.722 13.3457C114.253 13.3457 115.816 13.8994 117.217 14.8114L118.174 11.4471C116.559 10.2841 114.383 9.92586 112.657 9.92586C107.641 9.92586 103.602 13.3457 103.602 18.3615C103.602 23.1493 107.315 26.6668 112.461 26.6668C114.155 26.6668 117.337 26.3086 118.435 24.9828L117.477 21.6185Z"
        fill="#092F45"
      />
      <path
        d="M131.019 25.3966V26.3086H134.895V10.3167L131.606 10.903C130.368 10.2841 128.967 9.92586 127.502 9.92586C122.584 9.92586 118.968 13.5086 118.968 18.5569C118.968 23.475 122.453 26.6668 126.688 26.6668C128.446 26.6668 130.01 26.0806 130.954 25.364L131.019 25.3966ZM130.954 22.2373C130.01 22.9213 128.772 23.3447 127.534 23.3447C124.636 23.3447 122.942 21.1299 122.942 18.3289C122.942 15.4628 124.701 13.2806 127.665 13.2806C128.902 13.2806 130.075 13.6714 130.954 14.1274V22.2373Z"
        fill="#092F45"
      />
      <path
        d="M137.245 26.3086H141.186V15.4302C142.196 14.3228 143.824 13.4108 145.388 13.4108C146.3 13.4108 147.016 13.704 147.505 14.2902C147.961 14.8114 148.156 15.593 148.156 17.0261V26.3086H152.097V16.3421C152.097 13.9645 151.674 12.6292 150.729 11.6195C149.719 10.5121 148.221 9.92586 146.495 9.92586C144.378 9.92586 142.554 10.8378 141.219 12.0429L141.153 12.0103V10.2841H137.245V26.3086Z"
        fill="#092F45"
      />
    </g>
  </svg>
);

export default ToucanLogo;
