import { ServersAndPCPage } from 'pages/ServersAndPCPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
    MAIN = 'main',
    SERVERS_AND_PC = 'serversAndPC',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SERVERS_AND_PC]: '/serversAndPC',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: { path: RoutePath.main, element: <MainPage /> },
    [AppRoutes.SERVERS_AND_PC]: {
        path: RoutePath.serversAndPC,
        element: <ServersAndPCPage />,
    },
};
