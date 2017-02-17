import { Ajax } from './lib/ajax';
import { SettingsInterface } from './settings/settings.interface';
import { ItemsContainer } from './templates/items/items-container';

const settings: SettingsInterface = require('./settings/settings.json');

import './styles';
import { ItemInterface } from './templates/items/item.interface';

interface MediaDataInterface {
    data: ItemInterface[];
}

document.addEventListener('DOMContentLoaded', () => {

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
            const itemsContainer = new ItemsContainer(container);
            data.data
                .filter(item => item.type === 'image')
                .forEach(item => itemsContainer.addItem(item));
        });
});