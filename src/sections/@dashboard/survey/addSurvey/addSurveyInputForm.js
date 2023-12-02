// import PropTypes from 'prop-types';

import React, { useRef, useState } from 'react';

import {
    Box,
    Grid,
    IconButton,
    TextField,Button
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const spanStyle = {
    fontSize: '18px', 
    fontWeight:'bold', 
    lineHeight:'2.7', 
    marginRight:'20px'
}


export default function SurveyInputForm() {
    const [inputs, setInputs] = useState({
        question: { text: '', fileUrl: null },
        answers: [{ text: '', fileUrl: null }, { text: '', fileUrl: null }, { text: '', fileUrl: null }],
      });
    
    const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleFileChange = (index) => (event) => {
        console.log(index);
        const file = event.target.files[0];
        if (!file) return;
        console.log(file);
        const fileUrl = URL.createObjectURL(file);
        if (index === -1) {
            // 질문의 파일 변경
            console.log(fileUrl);
            setInputs({ ...inputs, question: { ...inputs.question, fileUrl } });
        } else {
            // 답변의 파일 변경
            const newAnswers = [...inputs.answers];
            newAnswers[index].fileUrl = fileUrl;
            setInputs({ ...inputs, answers: newAnswers });
        }
    };

    const handleTextChange = (index) => (event) => {
        const newText = event.target.value;
        if (index === -1) {
            // 질문의 텍스트 변경
            setInputs({ ...inputs, question: { ...inputs.question, text: newText } });
        } else {
            // 답변의 텍스트 변경
            const newAnswers = [...inputs.answers];
            newAnswers[index].text = newText;
            setInputs({ ...inputs, answers: newAnswers });
        }
    };
    const handleSubmit = () => {
        // 여기서 입력 데이터 처리
        console.log(inputs); // 예: 입력된 데이터를 콘솔에 출력
        // 서버로 데이터 전송 또는 기타 처리
      };

    return (
        <Box sx={{
            height: '370px',
            overflow: 'auto',
            '&:: -webkit-scrollbar':{
                display: 'none'
            } 
        }}>

        
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <span style={spanStyle}>질문 내용</span> 
            <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span>
          <TextField
            variant='outlined'
            label='질문'
            sx={{ width: '90%' }}
            value={inputs.question.text}
            onChange={handleTextChange(-1)}
          />
          <input
            type="file"
            ref={fileInputRefs.current[0]}
            onChange={handleFileChange(-1)}
            style={{ display: 'none' }}
          />
          <IconButton onClick={() => fileInputRefs.current[0].current.click()}>
            <AddPhotoAlternateIcon
              sx={{
                width: '30px',
                height: '30px',
                color: inputs.question.fileUrl ? 'rgb(99, 201, 139)' : 'inherit'
              }}
            />
          </IconButton>
        </Grid>

        {/* 답변 입력 */}
        <Grid item xs={12}>
        <span style={spanStyle}>답변 내용</span> 
        <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span> 
        {inputs.answers.map((answer, index) => (
            <Box key={index+1} mt={2}>
            <TextField 
              variant='outlined'
              label={`답변 ${index + 1}`}
              sx={{ width: '90%' }}
              value={answer.text}
              onChange={handleTextChange(index)}
            />
            <input
              type="file"
              ref={fileInputRefs.current[index+1]}
              onChange={handleFileChange(index)}
              style={{ display: 'none' }}
            />
            <IconButton onClick={() => fileInputRefs.current[index+1].current.click()}>
                <AddPhotoAlternateIcon
                    sx={{
                        width: '30px',
                        height: '30px',
                        color: inputs.answers[index].fileUrl ? 'rgb(99, 201, 139)' : 'inherit'
                    }}
                />
            </IconButton>
            </Box>
        ))}
        </Grid>     
            
        </Grid>
        <Button onClick={handleSubmit}>Submit</Button>
        
        </Box>
    ); 
}
