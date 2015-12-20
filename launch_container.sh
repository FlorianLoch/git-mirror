docker run -it -p 32320:32320 --rm --name git-mirror -v "$PWD":/usr/src/app -v .ssh:~/.ssh -w /usr/src/app node:5.3.0-wheezy npm run launch
