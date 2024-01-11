import { dateFormat } from '@/utils/dateFormat';
import { createSlice } from '@reduxjs/toolkit';

interface ItodaySlice {
  today: string;
}

const initialState: ItodaySlice = {
  today: dateFormat(new Date()),
};

const todaySlice = createSlice({
  name: 'todaySlice',
  initialState,
  reducers: {},
});

export default todaySlice.reducer;
