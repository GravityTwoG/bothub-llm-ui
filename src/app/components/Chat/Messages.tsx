import { memo, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import classes from './chat.module.scss';
import { Message as MessageType } from '@/api/openaiClient';

import { useMeasure } from '@uidotdev/usehooks';
import { useDelayedBoolean } from '@/app/hooks/useDelayedBoolean';
import { HTMLComponentsProps } from '@/ui/types';

import {
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
} from '@/ui/atoms/Typography/Typography';
import { Code } from '@/ui/atoms/Code/Code';
import { ReactComponent as User } from '@/ui/assets/icons/User.svg';
import { ReactComponent as Gemini } from '@/ui/assets/icons/Gemini.svg';
import Markdown from 'react-markdown';

const MAX_DELAY = 500;
const DELAY_PER_MESSAGE = 70;

const computeDelay = (length: number, idx: number, scale: number) => {
  const maxDelayedMessages = Math.floor(MAX_DELAY / DELAY_PER_MESSAGE);

  if (idx < length - maxDelayedMessages) {
    return 0;
  }

  return DELAY_PER_MESSAGE + idx * DELAY_PER_MESSAGE * scale;
};

export type MessageListProps = {
  messages: MessageType[];
  className?: string;
};

export const MessageList = memo(({ messages, className }: MessageListProps) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const [ref, { height }] = useMeasure();

  const scrollToBottom = useCallback((top: number) => {
    messageListRef.current?.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!messageListRef.current) return;

    scrollToBottom(messageListRef.current.scrollHeight);
  }, [messages, scrollToBottom]);

  const mountDelayScale = useRef(1);
  useEffect(() => {
    setTimeout(() => {
      mountDelayScale.current = 0;
    }, MAX_DELAY + DELAY_PER_MESSAGE);
  }, []);

  return (
    <div
      style={{ height: height || 0 }}
      ref={messageListRef}
      className={clsx(classes.ChatMessages, 'custom-scrollbar', className)}
    >
      <ul ref={ref}>
        {messages.map((message, idx) => (
          <Message
            key={message.id}
            message={message.content}
            user={message.role === 'user' ? 'You' : 'Bot'}
            scrollToBottom={scrollToBottom}
            mountDelay={computeDelay(
              messages.length,
              idx,
              mountDelayScale.current
            )}
          />
        ))}
      </ul>
    </div>
  );
});

export type MessageProps = {
  message: string;
  user: string;
  scrollToBottom: (top: number) => void;
  mountDelay: number;
};

export const Message = memo(({ message, user, mountDelay }: MessageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const delayedIsMounted = useDelayedBoolean(isMounted, mountDelay);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <li
      className={clsx(
        classes.ChatMessage,
        user === 'Bot' && classes.ChatMessageBot,
        isMounted && delayedIsMounted && classes.ChatMessageMounted
      )}
    >
      <div className={classes.ChatMessageAvatar}>
        {user === 'Bot' ? <Gemini /> : <User />}
      </div>

      <div className={classes.ChatMessageContent}>
        <Paragraph size="sm" className={classes.ChatMessageUser}>
          {user === 'Bot' ? 'Gemini' : ''}
        </Paragraph>

        <div className={classes.ChatMessageText}>
          <Markdown components={components}>{message}</Markdown>
        </div>
      </div>
    </li>
  );
});

type HTMLComponentsPropsWithoutRef<T extends keyof JSX.IntrinsicElements> =
  Omit<HTMLComponentsProps<T>, 'ref'>;

const components = {
  p: (props: HTMLComponentsPropsWithoutRef<'p'>) => {
    return (
      <Paragraph
        size="sm"
        {...props}
        className={clsx(props.className, classes.ChatMessageTextP)}
      />
    );
  },
  h1: (props: HTMLComponentsPropsWithoutRef<'h1'>) => {
    return <H1 {...props} />;
  },
  h2: (props: HTMLComponentsPropsWithoutRef<'h2'>) => {
    return <H2 {...props} />;
  },
  h3: (props: HTMLComponentsPropsWithoutRef<'h3'>) => {
    return <H3 {...props} />;
  },
  h4: (props: HTMLComponentsPropsWithoutRef<'h4'>) => {
    return <H4 {...props} />;
  },
  h5: (props: HTMLComponentsPropsWithoutRef<'h5'>) => {
    return <H5 {...props} />;
  },
  h6: (props: HTMLComponentsPropsWithoutRef<'h6'>) => {
    return <H6 {...props} />;
  },
  code: (props: HTMLComponentsPropsWithoutRef<'code'>) => {
    return <Code {...props} />;
  },
};
