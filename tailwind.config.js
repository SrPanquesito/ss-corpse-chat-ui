/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        '1/12':	'8.333333%',
        '2/12':	'16.666667%',
        '3/12':	'25%',
        '4/12':	'33.333333%',
        '5/12':	'41.666667%',
        '6/12':	'50%',
        '7/12':	'58.333333%',
        '8/12':	'66.666667%',
        '9/12':	'75%',
        '10/12':	'83.333333%',
        '11/12':	'91.666667%',
      },
      fontSize: {
        'xss': '.7rem',
        'tiny': '.8rem'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        'full': '0 0 15px rgb(0 0 0 / 0.25)',
        'button': '0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f',
        'base': '0.05em 0.05em 0.75em rgb(0 0 0 / 15%)',
        'tiny': '0.05em 0.05em 0.2em rgb(0 0 0 / 20%)',
      },
      colors: {
        theme: {
          light: {
            DEFAULT: "#FFFFFF",
            100: "#FFFFFF",
            200: "#F6F7F8",
            300: "#E3E5E8",
            400: "#D3D5D9",
            500: "#868E98",
            600: "#666C75",
            700: "#474D52",
            800: "#303336",
            900: "#26292B",
          },
          dark: {
            DEFAULT: "#090A0B",
            100: "#090A0B",
            200: "#151719",
            300: "#2C2E30",
            400: "#3F4346",
            500: "#878C92",
            600: "#A9ADB1",
            700: "#C9CBCF",
            800: "#DFE0E2",
            900: "#EFEFF0",
          },
          blue: {
            DEFAULT: "#0C8FBF",
            50: "#E7F4F9",
            100: "#CEE9F2",
            200: "#9ED2E5",
            300: "#6DBCD9",
            400: "#3DA5CC",
            500: "#0C8FBF",
            600: "#0A7299",
            700: "#075673",
            800: "#05394C",
            900: "#021D26",
            950: "#010E13",
          },
          yellow: {
            DEFAULT: "#FFAA00",
            50: "#FFF7E5",
            100: "#FFEECC",
            200: "#FFDD99",
            300: "#FFCC66",
            400: "#FFBB33",
            500: "#FFAA00",
            600: "#CC8800",
            700: "#996600",
            800: "#664400",
            900: "#332200",
            950: "#1A1100",
          },
          red: {
            DEFAULT: "#F45A33",
            50: "#FEEEEC",
            100: "#FDDED6",
            200: "#FBBDAD",
            300: "#F99C84",
            400: "#F67B5C",
            500: "#F45A33",
            600: "#CC4814",
            700: "#A2310B",
            800: "#6E2308",
            900: "#361505",
            950: "#180A02",
          },
          green: {
            DEFAULT: "#3BBA65",
            50: "#EBF9EF",
            100: "#D7F2E0",
            200: "#AEE6C1",
            300: "#86D9A2",
            400: "#5ECC83",
            500: "#3BBA65",
            600: "#2F9551",
            700: "#23703D",
            800: "#184A28",
            900: "#0C2514",
            950: "#07170C",
          }
        }
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
            lg: "975px"
        },
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
