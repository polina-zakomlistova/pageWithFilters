import { Suspense } from 'react';
import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from 'app/providers/RouterProvider';
import { Navbar } from 'widgets/Navbar';

const App = () => {
    return (
        <div className="app">
            <Suspense fallback="">
                <div className="container">
                    <Navbar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
