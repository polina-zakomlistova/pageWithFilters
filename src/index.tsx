import { render } from 'react-dom';
import App from './app/App';
import { StoreProvider } from 'app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';

render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>,

    document.getElementById('root')
);
