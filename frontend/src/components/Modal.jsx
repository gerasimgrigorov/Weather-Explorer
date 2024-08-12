import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      modal.showModal();
    }

    return () => {
      if (modal && modal.open) {
        modal.close();
      }
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
