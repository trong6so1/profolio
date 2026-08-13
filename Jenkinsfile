pipeline {

    agent any

    environment {
        PATH = "/opt/bun/bin:/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        NEXT_TELEMETRY_DISABLED = "1"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '======================================'
                echo '📥 CHECKOUT'
                echo '======================================'

                checkout scm
            }
        }


        stage('Environment') {
            steps {
                sh '''
                    echo "======================================"
                    echo "🔍 ENVIRONMENT"
                    echo "======================================"

                    echo "Node:"
                    node --version

                    echo "npm:"
                    npm --version

                    echo "Bun:"
                    which bun
                    bun --version

                    echo "Docker:"
                    docker --version

                    echo "Docker Compose:"
                    docker compose version
                '''
            }
        }


        stage('Install') {
            steps {
                sh '''
                    echo "======================================"
                    echo "📦 INSTALL"
                    echo "======================================"

                    bun install --frozen-lockfile
                '''
            }
        }


        stage('Build') {
            steps {
                sh '''
                    echo "======================================"
                    echo "🔨 BUILD"
                    echo "======================================"

                    bun run build
                '''
            }
        }


        stage('Docker Build') {
            steps {
                sh '''
                    echo "======================================"
                    echo "🐳 DOCKER BUILD"
                    echo "======================================"

                    docker build \
                        -t profolio-app:latest \
                        .
                '''
            }
        }


        stage('Deploy') {
          steps {
              withCredentials([
                  string(
                      credentialsId: 'ngrok-token',
                      variable: 'NGROK_AUTHTOKEN'
                  )
              ]) {
                  sh '''
                      echo "Deploying..."

                      NGROK_AUTHTOKEN="$NGROK_AUTHTOKEN" \
                      docker compose \
                          -f docker-compose.app.yml \
                          up -d \
                          --force-recreate
                  '''
              }
          }
        }


        stage('Health Check') {
            steps {
                sh '''
                    echo "======================================"
                    echo "❤️ HEALTH CHECK"
                    echo "======================================"

                    sleep 5

                    docker ps

                    curl -f http://localhost:81
                '''
            }
        }
    }


    post {

        success {
            echo ''
            echo '======================================'
            echo '🎉 DEPLOY SUCCESS'
            echo '======================================'
            echo 'App: http://localhost:81'
            echo 'Ngrok dashboard: http://localhost:4040'
            echo '======================================'
        }

        failure {
            echo ''
            echo '======================================'
            echo '❌ PIPELINE FAILED'
            echo '======================================'

            sh '''
                docker ps -a || true

                echo "===== APP LOG ====="
                docker logs profolio-app --tail 100 || true

                echo "===== NGROK LOG ====="
                docker logs profolio-ngrok --tail 100 || true
            '''
        }
    }
}