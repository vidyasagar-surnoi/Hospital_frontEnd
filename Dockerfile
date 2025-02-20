# Use a robust base image for Java applications
FROM amazoncorretto:21

# Set the working directory
WORKDIR /home/app

# Copy the application JAR file into the container
COPY ./target/fusionIq-0.0.1-SNAPSHOT.jar .

# Expose the application's port
EXPOSE 8080

# Set the command to run the application
CMD ["java", "-jar", "fusionIq-0.0.1-SNAPSHOT.jar"]
