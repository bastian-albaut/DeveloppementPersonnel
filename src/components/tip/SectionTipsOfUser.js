import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import styles from "../../styles/components/tip/sectionTipsOfUser.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteTip, postTip, updateTip } from "../../api";
import AlertComponent from "../general/Alert";
import { DataGrid, frFR } from '@mui/x-data-grid';
import ConfirmationDialog from "../general/ConfirmationDialog";

const SectionTipsOfUser = (props) => {

    const columns = [
        { field: 'content', headerName: 'Contenu', width: 950 },
        { field: 'score', headerName: 'Score', width: 100 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
            <>
                <Edit 
                id={styles.icon} className={styles.iconEdit}
                onClick={() => handleUpdateTip(params.row.id, params.row.content)}
                />
              <Delete
                id={styles.icon}
                onClick={() => handleDelete(params.row.id, params.row.content)}
              />
            </>
            ),
          }
    ];

    // Create another array rows that contain all tips with only title and description
    const rowsTips = props.tips.map((tip, index) => {
        return {
          id: tip._id || `new-${index}`,
          content: tip.content,
          score: tip.score
        };
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
    const [selectedTipId, setSelectedTipId] = useState(null);

    const handleDelete = async (id) => {
        setSelectedTipId(id);
        setIsConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsConfirmationOpen(false);
        if (selectedTipId) {
            const result = await deleteTip(selectedTipId);
            if(result && result.data) {
                console.log(result.data);
                props.setTips(props.tips.filter((tip) => tip._id !== selectedTipId));
                setMessage("L'astuce a bien été supprimé.");
                setSeverity("success");
            } else {
                setMessage("Une erreur est survenue lors de la suppression de l'astuce.");
                setSeverity("error");
            }
        }
    }

    const handleCancelDelete = () => {
        setIsConfirmationOpen(false);
        setSelectedTipId(null);
    };

    // Add tip
    const [formData, setFormData] = useState({ content: "", score: 0, author_id: props.currentUser._id, author_name: props.currentUser.name});
    const [isAddTipOpen, setIsAddTipOpen] = useState(false);
    const handleAddTip = () => {
        setIsAddTipOpen(true);
    };

    const handleSubmitCreateTip = async () => {
        setIsAddTipOpen(false);
        try {
            const result = await postTip(formData);
            if(result && result.data) {
                console.log(result.data);
                props.setTips([...props.tips, result.data.tip]);
                setMessage("L'astuce a bien été créée.");
                setSeverity("success");
            }
        } catch (error) {
            console.log(error);
            setMessage("Une erreur est survenue lors de la création de l'astuce.");
            setSeverity("error");
        }
    }

    // Update tip
    const [formDataUpdate, setFormDataUpdate] = useState({ content: "",score: 0, author_id: props.currentUser._id, author_name: props.currentUser.name});
    const [isUpdateTipOpen, setIsUpdateTipOpen] = useState(false);
    const [selectedUpdateTipId, setSelectedUpdateTipId] = useState(null);
    
    const handleUpdateTip = (id, content) => {
        setFormDataUpdate({content: content, score: 0});
        setSelectedUpdateTipId(id);
        setIsUpdateTipOpen(true);
    };

    const handleSubmitUpdateTip = async () => {
        setIsUpdateTipOpen(false);
        try {
            const result = await updateTip(selectedUpdateTipId, formDataUpdate);
            if(result && result.data) {
                console.log(result.data);
                props.setTips(props.tips.map((tip) => tip._id === selectedUpdateTipId ? result.data.tip : tip));
                setMessage("L'astuce a bien été modifiée.");
                setSeverity("success");
            }
        } catch (error) {
            console.log(error);
            setMessage("Une erreur est survenue lors de la modification de l'astuce.");
            setSeverity("error");
        }
    }

    return (
        <>
        {message && <AlertComponent message={message} severity={severity} />}
        <Box id={styles.boxTitleButton}>
            <Typography id={styles.typoTitlePage} variant="h4" color="initial">Mes astuces</Typography>
            <Button variant="contained" color="primary" onClick={handleAddTip}>Ajouter une astuce</Button>
        </Box>
            <Box id={styles.boxDataGrid}>
                {isAddTipOpen && (
                    <Box id={styles.boxAddTip}>
                        <TextField className={styles.textField} multiline rows={3} label="Contenu" variant="outlined" margin="dense" required onChange={(e) => setFormData({...formData, content: e.target.value})}/>
                        <Button id={styles.buttonCreateTip} variant="contained" color="primary" onClick={handleSubmitCreateTip}>Créer l'astuce</Button>
                    </Box>
                )}
                {isUpdateTipOpen && (
                    <Box id={styles.boxAddTip}>
                        <TextField className={styles.textField} multiline rows={3} label="Contenu" variant="outlined" margin="dense" required value={formDataUpdate.content} onChange={(e) => setFormDataUpdate({...formDataUpdate, content: e.target.value})}/>
                        <Typography id={styles.typoWarning} variant="body1" color="secondary">Attention: Cela va remettre à 0 le score</Typography>
                        <Button id={styles.buttonCreateTip} variant="contained" color="primary" onClick={handleSubmitUpdateTip}>Modifier l'astuce</Button>
                    </Box>
                )}
                <DataGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    rows={rowsTips}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    getRowId={(row) => row.id}
                />
            </Box>
            <ConfirmationDialog
                open={isConfirmationOpen}
                title="Confirmation de suppression"
                message="Êtes-vous sûr de vouloir supprimer cette astuce ?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}

export default SectionTipsOfUser;