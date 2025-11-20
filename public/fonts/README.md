# Fonts Directory

This directory should contain the custom font files for the StudyEasily application.

## Required Fonts

### 1. Futura Font Family
- **Files needed:**
  - `Futura-Regular.woff2` (or .ttf, .woff)
  - `Futura-Medium.woff2` (optional)
  - `Futura-Bold.woff2` (optional)

### 2. Higuan Elegant Serif Font Family
- **Files needed:**
  - `HiguanElegantSerif-Regular.woff2` (or .ttf, .woff)

## Installation Instructions

1. Obtain the font files from your licensed font provider or free font alternatives
2. Place the font files in this directory (`/public/fonts/`)
3. Update the `@font-face` declarations in `/app/globals.css` to reference the correct file paths

Example font-face declaration:
```css
@font-face {
  font-family: 'Futura';
  src: url('/fonts/Futura-Regular.woff2') format('woff2'),
       url('/fonts/Futura-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Current Implementation

Currently, the application uses system font fallbacks:
- **Futura**: Falls back to Arial, Helvetica, sans-serif
- **Higuan Elegant Serif**: Falls back to Georgia, Times New Roman, serif

Once you add the actual font files and update the CSS, the custom fonts will be used automatically.

## Font Usage

- **Futura**: Used for body text and the Georg Simmel quote
- **Higuan Elegant Serif**: Used for the main "StudyEasily" title in the hero section

## Notes

- Ensure you have the proper licenses for any commercial fonts
- Use `.woff2` format for best performance (supported by all modern browsers)
- Consider using `font-display: swap` for better loading performance
