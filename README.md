# git-mirror

## How to use this
1. generate a ssh-keypair which has to be accepted by both git hosts
2. `./launch_container.sh`

Or configure like this to use it with `docker-compose`:
```gitmirror:
image: node:5.3.0-wheezy
ports:
- 32320:32320
volumes:
- /var/git-mirror:/usr/src/app
environment:
- GIT_SSH=/usr/src/app/ssh_wrapper.sh
working_dir: /usr/src/app
command: npm run launch```

## Update
To update this tool simply `git pull`
