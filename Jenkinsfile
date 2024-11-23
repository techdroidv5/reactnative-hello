pipeline {
    agent any

    environment {
        S3_BUCKET = 'ksoft-reactnative-apks'
        AWS_REGION = 'eu-north-1'
    }

    stages {
        stage('Clone Repository') {
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

        stage('Upload APK to S3') {
            steps {
                script {
                    def apkPath = "android/app/build/outputs/apk/release/rn-helloworld.apk"
                    sh """
                    aws s3 cp ${apkPath} s3://${S3_BUCKET}/rn-helloworld.apk --region ${AWS_REGION}
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed."
        }
    }
}
