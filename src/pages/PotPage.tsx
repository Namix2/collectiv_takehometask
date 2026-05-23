import { Link, useParams } from 'react-router-dom';
import { ActionButton } from '../components/ActionButton';
import cornerRightIcon from '../assets/cornerright.png';
import cornerRightTopIcon from '../assets/cornerrighttop.png';
import emailIcon from '../assets/email.png';
import facebookIcon from '../assets/facebook.png';
import { PotHeader } from '../components/Header';
import instagramIcon from '../assets/instagram.png';
import penIcon from '../assets/pen.svg';
import qrIcon from '../assets/qr.svg';
import { SignUpModal } from '../components/SignUpModal';
import whatsappIcon from '../assets/whatsapp.png';
import xIcon from '../assets/X.png';
import { getPotById } from '../features/pot/pot.storage';
import { useDisclosure } from '../hooks/useDisclosure';

const inviteOptions = [
  { iconSrc: emailIcon, label: 'Email' },
  { iconSrc: qrIcon, label: 'QR Code' },
  { iconSrc: whatsappIcon, label: 'WhatsApp' },
  { iconSrc: facebookIcon, label: 'Facebook' },
  { iconSrc: instagramIcon, label: 'Instagram' },
  { iconSrc: xIcon, label: 'X' },
];

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

export function PotPage() {
  const { potId } = useParams<{ potId: string }>();
  const signUpModal = useDisclosure();

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

  return (
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
            {'\u00A30.00'}
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
            icon={<span className="text-[18px] leading-none text-[#6b7280]">{'\u2022\u2022\u2022'}</span>}
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
            <p>{'\u00A9 2026 Collctiv Ltd. All rights reserved.'}</p>
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
  );
}
