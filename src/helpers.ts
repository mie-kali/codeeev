import * as core from '@actions/core';

const PLATFORMS = ['alpine', 'linux', 'macos', 'windows'];

const setFailure = (message: string, failCi: boolean): void => {
    failCi ? core.setFailed(message) : core.warning(message);
    if (failCi) {
      process.exit();
    }
};

const getUploaderName = (platform: string): string => {
  if (isWindows(platform)) {
    return 'codecov.exe';
  } else {
    return 'codecov';
  }
};

const isValidPlatform = (platform: string): boolean => {
  return PLATFORMS.includes(platform);
};

const isWindows = (platform: string): boolean => {
  return platform === 'windows';
};

const getPlatform = (os?: string): string => {
  if (isValidPlatform(os)) {
    core.info(`==> ${os} OS provided`);
    return os;
  }

  const platform = process.env.RUNNER_OS?.toLowerCase();
  if (isValidPlatform(platform)) {
    core.info(`==> ${platform} OS detected`);
    return platform;
  }

  core.info(
      '==> Could not detect OS or provided OS is invalid. Defaulting to linux',
  );
  return 'linux';
};

const getBaseUrl = (platform: string, version: string): string => {
  console.log(`------https://cli.codecov.io/${platform}/${getUploaderName(platform)}`);
  return `https://github.com/codecov/codecov-cli/releases/download/v0.1.1_test/codecovcli_linux_v0.1.1_test)`;
  // https://cli.codecov.io/v0.1.1_test/linux/codecov
};

export {
  PLATFORMS,
  getBaseUrl,
  getPlatform,
  getUploaderName,
  isValidPlatform,
  isWindows,
  setFailure,
};
