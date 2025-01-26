pipeline {
    agent any
    environment {
        // Define Node.js and NPM
        NODE_HOME = tool name: 'NodeJS', type: 'Tool'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        EC2_HOST = '13.233.147.16'
        SSH_CREDENTIALS_ID = 'ec2-ssh-key'
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository from GitHub or GitLab
                git branch: 'main', url: 'https://github.com/hlavania05/Quizify-Cloud-Platform.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                // Install backend dependencies
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                // Install frontend dependencies
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                // Build frontend and backend using Dockerfiles
                script {
                    // Build backend Docker image
                    sh 'docker build -t quiz-portal-backend ./server'

                    // Build frontend Docker image
                    sh 'docker build -t quiz-portal-frontend ./client'
                }
            }
        }

        stage('Test Application') {
            steps {
                // Run backend and frontend tests (optional)
                dir('server') {
                    sh 'npm test'
                }

                dir('client') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Deploy the app to EC2 instance
                sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                    script {
                        // SSH into the EC2 instance
                        sh '''
                ssh -o StrictHostKeyChecking=no ec2-user@${EC2_HOST} << EOF
                # Navigate to the project directory
                cd /var/www/Quizify-Cloud-Platform

                # Stop and remove any existing containers
                docker ps -q -f name=quiz-portal-backend | xargs -r docker stop | xargs -r docker rm
                docker ps -q -f name=quiz-portal-frontend | xargs -r docker stop | xargs -r docker rm

                # Run the new backend container
                docker run -d --name quiz-portal-backend -p 3000:3000 quiz-portal-backend

                # Run the new frontend container
                docker run -d --name quiz-portal-frontend -p 80:80 quiz-portal-frontend
                EOF
                '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
