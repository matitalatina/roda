FROM python:3
ENV PYTHONUNBUFFERED 1
ENV CODE_PATH /code

RUN mkdir $CODE_PATH
WORKDIR $CODE_PATH
ADD requirements.txt $CODE_PATH/
RUN pip install -r requirements.txt
ADD . $CODE_PATH/
CMD [ "./start.sh" ]
