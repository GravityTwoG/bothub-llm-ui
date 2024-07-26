import { memo } from 'react';
import clsx from 'clsx';

import classes from './chat.module.scss';

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

const parseCode = (lines: string[], index: number) => {
  const code = [];

  for (let i = index + 1; i < lines.length; i++) {
    if (lines[i].startsWith('```')) {
      break;
    }
    code.push(lines[i]);
  }

  return code;
};

export type LineNode = {
  type: 'text' | 'code' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
};

const parseMessage = (message: string): LineNode[] => {
  const lines: string[] = message.split('\n');

  if (lines.length === 0) {
    lines.push(message);
  }

  const parsedLines: LineNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const code = parseCode(lines, i);
      parsedLines.push({
        type: 'code',
        text: code.join('\n'),
      });
      i += code.length + 1;
    } else if (line.startsWith('# ')) {
      parsedLines.push({
        type: 'h1',
        text: line.slice(2),
      });
    } else if (line.startsWith('## ')) {
      parsedLines.push({
        type: 'h2',
        text: line.slice(3),
      });
    } else if (line.startsWith('### ')) {
      parsedLines.push({
        type: 'h3',
        text: line.slice(4),
      });
    } else if (line.startsWith('#### ')) {
      parsedLines.push({
        type: 'h4',
        text: line.slice(5),
      });
    } else if (line.startsWith('###### ')) {
      parsedLines.push({
        type: 'h5',
        text: line.slice(6),
      });
    } else if (line.startsWith('####### ')) {
      parsedLines.push({
        type: 'h6',
        text: line.slice(7),
      });
    } else {
      parsedLines.push({
        type: 'text',
        text: line,
      });
    }
  }

  return parsedLines;
};

export const Message = memo(
  ({ message, user }: { message: string; user: string }) => {
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

          <div className={classes.ChatMessageText}>
            {parseMessage(message).map((line, index) => (
              <Line key={index} line={line} />
            ))}
          </div>
        </div>
      </li>
    );
  }
);

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
