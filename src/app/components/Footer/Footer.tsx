import classes from './footer.module.scss';

import { Container } from '@/ui/atoms/Container/Container';

import Logo from '@/ui/icons/Logo.svg?react';
import Association from './association.png';
import { Paragraph } from '@/ui/atoms/Typography/Typography';

type Link = {
  link: string;
  icon?: string;
  title: string;
};

type Column = {
  title: string;
  links: Link[];
};

const columns: Column[] = [
  {
    title: 'Информация',
    links: [
      { link: '#', title: 'Главная страница' },
      {
        link: '#',
        title: 'Тарифы',
      },
      {
        link: '#',
        title: 'Контакты',
      },
      {
        link: '#',
        title: 'Наши возможности',
      },
      {
        link: '#',
        title: 'Модели нейросетей',
      },
      {
        link: '#',
        title: 'О Нас',
      },
      {
        link: '#',
        title: 'Для инвесторов',
      },
    ],
  },
  {
    title: 'Наши продукты',
    links: [
      {
        link: '#',
        title: 'ChatGPT для бизнеса',
      },
      {
        link: '#',
        title: 'Агрегатор нейросетей',
      },
      {
        link: '#',
        title: 'ChatGPT в Telegram',
      },
    ],
  },
  {
    title: 'Ссылки',
    links: [
      {
        link: '#',
        icon: '',
        title: 'Сообщество в телеграм',
      },
      {
        link: '#',
        icon: '',
        title: 'Телеграм бот',
      },
      {
        link: 'mailto:email@bothub.chat',
        icon: '',
        title: 'email@bothub.chat',
      },
    ],
  },
  {
    title: 'Блог',
    links: [
      {
        link: '#',
        icon: '',
        title: 'Наш блог',
      },
      {
        link: '#',
        icon: '',
        title: 'Habr',
      },
      {
        link: '#',
        icon: '',
        title: 'Telegram',
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <Container className={classes.FooterContent}>
        <div className={classes.Copyrights}>
          <Logo className={classes.Logo} />

          <div className={classes.Law}>
            <Paragraph size="sm">ООО «Ботхаб» ОГРН 1236300016259</Paragraph>
            <Paragraph size="sm">@BotHub 2023</Paragraph>
            <a href="">
              <Paragraph size="sm">Пользовательское соглашение</Paragraph>
            </a>
          </div>
          <img
            className={classes.Association}
            src={Association}
            alt="АЛРИИ Ассоциация лабораторий по развитию искусственного интеллекта"
          />
        </div>

        <ul className={classes.Columns}>
          {columns.map((column) => (
            <li className={classes.Column} key={column.title}>
              <div className={classes.Title}>{column.title}</div>

              <div className={classes.Links}>
                {column.links.map((link) => (
                  <a
                    href={link.link}
                    key={link.title}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.icon}
                    <Paragraph>{link.title}</Paragraph>
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};
