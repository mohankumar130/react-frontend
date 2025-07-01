pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'msy061618'
        IMAGE_NAME = 'react-ui'
        CONTAINER_NAME = 'react-ui'
        DOCKER_PORT = '4000'
        VERSION = "${env.BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${DOCKER_HUB_USER}/${IMAGE_NAME}:${VERSION}"
        LATEST_TAG = "${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
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

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }
        }

        stage('Pull Cache Image') {
            steps {
                script {
                    // Try pulling the latest image to use for cache
                    sh "docker pull ${LATEST_TAG} || true"
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                docker build --cache-from=${LATEST_TAG} -t ${FULL_IMAGE_NAME} -t ${LATEST_TAG} .
                """
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

        stage('Run New Container') {
            steps {
                sh "docker run -d --name \$CONTAINER_NAME -p \$DOCKER_PORT:80 ${FULL_IMAGE_NAME}"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "docker push ${FULL_IMAGE_NAME}"
                sh "docker push ${LATEST_TAG}"
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh """
                docker images --format "{{.Repository}}:{{.Tag}} {{.ID}}" | grep "^${DOCKER_HUB_USER}/${IMAGE_NAME}:" | grep -v ":${VERSION}" | awk '{print \$2}' | xargs -r docker rmi -f || true
                docker image prune -f
                """
            }
        }
    }

    post {
        success {
            echo "✅ Successfully deployed and pushed: ${FULL_IMAGE_NAME}"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}
