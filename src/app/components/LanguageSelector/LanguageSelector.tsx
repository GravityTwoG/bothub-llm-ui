import classes from './language-selector.module.scss';

import Globus from '@/ui/icons/Globus.svg?react';
import ArrowDown from '@/ui/icons/ArrowDown.svg?react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useClickAway } from '@uidotdev/usehooks';

export type LanguageSelectorProps = {};

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Globus />
        <span>RU</span>
        <ArrowDown
          className={clsx(classes.ArrowDown, isOpen && classes.Open)}
        />
      </button>

      {isOpen && (
        <ul ref={ref} className={classes.LanguageSelectorDropdown}>
          <li>
            <button>RU</button>
          </li>
          <li>
            <button>EN</button>
          </li>
        </ul>
      )}
    </div>
  );
};
