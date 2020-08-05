# Notion PDF Export

A tool to allow batch PDF export for free Notion users. You can export as markdown and then use this tool to convert those into PDFs.

---

## Download

Get the latest download for Windows and Mac from the releases page:

[https://github.com/ganeshh123/notion-pdf-export/releases](https://github.com/ganeshh123/notion-pdf-export/releases)

---

## Usage

1. Download the tool and extract.

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/374675d4-2c33-4941-9a03-54c36a183ea2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/374675d4-2c33-4941-9a03-54c36a183ea2/Untitled.png)

2. In [Notion](https://notion.so), go to the database and click Export, choose 'Markdown & CSV' and ensure 'Include Subpages' is on.

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d5f18e2-0111-4168-a507-31e6a99a02b3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d5f18e2-0111-4168-a507-31e6a99a02b3/Untitled.png)

3. Extract and place the markdown files with folders containing images in the same folder as 'notion-pdf-export.exe' (Windows) or 'notion-pdf-export' (Mac).

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ab89fc19-3e49-463e-a591-1cff1227c2b8/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ab89fc19-3e49-463e-a591-1cff1227c2b8/Untitled.png)

4. Double Click 'notion-pdf-export.exe' (Windows) or 'notion-pdf-export' (Mac) and wait for the process to be completed.

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0561d492-c46d-4fc5-ab55-8b66ae4534c1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0561d492-c46d-4fc5-ab55-8b66ae4534c1/Untitled.png)

5. A PDF book consisting of all the pages can be found in pdfs>book.pdf and all the individual pages can be found converted into pdfs at pdfs>pages .

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/75818f7c-4050-4f8d-b404-63113706ee34/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/75818f7c-4050-4f8d-b404-63113706ee34/Untitled.png)

---

## Building

### Running the Project on Node

1. Clone/Download the project and run the command in the project root directory:

    ```bash
    npm install
    ```

2. Go to node_modules>phantomjs-prebuilt>lib>phantom>bin and copy 'phantomjs.exe' (Windows) or 'phantomjs' (Mac) into the the project root directory
3. Run this command to run the script:

    ```bash
    node index.js
    ```

### Compiling an Executable

This is tricky. A lot of adjustments had to be made so that it can run without node.

**Installing nexe**

Executables are compiled with a very [specific version of nexe](https://github.com/cspotcode/nexe/tree/fix-vfs) that allows access to the filesystem, which has a tricky setup procedure.

To install automatically:

Run **install_nexe_win.bat** as admin on **Windows**, will take about 5 minutes to install fully.

Or

Run **install_nexe_mac** on **Mac**, will take about 5 minutes to install, and you will need to enter password. This sometimes doesn't seem to work properly, so might be worth doing manual install if there's problems.

Alternatively, install manually like this:

1. Firstly, install the general [nexe](https://www.npmjs.com/package/nexe) globally with the command:

    ```bash
    npm install -g nexe
    ```

    In Windows with Command Prompt running as Admin. Or:

    ```bash
    sudo npm install -g nexe
    ```

    In Mac in the terminal

2. In the project root folder build some executables with this version of nexe to download node binaries for Windows and Mac:

    ```bash
    nexe . --target win32-x86-10.13.0
    nexe . -t macos-10.13.0
    ```

    This will download the binaries we need for later, delete the executables built with this for now.

3. Now we need to install a [specific version of nexe](https://github.com/cspotcode/nexe/tree/fix-vfs) that allows access to the filesystem:

    Run the command:

    ```bash
    npm install -g cspotcode/nexe#19a5046
    ```

    In Windows with Command Prompt running as Admin. Or:

    ```bash
    sudo npm install -g cspotcode/nexe#19a5046
    ```

Now we should have the correct version of nexe for building.

Confirm by running:

```bash
nexe -v
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc272f11-f518-4f4b-80dd-355dded0a713/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc272f11-f518-4f4b-80dd-355dded0a713/Untitled.png)

Check that the version is `4.0.0-beta.4`

**Compiling Executables**

To Compile Automatically

Run **build_win32.bat** on **Windows** to build a Windows Executable. This can be found in /dist/win32 and everything in that folder must be distributed together.

Run **build_macos** on **Mac** to build a Mac Executable. This can be found in /dist/macos and everything in that folder must be distributed together.

If you wish to compile for Mac on Windows or Vice Versa, you can do so using the manual method below. This is trickier and will require obtaining a phantomjs binary built for the desired platform and placing it in the correct place.

To Compile Manually

To build a Windows Executable, run the command:

```bash
nexe . --target win32-x86-10.13.0 -o ./dist/win32/notion-pdf-export.exe
```

in the root directory of the project.

To build a Mac executable, run the command:

```bash
nexe . -t macos-10.13.0 -o ./dist/macos/npe
```

in the root directory of the project. Note that this is built under the name 'npe' which is done for a reason.

To distribute the Windows Executable, place it in a directory with the following:

- The 'markdown-pdf' folder that comes with the source code
- The original 'node_modules' folder from the source code
- The 'phantomjs.exe' prebuilt binary for Windows placed inside 'markdown-pdf' folder. This can be found at ***node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs.exe***

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/95833769-94d5-4567-8fdb-775c93f50740/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/95833769-94d5-4567-8fdb-775c93f50740/Untitled.png)

To distribute the Mac Executable (npe), place it in a directorywith the following:

- The 'markdown-pdf' folder that comes with the source code
- The original 'node_modules' folder from the source code
- The 'phantomjs' prebuilt binary for Mac placed inside the 'markdown-pdf' folder. This can be found at ***node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs***
- An executable unix shell script with the following contents, called 'notion-pdf-export':

    ```bash
    #/bin/bash
    cd "$0"/..
    ./npe
    ```

    This can be obtained from 'mac_script.sh' or found inside /dist/macos

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af7da32f-b59a-4540-893a-0c9adf404ca3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af7da32f-b59a-4540-893a-0c9adf404ca3/Untitled.png)
