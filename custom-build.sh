#!/bin/sh

#业务错误
ERR_DIRECTORY=10001         # 目录不正确
ERR_NO_PACKAGE_JSON=10002   # 目录下没有 package.json
ERR_DEPLOY_NODE=10003       # deploy-node 错误
ERR_CUSTOM_BUILD=10004      # 自定义脚本错误

if [ ! -d "input/" ] || [ ! -d "output/" ]; then
  echo "please ensure input and output dir first, exit $ERR_DIRECTORY"
  exit $ERR_DIRECTORY;
fi
if [ ! -f "input/package.json" ]; then
  echo "package.json is not exist in input dir, exit $ERR_NO_PACKAGE_JSON"
  exit $ERR_NO_PACKAGE_JSON;
fi

# deploy-node
deploy-node input output
if [ $? -ne 0 ]
then
  echo "deploy-node task failed"
  exit ${ERR_DEPLOY_NODE}
fi

################################ 业务自定义 begin

# 如果 deploy-node 成功执行，则 `output` 目录如下：
# 其中 `bin/src` 目录为源码所在目录，一般而言应该在该目录下继续自定义构建行为
# ├── output
# │   ├── bin
# │   │   ├── node
# │   │   ├── node-agent-trpc
# │   │   └── src
# │   ├── conf
# │   └── data

customBuildDemo() {
  cd $1
  #### deploy-node 流程会自动安装 dependencies 的依赖，如有需要，建议自定义部分只安装 dependencies 之外的依赖
  # install build dependencies ( maybe in devDependencies )

  npm i

  npm run build

  return $?;
}
customBuildDemo "output/bin/src"
if [ $? -ne 0 ]
then
  echo "customBuild task failed"
  exit ${ERR_CUSTOM_BUILD}
fi

################################ 业务自定义 end
# success
exit 0;
