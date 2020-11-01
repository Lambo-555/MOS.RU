from library import build
from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
from urllib.parse import urlparse, parse_qs

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, hackathon!')                 # Пример GET запроса, используется для теста ( можно удалить )

    def do_POST(self):
        self.send_response(200)
        self.end_headers()
        query_components = parse_qs(urlparse(self.path).query)
        user_id = str(query_components["user_id"][0])          # Перехватываем идентификатор пользователя
        return_data = build()

        response = BytesIO()
        response.write(return_data.encode())                   # Выводим JSON массив 
        self.wfile.write(response.getvalue())

httpd = HTTPServer(('localhost', 3002), SimpleHTTPRequestHandler)
httpd.serve_forever()