async function newFormHandler(event) {
    event.preventDefault();
    const user_comment = document.querySelector('#comment').value;
    
  
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        user_comment,
        post_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add post');
    }
  }
  
  document.querySelector('.new-comment').addEventListener('submit', newFormHandler);