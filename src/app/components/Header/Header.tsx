import { ReactNode, useId, useState } from 'react';

import classes from './header.module.scss';

import Logo from '@/ui/icons/Logo.svg?react';
import ArrowDown from '@/ui/icons/ArrowDown.svg?react';
import Telegram from '@/ui/icons/Telegram.svg?react';
import Bag from '@/ui/icons/Bag.svg?react';

import { Button } from '@/ui/atoms/Button/Button';
import { Container } from '@/ui/atoms/Container/Container';

import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { clsx } from 'clsx';
import { useClickAway } from '@uidotdev/usehooks';

export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  return (
    <div>
      <div className={classes.HeaderPlaceholder}></div>
      <div className={classes.Header}>
        <Container className={classes.HeaderContent}>
          <div className={classes.HeaderLogo}>
            <Logo />
          </div>

          <div className={classes.HeaderSeparator}></div>

          <nav className={classes.HeaderNav}>
            <ul>
              <NavItem
                subNavItems={[
                  <SubNavItem
                    link="#"
                    icon={<Telegram />}
                    title="Телеграм боты"
                    description="Удобный бот телеграм, который всегда под рукой"
                  />,
                  <SubNavItem
                    link="#"
                    icon={<Bag />}
                    title="Для бизнеса"
                    description="Корпоративная подписка для юридических лиц"
                  />,
                ]}
              >
                Продукты
              </NavItem>
              <NavItem link="#">Пакеты</NavItem>
              <NavItem link="#">API</NavItem>
              <NavItem link="#">Блог</NavItem>
            </ul>
          </nav>

          <div className={classes.HeaderActions}>
            <div className={classes.LanguageSelector}>
              <LanguageSelector />
            </div>

            <div className={classes.HeaderActionItem}>
              <Button>Авторизация</Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

type NavItemProps = {
  children: ReactNode;
  link?: string;
  subNavItems?: ReactNode[];
};

const NavItem = (props: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = useId();

  const ref = useClickAway<HTMLUListElement>((e) => {
    if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
      const button = e.target.closest(`.${classes.NavItemWithSubNav}`);
      if (button && button.id === buttonId) {
        return;
      }
    }

    setIsOpen(false);
  });

  return (
    <li className={classes.NavItemWrapper}>
      <div
        id={buttonId}
        role={props.subNavItems ? 'button' : undefined}
        onClick={() => props.subNavItems && setIsOpen(!isOpen)}
        className={clsx(
          classes.NavItem,
          props.subNavItems && classes.NavItemWithSubNav
        )}
      >
        {props.subNavItems ? (
          <span>{props.children}</span>
        ) : (
          <a href={props.link}>{props.children}</a>
        )}
        {props.subNavItems ? <ArrowDown className={classes.ArrowDown} /> : null}
      </div>

      {props.subNavItems !== undefined && isOpen && (
        <ul className={classes.SubNav} ref={ref}>
          {props.subNavItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

type SubNavItemProps = {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  link: string;
};

const SubNavItem = (props: SubNavItemProps) => {
  return (
    <a href={props.link} className={classes.SubNavItem}>
      <div className={classes.SubNavItemIcon}>{props.icon}</div>
      <div>
        <p className={classes.SubNavItemTitle}>{props.title}</p>
        <p className={classes.SubNavItemDescription}>{props.description}</p>
      </div>
    </a>
  );
};
