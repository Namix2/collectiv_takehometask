interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function ActionButton({ children, onClick }: ActionButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}