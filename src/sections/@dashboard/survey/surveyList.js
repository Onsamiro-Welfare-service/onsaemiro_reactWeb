// SurveyList.js
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
import SurveyListForm from './surveyListForm'; // 경로에 따라 조정하세요


  

export default function SurveyList() {
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
                  <SurveyListForm question="안녕하세요 오늘 아침은 어땠나요?" />
                  <SurveyListForm question="다른 질문" />
                  {/* 필요한 만큼 CollapsibleRow를 추가 */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </>
    );
}
