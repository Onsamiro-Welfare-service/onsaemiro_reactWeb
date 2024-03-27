import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import PreviewQuestion from './previewQuestion';
import PreviewAnswer from './previewAnswer';

PreviewSurvey.propTypes = {
    data: PropTypes.object
}

export default function PreviewSurvey({ data }) {
  return (
    <Box sx={{ width: '400px', height:'660px', backgroundColor:'lightblue', padding:3, ml:'81px', overflow: 'hidden' }}>
        
        <PreviewQuestion txt={data.question} img={data.imageUrl} />

        <Box sx={{ 
          gap: 1, 
          height:'auto',
          flexWrap:'wrap',
          display: 'flex', 
          marginTop: '20px', 
          marginBottom: '20px',
          justifyContent:'left', 
          maxHeight: '250px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none', 
          },
        }}>

            {/* 미리보기 오류 처리 */}

            {/* 선택형 미리보기 */}
            { data.answerList.map((answer, index) => (
                <PreviewAnswer key={index} txt={answer.description} img={answer.imageUrl} />
            ))}
            
        </Box>
    </Box>
  );
}