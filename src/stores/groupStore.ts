
import { action, observable } from 'mobx';


class GroupStore {

    @observable userid!: string;

    @action
    async getAll() {

        let result = '';
        return result;
    }

}
export default GroupStore;
