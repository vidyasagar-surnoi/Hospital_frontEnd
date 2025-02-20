pipeline {
    agent any
    environment {
        SONAR_SCANNER_HOME = tool name: 'sonar-access'
    }
	
    stages {
        stage('checkout code from git hub') {
            steps {
             git branch: 'master', credentialsId: 'git-token', url: 'https://github.com/vidyasagar-surnoi/Hospital_frontEnd.git'   
            }
        }
          stage('bulid NPM and ng') {
            steps {
                      dir('/var/lib/jenkins/workspace/hospital-FE') {
                    sh '''
                    npm install
                    ng build --configuration=production
                      '''
					   }
     
        }
		}
 		  stage('static code analysis'){
          steps{
                 dir('/var/lib/jenkins/workspace/hospital-FE/') {
                 script{
            withSonarQubeEnv('sonar-access'){
              withEnv(["PATH+SONAR=$SONAR_SCANNER_HOME/bin"]) {
             	sh '''
            		
     mvn clean verify sonar:sonar \
     -Dsonar.projectKey=hospital-3tier-arch \
     -Dsonar.host.url=http://13.124.251.57:9000 \
     -Dsonar.login=sqp_62c1bf5a639182f6bf9a390b90f9757fd5dedaef
             	'''
          
                   }
                    
                     }
        	    }
            }
       }
  }
       

         stage('docker build run') {
             steps {
                 script {
                 sh '''
                
                  docker build -t hospitalfeimg:v1 .
                  docker run -d --name hospital-fe -p 8081:80 hospitalfeimg:v1
                  ''' 
                 }
             }
         }
         stage('push to docker hub') {
             steps {
                 script {
                      withDockerRegistry(credentialsId: 'docker-access') {
                     
                          sh '''
                  docker tag hospitalfeimg:v1 sarusparks/hospitalfeimg:v1
                  docker push sarusparks/hospitalfeimg:v1
                  '''
                      }
                  } 
             }
         }
		 stage('push to s3') {
        steps{ 
	
            sh 'aws s3 cp /var/lib/jenkins/workspace/hospital-FE/dist/ s3://hospital-project/ --recursive --exclude "*" --include "3rdpartylicenses.txt"' 
            sh 'aws s3 cp /var/lib/jenkins/workspace/hospital-FE/dist/browser s3://hospital-project/ --recursive --exclude "*" --include "*.*"'
    }
    }
}
}
 
