import PropTypes from 'prop-types';

import {
    Box,
    Chip
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {levelList, tagList } from '../constants';

SeqSurveyForms.propTypes = {
    display: PropTypes.array,
    move: PropTypes.func,
}

export default function SeqSurveyForms({display, move}) {
  return (
    <>
        <span style={{fontSize: '12px', fontWeight:'bold'}}>* 위에서부터 순서대로 적용됩니다.</span>
        <Box sx={{width:'100%', height: '510px', padding:'15px', borderRadius: '5px'}}>
            {
            display.map((data, index) => (
                <Box key={index} 
                sx={{ 
                    margin: '0 0 8px 0', 
                    padding: 2, 
                    border: '1px solid #e0e0e040', 
                    borderRadius: '  5px', 
                    backgroundColor: data.category === -1 ? '#F4F6F8':'background.paper',
                    boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'
                }}
                >
                <Box sx={{ float:'left', marginRight:3, position:'relative', top:'-12px'}}>
                    {index !== 0 && 
                    <Box onClick={() => move(index, 'up')} sx={{position: 'relative', top: index !== display.length-1 ? '3px':'14px'}}>
                        <KeyboardArrowUpIcon/>
                    </Box>
                    }
                    
                    {index !== display.length-1 && 
                    <Box onClick={() => move(index, 'down')} sx={{position: 'relative', top: index !== 0 ? '-3px':'14px'}}>
                        <KeyboardArrowDownIcon />
                    </Box>    
                    }
                </Box>
                <span style={{fontSize: '18px', fontWeight:'bold', color: data.category === -1 ? '#a7adb3':'black'}}>{data.question.text}</span>
                
                <Box sx={{float:'right'}}>
                    <Chip label={levelList[data.level]} />
                    <Chip label={tagList[data.type]} />
                </Box>
                </Box>
            ))
            }
        </Box>
    </>
  );
}