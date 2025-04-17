const express=require('express');
const multer=require('multer');
const path=require('path');
const analyzeCSV=require('./uploads/analyzeCSV');

const app=express();
const PORT=3000;

const upload=multer({dest:'uploads/folders'});

app.post('/analyze',upload.single('file'),async(req,res)=>{
    try {
      if(!req.file) return res.status(400).json({error:'CSV file is require'});

       const result=await analyzeCSV(req.file.path);
       res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({error:'Internal server error'});
    }
});

app.listen(PORT,()=>{
  console.log(`Server running on: ${PORT}`);
});