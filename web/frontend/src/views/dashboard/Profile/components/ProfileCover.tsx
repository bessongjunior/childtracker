// import PropTypes from 'prop-types';
import { FC, Fragment } from 'react';
import {
  Box,
  Typography,
  Card,
  // Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

// import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.palette.primary.main};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.palette.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
  `
  );

// type UserProps = {
//   savedCards: number,
//   name: string,
//   coverImg: string,
//   avatar: string,
//   description: string,
//   jobtitle: string,
//   location: string,
//   followers: string
// }

  // name: string,
  // profile_photo: string,
  // email: string,
  // date_of_birth: string,
  // sex: string,
  // country: string,
  // province: string,
  // description: string,
  // jobtitle: string


export const ProfileCover: FC<{ user: {
  savedCards: number,
  name: string,
  coverImg: string,
  avatar: string | undefined,
  description: string,
  jobtitle: string,
  location: string,
  followers: string
}
}> = ({ user }) => {
    return (
      <Fragment>
        <CardCover>
          <CardMedia image={user.coverImg} />
          <CardCoverAction>
            <Input accept="image/*" id="change-cover" multiple type="file" />
            <label htmlFor="change-cover">
              <Button
                startIcon={<UploadTwoToneIcon />}
                variant="contained"
                component="span"
              >
                Change cover
              </Button>
            </label>
          </CardCoverAction>
        </CardCover>
        <AvatarWrapper>
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
        <Box py={2} pl={2} mb={3}>
          <Typography gutterBottom variant="h4">
            {user.name}
          </Typography>
          <Typography variant="subtitle2">{user.description}</Typography>
          <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
            {user.jobtitle} | {user.location} | {user.followers} followers
          </Typography>
          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Button size="small" variant="contained">
                Follow
              </Button>
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
                View website
              </Button>
              <IconButton color="primary" sx={{ p: 0.5 }}>
                <MoreHorizTwoToneIcon />
              </IconButton>
            </Box>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              size="small"
              variant="text"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              See all {user.followers} connections
            </Button>
          </Box>
        </Box>
      </Fragment>
    );
  };
  
  // ProfileCover.propTypes = {
  //   // @ts-ignore
  //   user: PropTypes.object.isRequired
  // };

// export default ProfileCover;