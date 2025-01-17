from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def route_index():
    return render_template("index.html")


def main():
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )


if __name__ == '__main__':
    main()
