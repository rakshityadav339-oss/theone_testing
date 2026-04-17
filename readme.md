# TheOne Testing — Todo App

This repository now contains a small static TODO web app (HTML/CSS/JS) that persists tasks to localStorage.

Files added:

- `index.html` — main page for the app
- `styles.css` — basic styling
- `app.js` — JavaScript logic (add, edit, delete, complete, persist)

How to run locally:

1. Open the project folder in your browser. For a quick local preview, open `index.html` directly (double-click) or serve the folder with a static server.

Example using Python 3's simple HTTP server (run in the project root):

```bash
python3 -m http.server 8000
# then open http://localhost:8000/theone_testing/
```

Usage:

- Add a task using the input and press Enter or click Add.
- Click the checkbox to mark a task complete.
- Use Edit to change the text of a task.
- Use Delete to remove a task.
- Clear completed removes tasks marked done.
- Reset deletes all tasks.

Notes:

- Tasks are stored in your browser's localStorage under the key `theone_todos_v1`.
- This is a small, single-file frontend demo intended for local experiments.
