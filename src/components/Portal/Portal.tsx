import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Portal = ({ isOpen, onClose, children }: PortalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div
      id="portal"
      className="fixed inset-0 flex items-center justify-center bg-amber-950/20"
      onClick={onClose}
    >
      {' '}
      <div
        className="bg-black p-6 rounded relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Portal;
