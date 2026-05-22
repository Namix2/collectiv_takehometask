import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/back.svg';
import collctivLogo from '../assets/full-logo-light.svg.svg';

export function PotHeader() {
  const navigate = useNavigate();

  return (
    <header className="relative z-20 flex h-16 items-center justify-center px-6 sm:px-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute left-6 inline-flex size-9 items-center justify-center rounded-full transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:left-10"
      >
        <img src={backIcon} alt="" className="size-5" />
      </button>

      <img src={collctivLogo} alt="Collctiv" className="h-8 w-auto sm:h-9" />
    </header>
  );
}
