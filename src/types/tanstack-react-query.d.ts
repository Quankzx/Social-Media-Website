declare module '@tanstack/react-query' {
  import * as React from 'react'

  export type QueryClient = any

  export const QueryClient: any
  export const QueryClientProvider: React.ComponentType<{ client: QueryClient; children?: React.ReactNode }>

  export function useQuery(options: any): any
  export function useMutation(options: any): any
  export function useQueryClient(): {
    getQueryData: (key: any) => any
    setQueryData: (key: any, data: any) => void
    invalidateQueries: (key?: any) => Promise<void>
    cancelQueries: (key?: any) => Promise<void>
  }
}

declare module '@tanstack/react-query-devtools' {
  import * as React from 'react'
  export const ReactQueryDevtools: React.ComponentType<{ initialIsOpen?: boolean }>
}
