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

        stage('Build APK') {
            steps {
                script {
                    echo 'Building APK...'

                    // Navigate to the Android directory inside the React Native project
                    dir("${env.WORKSPACE}/android") {
                        writeFile file: 'local.properties', text: "sdk.dir=${env.ANDROID_HOME}\n"
                        echo "Contents of android/local.properties:"
                        sh 'cat android/local.properties'
                        // Make sure the Gradle wrapper has execute permissions
                        sh 'chmod +x ./gradlew'

                        // Run Gradle to clean and assemble the release APK
                        sh './gradlew clean assembleRelease --no-daemon --info'
                    }
                }
            }
        }
    }
}
