async function newFormHandler(event) {
    event.preventDefault();
    const user_comment = document.querySelector('#user_comment').value;
    
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
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
  
  document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);