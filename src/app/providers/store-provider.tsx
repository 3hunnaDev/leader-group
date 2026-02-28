import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { appStore } from '../store/app-store'

export function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={appStore}>{children}</Provider>
}
