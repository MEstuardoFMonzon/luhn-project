pipeline {
    agent any

    stages {
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test -- --passWithNoTests'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm test -- --passWithNoTests'
                }
            }
        }

        stage('Build & Deploy Preproducción') {
            steps {
                sh 'docker compose -p luhn-preprod -f docker-compose.preprod.yml down'
                sh 'docker compose -p luhn-preprod -f docker-compose.preprod.yml up -d --build'
            }
        }

        stage('Build & Deploy Producción') {
            steps {
                sh 'docker compose -p luhn-prod -f docker-compose.prod.yml down'
                sh 'docker compose -p luhn-prod -f docker-compose.prod.yml up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline ejecutado correctamente'
        }
        failure {
            echo '❌ Pipeline falló'
        }
    }
}