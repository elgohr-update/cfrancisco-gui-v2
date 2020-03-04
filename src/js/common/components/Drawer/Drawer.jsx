import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import logo from 'Assets/images/dojotLogo.png'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { useStyles } from './Drawer'

const DrawerComponent = (props) => {
  const classes = useStyles()
  const {
    isOpen, primaryItems, secondaryItems,
  } = props
  const activeRoute = (routeName) => (props.location.pathname.indexOf(routeName) > -1)

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
          [classes.paperShadow]: true,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <img src={logo} alt="dojot logo" />
      </div>
      <MenuList disablePadding>
        {primaryItems.map((item) => (
          <Link to={item.path} className={classes.menuLink} key={item.label}>
            <MenuItem selected={activeRoute(item.path)} className={activeRoute(item.path) ? classes.menuItemSelected : ''}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
      <MenuList className={classes.bottomList}>
        {secondaryItems.map((item) => (
          <Link to={item.path} className={classes.menuLink} key={item.label}>
            <MenuItem selected={activeRoute(item.path)} className={activeRoute(item.path) ? classes.menuItemSelected : ''}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Drawer>
  )
}

DrawerComponent.defaultProps = {
  secondaryItems: [],
  isOpen: true,
}

DrawerComponent.propTypes = {
  primaryItems: PropTypes.array.isRequired,
  secondaryItems: PropTypes.array,
  isOpen: PropTypes.bool,
}

export default withRouter(DrawerComponent)
