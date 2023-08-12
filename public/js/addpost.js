async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    console.log(title);
    console.log(content);
  
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
    console.log(response)
   
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add post');
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);