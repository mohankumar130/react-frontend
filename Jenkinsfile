pipeline {
    agent any

    environment {
        IMAGE_NAME = 'react-ui'
        CONTAINER_NAME = 'react-ui'
        DOCKER_PORT = '4000'
        VERSION = "${env.BUILD_NUMBER}" // or use GIT_COMMIT or a custom tag
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/mohankumar130/react-frontend.git'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh """
                docker stop \$CONTAINER_NAME || true
                docker rm \$CONTAINER_NAME || true
                """
            }
        }

        stage('Delete Old Image') {
            steps {
                sh "docker rmi -f \$IMAGE_NAME:\$VERSION || true"
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t \$IMAGE_NAME:\$VERSION ."
            }
        }

        stage('Run New Container') {
            steps {
                sh "docker run -d --name \$CONTAINER_NAME -p \$DOCKER_PORT:80 \$IMAGE_NAME:\$VERSION"
            }
        }
    }

    post {
        success {
            echo "✅ Deployed Docker Image: ${env.IMAGE_NAME}:${env.VERSION}"
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
