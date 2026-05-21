import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import penIcon from '../assets/pen.svg';
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
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] px-4 py-8 font-body text-brand-indigo">
      <section className="mx-auto w-full max-w-[606px]">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-[28px] border border-border-soft bg-white px-6 py-7 shadow-[0_12px_32px_rgba(30,27,75,0.08)] sm:px-7 sm:py-8"
          noValidate
        >
          <CategorySelector
            value={formData.category}
            error={errors.category}
            onChange={updateCategory}
          />

          <PotNameInput
            value={formData.name}
            error={errors.name}
            onChange={updateName}
            icon={<img src={penIcon} alt="" className="block size-5" />}
          />

          <button
            type="submit"
            className="mt-1 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-accent-yellow px-5 font-display text-[18px] cursor-pointer font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/60"
          >
            Create your pot
          </button>

          <div className="mt- flex items-center justify-center gap-2 text-center">
            <span className="text-[15px] tracking-[0.18em] text-[#F4B400]">
              {'\u2605\u2605\u2605\u2605\u2605'}
            </span>
            <span className="text-[14px] font-normal text-[#6B7280] font-display">
              Trusted by 3000+ App Store reviewers
            </span>
          </div>
        </form>
      </section>
    </main>
  );
}
