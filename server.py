import sys
import http.server
import socketserver

PORT = 8934


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    # 既定はlocalhostのみ。スマホ実機テスト等でLANに公開したい場合は
    # 明示的に `python server.py --lan` を指定する(誤って業務フォルダ等を
    # 無認証で同一Wi-Fiに晒さないための安全策)。
    host = "0.0.0.0" if "--lan" in sys.argv else "127.0.0.1"
    with socketserver.TCPServer((host, PORT), NoCacheHandler) as httpd:
        print(f"Serving on {host}:{PORT} (no-cache)")
        httpd.serve_forever()
