import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import styles from "../../styles/components/article/contentCreateArticle.module.scss";
import InlineImage from 'editorjs-inline-image';
import Delimiter from '@editorjs/delimiter';
import { i18n } from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import Strikethrough from '@sotaproject/strikethrough';

const ContentCreateArticle = (props) => {
    
    const ejInstance = useRef();

    const handleSave = async () => {
        // Retrieve the Editor.js data
        const savedData = await ejInstance.current.save();

        // Convert the data to JSON
        const jsonData = JSON.stringify(savedData);

        console.log(jsonData)

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
            // Convert in french
            i18n: {
                /**
                 * @type {I18nDictionary}
                 */
                messages: {
                  /**
                   * Other below: translation of different UI components of the editor.js core
                   */
                  ui: {
                    "blockTunes": {
                      "toggler": {
                        "Click to tune": "Cliquer pour modifier",
                        "or drag to move": "ou déplacer"
                      },
                    },
                    "inlineToolbar": {
                      "converter": {
                        "Convert to": "Convertir en"
                      }
                    },
                    "toolbar": {
                      "toolbox": {
                        "Add": "Ajouter"
                      }
                    }
                  },
              
                  /**
                   * Section for translation Tool Names: both block and inline tools
                   */
                  toolNames: {
                    "Text": "Texte",
                    "Heading": "Titre",
                    "List": "Liste",
                    "Warning": "Avertissement",
                    "Checklist": "Liste à puces",
                    "Quote": "Citation",
                    "Code": "Code",
                    "Delimiter": "Ligne de séparation",
                    "Raw HTML": "HTML brut",
                    "Table": "Tableau",
                    "Link": "Lien",
                    "Marker": "Surligneur",
                    "Bold": "Gras",
                    "Italic": "Italique",
                    "Underline": "Souligné",
                    "Strikethrough": "Barré",
                    "InlineCode": "Code en ligne",
                    "InlineImage": "Image",
                  },
              
                  /**
                   * Section for passing translations to the external tools classes
                   */
                  tools: {
                    /**
                     * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
                     * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
                     */
                    "Warning": { // <-- 'Warning' tool will accept this dictionary section
                      "Title": "Название",
                      "Message": "Сообщение",
                    },
              
                    /**
                     * Link is the internal Inline Tool
                     */
                    "link": {
                      "Add a link": "Вставьте ссылку"
                    },
                    /**
                     * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
                     */
                    "stub": {
                      'The block can not be displayed correctly.': 'Блок не может быть отображен'
                    }
                  },
              
                  /**
                   * Section allows to translate Block Tunes
                   */
                  blockTunes: {
                    /**
                     * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                     * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                     *
                     * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                     */
                    "delete": {
                      "Delete": "Supprimer"
                    },
                    "moveUp": {
                      "Move up": "Déplacer vers le haut"
                    },
                    "moveDown": {
                      "Move down": "Déplacer vers le bas"
                    },
                  },
                }
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
            <Typography id={styles.typoTitlePage} variant="h2">Creation d'un article</Typography>
            <Box id={styles.boxArticle}>
                <Typography id={styles.typoCategory} variant="h6">{props.formData.category_name}</Typography>
                <Typography id={styles.typoTitle} variant="h3">{props.formData.title}</Typography>
                <Typography id={styles.typoDescription} variant="h5">{props.formData.description}</Typography>
                <img id={styles.image} src="https://picsum.photos/800/300" alt="description de l'article" />
                <Box id={styles.boxAuthor}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    <Typography id={styles.typoAuthor} variant="body1" color="initial">Remy Sharp</Typography>
                </Box>
            </Box>
            <div id="editorjs"></div>
            <Box id={styles.boxButton}>
                <Button id={styles.button} variant="contained" color="primary" onClick={handleSave}>Créer l'article</Button>
            </Box>
        </Box>
    );
}

export default ContentCreateArticle;