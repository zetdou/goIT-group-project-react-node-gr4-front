import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logOut } from '../redux/Users/AuthOperations';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectAccessToken,
  selectRefreshToken,
  selectSid,
} from '../redux/Users/AuthSelectors';
import { checkAuth } from '../redux/Tools/authHelper';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const sid = useSelector(selectSid);

  useEffect(() => {
    const checkAuthStatus = () => {
      if (isLoggedIn && !checkAuth()) {
        dispatch(logOut());
      }
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 3000);
    return () => clearInterval(intervalId);
  }, [isLoggedIn, dispatch]);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    accessToken,
    refreshToken,
    sid,
  };
};
