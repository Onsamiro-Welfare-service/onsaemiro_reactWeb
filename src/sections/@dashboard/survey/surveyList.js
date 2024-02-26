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

import { testSurveyList } from './constants';

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
