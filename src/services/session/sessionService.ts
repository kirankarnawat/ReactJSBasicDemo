import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';

declare var lms: any;

class SessionService {

    public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations>
    {
        const userJson =lms.session.getUserCookie();
        
        let result = userJson !== null ? JSON.parse(userJson) as GetCurrentLoginInformations : new GetCurrentLoginInformations();

        return result;
    }
}

export default new SessionService();
