import { useState } from 'react';

export function useDisclosure(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((current) => !current);
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}