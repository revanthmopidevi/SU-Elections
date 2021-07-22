job ('SU_Elections') {
    scm {
        git('https://github.com/revanthmopidevi/SU-Elections.git') {  node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('revanth mopidevi')
            node / gitConfigEmail('revanthmopidevi@gmail.com')
        }
    }
  
    wrappers {
        nodejs ('NodeJS') // this is the name of the NodeJS installation in 
                         // Manage Jenkins -> Configure Tools -> NodeJS Installations -> Name
    }
    steps {
        sh ("npm install")
    }
}
