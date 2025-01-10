import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {TodoProviderComponent} from './TodoContext.tsx'

createRoot(document.getElementById('root')!).render(
    <TodoProviderComponent>
        <App />
    </TodoProviderComponent>
)
