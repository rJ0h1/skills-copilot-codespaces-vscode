// Create web server
// Create a web server that listens on port 8080 and serves the files from the public directory.
// The server should respond to the following routes:
// /comments - returns the comments.json file
// /comment/:id - returns the comment with the given id from the comments.json file
// /comment - adds a new comment to the comments.json file
// The server should respond with a 404 status code for any other routes.
// The server should respond with a 500 status code if there is an error reading or writing the comments.json file.
// The server should respond with a 400 status code if the comment data is invalid.
// The server should respond with a 200 status code for all successful requests.
// The server should respond with the appropriate JSON data for each route.

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const id = parsedUrl.query.id;

  if (pathname === '/comments') {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (pathname === '/comment') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const comment = JSON.parse(body);
        if (typeof comment.name !== 'string' || typeof comment.message !== 'string') {
          res.writeHead(400);
          res.end();
        } else {
          fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
            if (err) {
              res.writeHead(500);
              res.end();
            } else {
              const comments = JSON.parse(data);
              comments.push(comment);
              fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
                if (err) {
                  res.writeHead(500);
                  res.end();
                } else