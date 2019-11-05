import { PagedFilterAndSortedRequest } from '../../vmodel/pagedFilterAndSortedRequest';

export interface PagedUserResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
