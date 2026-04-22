import type { BaseModalProps, ModalProps } from "./types/modal.types";

export function Modal({ title, children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                {children}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export function ModalActions({ onClose }: BaseModalProps) {
    return (
        <div className="flex justify-end gap-2 mt-6">
            <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
                Abbrechen
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Speichern
            </button>
        </div>
    );
}