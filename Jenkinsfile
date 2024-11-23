pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/techdroidv5/reactnative-hello.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Or yarn install if you use Yarn
            }
        }
        stage('Build APK') {
            steps {
                sh './gradlew assembleRelease'  // Assuming you are using gradle to build the APK
            }
        }
        stage('Upload to S3') {
            steps {
                sh 'aws s3 cp app-release.apk s3://ksoft-reactnative-apks/'
            }
        }
    }
}
