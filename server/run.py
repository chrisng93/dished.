#!flask/bin/python3.6
from app.api import create_app

app = create_app()
app.run(debug=True)
