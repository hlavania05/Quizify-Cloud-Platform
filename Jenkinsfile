pipeline {
    agent any
    environment {
        // Ensure Node.js and NPM are set up correctly
        NODE_HOME = tool name: 'NodeJS', type: 'tool'  // Automatically use the configured NodeJS tool in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}"  // Add Node.js binary directory to PATH for use in pipeline
        EC2_HOST = '13.233.147.16'  // EC2 instance host IP
        SSH_CREDENTIALS_ID = 'ec2-ssh-key'  // SSH credentials ID for accessing EC2 instance
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
                    sh 'sudo npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                // Install frontend dependencies
                dir('client') {
                    sh 'sudo npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                // Build frontend and backend using Dockerfiles
                script {
                    // Build backend Docker image
                    sh 'sudo docker build --no-cache -t quiz-portal-backend ./server'

                    // Build frontend Docker image
                    sh 'sudo docker build --no-cache -t quiz-portal-frontend ./client'
                }
            }
        }

        stage('Test Application') {
            steps {
                // Run backend and frontend tests (optional)
                dir('server') {
                    sh 'sudo npm test'
                }

                dir('client') {
                    sh 'sudo npm test'
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
                        sudo docker ps -q -f name=quiz-portal-backend | xargs -r docker stop | xargs -r docker rm
                        sudo docker ps -q -f name=quiz-portal-frontend | xargs -r docker stop | xargs -r docker rm

                        # Run the new backend container
                        sudo docker run -d --name quiz-portal-backend -p 3000:3000 quiz-portal-backend

                        # Run the new frontend container
                        sudo docker run -d --name quiz-portal-frontend -p 80:80 quiz-portal-frontend
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
