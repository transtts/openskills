# Algorithmic Art Generator

This skill enables Claude to create beautiful algorithmic art using mathematical functions, fractals, and generative design patterns.

## Features
- Generate fractal patterns (Mandelbrot, Julia sets)
- Create geometric tessellations
- Produce color gradient compositions
- SVG and Canvas output support

## Installation
```bash
npm install -g @anthropics/algorithmic-art
# Or add to Claude Desktop config:
{
  "algorithmic-art": {
    "command": "npx",
    "args": ["-y", "@anthropics/algorithmic-art"]
  }
}
```

## Usage
Ask Claude to generate art:
> "Create a colorful Mandelbrot fractal with a deep zoom at coordinates (-0.75, 0.1)"

## Examples
- Spirograph patterns with custom parameters
- Voronoi diagram landscapes
- L-system tree generation
- Perlin noise terrain maps