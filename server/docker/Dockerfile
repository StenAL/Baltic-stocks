FROM eclipse-temurin:25
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=prod"]
