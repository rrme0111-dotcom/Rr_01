// 使用 bubblewrap 核心库构建 APK（绕过 CLI 交互）
const { TwaGenerator, TwaManifest, AndroidSdkTools, JdkHelper, KeyTool } = require('@bubblewrap/core');
const path = require('path');
const fs = require('fs');

async function build() {
  const androidDir = __dirname;
  const manifestPath = path.join(androidDir, 'twa-manifest.json');

  console.log('Loading manifest...');
  const manifest = await TwaManifest.fromFile(manifestPath);
  manifest.signingKey.path = path.join(androidDir, 'app.keystore');

  // JDK
  const jdkPath = 'C:/Program Files/Microsoft/jdk-21.0.7.6-hotspot';
  console.log('Using JDK at:', jdkPath);

  // Android SDK - download if needed
  const sdkPath = path.join(androidDir, 'sdk');
  console.log('Setting up Android SDK...');

  const generator = new TwaGenerator();
  console.log('Generating project...');
  const projectPath = path.join(androidDir, 'project');
  await generator.createTwaProject(manifest, projectPath);

  // Build with Gradle
  console.log('Building APK...');
  const tools = new AndroidSdkTools(sdkPath, jdkPath);

  console.log('APK build started...');
  await tools.gradleAssembleRelease(projectPath);

  const apkPath = path.join(projectPath, 'app', 'build', 'outputs', 'apk', 'release', 'app-release-signed.apk');
  if (fs.existsSync(apkPath)) {
    console.log('SUCCESS! APK at:', apkPath);
  } else {
    console.log('APK not found, checking...');
    // Try unsigned
    const unsignedPath = path.join(projectPath, 'app', 'build', 'outputs', 'apk', 'release', 'app-release-unsigned.apk');
    if (fs.existsSync(unsignedPath)) {
      console.log('Unsigned APK at:', unsignedPath);
    }
  }
}

build().catch(err => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
