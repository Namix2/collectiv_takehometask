import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import appStoreLogo from "../../assets/App Store Logo.svg";
import birthdayGift from "../../assets/birthdaygift.svg";
import collctivhalf from "../../assets/collctiv_half.svg";
import googlePlayLogo from "../../assets/Google Play Logo.svg";
import heroImg2 from "../../assets/hero2img.svg";
import messaging from "../../assets/sharepot.svg";
import paymentprocessors from "../../assets/paymentprocessors.svg";
import spend from "../../assets/spend.svg";
import { Footer } from "../Footer";
import { HomepageCta } from "./HomepageCta";

const steps = [
  {
    title: "Create your Pot",
    body: "Collection pots are free, create as many as you want, it only takes a couple of seconds.",
    image: collctivhalf,
    imageAlt: "Create your pot",
  },
  {
    title: "Share the Pot link",
    body: "Share the link on WhatsApp, Messenger, email, a website, SMS, basically anywhere you like.",
    image: messaging,
    imageAlt: "Share the pot link",
  },
  {
    title: "Spend the money",
    body: "Buy a gift card, send on to someone else or withdraw to your bank account.",
    image: spend,
    imageAlt: "Spend the money",
  },
] as const;

const testimonials = [
  {
    title: "Boss Lady D",
    body: "No more chasing parents for cash, simply pull out the app, scan the code or send the link and couple clicks and payment made.",
    store: "app",
  },
  {
    title: "Claire",
    body: "Perfect for a class collection for teacher gifts. Really easy to use and I would definitely recommend.",
    store: "play",
  },
  {
    title: "Prudent Ogwutum",
    body: "Brilliant app to help collection of funds for different activities and also helps keep track of money going in and out if its an ongoing collection pool.",
    store: "app",
  },
] as const;

const faqs = [
  {
    title: "How much does it cost?",
    body: "Collctiv is completely free to use! You can collect and withdraw funds for free 🙌 . Since we do have costs to be able to exist, we've created an exciting option for our amazing customers to contribute to the ongoing development of Collctiv. By giving you the option to tip, you become an essential part of our mission to help groups come together and do the things they love. When it's time to withdraw your funds, we believe in giving you control - if you’d like to support us in our journey, you can opt-in to contribute 2% of your withdrawn amount to Collctiv. You can read more about our optional tips in our FAQ here.",
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
] as const;

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
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      mediaQuery.removeEventListener("change", syncReducedMotion);
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
    if (prefersReducedMotionRef.current) {
      return;
    }

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
      className="group relative mx-auto w-full max-w-[22rem] sm:max-w-[24.5rem] [transform-style:preserve-3d]"
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
              <p className="font-body text-[clamp(2.1rem,5vw,2.35rem)] font-semibold leading-none tracking-[-0.04em] text-black">
                {amount}
              </p>
              <p className="mt-6 text-[clamp(1rem,2.5vw,1.0625rem)] leading-none text-[#5f6f82]">
                {label}
              </p>
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
    <article className="group flex flex-col items-center rounded-[28px] px-5 py-8 text-center transition-[transform,box-shadow,background-color] duration-500 ease-out hover:-translate-y-2 hover:bg-[#f8fafc] hover:shadow-[0_20px_40px_rgba(18,24,40,0.08)] motion-reduce:transform-none motion-reduce:transition-none sm:px-6">
      <div className="mb-[30px] flex h-[150px] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-[1.06] motion-reduce:transform-none [&_img]:h-full [&_img]:w-auto [&_img]:max-w-full [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)]">
        {icon}
      </div>
      <h3 className="font-body text-[clamp(1.35rem,2.8vw,1.5rem)] font-bold tracking-[-0.03em] text-[#323F4B] transition-colors duration-300 group-hover:text-brand-indigo">
        {title}
      </h3>
      <p className="max-w-[19rem] text-[clamp(1rem,2.2vw,1.15rem)] font-normal leading-6 text-[#323F4B] transition-colors duration-300 group-hover:text-[#445164]">
        {body}
      </p>
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
          <h3 className="font-body text-base font-bold leading-none tracking-[-0.03em] text-[#1f2937] sm:text-[17px]">
            {title}
          </h3>
          <div className="mt-3 inline-flex h-[22px] items-center rounded-[2px] px-1.5">
            <span className="text-[16px] leading-none tracking-[0.18em] text-[#ffbf00]">
              {"\u2605\u2605\u2605\u2605\u2605"}
            </span>
          </div>
        </div>
        <img
          src={store === "app" ? appStoreLogo : googlePlayLogo}
          alt={store === "app" ? "App Store" : "Google Play"}
          className="h-[52px] w-[52px] shrink-0"
        />
      </div>
      <p className="mt-3 max-w-[18.5rem] text-base leading-[1.45] text-[#323F4B] sm:text-[17px]">
        {body}
      </p>
    </article>
  );
}

export function HomeStaticSections() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqId = useId();

  function toggleFaq(index: number) {
    setOpenFaqIndex((current) => (current === index ? null : index));
  }

  return (
    <>
      <section className="flex justify-center bg-[#1B0273] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1080px] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,27rem)] lg:gap-8">
          <div>
            <div className="max-w-[40.5rem]">
              <h2 className="mt-2 max-w-[38rem] font-body text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-[4.5rem]">
                Organise the things you love with the people you love - without getting
                stuck with the bill.
              </h2>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              <p className="max-w-[38rem] text-base font-normal leading-7 text-white sm:text-[18px] sm:leading-8">
                We know it can be super awkward (and frustrating) chasing people down
                for money, so we've made it easy to collect money from groups of
                people. Here's how:
              </p>
              <ol className="max-w-[42rem] space-y-4 font-body text-base font-normal leading-7 text-white sm:space-y-6 sm:text-[18px] sm:leading-8">
                <li>1) You request money from friends by sending them a custom payment link or QR code.</li>
                <li>2) They use Apple Pay, Google Pay or their digital wallet to pay you.</li>
              </ol>
              <div>
                <HomepageCta />
              </div>
            </div>
          </div>

          <img
            src={heroImg2}
            alt=""
            aria-hidden="true"
            className="w-full max-w-[20rem] self-start justify-self-center sm:max-w-[24rem] lg:max-w-[27rem] lg:justify-self-end"
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 mb-30">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="text-center font-body text-[clamp(2.3rem,4vw,4rem)] font-bold tracking-[-0.05em] text-[#323F4B]">
            How does Collctiv work?
          </h2>

          <div className="mt-12 grid gap-4 md:mt-14 lg:grid-cols-3">
            {steps.map((step) => (
              <FeatureCard
                key={step.title}
                title={step.title}
                body={step.body}
                icon={<img src={step.image} alt={step.imageAlt} />}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1080px] space-y-16 sm:space-y-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)]">
            <div>
              <h2 className="font-body text-[clamp(2.15rem,4.6vw,3.25rem)] font-bold leading-[1.08] text-[#323F4B]">
                Customise your Pot
              </h2>
              <p className="mt-4 max-w-[32.5rem] text-base leading-7 text-[#323F4B]">
                Customise your pot, send a closing date, show who's paid in already,
                add a fundraising target, add extra information about the collection,
                and more.
              </p>
              <div className="mt-4">
                <HomepageCta />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src={birthdayGift}
                alt=""
                aria-hidden="true"
                className="w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[26rem]"
              />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(18rem,24.5rem)_minmax(0,1fr)] lg:gap-12 xl:gap-14">
            <MoneyStackShowcase />

            <div className="max-w-[43rem] lg:pt-2">
              <h2 className="max-w-[42rem] font-body text-[clamp(2.2rem,4.8vw,3.25rem)] font-bold leading-[1.08] text-[#323F4B]">
                Keep money separate from your bank
              </h2>
              <p className="mt-4 max-w-[40.5rem] text-[clamp(1rem,2vw,1.125rem)] leading-7 text-[#323F4B] sm:leading-8">
                Don&apos;t mix group money in with your personal bank account. Keep track
                of who&apos;s paid what and when.
              </p>
              <div className="mt-4 lg:flex lg:justify-end">
                <HomepageCta />
              </div>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,30.5rem)] lg:gap-12 xl:gap-[72px]">
            <div className="max-w-[35rem]">
              <h2 className="max-w-[32.5rem] font-body text-[clamp(2.2rem,4.8vw,3.25rem)] font-bold leading-[1.08] text-[#323F4B]">
                Making a payment takes seconds
              </h2>
              <p className="mt-4 max-w-[35rem] text-[clamp(1rem,2vw,1.125rem)] leading-7 text-[#323F4B] sm:leading-8">
                Anyone paying into the collection pot just uses their card details or
                they can use Apple Pay or Google Pay. No need to sign up for an account
                or download an app, just tap and you're done. The money appears in your
                pot instantly.
              </p>
              <div className="mt-4">
                <HomepageCta />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src={paymentprocessors}
                alt=""
                aria-hidden="true"
                className="w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[30.5rem]"
              />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)] lg:gap-12 xl:gap-[72px]">
            <div className="flex justify-center lg:justify-start">
              <img
                src={spend}
                alt=""
                aria-hidden="true"
                className="w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[25rem]"
              />
            </div>

            <div className="max-w-[35rem]">
              <h2 className="max-w-[32.5rem] font-body text-[clamp(2.2rem,4.8vw,3.2rem)] font-bold leading-[1.08] text-[#323F4B]">
                Spend the money instantly
              </h2>
              <p className="mt-4 max-w-[35rem] text-[clamp(1rem,2vw,1.125rem)] leading-7 text-[#33475f] sm:leading-8">
                Buy a gift card, send the money to someone else or withdraw straight to
                your bank account. The choice is yours.
              </p>
              <div className="mt-4 lg:flex lg:justify-end">
                <HomepageCta />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 mt-54 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center font-body text-[clamp(2.5rem,5vw,3.9rem)] font-bold leading-[1.1] text-[#323F4B]">
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

      <section className="bg-[#260677] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-body text-[clamp(2.2rem,4vw,3.8rem)] font-bold tracking-[-0.05em]">
            You&apos;re in great company
          </h2>

          <div className="mt-10 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1.8m", "Users"],
              ["\u00A3200m", "Processed"],
              ["175", "Countries"],
              ["5m", "Transactions"],
            ].map(([value, label]) => (
              <div key={label} className="flex min-h-[9rem] flex-col justify-center sm:min-h-[9.5rem]">
                <p className="mb-3 font-body text-[clamp(2.6rem,5vw,3.875rem)] font-bold tracking-[-0.05em] text-[#ff2b91]">
                  {value}
                </p>
                <p className="mt-1 text-[clamp(1.35rem,3vw,2.1rem)] text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
                {(() => {
                  const buttonId = `${faqId}-button-${index}`;
                  const panelId = `${faqId}-panel-${index}`;

                  return (
                    <>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  id={buttonId}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
                >
                  <h3 className="font-body text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold tracking-[-0.03em] text-[#323F4B]">
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
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
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
                    </>
                  );
                })()}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
