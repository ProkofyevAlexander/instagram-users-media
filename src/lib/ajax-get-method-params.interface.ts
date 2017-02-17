import { DataObjectInterface } from './data-object.interface';

export interface AjaxGetMethodParamsInterface {
    url: string;
    data: DataObjectInterface;
    type: 'jsonp';
}