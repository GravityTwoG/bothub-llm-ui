import { Component, ReactNode, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import classes from './code.module.scss';

import { HTMLComponentsProps } from '@/ui/types';

import { Paragraph } from '../Typography/Typography';
import { ReactComponent as Copy } from '@/ui/assets/icons/Copy.svg';

const copiedStateMap = {
  success: 'CopySuccess',
  error: 'CopyFailed',
  null: '',
};

export type CodeProps = HTMLComponentsProps<'div'>;

export const Code = ({ className, ...props }: CodeProps) => {
  const language = className?.split('-')[1];

  const [isCopied, setIsCopied] = useState<'success' | 'error' | 'null'>(
    'null'
  );

  const onCopy = () => {
    try {
      if (isCopied !== 'null') return;
      setIsCopied('null');
      if (!navigator.clipboard || typeof props.children !== 'string') {
        return;
      }

      navigator.clipboard.writeText(props.children);
      setIsCopied('success');
      setTimeout(() => {
        setIsCopied('null');
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsCopied('error');
    }
  };

  const [code, setCode] = useState<
    string | Exclude<ReactNode, undefined | null>
  >(props.children || '');

  useEffect(() => {
    async function highlight() {
      if (typeof props.children !== 'string' || !language) {
        return;
      }
      const { codeToHtml } = await import('shiki/bundle/web');

      try {
        const code = await codeToHtml(props.children, {
          lang: language,
          theme: 'material-theme-ocean',
        });

        setCode(code);
      } catch (error) {
        console.error(error);
      }
    }

    highlight();
  }, [props.children, language]);

  return (
    <CodeErrorBoundary>
      <div className={clsx(classes.Code, className)}>
        {language && (
          <div className={classes.CodeLanguage}>
            <Paragraph size="sm" fontWeight="bold">
              {language}
            </Paragraph>

            <button
              className={clsx(
                classes.CopyButton,
                classes[copiedStateMap[isCopied]]
              )}
              onClick={onCopy}
            >
              <Copy />
            </button>
          </div>
        )}

        <div
          {...props}
          children={undefined}
          className={clsx(classes.CodeContent, className)}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    </CodeErrorBoundary>
  );
};

class CodeErrorBoundary extends Component<
  HTMLComponentsProps<'div'>,
  { error: Error | null }
> {
  constructor(props: HTMLComponentsProps<'div'>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div {...this.props}>
          <Paragraph size="sm" className={classes.CodeError}>
            Произошла ошибка при отображении кода
          </Paragraph>
        </div>
      );
    }

    return this.props.children;
  }
}
