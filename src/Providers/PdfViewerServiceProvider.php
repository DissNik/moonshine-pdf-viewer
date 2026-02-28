<?php

declare(strict_types=1);

namespace DissNik\MoonShinePdfViewer\Providers;

use Illuminate\Support\ServiceProvider;

class PdfViewerServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'moonshine-pdf-viewer');
        $this->loadTranslationsFrom(__DIR__.'/../../resources/lang', 'moonshine-pdf-viewer');

        $this->publishes(
            [__DIR__.'/../../public' => public_path('vendor/moonshine-pdf-viewer')],
            ['moonshine-pdf-viewer', 'moonshine-pdf-viewer-assets', 'laravel-assets']
        );

        $this->publishes(
            [__DIR__.'/../../resources/views' => resource_path('views/vendor/moonshine-pdf-viewer')],
            ['moonshine-pdf-viewer', 'moonshine-pdf-viewer-views']
        );

        $this->publishes(
            [__DIR__.'/../../resources/lang' => $this->app->langPath('vendor/moonshine-pdf-viewer')],
            ['moonshine-pdf-viewer', 'moonshine-pdf-viewer-lang']
        );
    }
}
