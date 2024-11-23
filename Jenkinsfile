pipeline {
    agent any
    tools {
        nodejs 'nodejs'  // Ensure 'nodejs' is configured in Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/techdroidv5/reactnative-hello.git'
            }
        }
        
        stage('Install Dependencies') {
            options {
                timeout(time: 60, unit: 'MINUTES') // Increase the timeout for this stage
            }
            steps {
                // Use verbose logging for troubleshooting
                sh 'npm install --no-audit'
            }
        }
        stage('Build APK') {
            steps {
                script {
                    // Ensure gradlew has executable permissions
                    sh 'chmod +x ./gradlew'
                    sh './gradlew assembleRelease'
                }
            }
        }
        stage('Upload to S3') {
            steps {
                script {
                    // Adjust the path if app-release.apk is in a subdirectory
                    def apkPath = './android/app/build/outputs/apk/release/app-release.apk'
                    sh "aws s3 cp ${apkPath} s3://ksoft-reactnative-apks"
                }
            }
        }
    }
    post {
        always {
            // Clean up workspace after the build
            cleanWs()
        }
    }
}
