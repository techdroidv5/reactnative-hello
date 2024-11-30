pipeline {
    agent any

    environment {
        S3_BUCKET = 'ksoft-reactnative-apks'  // Replace with your actual bucket name
        JAVA_HOME = tool 'JDK'       
        NODE_HOME = tool 'nodejs'  // Ensure Node.js is configured in Jenkins Global Tools
        ANDROID_HOME = '/home/shiva/Android/Sdk'
        PATH = "${JAVA_HOME}/bin:${NODE_HOME}/bin:${env.ANDROID_HOME}/cmdline-tools/latest/bin:${env.ANDROID_HOME}/platform-tools:${env.PATH}"
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
                        branches: [[name: '*/master']], 
                        userRemoteConfigs: [[url: 'https://github.com/techdroidv5/reactnative-hello.git']]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Installing npm dependencies..."
                    npm install
                '''
            }
        }

        stage('Setup local.properties') {
            steps {
                    echo "Setting up local.properties..."
                    sh '''
                        echo "sdk.dir=${ANDROID_HOME}" > ${WORKSPACE}/android/local.properties
                        echo "Contents of android/local.properties:"
                        cat ${WORKSPACE}/android/local.properties
                    '''
            }
        }

        // stage('Build APK') { Commented
        //     steps {
        //         sh '''                    
        //             echo "Building the APK..."
        //             chmod +x ./android/gradlew                    
        //             cd android
        //             ./gradlew clean assembleRelease --no-daemon --info
        //         '''
        //     }
        // }

        stage('Create Dummy File') {
            steps {
                script {
                    // Create a dummy text file
                    sh 'echo "This is a test file for S3 upload" > dummy.txt'
                }
            }
        }
        stage('Upload to S3') {
            steps {
                withCredentials([string(credentialsId: 'AKIAWCYYALSYUUP4A6MN', variable: 'AWS_ACCESS_KEY_ID'),
                                 string(credentialsId: 'NtDdAUcVa5/Xe64mgWZvNOc62+MAA2GZGq0ynIuo', variable: 'AWS_SECRET_ACCESS_KEY')]) {
                    // Configure AWS CLI and upload the file
                    sh """
                    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                    aws s3 cp dummy.txt s3://$S3_BUCKET/
                    """
                }
            }
        }
        // stage('Upload to S3') {
        //     steps {
        //         withAWS(region: 'us-east-1', credentials: 'your-aws-credentials-id') {  // Replace with your AWS credentials ID
        //             sh '''
        //                 echo "Uploading APK to S3..."
        //                 aws s3 cp ./android/app/build/outputs/apk/release/app-release.apk s3://${S3_BUCKET}/app-release.apk
        //             '''
        //         }
        //     }
        // }
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
