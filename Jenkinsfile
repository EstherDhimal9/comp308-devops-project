pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'cd server && npm install'
                sh 'cd client && npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'cd client && npm run build || echo "No build script"'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
            }
        }

        stage('Deploy Dev') {
            steps {
                sh 'echo "Deploying to Dev..."'
            }
        }

        stage('Deploy QA') {
            steps {
                sh 'echo "Deploying to QA..."'
            }
        }

        stage('Deploy Prod') {
            steps {
                sh 'echo "Deploying to Production..."'
            }
        }
    }
}
