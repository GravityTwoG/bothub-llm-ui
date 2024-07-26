import { useId, useState } from 'react';
import { clsx } from 'clsx';

import classes from './chat.module.scss';
import { useDegreesAnimation } from './useDegreesAnimation';

import { useChat } from '@/app/components/Chat/useChat';
import { Message as MessageType } from '@/api/api';

import { Paragraph } from '@/ui/atoms/Typography/Typography';
import { Button } from '@/ui/atoms/Button/Button';

import ChatAvatar from '@/ui/assets/images/ChatAvatar.svg?react';
import Send from '@/ui/icons/Send.svg?react';
import { Message } from './Message';

const defaultMessages: MessageType[] = [
  { role: 'user', content: 'Привет бот.', id: crypto.randomUUID() },
  {
    role: 'assistant',
    content: 'Привет! Я бот, который может помочь вам с вашими вопросами.',
    id: crypto.randomUUID(),
  },
];

export const Chat = () => {
  const checkboxId = useId();

  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const { messages, addMessage, isPending, isContextSaved, setIsContextSaved } =
    useChat();

  let messagesToShow = messages;
  if (messages.length === 0) {
    messagesToShow = defaultMessages;
  }

  const onSend = async () => {
    try {
      if (input.trim() === '') return;

      setError('');
      setInput('');
      await addMessage(input);
    } catch (error) {
      setInput(input);
      setError(`Ошибка отправки сообщения: ${error}`);
    }
  };

  const ref = useDegreesAnimation<HTMLDivElement>();

  return (
    <div className={classes.ChatWrapper}>
      <div className={classes.Chat} ref={ref}>
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
            <input
              type="checkbox"
              id={checkboxId}
              checked={isContextSaved}
              onChange={(e) => setIsContextSaved(e.target.checked)}
            />
            <label htmlFor={checkboxId}>
              <Paragraph size="sm">Сохранить контекст</Paragraph>
            </label>
          </div>
        </div>

        <div className={classes.ChatContent}>
          <ul className={clsx(classes.ChatMessages, 'custom-scrollbar')}>
            {messagesToShow.map((message) => (
              <Message
                key={message.id}
                message={message.content}
                user={message.role === 'user' ? 'You' : 'Bot'}
              />
            ))}
          </ul>

          {error && (
            <div className={classes.ErrorMessage}>
              <Paragraph>{error}</Paragraph>
            </div>
          )}

          <ChatForm
            input={input}
            setInput={setInput}
            isPending={isPending}
            onSend={onSend}
          />
        </div>
      </div>
    </div>
  );
};

type ChatFormProps = {
  input: string;
  setInput: (value: string) => void;
  isPending: boolean;
  onSend: () => void;
};

const ChatForm = ({ input, setInput, isPending, onSend }: ChatFormProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend();
  };

  const ref = useDegreesAnimation<HTMLFormElement>(4, isPending);

  return (
    <form
      className={clsx(classes.ChatForm, isPending && classes.ChatIsPending)}
      onSubmit={onSubmit}
      ref={ref}
    >
      <input
        type="text"
        className={classes.ChatFormInput}
        placeholder="Спроси о чем-нибудь..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPending}
      />
      <Button className={classes.SendButton} disabled={isPending}>
        <Send />
      </Button>
    </form>
  );
};
