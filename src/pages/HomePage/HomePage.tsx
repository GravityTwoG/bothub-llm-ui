import classes from './home-page.module.scss';

import { Container } from '@/ui/atoms/Container/Container';
import { Button } from '@/ui/atoms/Button/Button';
import { H1, H2, Paragraph } from '@/ui/atoms/Typography/Typography';
import MidjourneyGenerated from '@/ui/assets/images/MidjourneyGenerated.png';

export const HomePage = () => {
  return (
    <div className={classes.HomePage}>
      <HeroSection />

      <FeaturesSection />

      <ExtraFeatureSection />
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className={classes.HeroSection}>
      <Container className={classes.HeroSectionContainer}>
        <div className={classes.HeroSectionText}>
          <H1>ChatGPT: ваш умный помощник</H1>
          <Paragraph fontWeight="medium">
            Экспериментируйте с ChatGPT-4, Midjourney и Claude в одном месте.
            Без VPN и абонентской платы. Создавайте контент, обрабатывайте
            данные и получайте ответы на вопросы через удобный интерфейс!
          </Paragraph>
          <Button size="md">Начать работу</Button>
        </div>
        <div className={classes.HeroSectionImage}></div>
      </Container>
    </div>
  );
};

const features = [
  {
    title: 'Создание увлекательного контента',
    description:
      'Вы когда-нибудь мечтали написать интересную книгу или статью, но не знали, с чего начать? ChatGPT отлично справляется с генерацией текстов на любые темы. Опишите ему свою идею - и он создаст увлекательный контент, который захватит внимание читателей.',
  },
  {
    title: 'Решение сложных задач',
    description:
      'Задачи по математике или программированию иногда кажутся неразрешимыми головоломками. Но не для ChatGPT! Он проанализирует проблему и предложит пошаговое решение. Вы быстро разберетесь в сложных концепциях благодаря его доступным объяснениям.',
  },
  {
    title: 'Разработка и отладка кода',
    description:
      'ChatGPT может помочь в написании и исправлении кода. Он проанализирует ваш код, найдет ошибки и предложит способы их исправления. Также ChatGPT способен самостоятельно писать код по вашим указаниям - к примеру, для создания веб-сайта или приложения.',
  },
  {
    title: 'Перевод текстов между языками',
    description:
      'ChatGPT отлично справляется с переводом текстов на десятки языков. Теперь вам не нужно тратить время на поиск переводчика - просто попросите ChatGPT, и он мгновенно переведет любой текст на нужный вам язык.',
  },
  {
    title: 'Помощь в написании резюме',
    description:
      'Вы ищете новую работу и нуждаетесь в резюме, которое произведет впечатление на работодателя? ChatGPT поможет создать резюме, идеально подходящее под ваши навыки и опыт. Опишите ему желаемую вакансию - и получите готовое резюме в нужном формате.',
  },
  {
    title: 'Виртуальный помощник в жизни',
    description:
      'Не знаете, как приготовить новое блюдо или спланировать отпуск? Просто спросите ChatGPT! Он выступит в качестве виртуального помощника в повседневных задачах, предоставив полезную информацию и рекомендации в любой сфере жизни.',
  },
];

const FeaturesSection = () => {
  return (
    <div className={classes.FeaturesSection}>
      <Container className={classes.FeaturesSectionContainer}>
        <H2 className={classes.FeaturesSectionTitle}>Возможности ChatGPT</H2>

        <ul className={classes.FeaturesList}>
          {features.map((feature) => (
            <FeatureItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </Container>
    </div>
  );
};

const FeatureItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <li className={classes.FeatureItem}>
      <div className={classes.FeatureItemTitle}>{title}</div>
      <Paragraph>{description}</Paragraph>
    </li>
  );
};

const ExtraFeatureSection = () => {
  return (
    <Container className={classes.ExtraFeatureSection}>
      <img
        src={MidjourneyGenerated}
        className={classes.ExtraFeatureSectionImage}
        alt=""
      />
      <div className={classes.ExtraFeatureSectionText}>
        <H2>Генерация Изображений Через Midjourney</H2>
        <Paragraph>
          MidJourney - инструмент для создания уникальных изображений. Наши
          алгоритмы помогут вам воплотить в жизнь вашу идею. Начните
          генерировать изображения с MidJourney прямо сейчас! Кликните на кнопку
          ниже, чтобы начать творить.
        </Paragraph>

        <Button>Попробовать Midjourney</Button>
      </div>
    </Container>
  );
};
