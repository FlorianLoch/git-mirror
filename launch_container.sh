docker run -it -p 8080:32320 --rm --name git-mirror -v "$PWD":/usr/src/app -e "GIT_SSH=/usr/src/app/ssh_wrapper.sh" -w /usr/src/app node:5.3.0-wheezy npm run launch
