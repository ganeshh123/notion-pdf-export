call npm install
robocopy node_modules dist/win32/node_modules /E
robocopy markdown-pdf dist/win32/utils/markdown-pdf /E
copy ".\node_modules\phantomjs-prebuilt\lib\phantom\bin\phantomjs.exe" ".\dist\win32\utils\markdown-pdf\phantomjs.exe"
copy ".\LICENSE" ".\dist\win32\LICENSE"
del ".\dist\win32\node_modules\phantomjs-prebuilt\lib\phantom\bin\phantomjs.exe" /f /q
nexe . --target win32-x86-10.13.0 -o ./dist/win32/notion-pdf-export.exe