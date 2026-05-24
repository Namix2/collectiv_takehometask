import { useState } from "react";
import { useNavigate } from "react-router-dom";
import penIcon from "../assets/pen.svg";
import { CategorySelector } from "../components/CategorySelector";
import collctivLogo from "../assets/collctivLogo_indigo.svg";
import heroImg2 from "../assets/hero2img.svg";
import { PotNameInput } from "../components/PotNameInput";
import heroImg from "../assets/heroimg.svg";
import type {
  PotCategory,
  PotCreationInput,
  PotValidationErrors,
} from "../features/pot/pot.types";
import {
  hasValidationErrors,
  validatePotCreationInput,
} from "../features/pot/pot.validation";
import { createPot } from "../features/pot/pot.service";

const steps = [
  {
    title: "Create your Pot",
    body: "Build a custom collection page in moments, then share the link anywhere you need it.",
  },
  {
    title: "Share the Pot link",
    body: "Drop it into chats, email threads, and social posts so everyone can pay in the way that suits them.",
  },
  {
    title: "Spend the money",
    body: "Use the collected funds for the thing you organised without passing your own bank details around.",
  },
];

const testimonials = [
  {
    title: "Boss Lady D",
    body: "No more chasing parents for cash, simply pull out the app, scan the code and spend the link.",
  },
  {
    title: "Claire",
    body: "Perfect for a class collection for teacher gifts. Really easy to use and I would definitely recommend.",
  },
  {
    title: "Prudent O",
    body: "Brilliant app to help collection of funds for different activities and also helps keep track of money.",
  },
];

const faqs = [
  {
    title: "How much does it cost?",
    body: "Collctiv is completely free to use! You can collect and withdraw funds for free 🙌. Since we do have costs to be able to exist, we've created an exciting option for our amazing customers to contribute to the ongoing development of Collctiv. By giving you the option to tip, you become an essential part of our mission to help groups come together and do the things they love. When it's time to withdraw your funds, we believe in giving you control - if you’d like to support us in our journey, you can opt-in to contribute 2% of your withdrawn amount to Collctiv. You can read more about our optional tips in our FAQ here.",
  },
  {
    title: "How do I know my money is safe?",
    body: "We take security very seriously and as such have designed the app with rigorous controls in place. We partner with third parties who specialise in providing security for different elements of the app. We use Nuvei and PayPoint Plc as globally-trusted and FCA-regulated payment processors and Persona to verify the identity of anyone collecting and withdrawing money from the Collctiv app. All of our payments are 3D secured by default, meaning that we ask your bank or card issuer to require you to authorise any payment you make into a Collctiv pot, if they have those controls in place.",
  },
  {
    title: "Who are Collctiv?",
    body: "We're a friendly bunch based in the UK 🇬🇧 We're a FinTech company, which simply means we use state-of-the-art financial technology 🤓 to make it easier for you to split payments with your friends. More specifically, we make it easier for you to collect money upfront from your group, so you don't have to pay out for people, crossing your fingers 🤞 and hoping they pay you back. Our founders are Amy Whitell (CEO) and Pete Casson (CTO), who between them have over 40 years experience building technologies and businesses that have real impact on people's lives. More importantly, Pete (a Contributor) used to owe Amy (an Organiser) money all of the time. Nowadays he has no excuse, and everything is right with the world 😌",
  },
  {
    title: "How can I get help if I need it?",
    body: "We like to think of ourselves as a helpful bunch. We've built this app to help you collect money from your friends, and to help your friends to chip in to group gifts and activities more easily. And if you are having any issues at all, we'd love to help! In fact, we relish the challenge 💪 You can reach us via:",
  },
];

const footerColumns: Array<{ heading: string; items: string[] }> = [
  { heading: "Navigation", items: ["Home", "About Us", "Blog", "Support"] },
  {
    heading: "Product",
    items: ["Login", "App Store", "Google Pay", "Payment Pools"],
  },
  {
    heading: "Legal",
    items: ["Terms & Conditions", "Privacy Policy", "Cookies"],
  },
  {
    heading: "More",
    items: ["Contact Us", "Careers", "Gift Collections", "FAQs"],
  },
];

const stackBars = [
  { left: 0, bottom: 0, width: 168 },
  { left: 24, bottom: 20, width: 158 },
  { left: 58, bottom: 44, width: 142 },
];

function FeatureCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <article className="flex flex-col items-center text-center">
      <div
        aria-hidden="true"
        className={`mb-5 flex size-24 items-center justify-center rounded-[28px] ${accent}`}
      >
        <div className="size-12 rounded-full bg-white/90" />
      </div>
      <h3 className="font-display text-[22px] font-bold tracking-[-0.03em] text-[#3f4a5d]">
        {title}
      </h3>
      <p className="mt-3 max-w-[270px] text-[15px] leading-6 text-[#667085]">
        {body}
      </p>
    </article>
  );
}

function TestimonialCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-[#e6e8f1] bg-white p-4 shadow-[0_10px_20px_rgba(18,24,40,0.04)]">
      <div
        className="mb-2 h-3 w-16 rounded-full bg-[#ffd84f]"
        aria-hidden="true"
      />
      <h3 className="font-display text-sm font-bold text-[#445164]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#667085]">{body}</p>
    </article>
  );
}

function HomepageCta({ label = "Collect money now" }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center rounded-full bg-accent-yellow px-5 font-body text-sm font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/60"
    >
      {label}
    </button>
  );
}

export function HomePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PotCreationInput>({
    name: "",
    category: "",
  });

  const [errors, setErrors] = useState<PotValidationErrors>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  function toggleFaq(index: number) {
    setOpenFaqIndex((current) => (current === index ? null : index));
  }

  return (
    <main className="bg-white font-body text-brand-indigo">
      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-10 items-center">
        <div className="mx-auto max-w-[1200px] flex-col items-center">
          <header className="mx-auto flex w-full max-w-[1080px] items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src={collctivLogo}
                alt="Collctiv"
                className="h-50px w-auto sm:h-50px"
              />
            </div>

            <nav className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-full border border-[#c9cce2] px-4 text-sm font-semibold text-[#4f5670] transition hover:border-[#adb4d4] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
              >
                Login
              </button>
              <HomepageCta />
            </nav>
          </header>

          <div className="grid items-center gap-10 pt-10 lg:gap-14">
            <div className="px-5">
              <h1 className=" font-body text-center text-5xl font-bold tracking-[-0.96px] text-[#322d5a]">
                Collect money without sharing bank details.
              </h1>
              <p className="mt-3 font-display text-lg text-center leading-8 font-normal text-[#4B5563]">
                Organise the things you love with the people you love, without
                getting stuck with the bill.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div className=" max-w-[606px]">
                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-3.75 rounded-[28px] border border-border-soft bg-white px-6 py-7 shadow-[0_12px_32px_rgba(30,27,75,0.08)] sm:px-6 sm:py-6"
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
                      icon={
                        <img src={penIcon} alt="" className="block size-5" />
                      }
                    />

                    <button
                      type="submit"
                      className="mt-1 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-accent-yellow px-5 font-display text-[18px] cursor-pointer font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/60"
                    >
                      Create your pot
                    </button>

                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-[15px] tracking-[0.18em] text-[#F4B400]">
                        {"\u2605\u2605\u2605\u2605\u2605"}
                      </span>
                      <span className="font-display text-[14px] font-normal text-[#6B7280]">
                        Trusted by 3000+ App Store reviewers
                      </span>
                    </div>
                  </form>
                </div>

                <div className="relative w-full max-w-[564px] flex justify-center">
                  <img src={heroImg} alt="Collctiv" className=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1B0273] px-4 py-20 text-white sm:px-6 lg:px-10 flex justify-center">
        <div className="mx-auto grid w-full max-w-[1080px] items-start lg:grid-cols-[minmax(0,1fr)_432px]">
          <div>
            <div className="max-w-[648px]">
              <h2 className="font-body max-w-[612px] text-[51.5px] leading-17 mt-5 mr-9 font-bold">
                Organise the things you love with the people you love - without
                getting stuck with the bill.
              </h2>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              <p className="max-w-[620px] text-[18px] leading-6 text-white font-normal ">
                We know it can be super awkward (and frustrating!) chasing
                people down for money, so we've made it easy to collect money
                from groups of people. Here's how:
              </p>
              <ol className="max-w-[680px] font-body space-y-6 text-[18px] font-normal leading-6 text-white">
                <li>
                  1) You request money from friends by sending them a custom
                  payment link or QR code.
                </li>
                <li>
                  2) They use Apple Pay, Google Pay or their digital wallet to
                  pay you (no bank details, account creation, or app download
                  required).
                </li>
              </ol>
              <div className="">
                <HomepageCta />
              </div>
            </div>
          </div>
          <img
            src={heroImg2}
            alt="heroImage2"
            className="w-[432px] self-start justify-self-end"
          />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-center font-display text-[clamp(2.3rem,4vw,4rem)] font-bold tracking-[-0.05em] text-[#445164]">
            How does Collctiv work?
          </h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            <FeatureCard
              title={steps[0].title}
              body={steps[0].body}
              accent="bg-[linear-gradient(135deg,#ff2b91,#f2167d)]"
            />
            <FeatureCard
              title={steps[1].title}
              body={steps[1].body}
              accent="bg-[linear-gradient(135deg,#4b9bff,#7ed3ff)]"
            />
            <FeatureCard
              title={steps[2].title}
              body={steps[2].body}
              accent="bg-[linear-gradient(135deg,#d4af37,#f7e27b)]"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1180px] space-y-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em] text-[#445164]">
                Customise your Pot
              </h2>
              <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-[#667085]">
                Add a closing date, show who has paid, or attach extra
                information about the collection and where the money is going.
              </p>
              <div className="mt-8">
                <HomepageCta />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative rounded-[30px] bg-[#12a3b5] px-9 py-8 text-white shadow-[0_18px_36px_rgba(18,163,181,0.25)]">
                <div className="absolute -right-4 -top-5 rotate-12 rounded-2xl bg-[#6b4cff] px-5 py-3 font-display text-[34px] font-bold">
                  10
                </div>
                <div className="absolute -left-4 top-4 h-10 w-10 rounded-full bg-accent-yellow" />
                <p className="relative font-display text-[42px] font-bold leading-none tracking-[-0.05em]">
                  Jenny&apos;s
                </p>
                <p className="relative mt-2 font-display text-[42px] font-bold leading-none tracking-[-0.05em]">
                  Birthday Gift
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
            <div className="rounded-[26px] border-[6px] border-[#11a7ba] bg-white p-4 shadow-[0_18px_36px_rgba(17,167,186,0.16)]">
              <div className="space-y-3">
                {[
                  ["\u00A3250.00", "Jenny’s Birthday Present"],
                  ["\u00A367.00", "Thursday Tennis"],
                  ["\u00A33,650.00", "New York Holiday"],
                ].map(([amount, label]) => (
                  <div
                    key={amount}
                    className="rounded-2xl border border-[#dce6ee] bg-[#fbfdff] px-4 py-3"
                  >
                    <p className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#445164]">
                      {amount}
                    </p>
                    <p className="mt-1 text-sm text-[#7b8698]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="max-w-[520px] font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em] text-[#445164]">
                Keep money separate from your bank
              </h2>
              <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-[#667085]">
                Keep track of who&apos;s paid what and when, without mixing
                group money into your personal account.
              </p>
              <div className="mt-8">
                <HomepageCta />
              </div>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <h2 className="max-w-[520px] font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em] text-[#445164]">
                Making a payment takes seconds
              </h2>
              <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-[#667085]">
                Anyone paying into the collection can use their preferred wallet
                or card flow. You do not need to sign up for an account or
                download an app to pay.
              </p>
              <div className="mt-8">
                <HomepageCta />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["VISA", "mastercard", "G Pay", "Apple Pay"].map((item) => (
                <div
                  key={item}
                  className="flex h-24 items-center justify-center rounded-2xl border border-[#dce2ef] bg-white font-display text-[28px] font-bold text-[#445164] shadow-[0_10px_20px_rgba(18,24,40,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-56 w-72">
                {stackBars.map((stack, index) => (
                  <div
                    key={index}
                    className="absolute h-14 rounded-full bg-[linear-gradient(180deg,#d7b93a,#a58812)] shadow-[0_10px_20px_rgba(165,136,18,0.25)]"
                    style={{
                      left: stack.left,
                      bottom: stack.bottom,
                      width: stack.width,
                    }}
                  />
                ))}
                <div className="absolute left-20 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe58f,#d4af37_55%,#9d7c05)] shadow-[0_16px_28px_rgba(165,136,18,0.28)]" />
              </div>
            </div>

            <div>
              <h2 className="max-w-[520px] font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em] text-[#445164]">
                Spend the money instantly
              </h2>
              <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-[#667085]">
                Use the collected money as a gift card, send it to someone else,
                or withdraw it when the collection is complete.
              </p>
              <div className="mt-8">
                <HomepageCta />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-center font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em] text-[#445164]">
            Our customers love us
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.title}
                title={testimonial.title}
                body={testimonial.body}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#260677] px-4 py-16 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-body leading-22.75 text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em]">
            You&apos;re in great company
          </h2>

          <div className="mt-10 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1.8m", "Users"],
              ["\u00A3200m", "Processed"],
              ["175", "Countries"],
              ["5m", "Transactions"],
            ].map(([value, label]) => (
              <div key={label} className="h-[151px] flex flex-col justify-center">
                <p className="font-body text-[62px] font-bold leading-22.75 tracking-[-0.05em] text-[#ff2b91] mb-4">
                  {value}
                </p>
                <p className="mt-2 text-[33.5px] text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="text-center font-body text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em] text-[#323F4B]">
            Have any questions?
          </h2>

          <div className="mt-10 space-y-10">
            {faqs.map((faq, index) => (
              <article
                key={faq.title}
                className="rounded-[22px] border border-[#e5e7f0] bg-white px-6 py-5 shadow-[0_10px_20px_rgba(18,24,40,0.03)]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                  className="flex w-full items-center justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
                >
                  <h3 className="font-body text-[24px] font-bold tracking-[-0.03em] text-[#323F4B]">
                    {faq.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#d8dce8] text-xl text-[#667085] transition ${
                      openFaqIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {openFaqIndex === index ? (
                  <p className="mt-4 pr-12 text-[16px] leading-7 text-[#667085]">
                    {faq.body}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eceef5] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[280px_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#f2167d] text-sm font-bold text-white">
                C
              </span>
              <span className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#322d5a]">
                Collctiv
              </span>
            </div>
            <p className="mt-6 text-[15px] leading-7 text-[#7b8698]">
              Placeholder footer copy for company details, social links, and
              supplementary navigation.
            </p>
            <div className="mt-6 flex gap-3">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="inline-flex size-8 rounded-full border border-[#d8dce8] bg-white"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-[#8a93a8]">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-3 text-[15px] text-[#5f697d]">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
