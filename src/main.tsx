import ReactDOM from 'react-dom/client'
import { App } from '@/app'
import { StoreProvider } from '@/app/providers/storeProvider'

import '@/app/style/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
)
