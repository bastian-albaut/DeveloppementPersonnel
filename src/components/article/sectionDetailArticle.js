import React, { useEffect, useRef } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import styles from "../../styles/components/article/sectionArticleDetail.module.scss";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import InlineImage from 'editorjs-inline-image';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import Strikethrough from '@sotaproject/strikethrough';

const SectionDetailArticle = (props) => {

    const ejInstance = useRef();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            readOnly: true,
            data: props.currentArticle.content,
            tools: { 
                header: Header, 
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                },
                quote: Quote,
                delimiter: Delimiter,
                table: Table,
                image: {
                    class: InlineImage,
                    inlineToolbar: true,
                    config: {
                      embed: {
                        display: true,
                      },
                    }
                },
                Marker: {
                class: Marker,
                shortcut: 'CMD+SHIFT+M',
                },
                underline: Underline,
                strikethrough: Strikethrough
            },
        });
    };

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
            <Box id={styles.boxArticle}>
                <Typography id={styles.typoCategory} variant="h6">{props.currentArticle.categorie_name}</Typography>
                <Typography id={styles.typoTitle} variant="h3">{props.currentArticle.title}</Typography>
                <Typography id={styles.typoDescription} variant="h5">{props.currentArticle.description}</Typography>
                <img id={styles.image} src="https://picsum.photos/800/300" alt="description de l'article" />
                <Box id={styles.boxAuthorDate}>
                    <Box id={styles.subBoxAuthorDate}>
                        <Box id={styles.boxAuthor}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            <Typography id={styles.typoAuthor} variant="body1" color="initial">{props.currentArticle.author_id}</Typography>
                        </Box>
                        <Typography id={styles.typoDate} variant="body1" color="initial">Le {new Date(props.currentArticle.date).toLocaleString('fr-FR', {dateStyle: 'long', timeStyle: 'medium'})}</Typography>
                    </Box>
                </Box>
                <div id="editorjs"></div>
            </Box>
        </Box>
    );
}

export default SectionDetailArticle;