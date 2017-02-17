export class Dom {

    static getDocumentHead(): HTMLHeadElement {
        if (!Dom.documentHead) {
            Dom.documentHead = document.getElementsByTagName('head')[0];
        }
        return Dom.documentHead;
    }

    static appendScript(script: HTMLScriptElement): void {
        Dom.getDocumentHead().appendChild(script);
    }

    static removeScript(script: HTMLScriptElement): void {
        Dom.getDocumentHead().removeChild(script);
    }

    static createScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        return script;
    }

    private static documentHead: HTMLHeadElement;
}