import { forwardRef, ReactNode, useId, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import { clsx } from 'clsx';

import classes from './header-nav.module.scss';

import ArrowDown from '@/ui/icons/ArrowDown.svg?react';

export type NavItemType = {
  link?: string;
  title: ReactNode;
  subNavItems?: SubNavItemType[];
};

export type SubNavItemType = {
  link: string;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
};

export type HeaderNavProps = {
  navItems: NavItemType[];
};

export const HeaderNav = ({ navItems }: HeaderNavProps) => {
  return (
    <nav className={classes.HeaderNav}>
      <ul>
        {navItems.map((item, idx) => (
          <NavItem key={idx} link={item.link} subNavItems={item.subNavItems}>
            {item.title}
          </NavItem>
        ))}
      </ul>
    </nav>
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
          props.subNavItems && classes.NavItemWithSubNav,
          isOpen && classes.NavItemOpen
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
        <SubNavItems
          subNavItems={props.subNavItems}
          ref={ref}
          className={classes.SubNavFloating}
        />
      )}
    </li>
  );
};

export type SubNavItemsProps = {
  subNavItems: SubNavItemType[];
  className?: string;
};

export const SubNavItems = forwardRef<HTMLUListElement, SubNavItemsProps>(
  ({ subNavItems, className }, ref) => {
    return (
      <ul className={clsx(classes.SubNav, className)} ref={ref}>
        {subNavItems.map((item, idx) => (
          <li key={idx}>
            <SubNavItem
              link={item.link}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          </li>
        ))}
      </ul>
    );
  }
);

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
