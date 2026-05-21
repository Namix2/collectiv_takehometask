import { Link, useParams } from 'react-router-dom';
import { ActionButton } from '../components/ActionButton';
import { SignUpModal } from '../components/SignUpModal';
import { getPotById } from '../features/pot/pot.storage';
import { useDisclosure } from '../hooks/useDisclosure';
 

export function PotPage() {
  const { potId } = useParams<{ potId: string }>();
  const signUpModal = useDisclosure();

  if (!potId) {
    return (
      <main>
        <h1>Pot not found</h1>
        <p>No pot ID was provided.</p>
        <Link to="/">Return to homepage</Link>
      </main>
    );
  }

  const pot = getPotById(potId);

  if (!pot) {
    return (
      <main>
        <h1>Pot not found</h1>
        <p>This pot could not be found in browser storage.</p>
        <Link to="/">Create a new pot</Link>
      </main>
    );
  }

  return (
    <main>
      <section>
        <p>Pot created successfully</p>

        <h1>{pot.name}</h1>

        <p>Category: {pot.category}</p>

        <div>
          <ActionButton onClick={signUpModal.open}>Invite people</ActionButton>
          <ActionButton onClick={signUpModal.open}>Share pot</ActionButton>
          <ActionButton onClick={signUpModal.open}>Add bank details</ActionButton>
          <ActionButton onClick={signUpModal.open}>Start collecting</ActionButton>
        </div>
      </section>

      <SignUpModal
        isOpen={signUpModal.isOpen}
        onClose={signUpModal.close}
      />
    </main>
  );
}