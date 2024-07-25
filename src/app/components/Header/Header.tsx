import { useEffect, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';

import classes from './header.module.scss';

import Logo from '@/ui/icons/Logo.svg?react';
import Telegram from '@/ui/icons/Telegram.svg?react';
import Bag from '@/ui/icons/Bag.svg?react';

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

export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
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
    <div>
      <div className={classes.HeaderPlaceholder}></div>
      <div className={classes.Header}>
        <Container className={classes.HeaderContent}>
          <div className={classes.HeaderLogo}>
            <Logo />
          </div>

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
      </div>
    </div>
  );
};
