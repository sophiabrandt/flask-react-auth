# builder base image
FROM python:3.7.6-slim-buster AS compile-image

# install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc

# virtualenv
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# add and install requirements
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# build-image
FROM python:3.7.6-slim-buster AS runtime-image

# install nc
RUN apt-get update && \
    apt-get install -y --no-install-recommends netcat-openbsd

# copy Python dependencies from build image
COPY --from=compile-image /opt/venv /opt/venv

# set working directory
WORKDIR /usr/src/app

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# add app
COPY . /usr/src/app

# set environment variables & copy code from compile image
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PATH="/opt/venv/bin:$PATH"

# run server
CMD python manage.py run -h 0.0.0.0
