const ChatDisplayGuide = () => {
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 460 184.4444444444489"
        width="460"
        height="184.4444444444489"
        filter="invert(93%) hue-rotate(180deg)"
      >
        <defs>
          <style className="style-fonts">
            {`
      @font-face { font-family: Excalifont;
      src: url(data:font/woff2;base64,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); }`}
          </style>
        </defs>
        <g strokeLinecap="round">
          <g transform="translate(10 170) rotate(180 95 -30)">
            <path
              d="M0 0 C12.5 -10, 43.33 -50, 75 -60 C106.67 -70, 170.83 -60, 190 -60 M0 0 C12.5 -10, 43.33 -50, 75 -60 C106.67 -70, 170.83 -60, 190 -60"
              stroke="#868e96"
              strokeWidth="2"
              fill="none"
            ></path>
          </g>
          <g transform="translate(10 170) rotate(180 95 -30)">
            <path
              d="M190 -60 L176 -54.61 L176.88 -67.26 L190 -60"
              stroke="none"
              strokeWidth="0"
              fill="#868e96"
              fillRule="evenodd"
            ></path>
            <path
              d="M190 -60 C185.15 -58.13, 180.29 -56.27, 176 -54.61 M190 -60 C186.73 -58.74, 183.45 -57.48, 176 -54.61 M176 -54.61 C176.28 -58.69, 176.56 -62.77, 176.88 -67.26 M176 -54.61 C176.19 -57.4, 176.39 -60.19, 176.88 -67.26 M176.88 -67.26 C181.41 -64.75, 185.94 -62.25, 190 -60 M176.88 -67.26 C180.08 -65.49, 183.28 -63.72, 190 -60 M190 -60 C190 -60, 190 -60, 190 -60 M190 -60 C190 -60, 190 -60, 190 -60"
              stroke="#868e96"
              strokeWidth="2"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
        <g transform="translate(190 10) rotate(0 116.64995574951172 17.5)">
          <text
            x="116.64995574951172"
            y="24.668"
            style={{
              fontFamily: "Excalifont, Xiaolai, Segoe UI Emoji",
              fontSize: "28px",
              fill: "#868e96",
            }}
            textAnchor="middle"
            direction="ltr"
            dominantBaseline="alphabetic"
          >
            Welcome to chat!
          </text>
        </g>
        <g transform="translate(150 70) rotate(0 150 21.00300839599913)">
          <text
            x="149.99999999999997"
            y="14.802920317500684"
            style={{
              fontFamily: "Excalifont, Xiaolai, Segoe UI Emoji",
              fontSize: "16.8px",
              fill: "#868e96",
            }}
            textAnchor="middle"
            direction="ltr"
            dominantBaseline="alphabetic"
          >
            Chat with other club members about
          </text>
          <text
            x="149.99999999999997"
            y="35.80592871350052"
            style={{
              fontFamily: "Excalifont, Xiaolai, Segoe UI Emoji",
              fontSize: "16.8px",
              fill: "#868e96",
            }}
            textAnchor="middle"
            direction="ltr"
            dominantBaseline="alphabetic"
          >
            your favorite topics.
          </text>
        </g>
      </svg>
    </>
  );
};
export default ChatDisplayGuide;
