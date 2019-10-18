import { routers } from '../components/Router/router.config';

class Utils {

    loadScript(url: string) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    }

    getRoute = (path: string): any => {
        return routers.filter(route => route.path === path)[0];
    };

    getPageTitle = (pathname: string) => {
        const route = routers.filter(route => route.path === pathname);
        return route[0].title ;
    };
}

export default new Utils();
