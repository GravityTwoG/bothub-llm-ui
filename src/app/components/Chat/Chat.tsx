'use client';

import { forwardRef, useId, useRef, useState } from 'react';
import { clsx } from 'clsx';

import classes from './chat.module.scss';
import { useDegreesAnimation } from './useDegreesAnimation';

import { useChat } from '@/app/components/Chat/useChat';
import { Message as MessageType } from '@/api/openaiClient';

import { Paragraph } from '@/ui/atoms/Typography/Typography';
import { Button } from '@/ui/atoms/Button/Button';

import { ReactComponent as ChatAvatar } from '@/ui/assets/images/ChatAvatar.svg';
import { ReactComponent as Send } from '@/ui/assets/icons/Send.svg';
import { MessageList } from './Messages';
import { useIsClient } from '@uidotdev/usehooks';

const defaultMessages: MessageType[] = [
  { role: 'user', content: 'Привет бот.', id: crypto.randomUUID() },
  {
    role: 'assistant',
    content: 'Привет! Я бот, который может помочь вам с вашими вопросами.',
    id: crypto.randomUUID(),
  },
];

export type ChatProps = {
  className?: string;
  messageListClassName?: string;
};

export const Chat = (props: ChatProps) => {
  const isClient = useIsClient();

  return (
    <div className={clsx(classes.ChatWrapper)}>
      {isClient ? <ChatOnClient {...props} /> : <ChatOnServer {...props} />}
    </div>
  );
};

const ChatOnClient = (props: ChatProps) => {
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
      setError(`Произошла ошибка: ${error}`);
    }
  };

  const ref = useDegreesAnimation<HTMLDivElement>();

  return (
    <div className={clsx(classes.Chat, props.className)} ref={ref}>
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
            autoFocus
          />
          <label htmlFor={checkboxId}>
            <Paragraph size="sm">Сохранить контекст</Paragraph>
          </label>
        </div>
      </div>

      <div className={classes.ChatContent}>
        <MessageList
          messages={messagesToShow}
          className={props.messageListClassName}
        />

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
  );
};

const ChatOnServer = (props: ChatProps) => {
  const checkboxId = useId();

  return (
    <div className={clsx(classes.Chat, props.className)}>
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
          <input type="checkbox" id={checkboxId} autoFocus />
          <label htmlFor={checkboxId}>
            <Paragraph size="sm">Сохранить контекст</Paragraph>
          </label>
        </div>
      </div>

      <div className={classes.ChatContent}>
        <MessageList
          messages={defaultMessages}
          className={props.messageListClassName}
        />

        <ChatForm
          input={''}
          setInput={() => {}}
          isPending={false}
          onSend={async () => {}}
        />
      </div>
    </div>
  );
};

type ChatFormProps = {
  input: string;
  setInput: (value: string) => void;
  isPending: boolean;
  onSend: () => Promise<void>;
};

const ChatForm = ({ input, setInput, isPending, onSend }: ChatFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    await onSend();
    if (!textareaRef.current) return;

    textareaRef.current.focus();
    textareaRef.current.style.height = 'auto';
  };

  const ref = useDegreesAnimation<HTMLFormElement>(4, isPending);

  return (
    <form
      className={clsx(classes.ChatForm, isPending && classes.ChatIsPending)}
      onSubmit={onSubmit}
      ref={ref}
    >
      <TextArea
        ref={textareaRef}
        input={input}
        setInput={setInput}
        isPending={isPending}
        onEnter={onSubmit}
      />
      <Button className={classes.SendButton} disabled={isPending}>
        <Send />
      </Button>
    </form>
  );
};

type TextAreaProps = {
  input: string;
  setInput: (value: string) => void;
  isPending: boolean;
  onEnter?: () => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.setInput(e.target.value);

      const element = e.target;
      element.style.height = 'auto';
      element.style.height = `${Math.min(element.scrollHeight, 16 * 4)}px`;
    };

    return (
      <textarea
        className={classes.ChatFormInput}
        placeholder="Спроси о чем-нибудь... (Shift + Enter для переноса строки)"
        value={props.input}
        onChange={onChange}
        disabled={props.isPending}
        rows={1}
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            props.onEnter?.();
          }
        }}
      />
    );
  }
);
