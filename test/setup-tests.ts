import { beforeAll, afterAll, afterEach } from 'vitest'
import { startMockWorker } from '../src/mocks/browser'

let worker: any = null

beforeAll(async () => {
  worker = await startMockWorker()
})

afterEach(() => {
  // noop for now
})

afterAll(async () => {
  if (worker && typeof worker.stop === 'function') await worker.stop()
})
