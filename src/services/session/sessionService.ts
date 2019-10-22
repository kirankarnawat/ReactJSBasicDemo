import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';

class SessionService {

    public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations>
    {
        const userJson = sessionStorage.getItem('loginuser');
        let result = userJson !== null ? JSON.parse(userJson) as GetCurrentLoginInformations : new GetCurrentLoginInformations();

        return result;
    }
}

export default new SessionService();
