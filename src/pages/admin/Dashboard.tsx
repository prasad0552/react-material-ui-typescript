import * as React from 'react';
import {
    Theme, withStyles, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Grid
} from '@material-ui/core';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
const classNames = require('classnames');
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessIcon from '@material-ui/icons/BusinessCenter';
import { List } from 'immutable';
import { User } from '../../state/User';
import { Page } from '../Page';
import { DashboardTile } from '../../components/DashboardTile';

interface IDashboardProps {
    fetchUsers: (context?: any) => void;
    users: List<User>;
    materialChartData: any[];
    classes?: any;
    theme?: any;
    children?: any;
    setTitle: (title: string) => void;
}

interface IPageState {
    usersTablePage?: number;
    usersTableRowsPerPage: number;
}

class DashboardPage extends Page<IDashboardProps, IPageState> {

    public componentWillMount() {
        this.setTitle('Dashboard')
    }

    public state: IPageState = {
        usersTablePage: 0,
        usersTableRowsPerPage: 5
    };

    private handleChangeUsersPage = (event: any, page: number) => {
        this.setState({ usersTablePage: page });
    }

    private handleChangeTableRowsPerPage = (event: any) => {
        this.setState({ usersTableRowsPerPage: event.target.value });
    }

    private renderUsers(): JSX.Element {
        const { users, classes } = this.props;
        if (!users) {
            return null;
        }

        return (
            <Paper className={classNames(classes.paper, classes.users)}>
                <h3 className={classes.sectionTitle}>Customers</h3>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(this.state.usersTablePage * this.state.usersTableRowsPerPage,
                            this.state.usersTablePage * this.state.usersTableRowsPerPage + this.state.usersTableRowsPerPage).map((n: any) => {
                                return (
                                    <TableRow key={n.uid}>
                                        <TableCell component='th' scope='row'>
                                            {n.uid}
                                        </TableCell>
                                        <TableCell>{n.displayName}</TableCell>
                                        <TableCell>{n.email}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    component='div'
                    count={users.size}
                    rowsPerPage={this.state.usersTableRowsPerPage}
                    page={this.state.usersTablePage}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangeUsersPage}
                    onChangeRowsPerPage={this.handleChangeTableRowsPerPage}
                />
            </Paper>
        );

    }

    private renderRadialBarChart(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <h3 className={this.props.classes.sectionTitle}>Material Inventory</h3>
                <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                        <Pie
                            data={this.props.materialChartData}
                            dataKey='value'
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            label={true}
                            fill='#8884d8' />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        );
    }

    private renderBarChart(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <h3 className={this.props.classes.sectionTitle}>Material Sales</h3>
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={this.props.materialChartData}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='value' fill='#8884d8' />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        );
    }

    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container={true} spacing={24}>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <DashboardTile
                            icon={<GroupIcon className={classes.headerTileIcon} />}
                            classes={classes}
                            label={`${this.props.users.size} Customers`}
                        />
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <DashboardTile
                            icon={<ListIcon className={classes.headerTileIcon} />}
                            classes={classes}
                            label={'Reservations'}
                        />
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>

                        <DashboardTile
                            icon={<BusinessIcon className={classes.headerTileIcon} />}
                            classes={classes}
                            label={'Purchases'}
                        />
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <DashboardTile
                            icon={<SettingsIcon className={classes.headerTileIcon} />}
                            classes={classes}
                            label={'Settings'}
                        />
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderBarChart()}
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderRadialBarChart()}
                    </Grid>
                    <Grid item={true} xs={12}>
                        {this.renderUsers()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 24,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    headerTiles: {
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `5px solid ${theme.palette.secondary.main}`,
    },
    headerTileIcon: {
        fontSize: 40,
        color: theme.palette.primary.main,
        paddingRight: 5
    },
    tileText: {
        fontSize: 20,
        color: theme.palette.grey['400'],
    },
    sectionTitle: {
        paddingLeft: theme.spacing.unit * 2,
    },
    users: {
        marginBottom: 24,
        overflowX: 'scroll'
    },
    chart: {
        width: '100%'
    },
});

export default withStyles(styles as any, { withTheme: true })(DashboardPage as any) as any;
