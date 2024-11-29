pipeline {
    agent any

    tools {
        // Configure NodeJS tool here
        nodejs 'nodejs' // This should be the name of the NodeJS tool you have configured in Jenkins Global Tool Configuration
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
                script {
                    echo 'Installing npm dependencies...'
                    // Ensure npm is installed and execute npm install
                    sh 'npm install'
                }
            }
        }

        stage('Print ANDROID_HOME') {
            steps {
                script {
                    echo "ANDROID_HOME: ${env.ANDROID_HOME}" // Print the ANDROID_HOME environment variable
                }
            }
        }
    }
}
