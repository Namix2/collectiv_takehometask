import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategorySelector } from '../components/CategorySelector'
import { PotNameInput } from '../components/PotNameInput';
import type {
  PotCategory,
  PotCreationInput,
  PotValidationErrors,
} from '../features/pot/pot.types';
import {
  hasValidationErrors,
  validatePotCreationInput,
} from '../features/pot/pot.validation';
import { createPot } from '../features/pot/pot.service';

export function HomePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PotCreationInput>({
    name: '',
    category: '',
  });

  const [errors, setErrors] = useState<PotValidationErrors>({});

  function updateName(name: string) {
    setFormData((current) => ({
      ...current,
      name,
    }));
  }

  function updateCategory(category: PotCategory) {
    setFormData((current) => ({
      ...current,
      category,
    }));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const validationErrors = validatePotCreationInput(formData);
  setErrors(validationErrors);

  if (hasValidationErrors(validationErrors)) {
    return;
  } 

  const pot = createPot(formData);

  navigate(`/app/pots/${pot.id}`);
}

  return (
    <main>
      <section>
        <h1>Create a group pot</h1>
        <p>Collect money from your group in one place.</p>

        <form onSubmit={handleSubmit} noValidate>
          <CategorySelector
            value={formData.category}
            error={errors.category}
            onChange={updateCategory}
          />

          <PotNameInput
            value={formData.name}
            error={errors.name}
            onChange={updateName}
          />

          <button type="submit">Create your pot</button>
        </form>
      </section>
    </main>
  );
}