import { makeAutoObservable } from "mobx";

export default class ModalStore {

    isOpen: boolean = false;
    content: JSX.Element | null = null;
    errors: any[] = []

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element) => {
        this.isOpen = true;
        this.content = content;
    }

    closeModal = () => {
        this.isOpen = false;
    }

    setErrors = (errors: any[]) => {
        this.errors = errors;
    }
}

