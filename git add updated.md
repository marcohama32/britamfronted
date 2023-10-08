git add package.json yarn.lock

git status

git commit -m "updat company"

git push origin main



+++++++++++++++++++++++++++++++++++++++++++++++
clean project

yarn cache clean
rm yarn.lock
rm -rf node_modules
yarn install


+++++++++++++++++++++++++++++++++++++++ add a folder ++++++++++++++
git add dist/
git commit -m "Include the dist/ directory in the repository"