pipeline {
    agent any

    environment {
        S3_BUCKET = 'ksoft-reactnative-apks'  // Replace with your actual bucket name
        JAVA_HOME = tool 'JDK'
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
        NODE_HOME = tool 'nodejs'  // Ensure Node.js is configured in Jenkins Global Tools
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    options {
        timeout(time: 60, unit: 'MINUTES')  // Sets a timeout for the pipeline
        timestamps()  // Adds timestamps to the console log
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/master']], // Update branch name if needed
                        userRemoteConfigs: [[url: 'https://github.com/techdroidv5/reactnative-hello.git']]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Installing npm dependencies..."
                    npm install --no-audit
                '''
            }
        }

        stage('Build APK') {
            steps {
                sh '''
                    echo "Building the APK..."
                    chmod +x ./android/gradlew
                    cd android
                    ./gradlew clean assembleRelease --no-daemon
                '''
            }
        }

        stage('Upload to S3') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'your-aws-credentials-id') {  // Replace with your AWS credentials ID
                    sh '''
                        echo "Uploading APK to S3..."
                        aws s3 cp ./android/app/build/outputs/apk/release/app-release.apk s3://${S3_BUCKET}/app-release.apk
                    '''
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
        always {
            cleanWs()  // Cleans up the workspace
        }
    }
}
