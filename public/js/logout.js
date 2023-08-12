const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      console.log('logged out');
      document.location.replace('/');
      alert('logged out');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document
    .querySelector('.logout-link').addEventListener('click', logout);