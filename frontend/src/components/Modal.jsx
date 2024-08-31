import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth; // getting the width of the scrollbar
    document.body.style.overflow = 'hidden'; // prevent scrolling and maintain scrollbar visibility
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    if (modal) {
      modal.showModal();
    }

    return () => {
      if (modal && modal.open) {
        modal.close();
      }
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
