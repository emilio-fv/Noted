// Imports
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetMusicSlice } from '../../store/reducers/music/musicSlice';
import { resetReviewSlice } from '../../store/reducers/review/reviewSlice';
import { logout } from '../../store/reducers/auth/authService';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { useTheme } from '@emotion/react';

const pages = ["dashboard", "music"];

const Navbar = ({ isLoggedIn, resetMusicSlice, resetReviewSlice, logout }) => {
  // Helpers
  const theme = useTheme();

  // Handle Open Nav Menu
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleCloseNavMenu = () => { 
    setAnchorElNav(null);
  };
  
  // Handle Open Account Settings
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }
  const handleCloseUserMenu = () => { 
    setAnchorElUser(null);
  };

  // Handle Logout
  const handleLogout = () => {
    resetMusicSlice();
    resetReviewSlice();
    logout();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Link
            component={RouterLink} 
            variant='h5'
            to='/'
            sx={{ 
              mr: 2, 
              display: { xs: 'none', md: 'flex' }, 
              fontSize: '1.75rem', 
              color: 'inherit', 
              textDecoration: 'none' 
            }}
          >
            Note-d
          </Link>

          {/* Menu - Mobile */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'flex', md: 'none' } 
            }}
          >
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
                  <Link to={`/${page}`} component={RouterLink} sx={{ textDecoration: 'none', color: 'black', textTransform: 'capitalize' }}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Desktop */}
          <Link
            component={RouterLink} 
            variant='h5'
            to='/'
            sx={{ 
              color: 'inherit', 
              display: { xs: 'flex', md: 'none' }, 
              flexGrow: 1, 
              fontSize: '1.5rem' 
            }}
          >
            Note-d
          </Link>

          {/* Menu - Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => (
              <Link to={`/${page}`} component={RouterLink} sx={{ textDecoration: 'none', color: theme.text, textTransform: 'capitalize' }}>{page}</Link>
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
              {isLoggedIn 
                ? <MenuItem onClick={handleLogout}>
                    <Link sx={{ textDecoration: 'none', color: 'black', textTransform: 'capitalize' }}>Logout</Link>
                  </MenuItem>
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

// Connect to Redux store
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = {
  resetReviewSlice,
  resetMusicSlice,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);