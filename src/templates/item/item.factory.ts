import { ItemInterface } from './item.interface';

export class ItemFactory {

    static getInstance() {
        if (!ItemFactory.instance) {
            ItemFactory.instance = new ItemFactory();
        }
        return ItemFactory.instance;
    }

    private constructor() {
        const template = <HTMLTemplateElement>document.querySelector('#item');
        this.content = template.content;
        this.userImage = <HTMLImageElement>this.content.querySelector('.item__header-user-image>img');
        this.userName = <HTMLDivElement>this.content.querySelector('.item__header-user-name');
        this.userFullName = <HTMLDivElement>this.content.querySelector('.item__header-user-full-name');
        this.postingTime = <HTMLDivElement>this.content.querySelector('.item__header-posting-time');
        this.contentImage = <HTMLImageElement>this.content.querySelector('.item__content-image>img');
        this.likes = <HTMLButtonElement>this.content.querySelector('.item__content-likes>button');
        this.contentDescription = <HTMLDivElement>this.content.querySelector('.item__content-description');

        ItemFactory.setListeners();
    }

    addToContainer(container: HTMLElement, item: ItemInterface) {

        this.userImage.src = item.user.profile_picture;
        this.userName.textContent = item.user.username;
        this.userFullName.textContent = item.user.full_name;
        this.postingTime.textContent = '3h';
        this.contentImage.src = item.images.low_resolution.url;
        this.likes.textContent = '' + item.likes.count;
        this.likes.dataset['id'] = item.id;
        if (item.caption) {
            this.contentDescription.textContent = item.caption.text;
        }

        const clone = document.importNode(this.content, true);
        container.appendChild(clone);
    }

    private static instance: ItemFactory;
    private content: DocumentFragment;
    private userImage: HTMLImageElement;
    private userName: HTMLDivElement;
    private userFullName: HTMLDivElement;
    private postingTime: HTMLDivElement;
    private contentImage: HTMLImageElement;
    private likes: HTMLButtonElement;
    private contentDescription: HTMLDivElement;

    private static setListeners() {
        document.addEventListener('click', (e: MouseEvent) => {

        });
    }
}