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
        { field: 'title', headerName: 'Titre', width: 800 },
        { field: 'date', headerName: 'Date', width: 250 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
              <Delete
                id={styles.deleteIcon}
                onClick={() => handleDelete(params.row.id)}
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

    const handleDelete = async (id) => {
        setSelectedArticleId(id);
        setIsConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
        console.log("test")
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

    return (
        <>
        {message && <AlertComponent message={message} severity={severity} />}
        <Box id={styles.boxTitleButton}>
            <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes articles</Typography>
            <Button variant="contained" color="primary">Ajouter un article</Button>
        </Box>
            <Box id={styles.boxDataGrid}>
                <DataGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    rows={rowsArticles}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                />
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