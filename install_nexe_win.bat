call npm install -g nexe
call nexe . --target win32-x86-10.13.0
call nexe . -t macos-10.13.0
del ".\notion-pdf-export.exe" /f /q
del ".\notion-pdf-export"
call npm install -g cspotcode/nexe#19a5046