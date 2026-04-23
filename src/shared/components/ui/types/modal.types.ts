export type BaseModalProps = {
    onClose: () => void;
}

export type ModalProps = {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};