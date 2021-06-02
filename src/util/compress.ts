import { Compress } from 'gzipper';
import path from 'path';

const compressFiles = async () => {
  const buildPath = path.join(process.cwd(), 'build');
  const extensionsToCompress = ['js', 'css', 'svg', 'jpeg', 'png'];

  const gzip = new Compress(buildPath, buildPath, {
    incremental: true,
    include: extensionsToCompress,
    level: 9,
    threshold: 0,
  });

  const brotli = new Compress(buildPath, buildPath, {
    brotli: true,
    include: extensionsToCompress,
    brotliParamMode: 'text',
    brotliQuality: 11,
    threshold: 0,
  });

  try {
    await Promise.all([gzip.run(), brotli.run()]);
  } catch (err) {
    console.error(err);
  }
};

export default compressFiles;
