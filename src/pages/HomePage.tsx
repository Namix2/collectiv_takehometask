import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import penIcon from "../assets/pen.svg";
import { CategorySelector } from "../components/CategorySelector";
import appStoreLogo from "../assets/App Store Logo.svg";
import collctivLogo from "../assets/collctivLogo_indigo.svg";
import googlePlayLogo from "../assets/Google Play Logo.svg";
import heroImg2 from "../assets/hero2img.svg";
import { PotNameInput } from "../components/PotNameInput";
import birthdayGift from "../assets/birthdaygift.svg"
import heroImg from "../assets/heroimg.svg";
import collctivhalf from "../assets/collctiv_half.svg";
import messaging from "../assets/sharepot.svg";
import paymentprocessors from "../assets/paymentprocessors.svg";
import spend from "../assets/spend.svg";
import type {
  PotCategory,
  PotCreationInput,
} from "../features/pot/pot.types";
import {
  validatePotCreationInput,
} from "../features/pot/pot.validation";
import { createPot } from "../features/pot/pot.service";

const steps = [
  {
    title: "Create your Pot",
    body: "Collection pots are free, create as many as you want, it only takes a couple of seconds.",
  },
  {
    title: "Share the Pot link",
    body: "Share the link on WhatsApp, Messenger, email, a website, SMS, basically anywhere you like.",
  },
  {
    title: "Spend the money",
    body: "Buy a gift card, send on to someone else or withdraw to your bank account.",
  },
];

const testimonials: Array<{
  title: string;
  body: string;
  store: "app" | "play";
}> = [
  {
    title: "Boss Lady D",
    body: "No more chasing parents for cash, simply pull out the app, scan the code or send the link and couple clicks and payment made.",
    store: "app",
  },
  {
    title: "Claire",
    body: "Perfect for a class collection for teacher gifts. Really easy to use & I would definitely recommend.",
    store: "play",
  },
  {
    title: "Prudent Ogwutum",
    body: "Brilliant app to help collection of funds for different activities and also helps keep track of money going in and out if its an ongoing collection pool.",
    store: "app",
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

const moneyStackItems = [
  ["\u00A3250.00", "Jenny's Birthday Present \uD83C\uDF81"],
  ["\u00A367.00", "Thursday Tennis \uD83C\uDFBE"],
  ["\u00A33,650.00", "New York Holiday \uD83D\uDDFD"],
] as const;

const moneyStackBaseStyle = {
  "--money-rotate-x": "0deg",
  "--money-rotate-y": "0deg",
  "--money-scale": "1",
  "--money-card-1-x": "0px",
  "--money-card-1-y": "0px",
  "--money-card-2-x": "0px",
  "--money-card-2-y": "0px",
  "--money-card-3-x": "0px",
  "--money-card-3-y": "0px",
} as CSSProperties;

type MoneyStackMotion = {
  rotateX: number;
  rotateY: number;
  scale: number;
  card1X: number;
  card1Y: number;
  card2X: number;
  card2Y: number;
  card3X: number;
  card3Y: number;
};

const moneyStackRestMotion: MoneyStackMotion = {
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  card1X: 0,
  card1Y: 0,
  card2X: 0,
  card2Y: 0,
  card3X: 0,
  card3Y: 0,
};

function applyMoneyStackMotion(target: HTMLDivElement, motion: MoneyStackMotion) {
  target.style.setProperty("--money-rotate-x", `${motion.rotateX.toFixed(2)}deg`);
  target.style.setProperty("--money-rotate-y", `${motion.rotateY.toFixed(2)}deg`);
  target.style.setProperty("--money-scale", motion.scale.toFixed(3));
  target.style.setProperty("--money-card-1-x", `${motion.card1X.toFixed(2)}px`);
  target.style.setProperty("--money-card-1-y", `${motion.card1Y.toFixed(2)}px`);
  target.style.setProperty("--money-card-2-x", `${motion.card2X.toFixed(2)}px`);
  target.style.setProperty("--money-card-2-y", `${motion.card2Y.toFixed(2)}px`);
  target.style.setProperty("--money-card-3-x", `${motion.card3X.toFixed(2)}px`);
  target.style.setProperty("--money-card-3-y", `${motion.card3Y.toFixed(2)}px`);
}

function MoneyStackShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentMotionRef = useRef<MoneyStackMotion>(moneyStackRestMotion);
  const targetMotionRef = useRef<MoneyStackMotion>(moneyStackRestMotion);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function animateMoneyStackMotion() {
    const element = containerRef.current;

    if (!element) {
      frameRef.current = null;
      return;
    }

    const current = currentMotionRef.current;
    const target = targetMotionRef.current;
    const next: MoneyStackMotion = {
      rotateX: current.rotateX + (target.rotateX - current.rotateX) * 0.14,
      rotateY: current.rotateY + (target.rotateY - current.rotateY) * 0.14,
      scale: current.scale + (target.scale - current.scale) * 0.14,
      card1X: current.card1X + (target.card1X - current.card1X) * 0.14,
      card1Y: current.card1Y + (target.card1Y - current.card1Y) * 0.14,
      card2X: current.card2X + (target.card2X - current.card2X) * 0.14,
      card2Y: current.card2Y + (target.card2Y - current.card2Y) * 0.14,
      card3X: current.card3X + (target.card3X - current.card3X) * 0.14,
      card3Y: current.card3Y + (target.card3Y - current.card3Y) * 0.14,
    };

    currentMotionRef.current = next;
    applyMoneyStackMotion(element, next);

    const settled =
      Math.abs(target.rotateX - next.rotateX) < 0.02 &&
      Math.abs(target.rotateY - next.rotateY) < 0.02 &&
      Math.abs(target.scale - next.scale) < 0.002 &&
      Math.abs(target.card3X - next.card3X) < 0.08 &&
      Math.abs(target.card3Y - next.card3Y) < 0.08;

    if (settled) {
      currentMotionRef.current = target;
      applyMoneyStackMotion(element, target);
      frameRef.current = null;
      return;
    }

    frameRef.current = requestAnimationFrame(animateMoneyStackMotion);
  }

  function queueMoneyStackAnimation() {
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(animateMoneyStackMotion);
    }
  }

  function handleMoneyStackMove(event: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const horizontal = (clientX - rect.left) / rect.width - 0.5;
    const vertical = (clientY - rect.top) / rect.height - 0.5;
    const shiftX = horizontal * 9;
    const shiftY = vertical * 9;

    targetMotionRef.current = {
      rotateX: -vertical * 6,
      rotateY: horizontal * 6,
      scale: 1.025,
      card1X: shiftX * 0.4,
      card1Y: shiftY * 0.4,
      card2X: shiftX * 0.7,
      card2Y: shiftY * 0.7,
      card3X: shiftX,
      card3Y: shiftY,
    };

    queueMoneyStackAnimation();
  }

  function handleMoneyStackLeave() {
    targetMotionRef.current = moneyStackRestMotion;
    queueMoneyStackAnimation();
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMoneyStackMove}
      onMouseLeave={handleMoneyStackLeave}
      style={moneyStackBaseStyle}
      className="group relative mx-auto w-full max-w-[392px] [transform-style:preserve-3d]"
    >
      <div className="relative rounded-[22px] bg-[#16a8bc] p-4 shadow-[0_20px_40px_rgba(22,168,188,0.18)] transition-transform duration-500 ease-out will-change-transform [transform:perspective(1200px)_rotateX(var(--money-rotate-x))_rotateY(var(--money-rotate-y))_scale(var(--money-scale))]">
        <div className="space-y-[18px]">
          {moneyStackItems.map(([amount, label], index) => (
            <div
              key={amount}
              style={
                {
                  transform: `translate3d(var(--money-card-${index + 1}-x), var(--money-card-${index + 1}-y), 0px)`,
                } as CSSProperties
              }
              className="rounded-[12px] bg-white px-4 py-[18px] shadow-[0_2px_8px_rgba(18,24,40,0.08)] transition-[transform,box-shadow] duration-500 ease-out group-hover:shadow-[0_12px_28px_rgba(18,24,40,0.12)]"
            >
              <p className="font-body text-[37px] font-semibold leading-none tracking-[-0.04em] text-black">
                {amount}
              </p>
              <p className="mt-6 text-[17px] leading-none text-[#5f6f82]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: ReactNode;
}) {
  return (
    <article className="group flex flex-col items-center rounded-[28px] px-6 py-8 text-center transition-[transform,box-shadow,background-color] duration-500 ease-out hover:-translate-y-2 hover:bg-[#f8fafc] hover:shadow-[0_20px_40px_rgba(18,24,40,0.08)] motion-reduce:transform-none motion-reduce:transition-none">
      <div className="mb-[30px] flex h-[150px] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-[1.06] motion-reduce:transform-none [&_img]:h-full [&_img]:w-auto [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)]">
        {icon ?? (
          <div
            aria-hidden="true"
            className="flex h-[150px] w-[150px] items-center justify-center rounded-[32px] border-2 border-dashed border-[#d0d5dd] bg-[#f8fafc] font-body text-sm font-medium text-[#98a2b3]"
          >
            Icon
          </div>
        )}
      </div>
      <h3 className="font-body text-[24px] font-bold tracking-[-0.03em] text-[#323F4B] transition-colors duration-300 group-hover:text-brand-indigo">
        {title}
      </h3>
      <div className="max-h-[72px]">
        <p className="max-w-[307px] font-normal text-[18.6px] leading-[24px] text-[#323F4B] transition-colors duration-300 group-hover:text-[#445164]">
          {body}
        </p>
      </div>
    </article>
  );
}

function TestimonialCard({
  title,
  body,
  store,
}: {
  title: string;
  body: string;
  store: "app" | "play";
}) {
  return (
    <article className="rounded-[18px] border border-[#d7dce8] bg-white px-6 py-5 shadow-[0_10px_24px_rgba(18,24,40,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-body text-[17px] font-bold leading-none tracking-[-0.03em] text-[#1f2937]">
            {title}
          </h3>
          <div className="mt-3 inline-flex h-[22px] items-center rounded-[2px] px-1.5">
            <span className="text-[16px] leading-none tracking-[0.18em] text-[#ffbf00]">
              ★★★★★
            </span>
          </div>
        </div>
        <img
          src={store === "app" ? appStoreLogo : googlePlayLogo}
          alt={store === "app" ? "App Store" : "Google Play"}
          className="h-[52px] w-[52px] shrink-0"
        />
      </div>
      <p className="mt-3 max-w-[294px] text-[17px] leading-[1.45] text-[#323F4B]">
        {body}
      </p>
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

interface FormPromptModalProps {
  action: "category" | "name";
  body: string;
  ctaLabel: string;
  children: ReactNode;
  isContinueDisabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  title: string;
}

function FormPromptModal({
  action,
  body,
  ctaLabel,
  children,
  isContinueDisabled,
  isOpen,
  onClose,
  onContinue,
  title,
}: FormPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-indigo/35 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-prompt-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[440px] rounded-[28px] bg-white p-7 shadow-[0_24px_64px_rgba(30,27,75,0.22)]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="form-prompt-title"
            className="font-body text-[32px] font-bold leading-[1.02] tracking-[-0.04em] text-[#323F4B]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close prompt"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border-soft text-[20px] text-[#5f6f82] transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
          >
            ×
          </button>
        </div>
        <p className="mt-4 text-[17px] leading-7 text-[#5f6f82]">{body}</p>
        <div className="mt-6">
          {children}
        </div>
        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-soft px-5 font-body text-sm font-semibold text-brand-indigo transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={isContinueDisabled}
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent-yellow px-5 font-body text-sm font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action === "name" ? "Save name and continue" : ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    continuePotCreation();
  }

  function toggleFaq(index: number) {
    setOpenFaqIndex((current) => (current === index ? null : index));
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
                      onChange={updateCategory}
                    />

                    <PotNameInput
                      value={formData.name}
                      onChange={updateName}
                      icon={
                        <img src={penIcon} alt="" className="block size-5" />
                      }
                    />

                    <button
                      type="submit"
                      disabled={isSubmitDisabled}
                      className="mt-1 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-accent-yellow px-5 font-display text-[18px] font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/60 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:brightness-100"
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
        <div className="mx-auto max-w-[1080px]">
          <h2 className="text-center font-body text-[clamp(2.3rem,4vw,4rem)] font-bold tracking-[-0.05em] text-[#323F4B]">
            How does Collctiv work?
          </h2>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <FeatureCard
              title={steps[0].title}
              body={steps[0].body}
              icon={
                <img src={collctivhalf} alt="Create your pot" />
              }
            />
            <FeatureCard
              title={steps[1].title}
              body={steps[1].body}
               icon={
                <img src={messaging} alt="Share the pot link" />
              }
            />
            <FeatureCard
              title={steps[2].title}
              body={steps[2].body}
                icon={
                <img src={spend} alt="spend the money" />
              }
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1080px] space-y-20">
          <div className="grid items-center lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <h2 className="font-body text-[51.6px] font-bold text-[#323F4B]">
                Customise your Pot
              </h2>
              <p className="mt-4 max-w-[520px] text-[16px] leading-7 text-[#323F4B]">
                Customise your Pot, send a closing date, show who’s paid in
already, add a fundraising target, add extra information about the
collection, and more.
              </p>
              <div className="mt-4">
                <HomepageCta />
              </div>
            </div>

                <div className="flex justify-center lg:justify-end">
                <img src={birthdayGift} alt="birthday gift" className="" />
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[392px_minmax(0,1fr)] lg:gap-[56px]">
            <MoneyStackShowcase />
            <div className="hidden rounded-[22px] bg-[#16a8bc] p-4 shadow-[0_20px_40px_rgba(22,168,188,0.18)]">
              <div className="space-y-[18px]">
                {[
                  ["\u00A3250.00", "Jenny's Birthday Present 🎁"],
                  ["\u00A367.00", "Thursday Tennis 🎾"],
                  ["\u00A33,650.00", "New York Holiday 🗽"],
                ].map(([amount, label]) => (
                  <div
                    key={amount}
                    className="rounded-[12px] bg-white px-4 py-[18px] shadow-[0_2px_8px_rgba(18,24,40,0.08)]"
                  >
                    <p className="font-body text-[37px] font-semibold leading-none tracking-[-0.04em] text-black">
                      {amount}
                    </p>
                    <p className="mt-6 text-[17px] leading-none text-[#5f6f82]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[688px] lg:pt-2">
              <h2 className="max-w-[680px] font-body text-[51.8px] font-bold leading-[66px] text-[#323F4B]">
                Keep money separate from your bank
              </h2>
              <p className="mt-4 max-w-[650px] text-[18.9px] leading-[28px] text-[#323F4B]">
                Don&apos;t mix group money in with your personal bank account.
                Keep track of who&apos;s paid what and when.
              </p>
              <div className="mt-4 lg:flex lg:justify-end">
                <HomepageCta />
              </div>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_486px] lg:gap-[72px]">
            <div className="max-w-[560px]">
              <h2 className="max-w-[520px] font-body text-[52px] font-bold leading-[66px] text-[#323F4B]">
                Making a payment takes seconds
              </h2>
              <p className="mt-4 max-w-[560px] text-[18px] leading-[28px] text-[#323F4B]">
                Anyone paying into the collection pot just uses their card
                details or they can use Apple Pay or Google Pay. No need to
                sign up for an account or download an app, just tap and
                you&apos;re done! The money appears in your pot instantly.
              </p>
              <div className="mt-4">
                <HomepageCta />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src={paymentprocessors}
                alt="Supported payment processors"
                className="w-full max-w-[486px]"
              />
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-[72px]">
            <div className="flex justify-center lg:justify-start">
              <img
                src={spend}
                alt="Coins representing collected money"
                className="w-full max-w-[400px]"
              />
            </div>

            <div className="max-w-[560px]">
              <h2 className="max-w-[520px] font-body text-[51.3px] font-bold leading-[66px] text-[#323F4B]">
                Spend the money instantly
              </h2>
              <p className="mt-4 max-w-[560px] text-[18px] leading-[1.35] text-[#33475f]">
                Buy a gift card, send the money to someone else or withdraw
                straight to your bank account. The choice is yours.
              </p>
              <div className="mt-4 lg:flex lg:justify-end">
                <HomepageCta />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center font-body text-[62.4px] font-bold leading-[91px] text-[#323F4B]">
            Our customers love us
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.title}
                title={testimonial.title}
                body={testimonial.body}
                store={testimonial.store}
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
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#d8dce8] text-xl text-[#667085] transition duration-300 ${
                      openFaqIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    openFaqIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 pr-12 text-[16px] leading-7 text-[#667085]">
                      {faq.body}
                    </p>
                  </div>
                </div>
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
