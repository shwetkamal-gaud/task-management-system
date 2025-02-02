import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    header: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
            <div className="w-200 bg-white rounded-lg shadow-lg">
                <div className="border-b p-4 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">{header}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <X />
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
