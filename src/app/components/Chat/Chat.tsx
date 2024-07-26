import { useEffect, useId, useRef } from 'react';
import { clsx } from 'clsx';

import classes from './chat.module.scss';

import { Paragraph } from '@/ui/atoms/Typography/Typography';
import { Button } from '@/ui/atoms/Button/Button';

import ChatAvatar from '@/ui/assets/images/ChatAvatar.svg?react';
import Send from '@/ui/icons/Send.svg?react';
import User from '@/ui/icons/User.svg?react';
import Gemini from '@/ui/icons/Gemini.svg?react';

export const Chat = () => {
  const checkboxId = useId();

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let degrees = 0;

    function animate() {
      if (!isMounted || !chatRef.current) return;

      const div = chatRef.current;
      div.style.setProperty('--deg', degrees + 'deg');
      degrees = (degrees + 0.5) % 360;
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const messages = [
    {
      id: 0,
      text: 'Привет бот',
      type: 'request',
    },
    {
      id: 1,
      text: 'Привет! Чем я могу помочь?',
      type: 'response',
    },
  ];

  return (
    <div className={classes.ChatWrapper}>
      <div className={classes.Chat} ref={chatRef}>
        <div className={classes.ChatHeader}>
          <ChatAvatar className={classes.ChatIcon} />

          <div className={classes.ChatInfo}>
            <Paragraph className={classes.UserName}>
              BotHub: ChatGPT & Midjourney
            </Paragraph>
            <Paragraph size="sm" className={classes.UserType}>
              bot
            </Paragraph>
          </div>

          <div className={classes.ChatSettings}>
            <input type="checkbox" id={checkboxId} />
            <label htmlFor={checkboxId}>
              <Paragraph size="sm">Сохранить контекст</Paragraph>
            </label>
          </div>
        </div>

        <div className={classes.ChatContent}>
          <ul className={classes.ChatMessages}>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message.text}
                user={message.type === 'request' ? 'You' : 'Bot'}
              />
            ))}
          </ul>

          <form className={classes.ChatForm} onSubmit={onSend}>
            <input
              type="text"
              className={classes.ChatFormInput}
              placeholder="Спроси о чем-нибудь..."
            />
            <Button className={classes.SendButton}>
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Message = ({ message, user }: { message: string; user: string }) => {
  return (
    <li
      className={clsx(
        classes.ChatMessage,
        user === 'Bot' && classes.ChatMessageBot
      )}
    >
      <div className={classes.ChatMessageAvatar}>
        {user === 'Bot' ? <Gemini /> : <User />}
      </div>

      <div className={classes.ChatMessageContent}>
        <Paragraph size="sm" className={classes.ChatMessageUser}>
          {user === 'Bot' ? 'Gemini' : ''}
        </Paragraph>

        <Paragraph size="sm" className={classes.ChatMessageText}>
          {message}
        </Paragraph>
      </div>
    </li>
  );
};
