from flask import Flask, render_template, url_for
import csv
import os

app = Flask(__name__)

cards = []
with open("data.csv", encoding="utf-8-sig") as data:
    reader = csv.DictReader(data)
    for row in reader:
        cards.append(row)

for card in cards:
    card["Images"] = card["Images"].split("\n")
    card["Captions"] = card["Captions"].split("\n")

if os.environ.get('FLASK_ENV', '') != 'development':
    app.config['SERVER_NAME'] = 'acheung.me'
else:
    @app.context_processor
    def override_url_for():
        return dict(url_for=dated_url_for)


    def dated_url_for(endpoint, **values):
        if endpoint == 'static':
            filename = values.get('filename', None)
            if filename:
                file_path = os.path.join(app.root_path,
                                         endpoint, filename)
                values['q'] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)


@app.route('/')
def hello_world():
    return render_template('index.html', cards=reversed(cards))


@app.route('/m')
def mobile():
    return render_template('index_mobile.html', cards=reversed(cards))


if __name__ == '__main__':
    app.run()
