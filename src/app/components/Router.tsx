import { Route, Switch } from 'wouter';

import { ChatPage } from '@/pages/Chat/ChatPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

export const Router = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />

      <Route path="/chat" component={ChatPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};
