FROM openjdk:11
COPY build/resources/main/wait-for-it.sh wait-for-it.sh
RUN chmod a+x wait-for-it.sh
COPY build/libs/*.jar app.jar
