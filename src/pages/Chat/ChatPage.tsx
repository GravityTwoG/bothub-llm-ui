import classes from './chat-page.module.scss';

import { Container } from '@/ui/atoms/Container/Container';
import { Chat } from '@/app/components/Chat/Chat';

export const ChatPage = () => {
  return (
    <div className={classes.ChatPage}>
      <Container>
        <Chat
          className={classes.Chat}
          messageListClassName={classes.MessageList}
        />
      </Container>
    </div>
  );
};
