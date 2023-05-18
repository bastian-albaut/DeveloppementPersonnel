import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Button from '@mui/material/Button'
import { Box } from '@mui/material';

const ArticleCreate = () => {
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
        "type": "header",
        "data": {
          "text": "This is my awesome editor!",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Veuillez entrer ici la description de l'article"
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
    <Box>
      <div id='editorjs'></div>
      <Button variant="contained" color="primary" onClick={handleSave}>Créer l'article</Button>
    </Box>
  );
};

export default ArticleCreate;
