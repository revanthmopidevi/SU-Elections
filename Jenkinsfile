job ('SU_Elections') {
    scm {
        git('https://github.com/revanthmopidevi/SU-Elections.git') {  node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('revanth mopidevi')
            node / gitConfigEmail('revanthmopidevi@gmail.com')
        }
    }
    triggers {
        scm('H/5 * * * *')
    }
    nodejs ('NodeJS') {
        npm install
    }
    
}
