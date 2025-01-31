'use client';

import { useEffect, useState } from 'react';
import { useIsClient, useMediaQuery } from '@uidotdev/usehooks';

import classes from './header.module.scss';

import { ReactComponent as Logo } from '@/ui/assets/icons/Logo.svg';
import { ReactComponent as Telegram } from '@/ui/assets/icons/Telegram.svg';
import { ReactComponent as Bag } from '@/ui/assets/icons/Bag.svg';

import { Button } from '@/ui/atoms/Button/Button';
import { Container } from '@/ui/atoms/Container/Container';

import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { BurgerButton } from '@/ui/atoms/Button/BurgerButton';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { MobileNav } from './MobileNav/MobileNav';

const navItems = [
  {
    link: '#',
    title: 'Продукты',
    subNavItems: [
      {
        link: '#',
        icon: <Telegram />,
        title: 'Телеграм боты',
        description: 'Удобный бот телеграм, который всегда под рукой',
      },
      {
        link: '#',
        icon: <Bag />,
        title: 'Для бизнеса',
        description: 'Корпоративная подписка для юридических лиц',
      },
    ],
  },
  { link: '#', title: 'Пакеты' },
  { link: '#', title: 'API' },
  { link: '#', title: 'Блог' },
];

export const Header = () => {
  const isClient = useIsClient();

  return (
    <header className={classes.HeaderWrapper}>
      <div className={classes.HeaderPlaceholder}></div>
      <div className={classes.Header}>
        {isClient ? <HeaderContent /> : null}
      </div>
    </header>
  );
};

const HeaderContent = () => {
  const isDesktop = useMediaQuery('(min-width: 1061px)');
  const isTabletOrDesktop = useMediaQuery('(min-width: 671px)');

  const [isOpen, setIsOpen] = useState(false);

  // close mobile nav on desktop
  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  return (
    <Container className={classes.HeaderContent}>
      <a href="/" className={classes.HeaderLogo}>
        <Logo />
      </a>

      <div className={classes.HeaderSeparator}></div>

      {isDesktop && <HeaderNav navItems={navItems} />}

      <div className={classes.HeaderActions}>
        <div className={classes.LanguageSelector}>
          <LanguageSelector />
        </div>

        {isTabletOrDesktop && (
          <div className={classes.HeaderActionItem}>
            <Button>Авторизация</Button>
          </div>
        )}

        {!isDesktop && (
          <>
            <div className={classes.HeaderActionItem}>
              <BurgerButton
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <MobileNav navItems={navItems} isOpen={isOpen}>
              {!isTabletOrDesktop && <Button>Авторизация</Button>}
            </MobileNav>
          </>
        )}
      </div>
    </Container>
  );
};
