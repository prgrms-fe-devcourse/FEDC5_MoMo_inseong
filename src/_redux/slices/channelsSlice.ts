import { IChannel } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IChannelData {
  channels: IChannel[];
}
const initialState: IChannelData = {
  channels: [],
};

export const getChannelsData = createAsyncThunk('getChannels', async () => {
  const response = await getApi('/channels');
  return response?.data as IChannel[];
});

const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelsData.fulfilled, (state, action) => {
      state.channels = action.payload;
    });
  },
});
export default channelsSlice.reducer;
