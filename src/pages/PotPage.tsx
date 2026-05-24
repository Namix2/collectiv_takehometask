import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ActionButton } from "../components/ActionButton";
import cornerRightIcon from "../assets/cornerright.png";
import cornerRightTopIcon from "../assets/cornerrighttop.png";
import emailIcon from "../assets/email.png";
import facebookIcon from "../assets/facebook.png";
import { PotHeader } from "../components/Header";
import instagramIcon from "../assets/instagram.png";
import penIcon from "../assets/pen.svg";
import qrIcon from "../assets/qr.svg";
import { SignUpModal } from "../components/SignUpModal";
import whatsappIcon from "../assets/whatsapp.png";
import xIcon from "../assets/X.png";
import { getPotById } from "../features/pot/pot.storage";
import { useDisclosure } from "../hooks/useDisclosure";

const inviteOptions = [
  { iconSrc: emailIcon, label: "Email" },
  { iconSrc: qrIcon, label: "QR Code" },
  { iconSrc: whatsappIcon, label: "WhatsApp" },
  { iconSrc: facebookIcon, label: "Facebook" },
  { iconSrc: instagramIcon, label: "Instagram" },
  { iconSrc: xIcon, label: "X" },
];

const splashProgressSteps = [
  { delay: 180, value: 17 },
  { delay: 460, value: 31 },
  { delay: 790, value: 48 },
  { delay: 1120, value: 67 },
  { delay: 1490, value: 82 },
  { delay: 1830, value: 93 },
  { delay: 2240, value: 100 },
];

type PotPageLocationState = {
  creationFlow?: boolean;
};

function NotFoundState({ body, cta }: { body: string; cta: string }) {
  return (
    <main className="min-h-screen bg-[#f4f4fb] px-4 py-10 font-body text-brand-indigo">
      <section className="mx-auto flex w-full max-w-[564px] flex-col gap-4 rounded-[20px] border border-border-soft bg-white p-6 shadow-[0_4px_24px_rgba(30,27,75,0.02)]">
        <h1 className="font-display text-3xl font-bold tracking-tight">Pot not found</h1>
        <p className="text-base text-brand-indigo/80">{body}</p>
        <Link className="font-display text-sm font-semibold text-brand-indigo underline" to="/">
          {cta}
        </Link>
      </section>
    </main>
  );
}

function CreationSplashScreen({ progress }: { progress: number }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#4d2bd2_0%,#260677_50%,#1a0350_100%)] px-4 font-body text-white">
      <section className="w-full max-w-[540px] rounded-[32px] border border-white/10 bg-white/8 p-8 text-center shadow-[0_24px_80px_rgba(10,6,33,0.45)] backdrop-blur-md">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-white/12 text-[34px]">
          ✦
        </div>
        <h1 className="mt-7 font-body text-[42px] font-bold leading-none tracking-[-0.05em]">
          Creating your pot
        </h1>
        <p className="mt-4 text-[17px] leading-7 text-white/78">
          Setting up your collection page and getting everything ready to share.
        </p>

        <div className="mt-10">
          <div className="h-3 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-accent-yellow transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm font-medium text-white/72">
            <span>Almost there</span>
            <span>{progress}%</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function CelebrationConfetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        background:
          ["#ff2b91", "#ffde00", "#16a8bc", "#6d5efc", "#3ed598", "#ff8a00"][index % 6],
        delay: `${index * 0.07}s`,
        duration: `${1.8 + (index % 5) * 0.22}s`,
        left: `${4 + index * 4}%`,
        rotate: `${(index % 6) * 18}deg`,
        size: index % 3 === 0 ? 14 : 10,
      })),
    []
  );

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translate3d(0, -16px, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(0, 110vh, 0) rotate(540deg); opacity: 0; }
        }
      `}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {pieces.map((piece, index) => (
          <span
            key={`${piece.left}-${index}`}
            className="absolute top-[-24px] rounded-[2px]"
            style={{
              animation: `confetti-fall ${piece.duration} ease-in forwards`,
              animationDelay: piece.delay,
              backgroundColor: piece.background,
              height: piece.size,
              left: piece.left,
              transform: `rotate(${piece.rotate})`,
              width: Math.max(6, piece.size * 0.5),
            }}
          />
        ))}
      </div>
    </>
  );
}

function CreationCelebration({
  isOpen,
  onClose,
  potName,
}: {
  isOpen: boolean;
  onClose: () => void;
  potName: string;
}) {
  if (!isOpen) return null;

  return (
    <>
      <CelebrationConfetti />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-20">
        <section
          aria-live="polite"
          className="pointer-events-auto w-full max-w-[560px] rounded-[30px] bg-white p-8 text-center shadow-[0_28px_80px_rgba(30,27,75,0.28)]"
        >
          <div className="mx-auto flex size-18 items-center justify-center rounded-full bg-accent-yellow-soft text-[34px] text-brand-indigo">
            🎉
          </div>
          <h2 className="mt-6 font-body text-[44px] font-bold leading-[0.96] tracking-[-0.05em] text-[#323F4B]">
            Congratulations
          </h2>
          <p className="mt-4 text-[18px] leading-7 text-[#5f6f82]">
            <span className="font-semibold text-[#323F4B]">{potName}</span> is live and ready
            to share.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent-yellow px-5 font-body text-sm font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
            >
              Start sharing
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export function PotPage() {
  const location = useLocation();
  const { potId } = useParams<{ potId: string }>();
  const signUpModal = useDisclosure();
  const locationState = location.state as PotPageLocationState | null;
  const shouldPlayCreationFlow = Boolean(locationState?.creationFlow);
  const [progress, setProgress] = useState(8);
  const [isCreationLoading, setIsCreationLoading] = useState(shouldPlayCreationFlow);
  const [showCelebration, setShowCelebration] = useState(shouldPlayCreationFlow);

  useEffect(() => {
    if (!shouldPlayCreationFlow) {
      return;
    }

    const timers = splashProgressSteps.map((step) =>
      window.setTimeout(() => {
        setProgress(step.value);
      }, step.delay)
    );

    timers.push(
      window.setTimeout(() => {
        setIsCreationLoading(false);
        setShowCelebration(true);
      }, 2520)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [shouldPlayCreationFlow]);

  if (!potId) {
    return <NotFoundState body="No pot ID was provided." cta="Return to homepage" />;
  }

  const pot = getPotById(potId);

  if (!pot) {
    return (
      <NotFoundState
        body="This pot could not be found in browser storage."
        cta="Create a new pot"
      />
    );
  }

  if (isCreationLoading) {
    return <CreationSplashScreen progress={progress} />;
  }

  return (
    <>
      <CreationCelebration
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        potName={pot.name}
      />

      <main className="min-h-screen bg-[#f4f4fb] font-body text-brand-indigo">
        <section className="relative overflow-hidden bg-[#260677] pb-36 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-36 bg-[#f4f4fb] [clip-path:polygon(0_52%,100%_35%,100%_100%,0_100%)]"
          />

          <PotHeader />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-10 pt-20 text-center sm:pt-24">
            <h1 className="max-w-4xl font-display text-[clamp(3rem,6vw,4.75rem)] font-semibold tracking-[-0.03em] text-white">
              {pot.name}
            </h1>
            <p className="mt-3 font-display text-[clamp(4.5rem,9vw,6.25rem)] font-extrabold leading-none text-white">
              {"\u00A30.00"}
            </p>
          </div>
        </section>

        <section className="relative z-10 -mt-12 px-4">
          <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-3 rounded-[18px] border border-border-soft bg-white p-4 shadow-[0_8px_20px_rgba(30,27,75,0.12)]">
            <ActionButton
              icon={<img src={cornerRightIcon} alt="" className="size-[18px]" />}
              onClick={signUpModal.open}
              variant="pink"
            >
              Collect Money
            </ActionButton>
            <ActionButton
              icon={<img src={cornerRightTopIcon} alt="" className="size-[18px]" />}
              onClick={signUpModal.open}
              variant="teal"
            >
              Send Money
            </ActionButton>
            <ActionButton
              icon={<img src={penIcon} alt="" className="size-[18px]" />}
              onClick={signUpModal.open}
              variant="secondary"
            >
              Customise Pot
            </ActionButton>
            <ActionButton
              ariaLabel="More actions"
              icon={
                <span className="text-[18px] leading-none text-[#6b7280]">
                  {"\u2022\u2022\u2022"}
                </span>
              }
              onClick={signUpModal.open}
              variant="icon"
            />
          </div>

          <div className="mx-auto mt-10 max-w-[664px] rounded-[18px] bg-[#E9E8FC40] p-4 shadow-[0_4px_12px_rgba(30,27,75,0.04)]">
            <h2 className="px-2 pb-4 text-[18px] font-semibold tracking-[-0.02em] text-brand-indigo">
              Invite people to pay
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
              {inviteOptions.map((option) => (
                <ActionButton
                  key={option.label}
                  icon={<img src={option.iconSrc} alt="" className="size-[22px]" />}
                  onClick={signUpModal.open}
                  variant="share"
                >
                  {option.label}
                </ActionButton>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 bg-[#efeff8] px-6 py-24 text-center text-[#7a839d]">
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            <div className="flex items-center gap-8 text-[16px]">
              <button
                type="button"
                className="transition hover:text-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
              >
                Privacy
              </button>
              <button
                type="button"
                className="transition hover:text-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
              >
                Support
              </button>
            </div>

            <div className="mt-9 flex items-center gap-6 text-[#a2a8bb]">
              <button
                type="button"
                aria-label="Instagram"
                className="transition hover:text-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
              >
                <img src={instagramIcon} alt="" className="size-[22px] opacity-70" />
              </button>
              <button
                type="button"
                aria-label="Pinterest"
                className="text-[24px] transition hover:text-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
              >
                P
              </button>
            </div>

            <div className="mt-8 space-y-1 text-[14px] leading-6">
              <p>{"\u00A9 2026 Collctiv Ltd. All rights reserved."}</p>
              <p>Collctiv Ltd is a company registered in England and Wales (No. 11783005)</p>
              <p>
                Collctiv Ltd, Colony, 5 Piccadilly Place, Manchester, England, M1 3BR. VAT
                number: 348654172
              </p>
            </div>
          </div>
        </footer>

        <SignUpModal isOpen={signUpModal.isOpen} onClose={signUpModal.close} />
      </main>
    </>
  );
}
