import loadWebsite from  "./TypeWrite.js"
document.addEventListener('DOMContentLoaded', () => {
  // Wait for the DOM to be fully loaded
  const deleteButtons = document.getElementsByClassName('deleteButton');

  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];

    deleteButton.addEventListener('click', () => {
      const resourceId = deleteButton.getAttribute('data-id');
      console.log('Button clicked for document with ID:', resourceId);

      fetch(`/HomeStock/${resourceId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.status === 204) {
          console.log('Document deleted successfully');
          console.log("eeeeeeeeeeeeeeeeeeeee");
          location.reload(); // Handle the page reload on the client-side
        } else if (response.status === 404) {
          console.log('Resource not found');
        } else {
          console.log('Error deleting document');
        }
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
    });
  }
});

loadWebsite();
