group = "xyz.laane"
version = "1.0.0"

plugins {
    java
    id("org.springframework.boot") version "3.4.3"
    id("io.spring.dependency-management") version "1.1.7"
    id("com.diffplug.spotless") version "7.0.2"
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
    implementation("org.springframework.boot:spring-boot-starter-cache")

    implementation("org.mariadb.jdbc:mariadb-java-client")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-mysql")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    implementation("org.jsoup:jsoup:1.18.3")
}

spotless {
    java {
        palantirJavaFormat()
        importOrder()
        removeUnusedImports()
        formatAnnotations()
        trimTrailingWhitespace()
        endWithNewline()
    }
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
