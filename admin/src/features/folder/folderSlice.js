import { createSlice } from '@reduxjs/toolkit';

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    isVerified: false,
    folderName: '',
    selectedFolder: '',  // Added selectedFolder to store the selected folder
  },
  reducers: {
    setVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setFolderName: (state, action) => {
      state.folderName = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload; // Store the selected folder
    },
  },
});

export const { setVerified, setFolderName, setSelectedFolder } = folderSlice.actions;

// Updated verifyAndNavigate to dispatch setSelectedFolder
export const verifyAndNavigate = (folderName, navigate) => (dispatch) => {
  if (folderName) {
    dispatch(setSelectedFolder(folderName)); // Store the selected folder in Redux
    dispatch(setVerified(true)); // Set verified status
    console.log(`Working with existing folder: ${folderName}`);
    navigate('/chapter-upload'); // Navigate to the new route
  } else {
    alert('Please select an existing folder.');
  }
};

export default folderSlice.reducer;
