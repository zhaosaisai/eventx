#!/usr/bin/env bash

rm -rf ./dist

npm run build

git status

git add -A

git commit -m "$1"

git push origin master


