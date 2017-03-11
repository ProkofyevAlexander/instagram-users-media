import { ItemInterface } from './item.interface';
import { ItemTemplate } from './item.template';

const COLUMN_WIDTH = 350;
const ITEMS_CONTAINER_CLASS_NAME = 'items-container';
const ITEMS_COLUMN_CLASS_NAME = 'items-column';

export class ItemsContainer {

    constructor(container: HTMLElement) {

        if (!ItemsContainer.listenersInitialized) {
            this.setListeners();
            ItemsContainer.listenersInitialized = true;
        }

        this.template = ItemTemplate.getInstance();
        this.createItemsContainer(container);
    }

    addItem(item: ItemInterface) {
        let itemHtmlElement = this.template.createHMLElement(item);
        this.items.push(itemHtmlElement.cloneNode(true));
        this.itemsColumns[this.items.length % this.itemsColumns.length].appendChild(itemHtmlElement);
    }

    private static listenersInitialized = false;
    private template: ItemTemplate;
    private itemsContainer: HTMLDivElement;
    private itemsColumns: HTMLDivElement[] = [];
    private items: Node[] = [];
    private tempContainer: HTMLDivElement;

    private createItemsContainer(container: HTMLElement): void {
        this.itemsContainer = document.createElement('div');
        this.itemsContainer.classList.add(ITEMS_CONTAINER_CLASS_NAME);
        container.appendChild(this.itemsContainer);
        this.tempContainer = document.createElement('div');
        this.tempContainer.style.display = 'none';
        this.initColumns();
    }

    private setListeners() {
        document.addEventListener('click', (e: MouseEvent) => {
            const target = <HTMLElement>e.target;
            if (target.classList.contains(ItemTemplate.getLikesButtonClassName())) {
                alert(target.dataset['id']);
            }
        });
        window.addEventListener('resize', () => {
            if (this.getColumnsNum() === this.itemsColumns.length) return;
            this.initColumns();
            this.addItemsToColumns();
        });
    }

    private createColumn() {
        const column = document.createElement('div');
        column.classList.add(ITEMS_COLUMN_CLASS_NAME);
        this.itemsContainer.appendChild(column);
        this.itemsColumns.push(column);
    }

    private initColumns() {
        this.itemsColumns = [];
        this.itemsContainer.innerHTML = '';
        const columnsNum = this.getColumnsNum();
        for (let i = 0; i < columnsNum; i++) {
            this.createColumn();
        }
    }

    private getColumnsNum() {
        return Math.floor(document.documentElement.clientWidth / COLUMN_WIDTH) || 1;
    }

    private addItemsToColumns() {
        this.items.forEach((item, index) => {
            this.itemsColumns[index % this.itemsColumns.length].appendChild(item.cloneNode(true));
        });
    }
}