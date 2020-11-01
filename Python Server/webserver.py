from library import hobby_recommendation, event_recommendation
from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
from urllib.parse import urlparse, parse_qs

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):          

    def do_GET(self):
        
        self.send_response(200)
        self.end_headers()

        query_components = parse_qs(urlparse(self.path).query)
        
        print(query_components);

        age      = query_components['age']
        user_id  = query_components['user_id'] 
        is_is_KD = query_components['is_is_kd']  

        return_data = ''

        if self.path == '/hobby_recommendation':
            return_data = hobby_recommendation(user_id, age, is_is_KD)

        if self.path == '/hobby_recommendation':
            return_data = hobby_recommendation(user_id, age, is_is_KD)

        response = BytesIO()
        response.write(return_data.encode())                   
        self.wfile.write(response.getvalue())

httpd = HTTPServer(('localhost', 3003), SimpleHTTPRequestHandler)
httpd.serve_forever()