import { ItemInterface } from './item.interface';

export class ItemTemplate {

    private constructor() {

        const template = <HTMLTemplateElement>document.querySelector('#item');
        const content = <DocumentFragment>template.content;

        this.content = content;
        this.userImage = <HTMLImageElement>content.querySelector('.item__header-user-image>img');
        this.userName = <HTMLDivElement>content.querySelector('.item__header-user-name');
        this.userFullName = <HTMLDivElement>content.querySelector('.item__header-user-full-name');
        this.postingTime = <HTMLDivElement>content.querySelector('.item__header-posting-time');
        this.contentImage = <HTMLImageElement>content.querySelector('.item__content-image>img');
        this.likes = <HTMLButtonElement>content.querySelector('.item__content-likes-button');
        this.contentDescription = <HTMLDivElement>content.querySelector('.item__content-description');
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
        this.userFullName.textContent = item.user.full_name;
        this.postingTime.textContent = '3h';
        this.contentImage.src = item.images.low_resolution.url;
        this.likes.textContent = '' + item.likes.count;
        this.likes.dataset['id'] = item.id;
        this.contentDescription.textContent = item.caption
            ? item.caption.text
            : '';

        return <HTMLElement>document.importNode(this.content, true);
    }

    content: DocumentFragment;
    userImage: HTMLImageElement;
    userName: HTMLDivElement;
    userFullName: HTMLDivElement;
    postingTime: HTMLDivElement;
    contentImage: HTMLImageElement;
    likes: HTMLButtonElement;
    contentDescription: HTMLDivElement;

    private static instance: ItemTemplate;
}