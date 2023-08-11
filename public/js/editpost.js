async function newButtonHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('input[name="content"]').value;
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    console.log(id);
    console.log(title);
    console.log(content);

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard/edit/1');
    } else {
        alert('Failed to update post');
        console.log(title);
        console.log(content);
        console.log(id);
    }

    console.log(response);
}

document.querySelector('.edit-post').addEventListener('submit', newButtonHandler);
console.log('button clicked');