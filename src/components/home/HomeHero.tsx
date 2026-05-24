import type { FormEventHandler } from "react";
import collctivLogo from "../../assets/collctivLogo_indigo.svg";
import heroImg from "../../assets/heroimg.svg";
import penIcon from "../../assets/pen.svg";
import { CategorySelector } from "../CategorySelector";
import { PotNameInput } from "../PotNameInput";
import { HomepageCta } from "./HomepageCta";
import type { PotCategory, PotCreationInput } from "../../features/pot/pot.types";

interface HomeHeroProps {
  formData: PotCreationInput;
  isSubmitDisabled: boolean;
  onCategoryChange: (category: PotCategory) => void;
  onNameChange: (name: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function HomeHero({
  formData,
  isSubmitDisabled,
  onCategoryChange,
  onNameChange,
  onSubmit,
}: HomeHeroProps) {
  return (
    <section className="items-center px-4 pb-12 pt-6 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto max-w-[1200px] flex-col items-center">
        <header className="mx-auto flex w-full max-w-[1080px] flex-wrap items-center justify-center gap-4 sm:justify-between">
          <div className="flex items-center gap-2">
            <img src={collctivLogo} alt="Collctiv" className="h-10 w-auto sm:h-11 md:h-12" />
          </div>

          <nav className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:gap-3">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-full border border-[#c9cce2] px-3 text-sm font-semibold text-[#4f5670] transition hover:border-[#adb4d4] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 sm:px-4"
            >
              Login
            </button>
            <HomepageCta />
          </nav>
        </header>

        <div className="grid items-center gap-8 pt-8 sm:gap-10 sm:pt-10 lg:gap-14">
          <div className="px-1 sm:px-3 lg:px-5">
            <h1 className="text-center font-body text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#322d5a]">
              Collect money without sharing bank details.
            </h1>
            <p className="mx-auto mt-3 max-w-[42rem] text-center font-display text-[clamp(0.95rem,2.8vw,1.125rem)] font-normal leading-7 text-[#4B5563] sm:whitespace-nowrap sm:leading-8">
              Organise the things you love with the people you love, without getting stuck
              with the bill.
            </p>

            <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,1fr)] lg:gap-10">
              <div className="mx-auto w-full max-w-[38rem] lg:mx-0">
                <form
                  onSubmit={onSubmit}
                  className="flex w-full flex-col gap-4 rounded-[28px] border border-border-soft bg-white px-5 py-6 shadow-[0_12px_32px_rgba(30,27,75,0.08)] sm:px-6 sm:py-6"
                  noValidate
                >
                  <CategorySelector value={formData.category} onChange={onCategoryChange} />

                  <PotNameInput
                    value={formData.name}
                    onChange={onNameChange}
                    icon={<img src={penIcon} alt="" className="block size-5" />}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-yellow px-5 font-display text-base font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/60 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:brightness-100 sm:text-[18px]"
                  >
                    Create your pot
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                    <span className="text-[15px] tracking-[0.18em] text-[#F4B400]">
                      {"\u2605\u2605\u2605\u2605\u2605"}
                    </span>
                    <span className="font-display text-[14px] font-normal text-[#6B7280]">
                      Trusted by 3000+ App Store reviewers
                    </span>
                  </div>
                </form>
              </div>

              <div className="relative mx-auto flex w-full max-w-[22rem] justify-center sm:max-w-[28rem] lg:max-w-[28rem]">
                <img src={heroImg} alt="" aria-hidden="true" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
