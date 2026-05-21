interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  if (!isOpen) return null;

  return (
    <div role="presentation">
      <div role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
        <h2 id="signup-modal-title">Create an account to continue</h2>

        <p>
          Sign up to manage your pot, invite contributors, and start collecting
          money.
        </p>

        <button type="button">Sign up</button>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}