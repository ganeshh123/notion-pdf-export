call npm install
robocopy utils/wkhtmltopdf dist/win32/utils/wkhtmltopdf /E
copy ".\LICENSE" ".\dist\win32\LICENSE"
del ".\dist\win32\utils\wkhtmltopdf\wkhtmltopdf" /f /q
del ".\dist\win32\utils\wkhtmltopdf\wkhtmltox.dll" /f /q
del ".\dist\win32\utils\wkhtmltopdf\libwkhtmltox.a" /f /q
nexe . --target win32-x86-10.13.0 -o ./dist/win32/notion-pdf-export.exe