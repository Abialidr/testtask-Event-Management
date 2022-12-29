import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../localStorage/LocalStorage';

function Log_out() {
  const navigate = useNavigate();
  const { Logout } = useLocalStorage();
  useEffect(() => {
    Logout();
    navigate('/login');
  });
}

export default Log_out;
