import { Fragment } from 'react';
// FC,
import Typography from '@mui/material/Typography';

type ComponentProps = {HeadingCapital: string, heading: string}

// : FC<{HeadingCapital: string, heading: string}>
export const PageHeader = ( {HeadingCapital, heading}: ComponentProps ) => {

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <Fragment>
      <Typography variant="h3" component="h3" gutterBottom>
        User {HeadingCapital}
      </Typography>
      <Typography variant="subtitle2">
        {user.name}, this could be your {heading} panel.
      </Typography>
    </Fragment>
  );
}

