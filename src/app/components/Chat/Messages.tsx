import { memo, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import classes from './chat.module.scss';
import { Message as MessageType } from '@/api/api';

import { useMeasure } from '@uidotdev/usehooks';
import { useDelayedBoolean } from '@/app/hooks/useDelayedBoolean';
import { LineNode, parseMessage } from './parseMessage';

import {
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Code,
} from '@/ui/atoms/Typography/Typography';
import User from '@/ui/icons/User.svg?react';
import Gemini from '@/ui/icons/Gemini.svg?react';

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
          {parseMessage(message).map((line, index) => (
            <Line key={index} line={line} />
          ))}
        </div>
      </div>
    </li>
  );
});

const Line = memo(({ line }: { line: LineNode }) => {
  if (line.type === 'h1') {
    return <H1>{line.text}</H1>;
  }

  if (line.type === 'h2') {
    return <H2>{line.text}</H2>;
  }

  if (line.type === 'h3') {
    return <H3>{line.text}</H3>;
  }

  if (line.type === 'h4') {
    return <H4>{line.text}</H4>;
  }

  if (line.type === 'h5') {
    return <H5>{line.text}</H5>;
  }

  if (line.type === 'h6') {
    return <H6>{line.text}</H6>;
  }

  if (line.type === 'code') {
    return <Code>{line.text}</Code>;
  }

  return <Paragraph size="sm">{line.text}</Paragraph>;
});
