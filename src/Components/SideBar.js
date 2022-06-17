import React, { useState } from 'react'
import clsx from 'clsx';
import logo from '../Assets/Images/PACRA_logo.png';
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    useTheme,
    CssBaseline,
    Drawer,
    Typography,
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import {
    Apps,
    ContactMail,
    AssignmentInd,
    Dashboard,
    Home
} from "@material-ui/icons";
import AppBarr from './AppBarr';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GridOnIcon from '@mui/icons-material/GridOn';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        background: "#E8E8E8",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#E8E8E8",
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        width: '130px',
        height: '130px',
        display: 'flex',
        margin: ' 0px auto 0px auto'
    },
    listItem: {
        color: '#204162'
    },
}));

const listItems = [
    {
        listIcon: <Home />,
        listText: "Home",
        listLink: "/"
    },
    {
        listIcon: <Dashboard />,
        listText: "PACRA",
        listLink: "/PACRA"
    },
    {
        listIcon: <AssignmentInd />,
        listText: "Ratings",
        listLink: "/Ratings"
    },
    {
        listIcon: <Apps />,
        listText: "VIS",
        listLink: "/VIS"
    },
    {
        listIcon: <ContactMail />,
        listText: "P + V",
        listLink: "/P&V"
    },
    {
        listIcon: <AssignmentInd />,
        listText: "Input Data",
        listLink: "/InputData"
    },
];

export default function SideBar(props) {
    const [isOpened, setisOpened] = useState(false)
    const classes = useStyles();
    const theme = useTheme();

    const gridText = () => {
        return (
            <Typography className={classes.listItem}>
                Grid <ListItemIcon>{props.open ?
                    <ExpandMoreIcon /> : <ExpandLessIcon />
                }</ListItemIcon>
            </Typography>
        )
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarr
                clasname={clsx(classes.appBar, {
                    [classes.appBarShift]: props.open,
                })}
                isOpen={props.open}
                SideNavOpen={props.handleDrawerOpen}
                SideNavClose={props.handleDrawerClose}
                clasName={clsx(classes.menuButton, {
                    [classes.hide]: props.open,
                })}
            />
            <Drawer
                anchor="left"
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: props.open,
                        [classes.drawerClose]: !props.open,
                    }),
                }}>
                <div className={classes.toolbar}>
                    <IconButton onClick={props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div className={classes.menuSliderContainer}>
                        {props.open ?
                            <img
                                src={logo}
                                className={classes.logo}
                                alt=''
                            />
                            :
                            null}
                        <Divider />
                        <List>
                            {listItems.map((listItem, index) => (
                                <Link to={listItem.listLink} className='activeClass'>
                                    <ListItem className={classes.listItem} button key={index}>
                                        <ListItemIcon className={classes.listItem}>
                                            {listItem.listIcon}
                                        </ListItemIcon>
                                        <ListItemText primary={listItem.listText} />
                                    </ListItem>
                                </Link>
                            ))}
                            <ListItem className={classes.listItem} onClick={() => setisOpened(!isOpened)} button>
                                {props.open ?
                                    <>
                                        <ListItemIcon className={classes.listItem}>
                                            <GridOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Grid" />
                                        <ListItemIcon className={classes.listItem}>
                                            {isOpened ?
                                                <ExpandMoreIcon /> : <ExpandLessIcon />
                                            }
                                        </ListItemIcon>
                                    </>
                                    :
                                    <ListItemIcon className={classes.listItem}>
                                        {isOpened ?
                                            <ExpandMoreIcon /> : <ExpandLessIcon />
                                        }
                                    </ListItemIcon>}
                            </ListItem>
                            <List className={isOpened ? 'd-none' : null}>
                                <Link to='/'>
                                    <ListItem className={classes.listItem} button >
                                        <ListItemIcon className={classes.listItem}>
                                            <Dashboard />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                </Link>
                                <Link to='/PACRA'>
                                    <ListItem className={classes.listItem} button >
                                        <ListItemIcon className={classes.listItem}>
                                            <AssignmentInd />
                                        </ListItemIcon>
                                        <ListItemText primary="Ratings" />
                                    </ListItem>
                                </Link>
                                <Link to='/PACRA'>
                                    <ListItem className={classes.listItem} button >
                                        <ListItemIcon className={classes.listItem}>
                                            <ContactMail />
                                        </ListItemIcon>
                                        <ListItemText primary="Ratings" />
                                    </ListItem>
                                </Link>
                            </List>
                            {/* <Link to='/PACRA'>
                                <ListItem className={classes.listItem} button >
                                    <ListItemIcon className={classes.listItem}>
                                        <ContactMail />
                                    </ListItemIcon>
                                    <ListItemText primary='PACRA' />
                                </ListItem>
                            </Link> */}
                        </List>
                    </div>
                </List >
            </Drawer >
        </div >
    );
}
