import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon  from '@material-ui/icons/Home'
import {BrowserRouter as Router, NavLink, Route, Switch,Redirect} from 'react-router-dom'
import Assignment from '@material-ui/icons/Assignment'
import Redeem from '@material-ui/icons/Redeem'
import RvHookup from '@material-ui/icons/RvHookup'

//page
import Home from './component/pcomponent/Home'
import Production from './component/pcomponent/Production'
import NotFount from './component/pcomponent/NotFount'
import AddProducrion from './component/pcomponent/AddProducrion'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: "row-reverse",
    direction: 'rtl',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 36,
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  itemText: {
    textAlign: 'initial ',
    textDecoration: 'none'
  },
}));

export default function APP() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [urlItem]=React.useState(['home', 'producrion', 'financial', 'order'])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
 <Router>
 <div className={classes.root}>
      <CssBaseline />
      {/* *************header ******************/}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            سامانه ی فروشگاهی
          </Typography>
        </Toolbar>
      </AppBar>
     {/***************content *******************/}
      <main className={classes.content}>
        <div className={classes.toolbar} />
       <Switch>
          <Route exact path="/" >
             <Redirect to='/home'/>
          </Route>
          <Route exact path="/home" component={Home}/>
          <Route path='/producrion' component={Production}/>
          <Route path='/new-producrion' component={AddProducrion}/>
          <Route path='/edit-producrion/:id' component={AddProducrion}/>
          <Route component={NotFount} />
       </Switch>
      </main>
      {/* ************sidbar******************* */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer,{
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.itemText]:open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.itemText]:open,
          }),
        }}
        anchor="right"
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List >
        <ListItem >
            <ListItemText  className={classes.itemText} >داشبورد</ListItemText>
        </ListItem>
          {['پیشخوان', 'محصولات', 'مالی ', 'سفارشات'].map((text, index) => (
            <ListItem button key={text}>
               <NavLink className={classes.itemText}
                // to={'/'+ text}
                to={'/'+ urlItem[index] }
                >
                <ListItemIcon>{index % 4 === 0 ? <HomeIcon /> :
               index % 4 === 1 ? <Assignment />:
               index % 4 === 2 ? <Redeem />: 
               <RvHookup />}</ListItemIcon>
                </NavLink>
               <NavLink className={classes.itemText}
                // to={'/'+ text}
                to={'/'+ urlItem[index] }
                >
               <ListItemText  primary={text} />
               </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
    </div>
    </Router>
 );
}
