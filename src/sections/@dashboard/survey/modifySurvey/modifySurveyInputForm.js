import PropTypes from 'prop-types';

import React, { useRef,useEffect } from 'react';

import {
    Box,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';


const spanStyle = {
    fontSize: '18px', 
    fontWeight:'bold', 
    lineHeight:'2.7', 
    marginRight:'20px'
}

SurveyInputForm.propTypes = {
    inputs: PropTypes.object,
    setInputs: PropTypes.func,
}

export default function SurveyInputForm({inputs, setInputs}) {    
    console.log('SurveyInputForm --- inputs', inputs);
    const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleFileChange = (index) => (event) => {
        console.log(index);
        const file = event.target.files[0];
        console.log(file);
        if (!file) return;
        
        if (index === -1) { // 질문의 파일 변경
            setInputs({ ...inputs, imageUrl: file });
        } else {// 답변의 파일 변경
            const newAnswers = [...inputs.answerList];
            newAnswers[index].imageUrl = file;
            setInputs({ ...inputs, answerList: newAnswers });
        }
    };

    const handleDeleteFile = (index) => () => {
        console.log('실행', index);
        if (index === -1) { // 질문의 파일 삭제
            setInputs({ ...inputs, imageUrl: null });
        } else { // 답변의 파일 삭제
            const newAnswers = [...inputs.answerList];
            newAnswers[index].imageUrl = '';
            setInputs({ ...inputs, answerList: newAnswers });
        }
        console.log(inputs);
    };


    const handleTextChange = (index) => (event) => {
        const newText = event.target.value;
        if (index === -1) {
            // 질문의 텍스트 변경
            setInputs({ ...inputs, question: newText });
        } else {
            // 답변의 텍스트 변경
            const newAnswers = [...inputs.answerList];
            newAnswers[index].description = newText;
            setInputs({ ...inputs, answerList: newAnswers });
        }
    };
    
    useEffect(() => {
        let count;
        switch(inputs.type){ // 임시 설정
            case 1: count = 2; break;
            case 2: count = 3; break;
            case 3: count = 4; break;
            default: ;
        }
        const updatedAnswers = inputs.answerList.slice(0, count); // answers 배열 조절
    
        // 필요한 경우 배열 확장
        while (updatedAnswers.length < count) {
          updatedAnswers.push({ description: '', imageUrl: null });
        }
    
        setInputs((prevInputs) => ({ ...prevInputs, answerList: updatedAnswers }));// eslint-disable-next-line
      }, [inputs.type, inputs.answerList.length]); 
    
    return (
        <Box sx={{
            height: '370px',
            overflow: 'auto',
            '&:: -webkit-scrollbar':{
                display: 'none'
            },
            
            borderBottom:'2px solid lightgray'
        }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <span style={spanStyle}>질문 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span>
                    <TextField
                        variant='outlined'
                        label='질문'
                        sx={{ width: '85%' }}
                        value={inputs.question}
                        onChange={handleTextChange(-1)}
                    />
                    <input
                        type="file"
                        ref={fileInputRefs.current[0]}
                        onChange={handleFileChange(-1)}
                        style={{ display: 'none' }}
                    />
                    <IconButton onClick={() => fileInputRefs.current[0].current.click()}>
                        {/* <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/> */}
                        {inputs.imageUrl ? (
                                <img src={typeof inputs.imageUrl === 'string' ? inputs.imageUrl:URL.createObjectURL(inputs.imageUrl) } alt="Description" style={{ width: 30, height: 30, marginTop: 6 }} />
                                ) : (
                                <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/>
                            )}
                    </IconButton>
                    {inputs.imageUrl && (
                        <IconButton sx={{ position: 'relative', left:'-5px', top:'2px', color:  'black' }} onClick={handleDeleteFile(-1)}>
                            <CloseIcon sx={{ fontSize: '15px'}} />
                        </IconButton>
                    )}
                </Grid>

            {/* 답변 입력 */}
                <Grid item xs={12}>
                    <span style={spanStyle}>답변 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span> 
                    {inputs.answerList.map((answer, index) => (
                        <Box key={index+1} mt={2}>
                            <TextField 
                                variant='outlined'
                                label={`답변 ${index + 1}`}
                                sx={{ width: '85%' }}
                                value={answer.description}
                                onChange={handleTextChange(index)}
                            />
                            <input
                                type="file"
                                ref={fileInputRefs.current[index+1]}
                                onChange={handleFileChange(index)}
                                style={{ display: 'none' }}
                            />
                            <IconButton onClick={() => fileInputRefs.current[index+1].current.click()}>
                                {inputs.answerList[index].imageUrl ? (
                                    <img 
                                        src={typeof inputs.answerList[index].imageUrl === "string" ? inputs.answerList[index].imageUrl: URL.createObjectURL(inputs.answerList[index].imageUrl)} 
                                        alt="Description" 
                                        style={{ width: 30, height: 30, marginTop: 6 }} />
                                    ) : (
                                    <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/>
                                )}
                            </IconButton>

                            {inputs.answerList[index].imageUrl &&
                                <IconButton sx={{ position: 'relative', left:'-5px', top:'2px', color:  'black' }} 
                                    onClick={() => {
                                        const newAnswers = [...inputs.answerList];
                                        newAnswers[index].imageUrl = '';
                                        setInputs({ ...inputs, answerList: newAnswers });}}>
                                    <CloseIcon sx={{ fontSize: '15px'}} />
                                </IconButton>
                            }
                        </Box>
                    ))}
                </Grid>     
            </Grid>     
        </Box>
    ); 
}
