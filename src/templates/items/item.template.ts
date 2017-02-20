import { ItemInterface } from './item.interface';
import { timeToPeriodConverter } from '../../lib/time-to-period-converter';

export class ItemTemplate {

    private constructor() {

        let content: DocumentFragment | HTMLElement;

        if ('content' in document.createElement('template')) {
            content = <DocumentFragment>(<HTMLTemplateElement>document.querySelector('#item')).content;
        }
        else {
            // If browser does not support templates
            content = <HTMLElement>document.querySelector('#item').firstChild;
            this.createElement = () => {
                return <HTMLElement>content.cloneNode(true);
            };
        }

        this.content = content;
        this.userImage = <HTMLImageElement>content.querySelector('.item__header-user-image>img');
        this.userName = <HTMLDivElement>content.querySelector('.item__header-user-name');
        this.location = <HTMLDivElement>content.querySelector('.item__header-location');
        this.postingTime = <HTMLDivElement>content.querySelector('.item__header-posting-time');
        this.contentImage = <HTMLImageElement>content.querySelector('.item__content-image>img');
        this.likes = <HTMLButtonElement>content.querySelector('.' + ItemTemplate.getLikesButtonClassName());
        this.contentDescription = <HTMLDivElement>content.querySelector('.item__content-description>div');

    }

    static getInstance(): ItemTemplate {
        if (!ItemTemplate.instance) {
            ItemTemplate.instance = new ItemTemplate();
        }
        return ItemTemplate.instance;
    }

    createHMLElement(item: ItemInterface): HTMLElement {

        this.userImage.src = item.user.profile_picture;
        this.userName.textContent = item.user.username;
        item.location
            ? this.location.textContent = item.location.name
            : this.location.innerHTML = '&nbsp;';
        this.postingTime.textContent = timeToPeriodConverter(item.created_time);
        this.contentImage.src = item.images.low_resolution.url;
        this.likes.textContent = '' + item.likes.count;
        this.likes.dataset['id'] = item.id;
        this.contentDescription.textContent = item.caption
            ? item.caption.text
            : '';

        return this.createElement();
    }

    static getLikesButtonClassName(): string {
        return 'item__content-likes-button';
    }

    content: DocumentFragment;
    userImage: HTMLImageElement;
    userName: HTMLDivElement;
    location: HTMLDivElement;
    postingTime: HTMLDivElement;
    contentImage: HTMLImageElement;
    likes: HTMLButtonElement;
    contentDescription: HTMLDivElement;

    private static instance: ItemTemplate;
    private createElement = () => {
        return <HTMLElement>document.importNode(this.content, true);
    }
}