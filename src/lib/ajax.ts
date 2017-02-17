import { DataObjectInterface } from './data-object.interface';
import { AjaxGetMethodParamsInterface } from './ajax-get-method-params.interface';
import { Dom } from './dom';

export class Ajax {

    static get(params: AjaxGetMethodParamsInterface): Promise<DataObjectInterface> {

        return new Promise<DataObjectInterface>(resolve => {
            if (params.type === 'jsonp') {
                Ajax.loadJSONP(params.url, params.data, resolve);
            }
            else {
                throw (new Error('Unsupported ajax type'));
            }
        });
    }

    private static scriptsCounter = 0;

    private static loadJSONP(url: string,
                             data: DataObjectInterface,
                             resolve: (value?: DataObjectInterface | PromiseLike<DataObjectInterface>) => void) {

        const name = '_jsonp_' + Ajax.scriptsCounter++;

        data['callback'] = name;

        // Create script
        let script = Dom.createScript(url + Ajax.dataToUrlGetParams(data));

        // Setup handler
        window[name] = (responseData: DataObjectInterface) => {
            resolve.call(null, responseData);
            Dom.removeScript(script);
            script = null;
            delete window[name];
        };

        // Load JSON
        Dom.appendScript(script);
    }

    private static dataToUrlGetParams(data: DataObjectInterface): string {

        const keys = Object.keys(data);

        if (keys.length === 0) return '';

        return '?' + keys.map(key => {
                    let value = '';
                    if (['string', 'number', 'boolean'].indexOf(typeof data[key]) !== -1) {
                        value += data[key];
                    }
                    else {
                        value = JSON.stringify(data[key]);
                    }
                    return key + '=' + encodeURI(value);
                })
                .join('&');
    }
}