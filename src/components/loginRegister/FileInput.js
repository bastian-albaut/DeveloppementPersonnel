import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import styles from '../../styles/components/loginRegister/fileInput.module.scss';

function FileInput(props) {
    const { selectedFile, handleFileSelect } = props;
  
    const handleDrop = (acceptedFiles, rejectedFiles, event) => {
      handleFileSelect(acceptedFiles[0]);
    };
  
    const handleRemove = (e) => {
        e.stopPropagation();    
        handleFileSelect(null);
    };
  
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: 'image/*',
        onDrop: handleDrop,
    });
  
    useEffect(() => {
        if (isDragReject) {
            console.log('File type not accepted!');
        } else {
            console.log('File type accepted!');
        }
    }, [isDragReject]);

    useEffect(() => {
        console.log(selectedFile)
    }, [selectedFile])

    return (
      <Box
        id={styles['file-input-container']}
        {...getRootProps({
          className: `dropzone ${
            isDragActive ? 'is-drag-active' : ''
          } ${
            isDragAccept ? 'is-drag-accept' : ''
          } ${
            isDragReject ? 'is-drag-reject' : ''
          }`,
        })}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <>
            <IconButton
              onClick={handleRemove}
              aria-label="Remove file"
              size="small"
            >
              <CloseIcon />
            </IconButton>
            <Box id={styles['file-input-preview']}>
              <img src={URL.createObjectURL(selectedFile)} alt="Affichage" />
            </Box>
            <Typography id={styles['file-input-label']}>
              {`Fichier sélectionné: ${selectedFile.name} (${selectedFile.size} octets)`}
            </Typography>
          </>
        ) : (
          <>
            <CloudUploadIcon />
            <Typography id={styles['file-input-label']}>
            Faites glisser et déposez une image ici, ou cliquez pour sélectionner un fichier
            </Typography>
          </>
        )}
      </Box>
    );
}
  
export default FileInput;