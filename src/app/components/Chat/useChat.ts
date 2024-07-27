'use client';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

import { Message } from '@/api/openaiClient';
import { createCompletion } from '@/api/createCompletion';

const context = {
  saveContext(messages: Message[]) {
    localStorage.setItem('context', JSON.stringify(messages));
  },
  getContext() {
    try {
      const context = localStorage.getItem('context');
      if (context) {
        return JSON.parse(context);
      }
      return [];
    } catch (error) {
      return [];
    }
  },
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);

  const [isContextSaved, setIsContextSaved] = useLocalStorage(
    'isContextSaved',
    false
  );

  useEffect(() => {
    if (isContextSaved) {
      const savedMessages = context.getContext();
      setMessages(savedMessages);
    }
    // run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessage = async (message: string) => {
    const oldMessages = messages;
    try {
      setIsPending(true);
      const id = crypto.randomUUID();

      const withRequest: Message[] = [
        ...oldMessages,
        { role: 'user', content: message, id: id },
      ];

      setMessages(withRequest);

      const response = await createCompletion(withRequest);

      const newMessages = [...withRequest, response];

      setMessages(newMessages);
      if (isContextSaved) {
        context.saveContext(newMessages);
      }
    } catch (error) {
      // reset messages
      setMessages(oldMessages);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const onSetIsContextSaved = (value: boolean) => {
    setIsContextSaved(value);

    if (value) {
      context.saveContext(messages);
    } else {
      context.saveContext([]);
    }
  };

  return {
    messages,
    addMessage,
    isPending,
    isContextSaved,
    setIsContextSaved: onSetIsContextSaved,
  };
};
