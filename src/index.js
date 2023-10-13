javascript
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