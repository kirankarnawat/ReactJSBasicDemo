import { GetCurrentLoginInformations } from './vmodel/getCurrentLoginInformations';

import storageService from '../storageService';

class SessionService {

    public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations>
    {
        const result = storageService.getUserCookie();
        return result;
    }
}

export default new SessionService();
