import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/auth/authSlice';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../Text/Logo';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

const settings = ["profile", "logout"];
const pages = ["Dashboard", "Music", "Reviews", "Connect"];

const Navbar = () => {
  // Helpers
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Handle Open Nav Menu
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleCloseNavMenu = () => { setAnchorElNav(null) };
  
  // Handle Open Account Settings
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }
  const handleCloseUserMenu = () => { setAnchorElUser(null) };

  // Handle Logout
  const handleLogout = (event) => {
    dispatch(logout());
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Logo sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontSize: '1.75rem', color: 'inherit', textDecoration: 'none' }}/>
          {/* Menu - Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu-icon"
              aria-controls="menu-navbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Logo - Desktop */}
          <Logo sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontSize: '1.5rem' }}/>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Account Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <AccountCircleIcon fontSize='large' sx={{ color: '#BEE0C9' }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token 
                ?
                  <>
                    <MenuItem>
                    <Link to='/profile' component={RouterLink} sx={{ textDecoration: 'none', color: 'black', textTransform: 'capitalize' }}>Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Link sx={{ textDecoration: 'none', color: 'black', textTransform: 'capitalize' }}>Logout</Link>
                    </MenuItem>
                  </>
                : <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/login' component={RouterLink} sx={{ textDecoration: 'none', color: 'black' }}>Login</Link>
              </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Navbar;