// Import the loadWebsite function from the TypeWrite.js file
import loadWebsite from "./TypeWrite.js";

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get all elements with the class 'deleteButton'
  const deleteButtons = document.getElementsByClassName('deleteButton');

  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];

    // Add a click event listener to each 'deleteButton'
    deleteButton.addEventListener('click', () => {
      // Get the 'data-id' attribute from the clicked button
      const resourceId = deleteButton.getAttribute('data-id');
      console.log('Button clicked for document with ID:', resourceId);

      // Send a DELETE request to the server to delete the resource
      fetch(`/HomeStock/${resourceId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.status === 204) {
          // If the deletion is successful (status code 204), log a success message
          console.log('Document deleted successfully');
          console.log("eeeeeeeeeeeeeeeeeeeee");
          location.reload(); // Handle the page reload on the client-side
        } else if (response.status === 404) {
          // If the resource is not found (status code 404), log an error message
          console.log('Resource not found');
        } else {
          // If there's an error during deletion, log an error message
          console.log('Error deleting document');
        }
      })
      .catch(error => {
        // If the DELETE request fails, log an error message
        console.error('Request failed:', error);
      });
    });
  }
});

// Call the loadWebsite function from TypeWrite.js
loadWebsite();
