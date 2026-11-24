# ELEC3-Nodejs-Escano

- **Full Name:** Sheriene Escano
- **Section:** IV-BSIT C
- **Course:** ELEC 3 - Node.js

## Activities

| Activity | Description | Folder |
|---|---|---|
| N1 - Project Setup and Package Management | Initialize an npm project, install dependencies, and run a start script | [set1/n1-setup](set1/n1-setup) |
| N2 - Modular Calculator | Run five arithmetic operations from the command line | [set1/n2-calculator](set1/n2-calculator) |

## How to Run N1

From the repository root in PowerShell:

```powershell
cd set1/n1-setup
npm.cmd install
npm.cmd start
```

## N1 Screenshots

![Terminal showing the installed Node.js and npm versions](set1/n1-setup/screenshots/n1-version-check.png)

![Completed package.json showing project metadata, start script, and dependencies](set1/n1-setup/screenshots/n1-package-json.png)

![Terminal showing the npm start output](set1/n1-setup/screenshots/n1-npm-start.png)

## How to Run N2

From the repository root in PowerShell:

```powershell
cd set1/n2-calculator
node index.js add 12 8
node index.js subtract 12 8
node index.js multiply 4 5
node index.js divide 12 3
node index.js average 10 20 30
```

![N2 terminal output showing all five operations and both required errors](set1/n2-calculator/screenshots/n2-operations-and-errors.png)
