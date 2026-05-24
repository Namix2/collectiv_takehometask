import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import penIcon from "../assets/pen.svg";
import { CategorySelector } from "../components/CategorySelector";
import { PotNameInput } from "../components/PotNameInput";
import { FormPromptModal } from "../components/home/FormPromptModal";
import { HomeHero } from "../components/home/HomeHero";
import { HomeStaticSections } from "../components/home/HomeStaticSections";
import { createPot } from "../features/pot/pot.service";
import type { PotCategory, PotCreationInput } from "../features/pot/pot.types";
import { validatePotCreationInput } from "../features/pot/pot.validation";

type FormPromptConfig = {
  action: "category" | "name";
  body: string;
  ctaLabel: string;
  title: string;
};

export function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PotCreationInput>({
    name: "",
    category: "",
  });
  const [formPrompt, setFormPrompt] = useState<FormPromptConfig | null>(null);

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

  function continuePotCreation() {
    const validationErrors = validatePotCreationInput(formData);

    if (validationErrors.name) {
      setFormPrompt({
        action: "name",
        body: validationErrors.name,
        ctaLabel: "Add a pot name",
        title: "Give your pot a name first",
      });
      return;
    }

    if (validationErrors.category) {
      setFormPrompt({
        action: "category",
        body: validationErrors.category,
        ctaLabel: "Choose a category",
        title: "Pick what you're collecting for",
      });
      return;
    }

    setFormPrompt(null);

    const pot = createPot(formData);

    navigate(`/app/pots/${pot.id}`, {
      state: {
        creationFlow: true,
      },
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    continuePotCreation();
  }

  function closeFormPrompt() {
    setFormPrompt(null);
  }

  const isFormPromptReady =
    formPrompt?.action === "name"
      ? Boolean(formData.name.trim())
      : formPrompt?.action === "category"
        ? Boolean(formData.category)
        : false;

  const isSubmitDisabled = !formData.name.trim() && !formData.category;

  return (
    <main className="bg-white font-body text-brand-indigo">
      <HomeHero
        formData={formData}
        isSubmitDisabled={isSubmitDisabled}
        onCategoryChange={updateCategory}
        onNameChange={updateName}
        onSubmit={handleSubmit}
      />

      <HomeStaticSections />

      <FormPromptModal
        action={formPrompt?.action ?? "name"}
        body={formPrompt?.body ?? ""}
        ctaLabel={formPrompt?.ctaLabel ?? "Continue"}
        isContinueDisabled={!isFormPromptReady}
        isOpen={Boolean(formPrompt)}
        onClose={closeFormPrompt}
        onContinue={continuePotCreation}
        title={formPrompt?.title ?? ""}
      >
        {formPrompt?.action === "name" ? (
          <PotNameInput
            inputId="pot-name-modal"
            value={formData.name}
            onChange={updateName}
            icon={<img src={penIcon} alt="" className="block size-5" />}
          />
        ) : (
          <CategorySelector value={formData.category} onChange={updateCategory} />
        )}
      </FormPromptModal>
    </main>
  );
}
