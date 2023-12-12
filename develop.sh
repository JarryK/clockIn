# .gitee/pages/deploy.sh
#!/bin/bash

set -e

npm install

npm run build

cp -r dist/* ../../public
