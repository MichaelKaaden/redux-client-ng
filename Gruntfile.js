'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {});

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // handle the version number in app/version.json
        // see https://github.com/vojtajina/grunt-bump
        // use grunt bump:<option> --dry-run to see what would happen
        // 'grunt bump:prerelease' is a good choice
        bump: {
            options: {
                files: ['<%= yeoman.app %>/version.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Bump version to v%VERSION%',
                commitFiles: ['<%= yeoman.app %>/version.json'],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: 'dev', // false,
                metadata: '',
                regExp: false
            }
        },

        // get the commit ID
        'git-rev-parse': {
            build: {
                options: {
                    prop: 'git-revision',
                    number: 10, // should be fine for our little project :-)
                    silent: true
                }
            }
        },

        // get Git information, see https://github.com/damkraw/grunt-gitinfo
        gitinfo: {},
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-git-rev-parse');

    // write the Git commit hash to a revision number
    grunt.registerTask('gatherBuildInformation', [
        // 'git-rev-parse',
        'gitinfo',
        'writeBuildInformation'
    ]);

    // update the build-information.json file
    function updateJSON(key, value) {
        var projectFile = 'app/build-information.json';
        if (!grunt.file.exists(projectFile)) { // create the file
            grunt.file.write(projectFile, '{}');
        }
        var project = grunt.file.readJSON(projectFile); // get file as JSON object
        project[key] = value; //edit the value of JSON object
        grunt.file.write(projectFile, JSON.stringify(project, null, 2)); //serialize it back to file
    }

    grunt.registerTask('writeBuildInformation',
        'writes the build information file',
        function () {
            var gitInfo = {
                "branch": grunt.config.get('gitinfo.local.branch.current.name'),
                // "hash": grunt.config.get('git-revision'), // length see parameters above
                "originUrl": grunt.config.get('gitinfo.remote.origin.url'),
                "SHA": grunt.config.get('gitinfo.local.branch.current.SHA'),
                "shortSHA": grunt.config.get('gitinfo.local.branch.current.shortSHA'),
            };
            updateJSON('buildTime', grunt.template.today());
            updateJSON('buildServer', require('os').hostname());
            // updateJSON('hash', grunt.config.get('git-revision'));
            // updateJSON('branch', grunt.config.get('gitinfo.local.branch.current.name'));
            updateJSON('git', gitInfo);
        });

    grunt.registerTask('build', [
        'gatherBuildInformation',
    ]);

    grunt.registerTask('buildserver', [
        'bump:prerelease',
        'default'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
