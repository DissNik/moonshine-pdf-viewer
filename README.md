# moonshine-pdf-viewer

Simple PDF viewer component for MoonShine. PDF rendering is powered by `pdfjs-dist` (Mozilla PDF.js).

## Requirements

- PHP `^8.3`
- MoonShine `^4.0`

## Installation

```bash
composer require local/moonshine-pdf-viewer
```

Publish package assets:

```bash
php artisan vendor:publish --tag=moonshine-pdf-viewer-assets --force
```

## Usage

Use the component in MoonShine pages/components:

```php
use Packages\MoonShinePdfViewer\Components\PdfViewer;

PdfViewer::make(
    url: 'https://example.com/file.pdf'
);
```

## Localization

Default translations are included:

- English
- Russian

Optional publish command:

```bash
php artisan vendor:publish --tag=moonshine-pdf-viewer-lang
```

## Optional publish commands

```bash
php artisan vendor:publish --tag=moonshine-pdf-viewer-views
```

## License

MIT
