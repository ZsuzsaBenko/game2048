from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def route_index():
    return render_template("index.html")


def main():
    app.run(
        port=8080,
        debug=True
    )


if __name__ == '__main__':
    main()
