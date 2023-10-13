javascript

// Define the URL of the API you want to fetch data from
const apiUrl = 'https://www.thecocktaildb.com/api.php';

// Use the fetch function to make a GET request to the API
fetch(apiUrl)
  .then((response) => {
    // Check if the response status is OK (status code 200)
    if (response.status === 200) {
      // Parse the response as JSON
      return response.json();
    } else {
      // Handle the error (e.g., network error or non-200 status code)
      throw new Error('Failed to fetch data');
    }
  })
  .then((data) => {
    // Use the fetched data
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error(error);
  });







document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});
javascript
app.get('/search', (req, res) => {
 const searchQuery = req.query.query;
 // Implement your search algorithm here
 // For example, you can search for the query in your database
});