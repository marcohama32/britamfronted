git add package.json yarn.lock / git add .
git commit -m "update login code"
<!-- on frontend -->
git push origin main

<!-- on backend -->
git push origin master

+++++++++++++++++++++++++++++++++++++++++++++++
clean project

yarn cache clean
rm yarn.lock
rm -rf node_modules
yarn install


+++++++++++++++++++++++++++++++++++++++ add a folder ++++++++++++++
git add dist/
git commit -m "Include the dist/ directory in the repository"