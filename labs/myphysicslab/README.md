# myPhysicsLab — 本地托管

来源：https://github.com/myphysicslab/myphysicslab
作者：Erik Neumann；许可证：Apache License 2.0（见同目录 LICENSE）。
构建（2026-11-19）：`npm install typescript@5 esbuild` 后依次运行
`./node_modules/.bin/tsc` 与 `make apps-en`，仅取英文版构建产物。

本站只保留 labs-data.js 里 source 为 "mpl" 的 7 个演示（其余约 40 个
演示未搬入），目录结构沿用上游 build/ 的相对路径，以便
`../../stylesheet.css` 与 `../../images/` 的引用原样工作：

| 演示 | 本地页面 |
|---|---|
| Single Spring | sims/springs/SingleSpringApp-en.html |
| Pendulum | sims/pendulum/PendulumApp-en.html |
| Newton's Cradle | sims/engine2D/NewtonsCradleApp-en.html |
| Collision Lab | sims/engine2D/MultipleCollisionApp-en.html（即官网 Rigid Body Collisions） |
| Roller Coaster | sims/roller/RollerSingleApp-en.html |
| Car Suspension | sims/engine2D/CarSuspensionApp-en.html |
| Molecules | sims/springs/Molecule2App-en.html（经 sims/experimental/BlankSlateApp-en.js 以脚本搭建） |

注意：各页顶部的站内导航（logo、上一页/下一页、语言切换）指向未搬入
的上游页面，在站内 iframe 里点到会 404，不影响仿真本身运行。
