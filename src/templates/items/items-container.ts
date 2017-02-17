import { ItemInterface } from './item.interface';
import { ItemTemplate } from './item.template';

export class ItemsContainer {

    constructor(container: HTMLElement) {

        if (!ItemsContainer.listenersInitialized) {
            ItemsContainer.setListeners();
            ItemsContainer.listenersInitialized = true;
        }

        this.template = ItemTemplate.getInstance();
        this.createItemsContainer(container);
    }

    addItem(item: ItemInterface) {

        const template = this.template;

        template.userImage.src = item.user.profile_picture;
        template.userName.textContent = item.user.username;
        template.userFullName.textContent = item.user.full_name;
        template.postingTime.textContent = '3h';
        template.contentImage.src = item.images.low_resolution.url;
        template.likes.textContent = '' + item.likes.count;
        template.likes.dataset['id'] = item.id;
        template.contentDescription.textContent = item.caption
            ? item.caption.text
            : '';

        const clone = document.importNode(template.content, true);
        this.itemsContainer.appendChild(clone);
    }

    private static listenersInitialized = false;
    private template: ItemTemplate;
    private itemsContainer: HTMLDivElement;

    private createItemsContainer(container: HTMLElement): void {
        this.itemsContainer = document.createElement('div');
        this.itemsContainer.classList.add('items-container');
        container.appendChild(this.itemsContainer);
    }

    private static setListeners() {
        document.addEventListener('click', (e: MouseEvent) => {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('item__content-likes-button')) {
                alert(target.dataset['id']);
            }
        });
    }
}