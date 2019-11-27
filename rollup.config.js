import path from 'path';
import rimraf from 'rimraf';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const dist = 'dist/';
const config = {
  input: path.join('src/index.js'),
  external: ['react'],
  plugins: [resolve({ extensions: ['.js', '.jsx'] }), babel(), terser()],
};

rimraf.sync(dist);

export default [
  {
    ...config,
    output: {
      file: path.resolve(pkg.main),
      format: 'umd',
      name: pkg.name,
      exports: 'named',
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
