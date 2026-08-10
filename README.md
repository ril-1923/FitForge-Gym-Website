# FitForge - Modern Gym & Fitness Center

A premium, fully responsive gym and fitness website built with HTML5, CSS3, Vanilla JavaScript, and Bootstrap 5.

## Features

- **15 fully designed sections**: Navigation, Hero, About, Programs, Why Choose Us, Trainers, Pricing, Schedule, CTA, Testimonials, BMI Calculator, Gallery, FAQ, Contact, and Footer
- **Premium fitness aesthetic** with bold typography, energetic orange accents, and dark/light contrast
- **Fully responsive** for desktop, laptop, tablet, and mobile
- **Smooth animations**: scroll reveals, animated counters, hover effects, parallax hero
- **Interactive features**: BMI calculator, pricing toggle, class booking, gallery lightbox, contact form validation
- **Bootstrap 5 components**: Navbar, Offcanvas, Cards, Carousel, Accordion, Modal, Tabs/Pills, Forms, Toasts, Progress Bars, Breadcrumbs, Spinners, and more
- **Bootstrap Icons** throughout
- **Real fitness imagery** from Pexels (loaded via CDN)

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript (no frameworks)
- Bootstrap 5.3.3 (via CDN)
- Bootstrap Icons 1.11.3 (via CDN)
- Google Fonts: Oswald (headings) + Inter (body)
- Vite (dev server / build tool)

## File Structure

```
fitforge-gym/
├── index.html      # Main HTML with all 15 sections
├── style.css       # Custom CSS (premium design system)
├── main.js         # Vanilla JS (all interactive functionality)
├── package.json    # Vite config
└── README.md       # This file
```

## JavaScript Functionality

1. Sticky navbar with scroll effect
2. Smooth scrolling to sections
3. Active navigation link highlighting on scroll
4. Animated stat counters
5. Scroll reveal animations (fade, zoom)
6. Pricing monthly/yearly toggle
7. BMI calculator with validation and progress bar
8. Contact form validation with loading spinner
9. Newsletter subscription validation
10. Join membership form validation
11. Class booking interaction with toast feedback
12. Gallery modal lightbox
13. Back-to-top button
14. Toast notification system
15. Hero parallax effect (desktop)
16. Pre-fill plan selection from pricing cards

## Running the Project

The dev server runs automatically. The project uses Vite as the build tool.

```bash
npm install      # install dependencies
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
```

## Design System

| Token       | Value       | Usage                  |
|-------------|-------------|------------------------|
| Primary     | #ff5722     | CTAs, accents, links   |
| Secondary   | #1a1a2e     | Dark sections          |
| Accent      | #c5ff3d     | Hero subtitle highlight|
| Success     | #51cf66     | Positive states        |
| Warning     | #fcc419     | Ratings, caution       |
| Error       | #ff6b6b     | Validation errors      |
| Font Heading| Oswald      | Titles, buttons, labels|
| Font Body   | Inter       | Paragraphs, body text  |

## License

This project uses royalty-free images from [Pexels](https://www.pexels.com/).
