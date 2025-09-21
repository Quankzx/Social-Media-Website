import createHandlers from './handlers'

export async function startMockWorker() {
		try {
			// Use an indirect dynamic import to avoid Vite static analysis resolving msw at build time
			// eslint-disable-next-line no-new-func
			const dynamicImport: any = new Function('modulePath', 'return import(modulePath)')
			const msw = await dynamicImport('msw')
			const { setupWorker, rest, ctx } = msw
			const handlers = createHandlers(rest, ctx)
			const worker = setupWorker(...handlers)
			await worker.start()
			return worker
		} catch (e) {
			// msw not available or ServiceWorker not supported
			return null
		}
}

export default startMockWorker
