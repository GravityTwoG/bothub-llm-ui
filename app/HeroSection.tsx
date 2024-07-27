'use client';
import { useRouter } from 'next/navigation';

import classes from './home-page.module.scss';

import { Container } from '@/ui/atoms/Container/Container';
import { Button } from '@/ui/atoms/Button/Button';
import { H1, Paragraph } from '@/ui/atoms/Typography/Typography';
import { Chat } from '@/app/components/Chat/Chat';

export const HeroSection = () => {
  const router = useRouter();

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

          <Button
            onClick={() => router.push('/chat', { scroll: false })}
            size="md"
          >
            Начать работу
          </Button>
        </div>

        <Chat />
      </Container>
    </div>
  );
};
