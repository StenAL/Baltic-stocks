group = "xyz.laane"
version = "1.0.0"

plugins {
    java
    id("org.springframework.boot") version "3.4.3"
    id("io.spring.dependency-management") version "1.1.7"
    id("io.freefair.lombok") version "8.12.1" // Lombok 1.18.36
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

    implementation("org.mariadb.jdbc:mariadb-java-client")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-mysql")

    implementation("org.jsoup:jsoup:1.18.3")
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
