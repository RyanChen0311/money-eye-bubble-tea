from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # 啟動開發伺服器，debug模式開啟，方便修改即時反映
    app.run(host='0.0.0.0', port=5000, debug=True)
