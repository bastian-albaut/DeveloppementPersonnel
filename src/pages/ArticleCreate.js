import React, { useEffect, useState } from 'react';
import ContentCreateArticle from '../components/article/ContentCreateArticle';
import Appbar from '../components/general/Appbar';
import Typography from '@mui/material/Typography'
import FormCreateArticle from '../components/article/FormCreateArticle';

const ArticleCreate = () => {

  const [informationsFilled, setInformationsFilled] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", category: "", picture: ""});

  useEffect(() => {
    console.log(formData);
  }, [formData])

  return (
    <>
      <Appbar />
      {!informationsFilled ? (
        <FormCreateArticle setInformationsFilled={setInformationsFilled} formData={formData} setFormData={setFormData}/>
        ) : (
        <ContentCreateArticle formData={formData}/>
      )}
    </>
  );
};

export default ArticleCreate;
