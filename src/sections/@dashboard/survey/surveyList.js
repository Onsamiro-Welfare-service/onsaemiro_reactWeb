// SurveyList.js
import PropTypes from 'prop-types';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer
} from '@mui/material';

import Scrollbar from '../../../components/scrollbar';

import SurveyListForm from './surveyListForm';

const testSurveyList = [
  {
    category: 1,
    level: 1,
    type: '1',
    question: { text: '오늘 아침 어떰?', fileUrl: null },
    answers: [{ text: '좋아요', fileUrl: null }, { text: '안 좋아요', fileUrl: null }],
  },
  {
    category: 2,
    level: 2,
    type: '2',
    question: { text: '오늘 뭐했음?', fileUrl: null },
    answers: [{ text: '놀았음', fileUrl: null }, { text: '일했음', fileUrl: null }, { text: '쉬었음', fileUrl: null }],
  },
  {
    category: 3,
    level: 3,
    type: '3',
    question: { text: '오늘 기분 어떰?', fileUrl: null },
    answers: [{ text: '안좋음', fileUrl: null }, { text: '보통', fileUrl: null }, { text: '좋음', fileUrl: null }, { text: '아주 좋음', fileUrl: null }],
  },
]

SurveyList.propTypes = {
  prevClick: PropTypes.func,
  modifyClick: PropTypes.func,
  setData: PropTypes.func,
};

export default function SurveyList({ prevClick, modifyClick, setData}) {
    return (
        <>
        <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table aria-label="collapsible table" id="surveyListHeader"> 
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align='center'>카테고리</TableCell>
                    <TableCell />
                    <TableCell align='left'>질문</TableCell>
                    <TableCell align="center">형식</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* CollapsibleRow 컴포넌트 사용 */}
                  
                  {
                    testSurveyList.map((data, index) => (
                      <SurveyListForm key={index} surveyData={data} prevClick={prevClick} modifyClick={modifyClick} setData={setData} />
                    ))
                  }

                  
  
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </>
    );
}
