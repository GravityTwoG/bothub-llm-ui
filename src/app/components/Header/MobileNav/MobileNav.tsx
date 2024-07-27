import { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

import classes from './mobile-nav.module.scss';

import { NavItemType, SubNavItems } from '../HeaderNav/HeaderNav';

import { ReactComponent as ArrowDown } from '@/ui/assets/icons/ArrowDown.svg';
import { Paragraph } from '@/ui/atoms/Typography/Typography';
import { useDelayedBoolean } from '@/app/hooks/useDelayedBoolean';

export type MobileNavProps = {
  navItems: NavItemType[];
  isOpen: boolean;
  children?: ReactNode;
};

export const MobileNav = ({ navItems, isOpen, children }: MobileNavProps) => {
  const delayedIsOpen = useDelayedBoolean(isOpen, 50);

  return (
    (isOpen || delayedIsOpen) && (
      <nav
        className={clsx(
          classes.MobileNav,
          isOpen && delayedIsOpen && classes.Open
        )}
      >
        <style>{'html { overflow: hidden; }'}</style>

        <ul>
          {navItems.map((item, idx) => (
            <NavItem key={idx} link={item.link} subNavItems={item.subNavItems}>
              {item.title}
            </NavItem>
          ))}
        </ul>
        {children}
      </nav>
    )
  );
};

type NavItemProps = {
  children: ReactNode;
  link?: string;
  subNavItems?: {
    link: string;
    icon: ReactNode;
    title: ReactNode;
    description: ReactNode;
  }[];
};

const NavItem = (props: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={classes.NavItemWrapper}>
      <div
        role={props.subNavItems ? 'button' : undefined}
        onClick={() => props.subNavItems && setIsOpen(!isOpen)}
        className={clsx(
          classes.NavItem,
          props.subNavItems && classes.NavItemWithSubNav,
          isOpen && classes.NavItemOpen
        )}
      >
        {props.subNavItems ? (
          <Paragraph fontWeight="semibold">{props.children}</Paragraph>
        ) : (
          <a href={props.link}>
            <Paragraph fontWeight="semibold">{props.children}</Paragraph>
          </a>
        )}
        {props.subNavItems ? <ArrowDown className={classes.ArrowDown} /> : null}
      </div>

      {props.subNavItems !== undefined && isOpen && (
        <SubNavItems
          subNavItems={props.subNavItems}
          className={classes.SubNav}
        />
      )}
    </li>
  );
};
