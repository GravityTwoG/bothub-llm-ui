import classes from './language-selector.module.scss';

import Globus from '@/ui/icons/Globus.svg?react';
import ArrowDown from '@/ui/icons/ArrowDown.svg?react';
import { useState } from 'react';
import { clsx } from 'clsx';

export type LanguageSelectorProps = {};

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    </div>
  );
};
