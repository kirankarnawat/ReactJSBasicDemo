import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';
import storageService from '../storageService';

class SessionService {

    public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations>
    {
        const result = storageService.getUserCookie();
        return result;
    }

    public getLoginUserId(): string
    {
        const result = storageService.getUserCookie();
        return result.user.userId;
    }
}

export default new SessionService();
