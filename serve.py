"""
Simple HTTP server for ws-blog-static.
Run: python serve.py
Then open: http://localhost:8080
"""
import http.server
import socketserver
import os
import webbrowser

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.webp': 'image/webp',
    '.svg':  'image/svg+xml',
    '.json': 'application/json',
})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}"
    print(f"Serving at {url}")
    print("Press Ctrl+C to stop.")
    webbrowser.open(url)
    httpd.serve_forever()
