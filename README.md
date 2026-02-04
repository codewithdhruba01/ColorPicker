# ColorKit - Advanced Color Picker & Analyzer

![Banner](public/colorkit-cover.png)

A professional, feature-rich color picker and analysis tool built with Next.js 13, TypeScript, and Tailwind CSS. Extract colors from images, generate color palettes, analyze accessibility, and explore color theory with an elegant, animated interface.

## Key Highlights

### Homepage Experience
- **Animated Dark Gradient Background**: Beautiful gradient transitions from orange to slate to cyan
- **Capsule-Style Navigation**: Modern glassmorphism navbar with rounded full design
- **Instant Color Picker Card**: Pick colors directly from homepage with:
  - Upload image mode with auto-extraction
  - Manual color picker mode
  - Real-time HEX and RGB display
 
## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (via shadcn/ui)
- **Icons**: Lucide React
- **Notifications**: Sonner

## Features

### Color Picking Tools
- **Image Color Extraction**: Upload images and extract dominant color palettes
- **Click-to-Pick**: Click anywhere on an uploaded image to pick specific colors
- **Manual Color Picker**: Interactive color picker with RGB and HSL sliders
- **Native Color Input**: Browser native color picker for quick selection

### Color Conversion Formats

#### Technical Formats
 **HEX, RGB, HSL, HSV, CMYK**

#### Practical Formats
- CSS RGB/HSL
- Android Color Format
- Swift UIColor
- Multiple export formats

### Color Variations
- **Shades**: Generate darker variations by adding black
- **Tints**: Generate lighter variations by adding white
- **Tones**: Generate muted variations by adding gray

### Color Combinations
- **Complementary**: Colors opposite on the color wheel
- **Analogous**: Adjacent colors on the color wheel
- **Triadic**: Three evenly-spaced colors
- **Tetradic**: Four evenly-spaced colors (square)

### Contrast Checker
- WCAG AA compliance checking
- WCAG AAA compliance checking
- Test text on colored backgrounds
- Accessibility recommendations

### Color Analysis
- Color name identification
- Hue, saturation, and lightness values
- Brightness calculation
- Temperature (warm/cool)
- Vibrancy levels
- Mood and best use recommendations

### Color Blindness Simulator
Simulate how colors appear to people with:
- Protanopia (red-blindness)
- Deuteranopia (green-blindness)
- Tritanopia (blue-blindness)


### Beautiful UI/UX
- Animated gradient backgrounds
- Smooth transitions and hover effects
- Responsive design
- Modern glassmorphism effects
- Professional color scheme

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/codewithdhruba01/ColorPicker.git
cd colorpicker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Key Features Explained

### Image Color Extraction
The app uses HTML5 Canvas API to analyze uploaded images and extract dominant colors using a k-means clustering algorithm. Users can:
- Upload any image format
- Extract up to 8 dominant colors
- Click specific pixels to pick exact colors

### Color Conversion
Comprehensive color format conversion including:
- HEX ↔ RGB ↔ HSL ↔ HSV ↔ CMYK
- Accurate conversion algorithms
- Copy-to-clipboard functionality

### Accessibilit## Contributiny Testing
Built-in WCAG compliance checker:
- Calculates contrast ratios
- Tests against AA (4.5:1) and AAA (7:1) standards
- Shows text on background previews
- Provides pass/fail recommendations

### Color Theory Tools
Generate harmonious color schemes based on color theory:
- Complementary
- Analogous
- Triadic
- Tetradic





## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
   
⭐ If you find this project useful, please give it a star!

**Built with ❤️ by [Dhrubaraj Pati](https://codewithdhruba.vercel.app/) for developers**

[Website](https://codewithdhruba.vercel.app/) • [GitHub](https://github.com/codewithdhruba01) • [Twitter](https://x.com/codewithdhruba)

</div>
