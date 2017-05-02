FROM ubuntu:14.04

MAINTAINER Chris Ng, chris.ng93@gmail.com

# Create app directory
RUN mkdir -p /usr/src/dished.-server
WORKDIR /usr/src/dished.-server

# Update OS
RUN sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y upgrade

# Install Python, pip, and virtualenv
RUN apt-get install -y python-dev python-pip python3 python3-pip python-virtualenv

# Create virtualenv
RUN virtualenv -p python3.4 flask

# Install dependencies
COPY requirements.txt /usr/src/dished.-server
RUN flask/bin/pip install -r requirements.txt
RUN pip install -r requirements.txt

# Copy app source
COPY . /usr/src/dished.-server

# Expose port 5000
EXPOSE 5000

# Initialize db and run app
CMD /bin/bash -c "cd flask && source bin/activate && cd .. && alembic upgrade head && chmod +x run.py && flask/bin/python3 ./run.py"
