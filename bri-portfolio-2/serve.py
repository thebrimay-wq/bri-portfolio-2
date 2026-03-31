import http.server, os
os.chdir("/Users/brimay/Documents/Bri May/Github/Bri Portfolio/GitHub/bri-portfolio")
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(("", 8080), handler)
print("Serving on http://localhost:8080")
httpd.serve_forever()
