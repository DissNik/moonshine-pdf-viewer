<?php

declare(strict_types=1);

namespace Packages\MoonShinePdfViewer\Components;

use MoonShine\AssetManager\Css;
use MoonShine\AssetManager\Js;
use MoonShine\UI\Components\MoonShineComponent;

/**
 * @method static static make(?string $url = null)
 */
final class PdfViewer extends MoonShineComponent
{
    protected string $view = 'moonshine-pdf-viewer::components.pdf-viewer';

    public function __construct(
        private readonly ?string $url = null,
    ) {
        parent::__construct();
    }

    protected function assets(): array
    {
        return [
            Css::make('vendor/moonshine-pdf-viewer/css/stylesheet.css'),
            Js::make('vendor/moonshine-pdf-viewer/js/script.js')
                ->customAttributes(['type' => 'module'])
                ->defer(),
        ];
    }

    protected function viewData(): array
    {
        return [
            'url' => $this->url,
        ];
    }
}
