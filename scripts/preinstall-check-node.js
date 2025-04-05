/**
 * 注意：
 * 1、这个脚本不能使用太新的语法，要确保在 node >=12 都能顺利执行该脚本
 * 2、不能引入 node_modules 的包，此文件是需要在 install 之前执行的。
 */

const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { Color } = require('./color');

const nvmrc = join(__dirname, '../', '.nvmrc');

async function checkNodeVersion() {
  try {
    if (!existsSync(nvmrc)) {
      return;
    }

    const projectNodeVersion = readFileSync(nvmrc, 'utf8').toString().trim();
    const currentNodeVersion = process.versions.node.replace('\'', '');

    // 如 12.22.12 我们只取大版本 12 即可，工作流不对版本要求太细致
    // 在 .nvmrc 里面写完整版本是为了让 Windows 平台的 nvm 可以顺利切换，它需要完整的版本号
    if (parseInt(projectNodeVersion.split('.')[0]) <= parseInt(currentNodeVersion.split('.')[0])) {
      console.log(Color.green(`当前运行得 node 版本(${currentNodeVersion})符合项目要求得版本`));
      return true;
    } else {
      console.log(Color.yellow('当前运行的 node 版本和项目要求的版本不同:'));
      console.log('=> 当前运行版本:', Color.yellow(currentNodeVersion));
      console.log('=> 项目要求版本:', Color.yellow(projectNodeVersion));

      console.log('建议您使用 nvm 来管理本机的 node，这样可以让你轻松切换 node 版本！');
      console.log('当你安装完 nvm 之后，可以执行如下命令，来切换 node 版本:');
      console.log(Color.blue(`nvm install ${projectNodeVersion}`));
      console.log(Color.blue(`nvm use ${projectNodeVersion}`));
      console.log('在完成以上操作之后，您可以重新执行：');
      console.log(Color.blue(`nvm install ${projectNodeVersion}`));
      console.log(Color.blue(`nvm use ${projectNodeVersion}`));
      console.log('在完成以上操作之后，您可以重新执行 npm install');

      process.exit(1);
    }
  } catch (error) {
    console.log(Color.red(error));
  }
}

checkNodeVersion();
