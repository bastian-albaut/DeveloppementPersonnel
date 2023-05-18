import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import styles from "../../styles/components/article/contentCreateArticle.module.scss";

const ContentCreateArticle = (props) => {
    
    const [editor, setEditor] = useState(null);

    const handleSave = async () => {
        // Retrieve the Editor.js data
        const savedData = await editor.save();

        // Convert the data to JSON
        const jsonData = JSON.stringify(savedData);

        // TODO: Send `jsonData` to backend and handle response
    };

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                let content = await editor.saver.save();

                console.log(content);
            },
            tools: { 
                header: Header, 
                image: ImageTool,
                list: List,
                quote: Quote,
                simpleImage: SimpleImage,
                table: Table,
                warning: Warning,
            },
        });
    };

  const ejInstance = useRef();

    const DEFAULT_INITIAL_DATA =  {
        "time": new Date().getTime(),
        "blocks": [
            {
                "type": "paragraph",
                "data": {
                    "text": "Veuillez entrer ici le contenu de l'article."
                }
            }
        ]
    };

    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return (
        <Box id={styles.boxSection}>
            <Typography id={styles.typoTitlePage} variant="h2">Creation d'un article</Typography>
            <Box id={styles.boxArticle}>
                <Typography id={styles.typoCategory} variant="h6">{props.formData.category}</Typography>
                <Typography id={styles.typoTitle} variant="h3">{props.formData.title}</Typography>
                <Typography id={styles.typoDescription} variant="h5">{props.formData.description}</Typography>
                <img id={styles.image} src="https://picsum.photos/800/300" alt="description de l'article" />
                <Box id={styles.boxAuthor}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    <Typography id={styles.typoAuthor} variant="body1" color="initial">Remy Sharp</Typography>
                </Box>
            </Box>
            <div id='editorjs'></div>
            <Box id={styles.boxButton}>
                <Button id={styles.button} variant="contained" color="primary" onClick={handleSave}>Créer l'article</Button>
            </Box>
        </Box>
    );
}

export default ContentCreateArticle;