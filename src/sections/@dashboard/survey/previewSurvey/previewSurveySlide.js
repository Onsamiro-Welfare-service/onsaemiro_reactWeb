import PropTypes from 'prop-types';

import {
    Slide,
    Box

} from '@mui/material';

import PreviewQuestion from './previewQuestion';
import PreviewAnswer from './previewAnswer';

ModalPreviewSurveySlide.propTypes = {
    status: PropTypes.bool,
    data: PropTypes.object,
}

export default function ModalPreviewSurveySlide({status, data}) {
  let answerType;
  switch(data.type){
    case 1:
    case 2:
    case 3:
      answerType = 0;
      break;
    // 다른 질문 형식있으면 여기에 추가하고 본문에 스타일 추가
    default:
      answerType = -1;
  }

  return (
    <Slide direction="up" in={status} mountOnEnter unmountOnExit >
        <Box sx={{ backgroundColor:'lightblue', padding:3 }}>
          
            <PreviewQuestion txt={data.question.text} img={data.question.fileUrl} />

            <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>

              {/* 미리보기 오류 처리 */}
              

              {/* 선택형 미리보기 */}
              { answerType === 0 &&
                data.answers.map((answer, index) => (
                  <PreviewAnswer key={index} txt={answer.text} img={answer.fileUrl} />
                ))
              }
              
            </Box>
        </Box>
    </Slide>
  );
}