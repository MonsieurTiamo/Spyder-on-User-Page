// Strictly validate the existence of DOM elements
// Find the ul element with the class name 'gZq36zrh' using querySelector
const targetUl = document.querySelector('.gZq36zrh');
// If targetUl is null, throw an error indicating the target UL element was not found
if (!targetUl) throw new Error('Target UL element not found');

// Use block-scoped variables
// Initialize an empty array to store traversal results
const worksList = [];

// Safely traverse element nodes
// Convert the child elements collection of targetUl to an array and iterate over each li element
Array.from(targetUl.children).forEach(li => {
  // Find the a tag within each li element
  const anchor = li.querySelector('a');
  // If the a tag is not found, skip the current iteration
  if (!anchor) return;

  // Enhance readability with destructuring
  // Destructure the href property from the a tag
  const { href } = anchor;
  
  // Push an object containing href and is_pictures properties into the worksList array
  worksList.push({ href });
});

// Formatted JSON serialization
// Convert the worksList array to a formatted JSON string
const jsonContent = JSON.stringify(worksList, null, 2);

// Create a disposable Blob
// Create a new Blob object containing the jsonContent string and specify the MIME type
var blob = new Blob([jsonContent], { 
  type: 'application/json;charset=utf-8'
});

// Create a self-destructing download link
// Create an a tag to trigger the download
const downloadLink = document.createElement('a');
// Set the href attribute of the a tag to the URL of the Blob object
downloadLink.href = URL.createObjectURL(blob);
// Set the filename for the download, using the current timestamp as part of the filename
downloadLink.download = `works-list_${Date.now()}.json`;
// Append the a tag to the document's body, which is necessary for the click event to trigger the download
document.body.appendChild(downloadLink);
// Trigger the click event of the a tag to start the download
downloadLink.click();

// Asynchronously release resources
// Set a timeout to perform cleanup after 1 second
setTimeout(() => {
  // Use URL.revokeObjectURL to release the created Blob URL
  URL.revokeObjectURL(downloadLink.href);
  // Remove the a tag from the document's body
  document.body.removeChild(downloadLink);
}, 1000);
