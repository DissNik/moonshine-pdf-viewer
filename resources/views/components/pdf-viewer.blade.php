<div class="space-y-3">
    <div class="flex justify-center">
        <div
            class="js-pdf-viewer pdf-viewer-frame border border-gray rounded-md bg-white p-3"
            data-pdf-url="{{ $url }}"
            data-text-unavailable="{{ __('moonshine-pdf-viewer::pdf-viewer.unavailable') }}"
            data-text-render-failed="{{ __('moonshine-pdf-viewer::pdf-viewer.render_failed') }}"
            data-text-unknown-error="{{ __('moonshine-pdf-viewer::pdf-viewer.unknown_error') }}"
        >
            <div class="space-y-4 py-6">
                <div class="text-center">
                    <div class="spinner spinner-lg spinner--primary"></div>
                </div>
                <div class="space-y-2">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton"></div>
                    <div class="skeleton"></div>
                </div>
            </div>
        </div>
    </div>
</div>
