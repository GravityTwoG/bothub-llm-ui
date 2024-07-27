import classes from './language-selector.module.scss';

import Globus from '@/ui/icons/Globus.svg?react';
import ArrowDown from '@/ui/icons/ArrowDown.svg?react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useClickAway } from '@uidotdev/usehooks';
import { useDelayedBoolean } from '@/app/hooks/useDelayedFalse';

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const delayedIsOpen = useDelayedBoolean(isOpen);

  const ref = useClickAway<HTMLUListElement>((e) => {
    if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
      const button = e.target.closest('button');
      if (button?.classList.contains(classes.LanguageSelectorButton)) {
        return;
      }
    }
    setIsOpen(false);
  });

  return (
    <div className={classes.LanguageSelector}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={classes.LanguageSelectorButton}
      >
        <Globus className={classes.Globus} />
        <span>RU</span>
        <ArrowDown
          className={clsx(classes.ArrowDown, isOpen && classes.Open)}
        />
      </button>

      {(isOpen || delayedIsOpen) && (
        <ul
          ref={ref}
          className={clsx(
            classes.LanguageSelectorDropdown,
            isOpen && delayedIsOpen && classes.Open
          )}
        >
          <li>
            <button>RU</button>
          </li>
          <li>
            <button>EN</button>
          </li>
          <li>
            <button>ES</button>
          </li>
          <li>
            <button>FR</button>
          </li>
          <li>
            <button>PT</button>
          </li>
        </ul>
      )}
    </div>
  );
};
