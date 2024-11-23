pipeline {
    agent any
    tools {
        nodejs 'nodejs'  // Name from the Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/techdroidv5/reactnative-hello.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build APK') {
            steps {
                sh './gradlew assembleRelease'
            }
        }
        stage('Upload to S3') {
            steps {
                sh 'aws s3 cp app-release.apk s3://ksoft-reactnative-apks'
            }
        }
    }
}
