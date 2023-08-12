async function newFormHandler(event) {
    event.preventDefault();
    const user_comment = document.querySelector('#comment').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    
  
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
      document.location.replace('/');
    } else {
      alert('Failed to add post');
    }
  }
console.log('buttion clicked');
  
  document.querySelector('.new-comment').addEventListener('submit', newFormHandler);