import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import styles from "../../styles/components/article/sectionArticlesOfUser.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../api";
import AlertComponent from "../general/Alert";
import { DataGrid, frFR } from '@mui/x-data-grid';
import ConfirmationDialog from "../general/ConfirmationDialog";

const SectionArticlesOfUser = (props) => {

    const displayDate = (date) => {
        const dateArticle = new Date(date);
        const dateNow = new Date();
        const diff = dateNow - dateArticle;
        const diffInHours = Math.floor(diff / (1000 * 60 * 60));
        const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        if(diffInDays > 0) {
            return `Le ${dateArticle.toLocaleString('fr-FR', {dateStyle: 'long', timeStyle: 'short'})}`;
        } else {
            if(diffInHours === 0) {
                return `Il y a moins d'une heure`;
            } else if(diffInHours === 1) {
                return `Il y a ${diffInHours} heure`;
            } else {
                return `Il y a ${diffInHours} heures`;
            }
        }
    }

    const columns = [
        { field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Titre', width: 800 },
        { field: 'date', headerClassName: 'super-app-theme--header', headerName: 'Date', width: 250 },
        {
            field: "actions",
            headerName: "Actions",
            headerClassName: 'super-app-theme--header',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
              <Delete
                id={styles.deleteIcon}
                onClick={(e) => handleDelete(e, params.row.id)}
                style={{ cursor: "pointer" }}
              />
            ),
          }
    ];

    // Create another array rows that contain all articles with only title and description
    const rowsArticles = props.articles.map((article) => {
        return {
            id: article._id,
            title: article.title,
            description: article.description,
            date: displayDate(article.date)
        }
    });


    const navigate = useNavigate();

    // Display alert message
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    useEffect(() => {
        if(message) {
            setTimeout(() => {
                setMessage('');
                setSeverity(null);
            }, 4000)
        }
    }, [message])

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        setSelectedArticleId(id);
        setIsConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsConfirmationOpen(false);
        if (selectedArticleId) {
            const result = await deleteArticle(selectedArticleId);
            if(result && result.data) {
                console.log(result.data);
                props.setArticles(props.articles.filter((article) => article._id !== selectedArticleId));
                setMessage("L'article a bien été supprimé.");
                setSeverity("success");
            } else {
                setMessage("Une erreur est survenue lors de la suppression de l'article.");
                setSeverity("error");
            }
        }
    }

    const handleCancelDelete = () => {
        setIsConfirmationOpen(false);
        setSelectedArticleId(null);
    };

    const handleAddArticle = () => {
        navigate(`/article/creation`);
    }

    const handleRowClick = (params) => {
        const articleId = params.row.id;
        navigate(`/article/${articleId}`);
    };

    return (
        <>
        {message && <AlertComponent message={message} severity={severity} />}
        <Box id={styles.bigBox}>
            <Box id={styles.boxTitleButton}>
                <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes articles</Typography>
                <Button variant="contained" color="primary" onClick={handleAddArticle}>Ajouter un article</Button>
            </Box>
                <Box id={styles.boxDataGrid}
                sx={{
                    '& .super-app-theme--header': {
                    backgroundColor: 'rgba(157, 171, 179, 0.7)',
                    },
                }}>
                    <DataGrid
                        sx={{
                            // disable cell selection style
                            '.MuiDataGrid-cell:focus': {
                            outline: 'none'
                            },
                            // pointer cursor on ALL rows
                            '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer'
                            },
                            // alternate row colors
                            '& .MuiDataGrid-row:nth-of-type(odd)': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                            '& .MuiDataGrid-row:nth-of-type(even)': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            },
                        }}
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                        rows={rowsArticles}
                        columns={columns}
                        onRowClick={handleRowClick}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>
            </Box>
            <ConfirmationDialog
                open={isConfirmationOpen}
                title="Confirmation de suppression"
                message="Êtes-vous sûr de vouloir supprimer cet article ?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}

export default SectionArticlesOfUser;