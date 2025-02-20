pipeline {

agent any

tools {

maven 'Maven 3.9.8'

}
environment {
    docker_registry = 'sahajagarrepally/springboot'
    DOCKERHUB_CREDENTIALS = credentials('docker-access')
    dockerImageTag = "v1"
}
options {
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
}
parameters {
    booleanParam(name: 'CodeQualityCheck', defaultValue: false, description: 'is it required code quality check')
    choice(name: 'publishImage', choices: ['yes', 'no'], description: 'is it required publish image')
}
stages {
   stage ("Get Source Code") {
    steps {
            git branch: 'master', credentialsId: 'git_access', url:'https://github.com/Sahaja-surnoi/Fusion-BE.git'
        }
    } 
   stage ("Build") {
        steps {
            sh 'mvn clean install -DskipTests'
        }
    }
   stage ("code quality") {
        when {
                expression{
                    params.CodeQualityCheck == true
                }
        }
        steps {
            script {
                withSonarQubeEnv(installationName: 'sonarqube', 
                credentialsId: 'sonar_access') {
                sh '''
                    mvn clean install -Dmaven.test.skip=true -Psonar  sonar:sonar \
                    -Dsonar.projectKey=springboot \
                    -Dsonar.projectName='springboot' \
                    -Dsonar.host.url=http://13.201.8.88:9000 \
                    -Dsonar.token=sqp_cd0783fabb441ab1d15e40a5dedaad573dbc92e9
                '''
                }
            }
        }
    }
   stage('containerization') {
        steps {
            sh 'docker build -t $docker_registry:$dockerImageTag .'
            }
    }
   stage('Publish Docker Image') {
        when {
                expression { 
                    params.publishImage == 'yes'
                }
            }
        input{
            message "should we publish the image in Docker hub?"
            ok "Yes, we should."

        }
        steps {
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            sh "docker push $docker_registry:$dockerImageTag"
        }       
    }
    }
    post { 
    always { 
        echo "\033[34mJob completed. Cleaning up workspace...\033[0m"
        deleteDir()
    }
    success {
        echo "\033[33mPipeline completed successfully. Performing success actions...\033[0m"
        // Add additional actions here if needed, like sending success notifications
    }
    failure { 
        echo "\033[35mPipeline failed. Triggering failure response...\033[0m"
        // send notification
    }
    unstable {
        echo "\033[34mPipeline marked as unstable. Reviewing issues...\033[0m"
        // Send notification or take action for unstable builds, if needed
    }
    aborted {
        echo "\033[33mPipeline was aborted. Clearing any partial artifacts...\033[0m"
        // Any specific actions for aborted jobs
    }
}

}

 
