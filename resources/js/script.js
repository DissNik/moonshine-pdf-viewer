import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import PdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?worker'

const MAX_SCALE = 3.0
const MIN_SCALE = 1.0
const LOADING_TEMPLATE = `
    <div class="space-y-4 py-6">
        <div class="space-y-2">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        </div>
    </div>
`

const LOG_TAG = '[pdf-viewer]'

const logDebug = (message, context = {}) => {
    if (typeof console?.debug === 'function') {
        console.debug(LOG_TAG, message, context)
    }
}

const logWarn = (message, context = {}) => {
    if (typeof console?.warn === 'function') {
        console.warn(LOG_TAG, message, context)
    }
}

if (typeof Promise.withResolvers !== 'function') {
    Promise.withResolvers = () => {
        let resolve
        let reject
        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        return { promise, resolve, reject }
    }
}

pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker()

const renderViewer = async (root, attempts = 0) => {
    const pdfUrl = root.dataset.pdfUrl
    const unavailableText = root.dataset.textUnavailable || 'PDF is unavailable'
    const renderFailedText = root.dataset.textRenderFailed || 'Failed to display PDF'
    const unknownErrorText = root.dataset.textUnknownError || 'Unknown error'

    if (!pdfUrl) {
        logWarn('viewer_init_skipped', { reason: 'empty_url' })
        root.innerHTML = `<div class="text-gray-500">${unavailableText}</div>`
        return
    }

    const containerWidth = root.getBoundingClientRect().width || root.parentElement?.getBoundingClientRect().width || 0
    if (containerWidth < 80 && attempts < 40) {
        setTimeout(() => {
            void renderViewer(root, attempts + 1)
        }, 120)
        return
    }

    try {
        logDebug('render_start', { pdfUrl })

        const loadingTask = pdfjsLib.getDocument(pdfUrl)
        const pdf = await loadingTask.promise

        root.dataset.pdfRendered = '1'
        root.innerHTML = ''

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber)
            const baseViewport = page.getViewport({ scale: 1 })
            const width = root.getBoundingClientRect().width || root.parentElement?.getBoundingClientRect().width || 900
            const targetWidth = Math.max(width - 24, 320)
            const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetWidth / baseViewport.width))
            const viewport = page.getViewport({ scale })
            const canvas = document.createElement('canvas')

            canvas.className = 'mx-auto mb-4 shadow'
            canvas.width = viewport.width
            canvas.height = viewport.height
            canvas.style.width = '100%'
            canvas.style.height = 'auto'

            const context = canvas.getContext('2d')
            await page.render({
                canvasContext: context,
                viewport,
            }).promise

            root.appendChild(canvas)
        }

        logDebug('render_success', { pdfUrl, pages: pdf.numPages })
    } catch (error) {
        const message = error instanceof Error ? error.message : unknownErrorText
        logWarn('render_failed', { pdfUrl, message })
        root.innerHTML = `<div class="text-gray-500">${renderFailedText}: ${message}</div>`
    }
}

const initPdfViewers = () => {
    document.querySelectorAll('.js-pdf-viewer').forEach((node) => {
        if (node.dataset.initialized === '1') {
            return
        }

        node.dataset.initialized = '1'
        logDebug('viewer_init', { pdfUrl: node.dataset.pdfUrl ?? null })
        void renderViewer(node)
    })
}

if (!window.__moonshinePdfViewerObserverAttached) {
    window.__moonshinePdfViewerObserverAttached = true

    const observer = new MutationObserver(() => {
        initPdfViewers()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('DOMContentLoaded', initPdfViewers)
    window.addEventListener('resize', () => {
        document.querySelectorAll('.js-pdf-viewer[data-initialized="1"]').forEach((node) => {
            if (node.dataset.pdfUrl) {
                node.dataset.initialized = '0'
                node.innerHTML = LOADING_TEMPLATE
            }
        })

        setTimeout(initPdfViewers, 120)
    })

    setTimeout(initPdfViewers, 0)
}
