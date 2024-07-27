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

export const parseMessage = (message: string): LineNode[] => {
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
