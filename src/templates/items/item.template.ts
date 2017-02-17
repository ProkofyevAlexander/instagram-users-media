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