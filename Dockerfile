FROM bellsoft/liberica-openjdk-alpine:18.0.2.1-1

COPY ./target/spring-boot_security-demo-0.0.1-SNAPSHOT.jar spring-boot_security-demo-0.0.1-SNAPSHOT.jar

CMD [ "java", "-jar", "spring-boot_security-demo-0.0.1-SNAPSHOT.jar"]