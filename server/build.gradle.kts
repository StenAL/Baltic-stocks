group = "xyz.laane"
version = "1.0.0"

plugins {
    java
    id("org.springframework.boot") version "3.3.1"
    id("io.spring.dependency-management") version "1.1.5"
    id("com.gorylenko.gradle-git-properties") version "2.4.2"  // Used by Sentry to match errors to specific git commit
    id("io.freefair.lombok") version "8.6" // Lombok 1.18.30
}

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")

    implementation("org.mariadb.jdbc:mariadb-java-client:3.4.0")
    implementation("org.flywaydb:flyway-core:10.15.0")
    implementation("org.flywaydb:flyway-mysql:10.15.0")

    implementation("org.jsoup:jsoup:1.17.2")

    implementation("io.sentry:sentry-spring-boot-starter-jakarta:6.32.0")
    implementation("io.sentry:sentry-logback:6.32.0")
}

tasks.wrapper {
    // by default the Gradle wrapper includes only compiled output
    // this changes it to include sources and docs
    distributionType = Wrapper.DistributionType.ALL
}

tasks.jar {
    // the Spring Boot plugin already generates an executable jar as part of the bootJar task so no need for "jar" task
    // https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/htmlsingle/#packaging-executable.and-plain-archives
    enabled = false
}

val springProfile = "default"

tasks.bootRun {
    args = listOf("--spring.profiles.active=" + springProfile)
}
