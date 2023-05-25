import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResultByUserId } from "../../api";


export default function ToolbarConnected(props) {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()

    const handleLogout = () => {
        handleCloseUserMenu();
        localStorage.removeItem('token');
        navigate('/');
    }

    const handleResultat = () => {
        handleCloseNavMenu();
        navigate(`/quiz/result/${resultId}`);
    }

    const handleDashboard = () => {
        handleCloseNavMenu();
        navigate(`/tableaudebord/${props.currentUser._id}`);
    }

    const handleMyArticles = () => {
        handleCloseNavMenu();
        navigate(`/article/user/${props.currentUser._id}`);
    }

    const handleCreateArticle = () => {
        handleCloseNavMenu();
        navigate(`/article/create`);
    }


    // Get the result id correponding to the user
    const [resultId, setResultId] = useState(null);
    useEffect(() => {
        const fetchResultId = async () => {
            const result = await getResultByUserId(props.currentUser._id);
            if(result && result.data) {
                setResultId(result.data._id);
            }
        }
        fetchResultId();
    }, [])
  
    let pages = [];
    if(props.currentUser.isProfessional) {
        pages = [
            {
              name: 'Mes articles',
              function : handleMyArticles
            }, 
            {
                name: 'Créer article',
                function : handleCreateArticle
            },
        ];
    } else {
        pages = [
            {
                name: 'Résultat',
                function : handleResultat
            },
            {
                name: 'Tableau de bord',
                function : handleDashboard
            },
        ];
    }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: "bold",
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Développement Personnel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
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
                {pages.map((item, index) => (
                    <MenuItem key={index} onClick={item.function}>
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                ))}

            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontWeight: "bold",
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Développement Personnel
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item, index) => (
                <Button key={index} onClick={item.function} sx={{ my: 2, color: 'white', display: 'block' }}>{item.name}</Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Déconnexion</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}