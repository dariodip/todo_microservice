# TODO LIST

In this repository I built a simple microservice using:
- Flask (as a Framework)
- connexion (for generate routes and Swagger docs)
- MongoDB (as a database)


## Without Docker
### Setup
In order to install **todo-list** and all his requirements you have to create a virtual environment using [venv](https://virtualenv.pypa.io/en/stable/) on Python 3.5.
To install *venv*, run the following:

`[sudo] pip3 install virtualenv` on Linux/MacOS
or
`pip install virtualenv` using prompt as administrator on Windows.

To create a virtual environment, in the main directory of the project run:

`virtualenv venv`.

To activate the virtual environment, in the main directory on the project run:

`source venv/bin/activate` on Linux/MacOS
or
`venv\Scripts\activate` on Windows.

You can check if the virtual environmnent is activate, checking if the command prompt has the prefix `(venv)`.

To install all the requirements, run the following:

`pip install -r requirements.txt`

This should install, using [pip](https://pypi.python.org/pypi/pip), all the [requirements](#requirements). 

### Run
To run the application, simply type:

`python app.py`.

You have to set `DB_HOST` and `DB_PORT` as environment variables.




