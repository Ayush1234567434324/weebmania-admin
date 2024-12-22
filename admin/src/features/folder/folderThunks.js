import { setVerified } from './folderSlice';
import { useNavigate } from 'react-router-dom';

export const verifyAndNavigate = (folderName) => (dispatch) => {
  if (folderName) {
    dispatch(setVerified(true));
    console.log(`Working with existing folder: ${folderName}`);
    const navigate = useNavigate();
    navigate('/chapter-upload'); // Navigate to the new route
  } else {
    alert('Please select an existing folder.');
  }
};
