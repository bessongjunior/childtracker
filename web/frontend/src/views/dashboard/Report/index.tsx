import { FC, Fragment } from 'react';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
// import { PageHeader } from '../../Setting/components/PageHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';
import { PageHeader } from '../Setting/components/PageHeader';


export const UserReport: FC = () => {

    return (
        <Fragment>
            <PageTitleWrapper>
                <PageHeader HeadingCapital='Reports' heading='report' />
            </PageTitleWrapper>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item>
                        <Card>
                            <CardHeader title='Report on Device' />
                            <Divider />
                            <CardContent>Hello</CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardHeader title='Feedback on User Experience' />
                            <Divider />
                            <CardContent>Hello</CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardHeader title='Report / Rate an administrator' />
                            <Divider />
                            <CardContent>Hello</CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardHeader title='Report on others' />
                            <Divider />
                            <CardContent>Hello</CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}