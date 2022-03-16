// Reference to shared lib. version
@Library('jenkins-shared-library') _
pipeline {
  agent { label 'linux' }
  options {
    timeout(time: 60, unit: 'MINUTES')
  }
  // Initialize environment
  environment {
    SQ_IGNORE_PROPERTIES_FILE="true"                                // sonarqube properties maynot be correct
    SQ_BREAK_BUILD="false"                                         // 'false' will not break build even if sonar quality gate fails
    BUILD_TYPE='angular'
    AD_GROUP="azure_tnt_qcoe"
    WIREMOCK_JAR = "wiremock-standalone-2.27.2.jar"
    LTVS_BASE_CONTAINER = "fxeidocker.azurecr.io/oracle/jre1.8.0:${env.JAVA_8_TAG}"
  }
  // Stage for init., build, image creation.
  stages {
    stage('Build') {
      steps {
        initEnv()
        buildApp()
        writeDockerfile artefact: "${ARTEFACT_DIR}"                  //app image will be created based on nginx.
        dockerBuild()
      }
    }
    // Test code scan with eslint
    stage('Test code Scan') {
      agent {
        docker {
          image 'nexus-repo.tntad.fedex.com/nodejs-interim/nodejs-jdk8:1.0.0'
          args '-v /etc/hosts:/etc/hosts'
        }
      }
      steps {

        script {
            def npmInstall = "cd ${WORKSPACE}/ui-test && npm install"
            def lint = "cd ${WORKSPACE}/ui-test && npm run lint"
            def lintOutput = "cd ${WORKSPACE}/ui-test && npm run lint-report"
            
            sh "${npmInstall}"
            def ecode = sh(script: "${lintOutput}", returnStatus: true)
            
            if (ecode == 1) {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                  echo 'Scan was successful and there is at least one error'
                  def data = sh(script: "${lint}", returnStdout: true)
                  println(data)
                }
            } else if (ecode == 2) {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                  echo 'Scan was unsuccessful due to configuration problem or an internal error'
                  def data = sh(script: "${lint}", returnStdout: true)
                  println(data)
                }
            } else {
                echo 'Scan was successful and there are no errors'
            }
        }
        stash name:"ESLintReport", includes:"ui-test/report.json"
      }
    }
    // Application build image Scan Stage with sonar, trivy, docker, nexus iq
    stage('Scan') {
      parallel {
        stage('Sonarqube Dev Scan') {
          steps {
            unstash "ESLintReport"
            sonarqubeScan(angularArgs:'-Dsonar.source=. -Dsonar.eslint.reportPaths="${WORKSPACE}/ui-test/report.json" -Dsonar.projectVersion=1.0.0 -Dsonar.sourceEncoding=UTF-8')
          }
        }
        stage("Docker Scan by Nexus IQ") {
          steps {
            dockerScan()
          }
        }
        stage('Artifact Scan by Nexus IQ') {
          steps {
            nexusScan artefact: "${ARTEFACT_ZIP}"
          }
        }
      }
    }
    // Publish image to ACR registry
    stage('Publish Container to ACR Registry') {
      steps {
        dockerPush()
      }
    }
    stage('Deploy to Dev') {
      when { expression { env.BRANCH_NAME == 'dev' } }
      steps {
        helmDeploy(environment: 'tnt-001-nonprod', stage: 'development')
        sendNotification("${env.BRANCH_NAME}", "'Application Deployment' for frontend has been completed", "SUCCESS")
      }
   }

  stage('Sanity Tests'){
    agent {
      docker {
        image "nexus-repo.tntad.fedex.com/nodejs-interim/nodejs-jdk8:1.0.0"
        args '-v /etc/hosts:/etc/hosts'
        }
     }
    steps{
      script{
        try{
          sh "echo Starting Frontend Sanity Testing "
          sh "cd ${WORKSPACE}/ui-test && npm install && npm run test-cucumber-ci -- --cucumberOpts.tags=@sanity"
          generateReport("${WORKSPACE}/ui-test/reports", 'cucumber_report.html', 'Sanity Test Report')
          }catch(Throwable e){
            generateReport("${WORKSPACE}/ui-test/reports", 'cucumber_report.html', 'Sanity Test Report')
            currentBuild.result = "SUCCESS"
            currentBuild.stageResult = "UNSTABLE"
          }
      }
      sendNotification("${env.BRANCH_NAME}", "'Application Sanity Tests' for frontend has been completed", "SUCCESS")
    }
  }

  stage('Acceptance Tests'){
    agent {
      docker {
        image "nexus-repo.tntad.fedex.com/nodejs-interim/nodejs-jdk8:1.0.0"
        args '-v /etc/hosts:/etc/hosts'
        }
     }
    steps{
      script{
        try{
          sh "echo Starting Frontend Acceptance Testing "
          sh "cd ${WORKSPACE}/ui-test && npm install && npm run test-cucumber-ci"
          generateReport("${WORKSPACE}/ui-test/reports", 'cucumber_report.html', 'Acceptance Test Report')
          }catch(Throwable e){
            generateReport("${WORKSPACE}/ui-test/reports", 'cucumber_report.html', 'Acceptance Test Report')
            currentBuild.result = "SUCCESS"
            currentBuild.stageResult = "UNSTABLE"
          }
      }
      sendNotification("${env.BRANCH_NAME}", "'Application Acceptance Tests' for frontend has been completed", "SUCCESS")
    }
  }

  stage("DAST") {
      agent {
        docker {
          image 'nexus-repo.tntad.fedex.com/qcoe/owasp/zap2docker-stable:2.9.0'
          args '-v /etc/hosts:/etc/hosts'
        }
      }
      steps {
        sh '''
          # zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com
          zap-cli start --start-options '-config api.disablekey=true'
          # zap-cli context import ${WORKSPACE}/zapcontext
          zap-cli context list
          zap-cli open-url "https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com"
          # zap-cli spider --context-name zapcontext "https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com"
          # zap-cli active-scan --recursive -c zapcontext "https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com"
          zap-cli active-scan https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com/
          zap-cli status
          zap-cli report -o report.html -f html
          zap-cli shutdown
          ls -a
        '''
        nexusArtifactUploader artifacts: [
          [
            artifactId: 'report',
            classifier: '',
            file: 'report.html',
            type: 'html'
          ]
        ],
        credentialsId: 'nexus-tnt-userpass',
        groupId: 'qcoe/reports/zap/test',
        nexusUrl: 'nexus-repo.tntad.fedex.com',
        nexusVersion: 'nexus3',
        protocol: 'https',
        repository: 'trivy',
        version: 'test'
        generateReport('.', 'report.html', 'DAST Test Report')
        sendNotification("${env.BRANCH_NAME}", "'Application DAST Scan' for frontend has been completed", "SUCCESS")
      }
    }
  }
  post {
    always {
        cleanWs()
    }
  }
}
// Common function to publish report to build
def generateReport(String reportDir, String reportFiles, String reportName) {
    publishHTML([
      allowMissing : false,
      alwaysLinkToLastBuild : false,
      keepAll : true,
      reportDir : "${reportDir}",
      reportFiles : "${reportFiles}",
      reportName : "${reportName}"
    ])
}

def sendNotification(String branch, String message, String status){
  script{
            office365ConnectorSend webhookUrl: 'https://myfedex.webhook.office.com/webhookb2/df6d608a-251d-4b01-bf88-a4a9161ffded@b945c813-dce6-41f8-8457-5a12c2fe15bf/IncomingWebhook/d409c31a1fc94196ae7b43f2b22b4864/d919f3c3-4d85-4027-b134-46e074dbef36',
              message: "Notification: Petclinic ${branch} | ${message}",
              status: "${status}"
    }
}
