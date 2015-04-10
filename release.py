import os, re, json, sys

class Release:
    def build(self):
        os.system('grunt uglify --force')
        os.system('rm -rf ./rc/*');
        self.__buildPopup()
        self.__buildFiles()

    def __buildPopup(self):
        print('popup.html content')
        with open('popup.html') as f:
            content = f.read()
        content = re.sub(r'<script[^>]*></script>',r'',content);
        content = re.sub(
            r'</body>',
            r'<script src="built.js" type="text/javascript"></script></body>',
            content);
        print("\t- fixed")
        file_ = open('rc/popup.html', 'w')
        file_.write(content)
        file_.close()
        print("\t- saved to rc")

    def __buildFiles(self):
        print 'Copying extension files'
        rc_files = [
            'background.js',
            'cookie16.png',
            'manifest.json',
            'built.js',
            'main.css'
        ]
        for file in rc_files:
            os.system('cp ' + file + ' rc/' + file)
            print("\t- " + file)

    def compress(self):
        with open('rc/manifest.json') as data_file:    
            data = json.load(data_file)
        filename = 'release/cookiecleaner_' + data['version'].replace('.', '_') + '.zip';
        if os.path.exists(filename):
            print('File exists')
        else: 
            os.system('zip ' + filename + ' rc/*')


release = Release();

if '--build' in sys.argv:
    release.build()

if '--compress' in sys.argv:
    release.compress()