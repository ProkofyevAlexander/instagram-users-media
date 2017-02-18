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
        this.itemsContainer.appendChild(this.template.createHMLElement(item));
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