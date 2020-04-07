FROM adoptopenjdk/openjdk11:alpine
RUN apk add --update bash
COPY build/resources/main/wait-for-it.sh wait-for-it.sh
RUN chmod a+x wait-for-it.sh
COPY build/libs/*.jar app.jar
