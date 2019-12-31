
import { action, observable, runInAction } from 'mobx';

import groupService from '../services/group/groupService';
import sessionService from '../services/session/sessionService';

import { EntityDto } from '../services/dto/entityDto';

import { Group1NameExistsCheckRequest } from '../services/group/dto/Request/group1NameExistsCheckRequest';
import { Group1Response } from '../services/group/dto/Response/group1Response';
import { SaveGroup1Request } from '../services/group/dto/Request/saveGroup1Request';

import { Group2NameExistsCheckRequest } from '../services/group/dto/Request/group2NameExistsCheckRequest';
import { Group2Response } from '../services/group/dto/Response/group2Response';
import { SaveGroup2Request } from '../services/group/dto/Request/saveGroup2Request';

import { Group3NameExistsCheckRequest } from '../services/group/dto/Request/group3NameExistsCheckRequest';
import { Group3Response } from '../services/group/dto/Response/group3Response';
import { SaveGroup3Request } from '../services/group/dto/Request/saveGroup3Request';

import { Group4NameExistsCheckRequest } from '../services/group/dto/Request/group4NameExistsCheckRequest';
import { Group4Response } from '../services/group/dto/Response/group4Response';
import { SaveGroup4Request } from '../services/group/dto/Request/saveGroup4Request';

import { Group5NameExistsCheckRequest } from '../services/group/dto/Request/group5NameExistsCheckRequest';
import { Group5Response } from '../services/group/dto/Response/group5Response';
import { SaveGroup5Request } from '../services/group/dto/Request/saveGroup5Request';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { LookupByTypeRequest } from '../services/dto/lookupByTypeRequest';
import { LookupByTypeResponse } from '../services/dto/lookupByTypeResponse';

class GroupStore {

    @observable userid!: string;
    @observable grExists!: string;
    @observable gr1ById !: Group1Response;
    @observable gr2ById !: Group2Response;
    @observable gr3ById !: Group3Response;
    @observable gr4ById !: Group4Response;
    @observable gr5ById !: Group5Response;
    @observable gr1All !: PagedResultDto<Group1Response>;
    @observable gr2All !: PagedResultDto<Group2Response>;
    @observable gr3All !: PagedResultDto<Group3Response>;
    @observable gr4All !: PagedResultDto<Group4Response>;
    @observable gr5All !: PagedResultDto<Group5Response>;
    @observable groupLevelMaster !: PagedResultDto<LookupByTypeResponse>;

    @action
    async getLevelMasterData(lookupByTypeRequest: LookupByTypeRequest) {

        let result = await groupService.getLevelMasterData(lookupByTypeRequest);

        runInAction(() => {
            this.groupLevelMaster = result;
            this.userid = sessionService.getLoginUserId();
        });
    }

    // #region Group1 Actions
    @action
    async checkIsGroup1NameInUse(grNameCheckRequest: Group1NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup1NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup1Data() {

        let result = await groupService.getAllGroup1();

        runInAction(() => {
            this.gr1All = result;
            this.gr2All = { items: [], totalCount: 0 };
            this.gr3All = { items: [], totalCount: 0 };
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup1DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup1ById(entityDto);

        runInAction(() => {
            this.gr1ById = result;
        });
    }

    @action
    async createGroup1() {

        runInAction(() => {
            this.gr1ById = {
                cityId: '', countryId: '', createdDateDisplay: '', creatorName: '', description: '', group1Id: '', group1Name: '', isSuccess: true, lastModifiedDateDisplay: '', stateId: '', status: true, totalCount: 0, totalMemberCount: 0, zipCode: ''
            };
        });
    }


    @action
    async saveGroup1Data(saveGroup1Request: SaveGroup1Request) {

        let result = await groupService.saveGroup1Data(saveGroup1Request);

        return result;
    }

    // #endregion

    // #region Group2 Actions
    @action
    async checkIsGroup2NameInUse(grNameCheckRequest: Group2NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup2NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup2Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup2(entityDto);

        runInAction(() => {
            this.gr2All = result;
            this.gr3All = { items: [], totalCount: 0 };
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup2DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup2ById(entityDto);

        runInAction(() => {
            this.gr2ById = result;
        });
    }

    @action
    async createGroup2() {

        runInAction(() => {
            this.gr2ById = {
                cityId: '', countryId: '', createdDateDisplay: '', creatorName: '', description: '', group1Id: '', group2Id: '', group2Name: '', isSuccess: true, lastModifiedDateDisplay: '', stateId: '', status: true, totalCount: 0, totalMemberCount: 0, zipCode: '', isVirtual: true
            };
        });
    }


    @action
    async saveGroup2Data(saveGroup2Request: SaveGroup2Request) {

        let result = await groupService.saveGroup2Data(saveGroup2Request);

        return result;
    }

    // #endregion

    // #region Group3 Actions
    @action
    async checkIsGroup3NameInUse(grNameCheckRequest: Group3NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup3NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup3Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup3(entityDto);

        runInAction(() => {
            this.gr3All = result;
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup3DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup3ById(entityDto);

        runInAction(() => {
            this.gr3ById = result;
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async createGroup3() {

        runInAction(() => {
            this.gr3ById = {
                cityId: '', countryId: '', createdDateDisplay: '', creatorName: '', description: '', group2Id: '', group3Id: '', group3Name: '', isSuccess: true, lastModifiedDateDisplay: '', stateId: '', status: true, totalCount: 0, totalMemberCount: 0, zipCode: '', isVirtual: true
            };
        });
    }


    @action
    async saveGroup3Data(saveGroup3Request: SaveGroup3Request) {

        let result = await groupService.saveGroup3Data(saveGroup3Request);

        return result;
    }

    // #endregion

    // #region Group4 Actions
    @action
    async checkIsGroup4NameInUse(grNameCheckRequest: Group4NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup4NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup4Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup4(entityDto);

        runInAction(() => {
            this.gr4All = result;
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup4DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup4ById(entityDto);

        runInAction(() => {
            this.gr4ById = result;
        });
    }

    @action
    async createGroup4() {

        runInAction(() => {
            this.gr4ById = {
                cityId: '', countryId: '', createdDateDisplay: '', creatorName: '', description: '', group3Id: '', group4Id: '', group4Name: '', isSuccess: true, lastModifiedDateDisplay: '', stateId: '', status: true, totalCount: 0, totalMemberCount: 0, zipCode: '', isVirtual: true
            };
        });
    }


    @action
    async saveGroup4Data(saveGroup4Request: SaveGroup4Request) {

        let result = await groupService.saveGroup4Data(saveGroup4Request);

        return result;
    }

    // #endregion

    // #region Group5 Actions
    @action
    async checkIsGroup5NameInUse(grNameCheckRequest: Group5NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup5NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup5Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup5(entityDto);

        runInAction(() => {
            this.gr5All = result;
        });
    }

    @action
    async getGroup5DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup5ById(entityDto);

        runInAction(() => {
            this.gr5ById = result;
        });
    }

    @action
    async createGroup5() {

        runInAction(() => {
            this.gr5ById = {
                cityId: '', countryId: '', createdDateDisplay: '', creatorName: '', description: '', group4Id: '', group5Id: '', group5Name: '', location: '', isSuccess: true, lastModifiedDateDisplay: '', stateId: '', status: true, totalCount: 0, totalMemberCount: 0, zipCode: '', isVirtual: true
            };
        });
    }


    @action
    async saveGroup5Data(saveGroup5Request: SaveGroup5Request) {

        let result = await groupService.saveGroup5Data(saveGroup5Request);

        return result;
    }

    // #endregion
}
export default GroupStore;
