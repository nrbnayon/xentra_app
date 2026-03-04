/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // NativeWind uses "class" strategy for dark mode
  theme: {
    extend: {
      colors: {
        // ─── Primary ───────────────────────────────────────────
        primary: {
          DEFAULT: "#16467A",
          50: "#E8F0F9",
          100: "#C5D8F0",
          200: "#9EBFE6",
          300: "#77A6DC",
          400: "#5091D5",
          500: "#16467A", // base
          600: "#123D6E",
          700: "#0E3260",
          800: "#0A2650",
          900: "#061840",
          foreground: "#FFFFFF",
        },

        // ─── Secondary ─────────────────────────────────────────
        secondary: {
          DEFAULT: "#505050",
          50: "#F2F2F2",
          100: "#E0E0E0",
          200: "#BDBDBD",
          300: "#9E9E9E",
          400: "#757575",
          500: "#505050", // base
          600: "#424242",
          700: "#303030",
          800: "#212121",
          900: "#111111",
          foreground: "#FFFFFF",
        },

        // ─── Yellow / Accent ───────────────────────────────────
        yellow: {
          DEFAULT: "#FFC107",
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#FFC107", // base
          600: "#FFB300",
          700: "#FFA000",
          800: "#FF8F00",
          900: "#FF6F00",
          foreground: "#111111",
        },

        // ─── Semantic ──────────────────────────────────────────
        background: {
          DEFAULT: "#FFFFFF", // light
          dark: "#0F172A", // dark
        },
        surface: {
          DEFAULT: "#F5F7FA", // light cards/sheets
          dark: "#1E293B", // dark cards/sheets
        },
        foreground: {
          DEFAULT: "#111111",
          dark: "#F1F5F9",
        },
        muted: {
          DEFAULT: "#F5F7FA",
          foreground: "#6B7280",
          dark: "#1E293B",
          "dark-foreground": "#94A3B8",
        },
        border: {
          DEFAULT: "#E9E9E9", // your specified border color
          dark: "#334155",
        },
        input: {
          DEFAULT: "#E9E9E9",
          dark: "#334155",
        },
        ring: {
          DEFAULT: "#16467A",
          dark: "#5091D5",
        },

        // ─── Status ────────────────────────────────────────────
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#22C55E",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#111111",
        },

        // ─── Card / Popover ────────────────────────────────────
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111111",
          dark: "#1E293B",
          "dark-foreground": "#F1F5F9",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111111",
          dark: "#1E293B",
          "dark-foreground": "#F1F5F9",
        },

        // ─── Input placeholder color ─────────────────────────────
        placeholder: {
          DEFAULT: "#6C6C6C",
          dark: "#9CA3AF",
        },

        // ─── Chart palette ─────────────────────────────────────
        chart: {
          1: "#16467A",
          2: "#5091D5",
          3: "#FFC107",
          4: "#9EBFE6",
          5: "#E8F0F9",
        },
      },

      // ─── Typography ──────────────────────────────────────────
      fontFamily: {
        // Inter — default / sans (auto-applied via NativeWind base)
        sans: ["Inter_400Regular", "system-ui", "sans-serif"],
        medium: ["Inter_500Medium", "system-ui", "sans-serif"],
        semibold: ["Inter_600SemiBold", "system-ui", "sans-serif"],
        bold: ["Inter_700Bold", "system-ui", "sans-serif"],

        // Roboto — secondary / manual className="font-roboto"
        roboto: ["Roboto_400Regular", "system-ui", "sans-serif"],
        "roboto-medium": ["Roboto_500Medium", "system-ui", "sans-serif"],
        "roboto-semibold": ["Roboto_600Regular", "system-ui", "sans-serif"],
        "roboto-bold": ["Roboto_700Bold", "system-ui", "sans-serif"],

        mono: ["monospace"],
      },

      // ─── Border radius ───────────────────────────────────────
      borderRadius: {
        "4xl": "32px",
        "3xl": "24px",
        "2xl": "20px",
        xl: "14px",
        lg: "12px",
        base: "10px",
        md: "8px",
        sm: "6px",
        xs: "4px",
      },

      // ─── Box shadow (Android elevation fallback) ─────────────
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.08)",
        md: "0 4px 12px rgba(0,0,0,0.10)",
        lg: "0 8px 24px rgba(0,0,0,0.12)",
        card: "0 2px 8px rgba(22,70,122,0.08)",
      },
    },
  },
  plugins: [],
};
