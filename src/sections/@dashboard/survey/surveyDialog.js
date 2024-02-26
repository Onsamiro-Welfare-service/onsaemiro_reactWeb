import PropTypes from 'prop-types';

import React, { useState } from 'react';

import { 
    Select, 
    MenuItem, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Button 
} from '@mui/material';

CategoryAdd.propTypes = {
    List: PropTypes.object,
    setList: PropTypes.func,
    item: PropTypes.string,
    setItem: PropTypes.func,
    
}

export default function CategoryAdd({List, setList, item, setItem}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleSelectChange = (event) => {
    if (event.target.value === 'add-new') {
      // '새로 추가하기' 선택 시, Dialog를 엽니다.
        setOpenDialog(true);
    } else {
        setItem(event.target.value);
    }
  };

  const handleDialogClose = () => setOpenDialog(false);


  const handleAddNewItem = () => {
    // 새 항목 추가 로직
    console.log('새 항목 추가:', newItem);
    const updatedCategoryList = [...List, newItem];
    setList(updatedCategoryList);
    setItem(newItem);
    // 필요하다면 새 항목을 상태나 목록에 추가
    handleDialogClose();
  };

  return (
    <>
      <Select value={item} onChange={handleSelectChange}>
        {List.data.map((option) => (
        <MenuItem key={option} value={option}>
            {option}
        </MenuItem>))}
        <MenuItem value="add-new">새로 추가하기</MenuItem>
      </Select>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>새 항목 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="새 항목"
            fullWidth
            variant="standard"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>취소</Button>
          <Button onClick={handleAddNewItem}>추가</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
