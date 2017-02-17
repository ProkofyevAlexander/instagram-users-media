import { Ajax } from './lib/ajax';
import { SettingsInterface } from './settings/settings.interface';
import { ItemFactory } from './templates/item/item.factory';

const settings: SettingsInterface = require('./settings/settings.json');

import './styles';
import { ItemInterface } from './templates/item/item.interface';

interface MediaDataInterface {
    data: ItemInterface[];
}

document.addEventListener('DOMContentLoaded', () => {

    const itemFactory = ItemFactory.getInstance();
    const container = <HTMLDivElement>document.querySelector('.main-content');

    Ajax
        .get({
            url: settings.mediaUrl,
            data: {
                access_token: settings.accessToken
            },
            type: 'jsonp'
        })
        .then((data: MediaDataInterface) => {
            container.textContent = '';
            data.data
                .filter(item => item.type === 'image')
                .forEach(item => itemFactory.addToContainer(container, item));
        });
});