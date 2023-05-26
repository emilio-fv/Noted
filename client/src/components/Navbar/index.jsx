import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const pages = ['Music', 'Reviews', 'Connect'];
const accountMenu = ['Profile', 'Account Settings'];

const Navbar = () => {
  // Nav Bar Menus
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleOpenAccountMenu = (event) => {
    setAnchorElAccount(event.target);
  }
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseAccountMenu = () => setAnchorElAccount(null);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Logo */}
          <MusicNoteIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}/>
          <Typography
            variant='h6'
            noWrap
            sx={{
              display: { xs: 'none', sm: 'flex'},
              mr: 2
            }}
            // component={}
          >
            Note-d
          </Typography>
          {/* Menu (Mobile) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none'}}}>
            <IconButton
              size='large'
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page}
                  // onClick={}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Logo (Mobile) */}
          <MusicNoteIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }}/>
          <Typography
            variant='h6'
            noWrap
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1
            }}
          >
            Note-d
          </Typography>
          {/* Menu */}
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex'}}}
          >
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={}
                sx={{ color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Account Icon & Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenAccountMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '25px' }}
              id='account-menu'
              anchorEl={anchorElAccount}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElAccount)}
              onClose={handleCloseAccountMenu}
            >
              {accountMenu.map((item) => (
                <MenuItem
                  key={item}
                  // onClick={}
                >
                  <Typography textAlign='center'>{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Navbar;