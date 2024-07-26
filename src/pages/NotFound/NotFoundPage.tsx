import classes from './not-found-page.module.scss';

import { H1 } from '@/ui/atoms/Typography/Typography';

export const NotFoundPage = () => {
  return (
    <div className={classes.NotFoundPage}>
      <div>
        <H1>404: Страница не найдена</H1>
      </div>
    </div>
  );
};
