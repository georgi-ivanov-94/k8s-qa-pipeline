pipeline {
  agent any

  stages {

    stage('Deploy Test Job') {
      steps {
        sh 'kubectl delete job saucedemo-tests --ignore-not-found'
        sh 'kubectl apply -f playwright-job.yaml'
      }
    }

    stage('Wait for Completion') {
      steps {
        sh 'kubectl wait --for=condition=complete job/saucedemo-tests --timeout=300s'
      }
    }

    stage('Fetch Logs') {
      steps {
        sh 'kubectl logs job/saucedemo-tests'
      }
    }

  }
}