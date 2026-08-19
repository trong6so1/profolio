pipeline {

    agent any

    triggers {
        githubPush()
    }

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
                      set -eux

                      echo "======================================"
                      echo "🐳 DOCKER DEPLOY"
                      echo "======================================"

                      echo "Docker:"
                      docker --version

                      echo "Docker containers:"
                      docker ps -a

                      echo "Docker images:"
                      docker images

                      echo "Compose config:"
                      docker compose \
                          -f docker-compose.app.yml \
                          config

                      echo "Starting application..."
                      docker compose \
                          -f docker-compose.app.yml \
                          up -d \
                          --force-recreate

                      echo "======================================"
                      echo "🐳 CONTAINERS AFTER DEPLOY"
                      echo "======================================"

                      docker ps -a
                  '''
              }
          }
      }


        stage('Health Check') {
          steps {
              sh '''
                  set -e

                  echo "======================================"
                  echo "❤️ HEALTH CHECK"
                  echo "======================================"

                  sleep 5

                  echo "===== CONTAINERS ====="
                  docker ps

                  echo ""
                  echo "===== APP STATUS ====="

                  docker inspect \
                      --format='{{.State.Status}}' \
                      profolio-app

                  echo ""
                  echo "===== APP HEALTH CHECK ====="

                  docker exec profolio-app \
                      node -e "fetch('http://127.0.0.1:81').then(r => { console.log('HTTP status:', r.status); if (!r.ok) process.exit(1) }).catch(err => { console.error(err); process.exit(1) })"

                  echo ""
                  echo "======================================"
                  echo "✅ APP HEALTH CHECK PASSED"
                  echo "======================================"
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