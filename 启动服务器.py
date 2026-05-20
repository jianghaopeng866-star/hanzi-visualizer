import http.server
import socketserver
import os
import webbrowser
import time

# 设置端口
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        # 简化日志输出
        print(f"[{self.log_date_time_string()}] {args[0]}")

def main():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"=" * 50)
        print(f"汉字可视化系统服务器已启动")
        print(f"=" * 50)
        print(f"本地访问地址:")
        print(f"  完整版: http://localhost:{PORT}/dist/index.html")
        print(f"  简化版: http://localhost:{PORT}/hanzi-visualizer.html")
        print(f"")
        print(f"按 Ctrl+C 停止服务器")
        print(f"=" * 50)
        
        # 尝试自动打开浏览器
        try:
            webbrowser.open(f"http://localhost:{PORT}/dist/index.html")
            print("已自动打开浏览器")
        except:
            print("请手动打开浏览器访问上述地址")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")

if __name__ == "__main__":
    main()