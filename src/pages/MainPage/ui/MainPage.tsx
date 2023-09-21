import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

const MainPage = () => {
    return (
        <div>
            <h2 className="title">Главная страница</h2>
            <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.serversAndPC}>
                Серверы и ПК
            </AppLink>
        </div>
    );
};

export default MainPage;
