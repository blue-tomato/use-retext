import path from 'path';
import rimraf from 'rimraf';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const dist = 'dist/';
const config = {
  input: path.join('index.js'),
  external: ['react'],
  plugins: [terser()],
};

rimraf.sync(dist);

export default [
  {
    ...config,
    output: {
      file: path.resolve(pkg.main),
      format: 'umd',
      name: pkg.name,
      globals: { react: 'React' },
    },
  },
  {
    ...config,
    output: {
      file: path.resolve(pkg.module),
      format: 'esm',
    },
  },
];
